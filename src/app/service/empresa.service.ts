import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Empresa } from '../model/empresa';
import { Observable, Subject } from 'rxjs';
import { empresaReclutadorDTO } from 'src/app/model/empresaReclutadorDTO';
import { empresaMatchDTO } from 'src/app/model/empresaMatchDTO';
const base_url= environment.base
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private url=`${base_url}/Empresa`
  private listCambio = new Subject<Empresa[]>()
  private confirmarEliminacion = new Subject<Boolean>()

  constructor(private http:HttpClient) { }

  List() {
    return this.http.get<Empresa[]>(this.url)
  }

  Insert(empresa: Empresa) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, empresa, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  SetList(ListaNueva: Empresa[]){
    this.listCambio.next(ListaNueva)
  }

  GetList(){
    return this.listCambio.asObservable()
  }

  ListId(id: number){
    return this.http.get<Empresa>(`${this.url}/${id}`)
  }

  Update(empresa: Empresa) {
    let token = sessionStorage.getItem("token");
   return this.http.put(this.url, empresa, {
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

  getEmpresabyReclutador(): Observable<empresaReclutadorDTO[]> {
    let token = sessionStorage.getItem("token");
    return this.http.get<empresaReclutadorDTO[]>(`${this.url}/empresa-count`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  MatchEmpresa(): Observable<empresaMatchDTO[]> {
    let token = sessionStorage.getItem("token");
    return this.http.get<empresaMatchDTO[]>(`${this.url}/MatchEmpresa`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
}
