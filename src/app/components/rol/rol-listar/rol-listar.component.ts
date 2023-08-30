import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/model/rol';
import { RolService } from 'src/app/service/rol.service'
import { RolDialogoComponent } from './rol-dialogo/rol-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-rol-listar',
  templateUrl: './rol-listar.component.html',
  styleUrls: ['./rol-listar.component.css']
})
export class RolListarComponent implements OnInit{
  role:string="";
  dataSourceRol: MatTableDataSource<Rol>=new MatTableDataSource();
  idMayor: number = 0
  displayedColumnsRol: string[] = ['id', 'rol', 'usuario', 'accion01']
  @ViewChild(MatPaginator,{ static:true }) paginator!: MatPaginator;

  constructor(private rolService: RolService, private dialog: MatDialog, private ls:LoginService) {}

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.rolService.List().subscribe(data=> {
      this.dataSourceRol = new MatTableDataSource(data);
      this.dataSourceRol.paginator = this.paginator;
    })
    this.rolService.GetList().subscribe(data=> {
      this.dataSourceRol = new MatTableDataSource(data)
      this.dataSourceRol.paginator = this.paginator;
    })

  }

  filtrar(e:any){
    this.dataSourceRol.filter = e.target.value.trim();
  }



}
