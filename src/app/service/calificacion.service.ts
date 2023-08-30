import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Calificacion } from '../model/calificacion';
import { Subject } from 'rxjs';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private url = `${base_url}/Calificacion`
  private confirmarEliminacion = new Subject<Boolean>()
  private listaCambio = new Subject<Calificacion[]>()

  constructor(private http: HttpClient) { }
  list() {
    let token = sessionStorage.getItem("token");
    return this.http.get<Calificacion[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insert(Calificacion: Calificacion) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, Calificacion, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  setList(listaNueva: Calificacion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.get<Calificacion>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  update(aut: Calificacion) {
    let token = sessionStorage.getItem("token");
   return this.http.put(this.url, aut, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
  }
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
