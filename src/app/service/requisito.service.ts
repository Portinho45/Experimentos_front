import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Requisito } from '../model/requisito';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class RequisitoService
{

  private url = `${base_url}/Requisitos`
  private confirmarEliminacion = new Subject<Boolean>()
  private listaCambio = new Subject<Requisito[]>()

  constructor(private http: HttpClient) { }
  list() {
    let token = sessionStorage.getItem("token");
    return this.http.get<Requisito[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insert(Calificacion: Requisito) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, Calificacion, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  setList(listaNueva: Requisito[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.get<Requisito>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  update(aut: Requisito) {
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
