import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Repositorio } from '../model/repositorio';
import { Observable, Subject } from 'rxjs';
import { repositorioEstudianteDTO } from 'src/app/model/repositorioEstudianteDTO';
const base_url= environment.base

@Injectable({
  providedIn: 'root'
})

export class RepositorioService {
  private url=`${base_url}/repositorios`
  private listCambio = new Subject<Repositorio[]>()
  private confirmarEliminacion = new Subject<Boolean>()

  constructor(private http:HttpClient) { }

  List() {
    let token = sessionStorage.getItem("token");
    return this.http.get<Repositorio[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  Insert(repositorio: Repositorio) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, repositorio, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  SetList(ListaNueva: Repositorio[]){
    this.listCambio.next(ListaNueva)
  }

  GetList(){
    return this.listCambio.asObservable()
  }

  ListId(id: number){
    let token = sessionStorage.getItem("token");
    return this.http.get<Repositorio>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  Update(repositorio: Repositorio) {
    let token = sessionStorage.getItem("token");
   return this.http.put(this.url, repositorio, {
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

  getRepositoriobyEstudiante(): Observable<repositorioEstudianteDTO[]> {
    let token = sessionStorage.getItem("token");
    return this.http.get<repositorioEstudianteDTO[]>(`${this.url}/repositorios-count`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

}
