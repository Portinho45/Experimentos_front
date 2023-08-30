import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from 'src/app/model/empresa';
import { EmpresaService } from 'src/app/service/empresa.service'
import { EmpresaDialogoComponent } from './empresa-dialogo/empresa-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-empresa-listar',
  templateUrl: './empresa-listar.component.html',
  styleUrls: ['./empresa-listar.component.css']
})
export class EmpresaListarComponent implements OnInit{
  role:string="";
  dataSourceEmpresa: MatTableDataSource<Empresa>=new MatTableDataSource();
  idMayor: number = 0
  displayedColumnsEmpresa: string[] = ['id', 'nombre', 'descripcion', 'correo', 'accion01', 'accion02']
  @ViewChild(MatPaginator,{ static:true }) paginator!: MatPaginator;

  constructor(private empresaService: EmpresaService, private dialog: MatDialog, private ls:LoginService) {}

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.empresaService.List().subscribe(data=> {
      this.dataSourceEmpresa = new MatTableDataSource(data);
      this.dataSourceEmpresa.paginator = this.paginator;
    })
    this.empresaService.GetList().subscribe(data=> {
      this.dataSourceEmpresa = new MatTableDataSource(data)
      this.dataSourceEmpresa.paginator = this.paginator;
    })
    this.empresaService.GetConfirmDelete().subscribe(data=>{
      data== true? this.eliminar(this.idMayor) : false;
    })
  }

  filtrar(e:any){
    this.dataSourceEmpresa.filter = e.target.value.trim();
  }

  confirm(id: number) {
    this.idMayor = id;
    this.dialog.open(EmpresaDialogoComponent);
  }
  eliminar(id: number) {
    this.empresaService.Delete(id).subscribe(() => {
      this.empresaService.List().subscribe(data => {
        this.empresaService.SetList(data);
      })
    })
  }
}
