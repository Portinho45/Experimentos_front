import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Puesto_trabajo } from 'src/app/model/puesto_trabajo';
import { Puesto_trabajoService } from 'src/app/service/puesto-trabajo.service'
import { PuestoTrabajoDialogoComponent } from './puesto-trabajo-dialogo/puesto-trabajo-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-puesto-trabajo-listar',
  templateUrl: './puesto-trabajo-listar.component.html',
  styleUrls: ['./puesto-trabajo-listar.component.css']
})
export class PuestoTrabajoListarComponent implements OnInit{
  role:string="";
  dataSourcePuesto_trabajo: MatTableDataSource<Puesto_trabajo>=new MatTableDataSource();
  idMayor: number = 0
  displayedColumnsPuesto_trabajo: string[] = ['id', 'reclutador', 'requisitos', 'accion01', 'accion02']
  @ViewChild(MatPaginator,{ static:true }) paginator!: MatPaginator;

  constructor(private puesto_trabajoService: Puesto_trabajoService, private dialog: MatDialog, private ls:LoginService) {}

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.puesto_trabajoService.List().subscribe(data=> {
      this.dataSourcePuesto_trabajo = new MatTableDataSource(data);
      this.dataSourcePuesto_trabajo.paginator = this.paginator;
    })
    this.puesto_trabajoService.GetList().subscribe(data=> {
      this.dataSourcePuesto_trabajo = new MatTableDataSource(data)
      this.dataSourcePuesto_trabajo.paginator = this.paginator;
    })
    this.puesto_trabajoService.GetConfirmDelete().subscribe(data=>{
      data== true? this.eliminar(this.idMayor) : false;
    })
  }

  filtrar(e:any){
    this.dataSourcePuesto_trabajo.filter = e.target.value.trim();
  }

  confirm(id: number) {
    this.idMayor = id;
    this.dialog.open(PuestoTrabajoDialogoComponent);
  }
  eliminar(id: number) {
    this.puesto_trabajoService.Delete(id).subscribe(() => {
      this.puesto_trabajoService.List().subscribe(data => {
        this.puesto_trabajoService.SetList(data);
      })
    })
  }

}
