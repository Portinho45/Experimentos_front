import { Component , OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { Requisito } from 'src/app/model/requisito';
import { RequisitoService } from 'src/app/service/requisito.service';
import { RequisitosDialogoComponent } from './requisitos-dialogo/requisitos-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-requisitos-listar',
  templateUrl: './requisitos-listar.component.html',
  styleUrls: ['./requisitos-listar.component.css']
})
export class RequisitosListarComponent implements OnInit
{
  role:string="";
  lista: Requisito[] = []
  dataSource: MatTableDataSource<Requisito> = new MatTableDataSource();
  idMayor: number = 0
  displayedColumns: string[] = ['id', 'requisito', 'accion01','acciones2']
  @ViewChild(MatPaginator,{ static:true }) paginator!: MatPaginator;


  constructor(private rS: RequisitoService , private dialog: MatDialog, private ls:LoginService) {

  }
  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })

    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })

    this.rS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
    })
  }
  confirm(id: number) {
    this.idMayor = id;
    this.dialog.open(RequisitosDialogoComponent);
  }
  eliminar(id: number) {
    this.rS.delete(id).subscribe(() => {
      this.rS.list().subscribe(data => {
        this.rS.setList(data);
      })
    })
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
}


