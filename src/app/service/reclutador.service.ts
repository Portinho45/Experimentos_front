import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reclutador } from '../model/reclutador';
import { reclutadorMatchDTO } from 'src/app/model/reclutadorMatchDTO';
import { Subject, Observable } from 'rxjs';
const base_url= environment.base
@Injectable({
  providedIn: 'root'
})
export class ReclutadorService {
  private url=`${base_url}/reclutadores`
  private listCambio = new Subject<Reclutador[]>()
  private confirmarEliminacion = new Subject<Boolean>()

  constructor(private http:HttpClient) { }

  List() {
    return this.http.get<Reclutador[]>(this.url);
  }
  Insert(reclutador: Reclutador){
    return this.http.post(this.url,reclutador)
  }
  SetList(ListaNueva: Reclutador[]){
    this.listCambio.next(ListaNueva);
  }
  GetList(){
    return this.listCambio.asObservable();
  }

  ListId(id: number){
    let token = sessionStorage.getItem("token");
    return this.http.get<Reclutador>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  Update(reclutador: Reclutador) {
    let token = sessionStorage.getItem("token");
   return this.http.put(this.url, reclutador, {
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
  MatchReclutador(): Observable<reclutadorMatchDTO[]> {
    let token = sessionStorage.getItem("token");
    return this.http.get<reclutadorMatchDTO[]>(`${this.url}/MatchReclutador`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
}
