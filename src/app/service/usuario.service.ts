import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { usuarioRolDTO } from '../model/usuarioRolDTO';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url=`${base_url}/usuarios`
  private listaCambio=new Subject<Usuario[]>()
  private confirmarEliminacion = new Subject<Boolean>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Usuario[]>(this.url);
  }
  insert(u: Usuario){
    return this.http.post(this.url,u)
  }
  setList(ListaNueva: Usuario[]){
    this.listaCambio.next(ListaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.get<Usuario>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });

  }
  listUsername(name: String) {
    return this.http.get<Usuario>(`${this.url}/username/${name}`)
  }
  update(u:Usuario){
    let token = sessionStorage.getItem("token");
   return this.http.put(this.url, u, {
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
  usuariosporrol(): Observable<usuarioRolDTO[]> {
    let token = sessionStorage.getItem("token");
    return this.http.get<usuarioRolDTO[]>(`${this.url}/usuariosporrol`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
}
