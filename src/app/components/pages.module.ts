import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PagesRoutingModule } from './pages-routing.module';

import { EmpresaComponent } from './empresa/empresa.component';
import { EmpresaListarComponent } from './empresa/empresa-listar/empresa-listar.component';
import { EmpresaCRUDComponent } from './empresa/empresa-crud/empresa-crud.component';
import { RequisitosComponent } from './requisitos/requisitos.component';
import { RequisitosListarComponent } from './requisitos/requisitos-listar/requisitos-listar.component';
import { RequisitosCreaeditaComponent } from './requisitos/requisitos-creaedita/requisitos-creaedita.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioListarComponent } from './usuario/usuario-listar/usuario-listar.component';
import { UsuarioCreaeditaComponent } from './usuario/usuario-creaedita/usuario-creaedita.component';
import { EmpresaDialogoComponent } from './empresa/empresa-listar/empresa-dialogo/empresa-dialogo.component';
import { UsuarioDialogoComponent } from './usuario/usuario-listar/usuario-dialogo/usuario-dialogo.component';
import { RequisitosDialogoComponent } from './requisitos/requisitos-listar/requisitos-dialogo/requisitos-dialogo.component';
import { CalificacionComponent } from './calificacion/Calificacion.component';
import { CalificacionListarComponent } from './calificacion/Calificacion-listar/Calificacion-listar.component';
import { CalificacionCreaeditaComponent } from './calificacion/Calificacion-creaedita/Calificacion-creaedita.component';
import { CalificacionDialogoComponent } from './calificacion/Calificacion-listar/Calificacion-dialogo/Calificacion-dialogo.component';
import { InstitucionComponent } from './institucion/institucion.component';
import { InstitucionListarComponent } from './institucion/institucion-listar/institucion-listar.component';
import { InstitucionCrudComponent } from './institucion/institucion-crud/institucion-crud.component';
import { InstitucionDialogoComponent } from './institucion/institucion-listar/institucion-dialogo/institucion-dialogo.component';
import { CarreraCreaeditaComponent } from './carrera/carrera-creaedita/carrera-creaedita.component';
import { CarreraListarComponent } from './carrera/carrera-listar/carrera-listar.component';
import { CarreraDialogoComponent } from './carrera/carrera-listar/carrera-dialogo/carrera-dialogo.component';
import { CarreraComponent } from './carrera/carrera.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudianteCreaeditaComponent } from './estudiante/estudiante-creaedita/estudiante-creaedita.component';
import { EstudianteListarComponent } from './estudiante/estudiante-listar/estudiante-listar.component';
import { EstudianteDialogoComponent } from './estudiante/estudiante-listar/estudiante-dialogo/estudiante-dialogo.component';
import { ReclutadorComponent } from './reclutador/reclutador.component';
import { ReclutadorListarComponent } from './reclutador/reclutador-listar/reclutador-listar.component';
import { ReclutadorDialogoComponent } from './reclutador/reclutador-listar/reclutador-dialogo/reclutador-dialogo.component';
import { ReclutadorCreaeditaComponent } from './reclutador/reclutador-creaedita/reclutador-creaedita.component';
import { PuestoTrabajoComponent } from './puesto-trabajo/puesto-trabajo.component';
import { PuestoTrabajoListarComponent } from './puesto-trabajo/puesto-trabajo-listar/puesto-trabajo-listar.component';
import { PuestoTrabajoDialogoComponent } from './puesto-trabajo/puesto-trabajo-listar/puesto-trabajo-dialogo/puesto-trabajo-dialogo.component';
import { PuestoTrabajoCreaeditaComponent } from './puesto-trabajo/puesto-trabajo-creaedita/puesto-trabajo-creaedita.component';
import { Calificacion_EstudianteComponent } from './calificacion_estudiante/calificacion_estudiante.component';
import { Calificacion_EstudianteListarComponent } from './calificacion_estudiante/calificacion_estudiante-listar/calificacion_estudiante-listar.component';
import { Calificacion_EstudianteDialogoComponent } from './calificacion_estudiante/calificacion_estudiante-listar/calificacion_estudiante-dialogo/calificacion_estudiante-dialogo.component';
import { Calificacion_EstudianteCreaeditaComponent } from './calificacion_estudiante/calificacion_estudiante-creaedita/calificacion_estudiante-creaedita.component';
import { RolComponent } from './rol/rol.component';
import { RolListarComponent } from './rol/rol-listar/rol-listar.component';
import { RolDialogoComponent } from './rol/rol-listar/rol-dialogo/rol-dialogo.component';
import { RolCreaeditaComponent } from './rol/rol-creaedita/rol-creaedita.component';
import { MatchComponent } from './match/match.component';
import { MatchListarComponent } from './match/match-listar/match-listar.component';
import { MatchDialogoComponent } from './match/match-listar/match-dialogo/match-dialogo.component';
import { MatchCreaeditaComponent } from './match/match-creaedita/match-creaedita.component';
import { ReportesComponent } from './reportes/reportes.component';
import { Reporte01Component } from './reportes/reporte01/reporte01.component';
import { RepositorioComponent } from './repositorio/repositorio.component';
import { RepositorioListarComponent } from './repositorio/repositorio-listar/repositorio-listar.component';
import { RepositorioDialogoComponent } from './repositorio/repositorio-listar/repositorio-dialogo/repositorio-dialogo.component';
import { RepositorioCreaeditaComponent } from './repositorio/repositorio-creaedita/repositorio-creaedita.component';
import { Reporte02Component } from './reportes/reporte02/reporte02.component';
import { Reporte03Component } from './reportes/reporte03/reporte03.component';
import { Reporte04Component } from './reportes/reporte04/reporte04.component';
import { Reporte05Component } from './reportes/reporte05/reporte05.component';
import { Reporte06Component } from './reportes/reporte06/reporte06.component';
import { Reporte07Component } from './reportes/reporte07/reporte07.component';
import { Reporte08Component } from './reportes/reporte08/reporte08.component';
import { Reporte09Component } from './reportes/reporte09/reporte09.component';
import { Reporte10Component } from './reportes/reporte10/reporte10.component';
import { CarreraEstudianteComponent } from './carrera-estudiante/carrera-estudiante.component';
import { CarreraEstudianteListarComponent } from './carrera-estudiante/carrera-estudiante-listar/carrera-estudiante-listar.component';
import { CarreraEstudianteDialogoComponent } from './carrera-estudiante/carrera-estudiante-listar/carrera-estudiante-dialogo/carrera-estudiante-dialogo.component';
import { CarreraEstudianteCreaeditaComponent } from './carrera-estudiante/carrera-estudiante-creaedita/carrera-estudiante-creaedita.component';




