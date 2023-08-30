import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Reclutador } from 'src/app/model/reclutador';
import { ReclutadorService } from 'src/app/service/reclutador.service'
import { ReclutadorDialogoComponent } from './reclutador-dialogo/reclutador-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-reclutador-listar',
  templateUrl: './reclutador-listar.component.html',
  styleUrls: ['./reclutador-listar.component.css']
})
export class ReclutadorListarComponent implements OnInit{
  role:string="";
  dataSourceReclutador: MatTableDataSource<Reclutador>=new MatTableDataSource();
  idMayor: number = 0
  displayedColumnsReclutador: string[] = ['id', 'descripcion', 'empresa', 'usuario', 'accion01', 'accion02']
  @ViewChild(MatPaginator,{ static:true }) paginator!: MatPaginator;

  constructor(private reclutadorService: ReclutadorService, private dialog: MatDialog, private ls:LoginService) {}

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.reclutadorService.List().subscribe(data=> {
      this.dataSourceReclutador = new MatTableDataSource(data);
      this.dataSourceReclutador.paginator = this.paginator;
    })
    this.reclutadorService.GetList().subscribe(data=> {
      this.dataSourceReclutador = new MatTableDataSource(data)
      this.dataSourceReclutador.paginator = this.paginator;
    })
    this.reclutadorService.GetConfirmDelete().subscribe(data=>{
      data== true? this.eliminar(this.idMayor) : false;
    })
  }

  filtrar(e:any){
    this.dataSourceReclutador.filter = e.target.value.trim();
  }

  confirm(id: number) {
    this.idMayor = id;
    this.dialog.open(ReclutadorDialogoComponent);
  }
  eliminar(id: number) {
    this.reclutadorService.Delete(id).subscribe(() => {
      this.reclutadorService.List().subscribe(data => {
        this.reclutadorService.SetList(data);
      })
    })
  }

}

