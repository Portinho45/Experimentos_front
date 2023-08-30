import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Carreras_Estudiante } from '../model/carrera_estudiante';
import { Subject } from 'rxjs';
const base_url= environment.base
@Injectable({
  providedIn: 'root'
})
export class Carreras_EstudianteService {
  private url=`${base_url}/Carreras_Estudiante`
  private listCambio = new Subject<Carreras_Estudiante[]>()
  private confirmarEliminacion = new Subject<Boolean>()

  constructor(private http:HttpClient) { }

  List() {
    let token = sessionStorage.getItem("token");
    return this.http.get<Carreras_Estudiante[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  Insert(carrera_estudiante: Carreras_Estudiante) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, carrera_estudiante, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  SetList(ListaNueva: Carreras_Estudiante[]){
    this.listCambio.next(ListaNueva)
  }

  GetList(){
    return this.listCambio.asObservable()
  }

  ListId(id: number){
    let token = sessionStorage.getItem("token");
    return this.http.get<Carreras_Estudiante>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  Update(carrera_estudiante: Carreras_Estudiante) {
    let token = sessionStorage.getItem("token");
   return this.http.put(this.url, carrera_estudiante, {
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
