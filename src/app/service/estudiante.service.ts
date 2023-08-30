import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estudiante } from '../model/estudiante';
import { estudianteEdadDTO } from '../model/estudianteEdadDTO';
import { estudianteEdadPromedioDTO } from '../model/estudianteEdadPromedioDTO';
import { estudiantePracticasDTO } from '../model/estudiantePracticasDTO';
import { estudianteSemestreDTO } from '../model/estudianteSemestreDTO';
import { institucionEstudianteDTO } from '../model/institucionEstudianteDTO';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private url=`${base_url}/estudiantes`
  private listaCambio=new Subject<Estudiante[]>()
  private confirmarEliminacion = new Subject<Boolean>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Estudiante[]>(this.url);
  }
  insert(u: Estudiante){
    return this.http.post(this.url,u)
  }
  setList(ListaNueva: Estudiante[]){
    this.listaCambio.next(ListaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.get<Estudiante>(`${this.url}/${id}`, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
  }
  update(au:Estudiante){
    let token = sessionStorage.getItem("token");
    return this.http.put(this.url,au, {
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
  getEstudianteEdad(): Observable<estudianteEdadDTO[]> {
    let token = sessionStorage.getItem("token");
    return this.http.get<estudianteEdadDTO[]>(`${this.url}/mayoresymenores`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getEstudianteEdadPromedio(): Observable<estudianteEdadPromedioDTO[]> {
    let token = sessionStorage.getItem("token");
    return this.http.get<estudianteEdadPromedioDTO[]>(`${this.url}/promedioedad`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getEstudiantePracticas(): Observable<estudiantePracticasDTO[]> {
    let token = sessionStorage.getItem("token");
    return this.http.get<estudiantePracticasDTO[]>(`${this.url}/buscapracticasporcentaje`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getEstudianteSemestre(): Observable<estudianteSemestreDTO[]> {
    let token = sessionStorage.getItem("token");
    return this.http.get<estudianteSemestreDTO[]>(`${this.url}/cantidadestudiantesporsemestre`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getInstitucionEstudiante(): Observable<institucionEstudianteDTO[]> {
    let token = sessionStorage.getItem("token");
    return this.http.get<institucionEstudianteDTO[]>(`${this.url}/estudiantesporinstitucion`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
}
