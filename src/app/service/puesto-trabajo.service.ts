import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Puesto_trabajo } from '../model/puesto_trabajo';
import { Subject } from 'rxjs';
const base_url= environment.base
@Injectable({
  providedIn: 'root'
})
export class Puesto_trabajoService {
  private url=`${base_url}/puesto_trabajos`
  private listCambio = new Subject<Puesto_trabajo[]>()
  private confirmarEliminacion = new Subject<Boolean>()

  constructor(private http:HttpClient) { }

  List() {
    let token = sessionStorage.getItem("token");
    return this.http.get<Puesto_trabajo[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  Insert(puesto_trabajo: Puesto_trabajo) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, puesto_trabajo, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  SetList(ListaNueva: Puesto_trabajo[]){
    this.listCambio.next(ListaNueva)
  }

  GetList(){
    return this.listCambio.asObservable()
  }

  ListId(id: number){
    let token = sessionStorage.getItem("token");
    return this.http.get<Puesto_trabajo>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  Update(puesto_trabajo: Puesto_trabajo) {
    let token = sessionStorage.getItem("token");
   return this.http.put(this.url, puesto_trabajo, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
  }
  Delete(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  GetConfirmDelete(){
    return this.confirmarEliminacion.asObservable();
  }
  SetConfirmDelete(estado:Boolean){
    this.confirmarEliminacion.next(estado);
  }
}
