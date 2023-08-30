import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Carreras_Estudiante } from 'src/app/model/carrera_estudiante';
import { Carreras_EstudianteService } from 'src/app/service/carrera_estudiante.service'
import { CarreraEstudianteDialogoComponent } from './carrera-estudiante-dialogo/carrera-estudiante-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-carrera-estudiante-listar',
  templateUrl: './carrera-estudiante-listar.component.html',
  styleUrls: ['./carrera-estudiante-listar.component.css']
})
export class CarreraEstudianteListarComponent implements OnInit{
  role:string="";
  dataSourceCarrera_Estudiante: MatTableDataSource<Carreras_Estudiante>=new MatTableDataSource();
  idMayor: number = 0
  displayedColumnsCalificacion_Estudiante: string[] = ['id', 'estudiante', 'carrera', 'accion01', 'accion02']
  @ViewChild(MatPaginator,{ static:true }) paginator!: MatPaginator;

  constructor(private carrera_estudianteService: Carreras_EstudianteService, private dialog: MatDialog, private ls:LoginService) {}

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.carrera_estudianteService.List().subscribe(data=> {
      this.dataSourceCarrera_Estudiante = new MatTableDataSource(data);
      this.dataSourceCarrera_Estudiante.paginator = this.paginator;
    })
    this.carrera_estudianteService.GetList().subscribe(data=> {
      this.dataSourceCarrera_Estudiante = new MatTableDataSource(data)
      this.dataSourceCarrera_Estudiante.paginator = this.paginator;
    })
    this.carrera_estudianteService.GetConfirmDelete().subscribe(data=>{
      data== true? this.eliminar(this.idMayor) : false;
    })
  }

  filtrar(e:any){
    this.dataSourceCarrera_Estudiante.filter = e.target.value.trim();
  }

  confirm(id: number) {
    this.idMayor = id;
    this.dialog.open(CarreraEstudianteDialogoComponent);
  }
  eliminar(id: number) {
    this.carrera_estudianteService.Delete(id).subscribe(() => {
      this.carrera_estudianteService.List().subscribe(data => {
        this.carrera_estudianteService.SetList(data);
      })
    })
  }

}
