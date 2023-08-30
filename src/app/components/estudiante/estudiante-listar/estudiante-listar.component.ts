import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Estudiante } from 'src/app/model/estudiante';
import { EstudianteService } from 'src/app/service/estudiante.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { EstudianteDialogoComponent } from './estudiante-dialogo/estudiante-dialogo.component';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-estudiante-listar',
  templateUrl: './estudiante-listar.component.html',
  styleUrls: ['./estudiante-listar.component.css']
})
export class EstudianteListarComponent implements OnInit {
  role:string="";
  lista:Estudiante[]=[]
  dataSourceEstudiante: MatTableDataSource<Estudiante> =new MatTableDataSource();
  idMayor: number = 0;
  displayedColumns: string[]=['id','semestre','edad','genero','practicante','descripcion','institucion','usuario','accion01','accion02']
  @ViewChild(MatPaginator,{ static:true }) paginator!: MatPaginator;
  constructor(private eS: EstudianteService, private dialog: MatDialog, private ls:LoginService){

  }
  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.eS.list().subscribe(data=>{
      this.dataSourceEstudiante= new MatTableDataSource(data);
      this.dataSourceEstudiante.paginator = this.paginator;
    })
    this.eS.getList().subscribe(data=>{
      this.dataSourceEstudiante=new MatTableDataSource(data);
      this.dataSourceEstudiante.paginator = this.paginator;
    })
    this.eS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
    })
  }
  filtrar(e:any){
    this.dataSourceEstudiante.filter= e.target.value.trim();
  }
  confirm(id: number) {
    this.idMayor = id;
    this.dialog.open(EstudianteDialogoComponent);
  }
  eliminar(id: number) {
    this.eS.delete(id).subscribe(() => {
      this.eS.list().subscribe(data => {
        this.eS.setList(data);
      })
    })
  }
}
