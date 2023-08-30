import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rol } from '../model/rol';
import { Subject } from 'rxjs';
const base_url= environment.base

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url=`${base_url}/roles`
  private listCambio = new Subject<Rol[]>()
  private confirmarEliminacion = new Subject<Boolean>()

  constructor(private http:HttpClient) { }

  List() {
    return this.http.get<Rol[]>(this.url)
  }

  Insert(rol: Rol) {
    return this.http.post(this.url, rol)
  }

  SetList(ListaNueva: Rol[]){
    this.listCambio.next(ListaNueva)
  }

  GetList(){
    return this.listCambio.asObservable()
  }

  ListId(id: number){
    let token = sessionStorage.getItem("token");
    return this.http.get<Rol>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  Update(rol: Rol) {
    let token = sessionStorage.getItem("token");
   return this.http.put(this.url, rol, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
  }
}

