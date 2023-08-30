import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Institucion_Educativa } from '../model/institucion';
import { Subject } from 'rxjs';
const base_url= environment.base
@Injectable({
  providedIn: 'root'
})
export class InstitucionService {
  private url=`${base_url}/Institucion_Educativa`
  private listCambio = new Subject<Institucion_Educativa[]>()
  private confirmarEliminacion = new Subject<Boolean>()

  constructor(private http:HttpClient) { }

  List() {
    return this.http.get<Institucion_Educativa[]>(this.url)
  }

  Insert(institucion: Institucion_Educativa) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, institucion, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  SetList(ListaNueva: Institucion_Educativa[]){
    this.listCambio.next(ListaNueva)
  }

  GetList(){
    return this.listCambio.asObservable()
  }

  ListId(id: number){
    let token = sessionStorage.getItem("token");
    return this.http.get<Institucion_Educativa>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  Update(institucion: Institucion_Educativa) {
    let token = sessionStorage.getItem("token");
   return this.http.put(this.url, institucion, {
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
