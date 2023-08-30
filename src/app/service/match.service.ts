import { Injectable } from '@angular/core';
import { Matchs } from '../model/matchs';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url= environment.base

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private url=`${base_url}/match`
  private listCambio = new Subject<Matchs[]>()
  private confirmarEliminacion = new Subject<Boolean>()

  constructor(private http:HttpClient) { }

  List() {
    let token = sessionStorage.getItem("token");
    return this.http.get<Matchs[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  Insert(match : Matchs) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, match, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  SetList(ListaNueva: Matchs[]){
    this.listCambio.next(ListaNueva)
  }

  GetList(){
    return this.listCambio.asObservable()
  }

  ListId(id: number){
    let token = sessionStorage.getItem("token");
    return this.http.get<Matchs>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  Update(match : Matchs) {
    let token = sessionStorage.getItem("token");
   return this.http.put(this.url, match, {
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