@NgModule({
  declarations: [
    EmpresaComponent,
    EmpresaListarComponent,
    EmpresaCRUDComponent,
    EmpresaDialogoComponent,
    RequisitosComponent,
    RequisitosListarComponent,
    RequisitosCreaeditaComponent,
    RequisitosDialogoComponent,
    UsuarioComponent,
    UsuarioListarComponent,
    UsuarioCreaeditaComponent,
    UsuarioDialogoComponent,
    CalificacionComponent,
    CalificacionListarComponent,
    CalificacionCreaeditaComponent,
    CalificacionDialogoComponent,
    InstitucionComponent,
    InstitucionListarComponent,
    InstitucionCrudComponent,
    InstitucionDialogoComponent,
    CarreraCreaeditaComponent,
    CarreraListarComponent,
    CarreraDialogoComponent,
    CarreraComponent,
    EstudianteComponent,
    EstudianteCreaeditaComponent,
    EstudianteListarComponent,
    EstudianteDialogoComponent,
    ReclutadorComponent,
    ReclutadorListarComponent,
    ReclutadorDialogoComponent,
    ReclutadorCreaeditaComponent,
    PuestoTrabajoComponent,
    PuestoTrabajoListarComponent,
    PuestoTrabajoDialogoComponent,
    PuestoTrabajoCreaeditaComponent,
    MatchComponent,
    MatchListarComponent,
    MatchDialogoComponent,
    MatchCreaeditaComponent,
    Calificacion_EstudianteComponent,
    Calificacion_EstudianteListarComponent,
    Calificacion_EstudianteDialogoComponent,
    Calificacion_EstudianteCreaeditaComponent,
    RolComponent,
    RolListarComponent,
    RolDialogoComponent,
    RolCreaeditaComponent,
    ReportesComponent,
    Reporte01Component,
    RepositorioComponent,
    RepositorioListarComponent,
    RepositorioDialogoComponent,
    RepositorioCreaeditaComponent,
    Reporte02Component,
    Reporte03Component,
    Reporte04Component,
    Reporte05Component,
    Reporte06Component,
    Reporte07Component,
    Reporte08Component,
    Reporte09Component,
    Reporte10Component,
    CarreraEstudianteComponent,
    CarreraEstudianteListarComponent,
    CarreraEstudianteDialogoComponent,
    CarreraEstudianteCreaeditaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    PagesRoutingModule
  ],
  exports: [
    MatFormFieldModule
    ]
})
export class PagesModule { }
