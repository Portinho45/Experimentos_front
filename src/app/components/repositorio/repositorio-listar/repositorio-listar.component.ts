import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Repositorio } from 'src/app/model/repositorio';
import { RepositorioService } from 'src/app/service/repositorio.service'
import { RepositorioDialogoComponent } from './repositorio-dialogo/repositorio-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-repositorio-listar',
  templateUrl: './repositorio-listar.component.html',
  styleUrls: ['./repositorio-listar.component.css']
})
export class RepositorioListarComponent implements OnInit{
  role:string="";
  dataSourceRepositorio: MatTableDataSource<Repositorio>=new MatTableDataSource();
  idMayor: number = 0;
  displayedColumnsRepositorio: string[] = ['id', 'nombre', 'descripcion', 'enlace', 'fecha','Estudiante_id','accion01', 'accion02']
  @ViewChild(MatPaginator,{ static:true }) paginator!: MatPaginator;

  constructor(private repositorioService: RepositorioService, private dialog: MatDialog, private ls:LoginService){

  }
  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.repositorioService.List().subscribe(data=> {
      this.dataSourceRepositorio = new MatTableDataSource(data);
      this.dataSourceRepositorio.paginator = this.paginator;
    })
    this.repositorioService.GetList().subscribe(data=> {
      this.dataSourceRepositorio = new MatTableDataSource(data)
      this.dataSourceRepositorio.paginator = this.paginator;
    })
    this.repositorioService.GetConfirmDelete().subscribe(data=>{
      data== true? this.eliminar(this.idMayor) : false;
    })
  }

  filtrar(e:any){
    this.dataSourceRepositorio.filter = e.target.value.trim();
  }

  confirm(id: number) {
    this.idMayor = id;
    this.dialog.open(RepositorioDialogoComponent);
  }
  eliminar(id: number) {
    this.repositorioService.Delete(id).subscribe(() => {
      this.repositorioService.List().subscribe(data => {
        this.repositorioService.SetList(data);
      })
    })
  }
}
