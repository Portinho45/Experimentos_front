import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Calificacion_Estudiante } from '../model/calificacion_estudiante';
import { Subject } from 'rxjs';
const base_url= environment.base
@Injectable({
  providedIn: 'root'
})
export class Calificacion_EstudianteService {
  private url=`${base_url}/Calificacion_Estudiante`
  private listCambio = new Subject<Calificacion_Estudiante[]>()
  private confirmarEliminacion = new Subject<Boolean>()

  constructor(private http:HttpClient) { }

  List() {
    let token = sessionStorage.getItem("token");
    return this.http.get<Calificacion_Estudiante[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  Insert(calificacion_estudiante: Calificacion_Estudiante) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, calificacion_estudiante, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  SetList(ListaNueva: Calificacion_Estudiante[]){
    this.listCambio.next(ListaNueva)
  }

  GetList(){
    return this.listCambio.asObservable()
  }

  ListId(id: number){
    let token = sessionStorage.getItem("token");
    return this.http.get<Calificacion_Estudiante>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  Update(calificacion_estudiante: Calificacion_Estudiante) {
    let token = sessionStorage.getItem("token");
   return this.http.put(this.url, calificacion_estudiante, {
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
