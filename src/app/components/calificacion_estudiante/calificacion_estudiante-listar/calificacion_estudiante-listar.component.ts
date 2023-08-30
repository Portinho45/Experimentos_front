import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Calificacion_Estudiante } from 'src/app/model/calificacion_estudiante';
import { Calificacion_EstudianteService } from 'src/app/service/calificacion_estudiante.service'
import { Calificacion_EstudianteDialogoComponent } from './calificacion_estudiante-dialogo/calificacion_estudiante-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-calificacion_estudiante-listar',
  templateUrl: './calificacion_estudiante-listar.component.html',
  styleUrls: ['./calificacion_estudiante-listar.component.css']
})
export class Calificacion_EstudianteListarComponent implements OnInit{
  role:string="";
  dataSourceCalificacion_Estudiante: MatTableDataSource<Calificacion_Estudiante>=new MatTableDataSource();
  idMayor: number = 0
  displayedColumnsCalificacion_Estudiante: string[] = ['id', 'estudiante', 'calificacion', 'accion01', 'accion02']
  @ViewChild(MatPaginator,{ static:true }) paginator!: MatPaginator;

  constructor(private calificacion_estudianteService: Calificacion_EstudianteService, private dialog: MatDialog, private ls:LoginService) {}

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.calificacion_estudianteService.List().subscribe(data=> {
      this.dataSourceCalificacion_Estudiante = new MatTableDataSource(data);
      this.dataSourceCalificacion_Estudiante.paginator = this.paginator;
    })
    this.calificacion_estudianteService.GetList().subscribe(data=> {
      this.dataSourceCalificacion_Estudiante = new MatTableDataSource(data)
      this.dataSourceCalificacion_Estudiante.paginator = this.paginator;
    })
    this.calificacion_estudianteService.GetConfirmDelete().subscribe(data=>{
      data== true? this.eliminar(this.idMayor) : false;
    })
  }

  filtrar(e:any){
    this.dataSourceCalificacion_Estudiante.filter = e.target.value.trim();
  }

  confirm(id: number) {
    this.idMayor = id;
    this.dialog.open(Calificacion_EstudianteDialogoComponent);
  }
  eliminar(id: number) {
    this.calificacion_estudianteService.Delete(id).subscribe(() => {
      this.calificacion_estudianteService.List().subscribe(data => {
        this.calificacion_estudianteService.SetList(data);
      })
    })
  }

}
