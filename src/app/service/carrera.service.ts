import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrera } from '../model/carrera';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private url=`${base_url}/Carreras`
  private confirmarEliminacion = new Subject<Boolean>()
  private listaCambio=new Subject<Carrera[]>()

  constructor(private http:HttpClient) { }
  list(){
    let token = sessionStorage.getItem("token");
    return this.http.get<Carrera[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  insert(carrera:Carrera){
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, carrera, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  setList(listaNueva:Carrera[]){
    this.listaCambio.next(listaNueva);

  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    let token = sessionStorage.getItem("token");
    return this.http.get<Carrera>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  update(aut:Carrera){
    let token = sessionStorage.getItem("token");
   return this.http.put(this.url, aut, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
  }
  //Eliminacion
  delete(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  getConfirmDelete(){
    return this.confirmarEliminacion.asObservable();
  }
  setConfirmDelete(estado:Boolean){
    this.confirmarEliminacion.next(estado);
  }

}
