import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { usuarioRolDTO } from 'src/app/model/usuarioRolDTO';
import { UsuarioService } from 'src/app/service/usuario.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-reporte07',
  templateUrl: './reporte07.component.html',
  styleUrls: ['./reporte07.component.css']
})
export class Reporte07Component implements OnInit{
  role:string="";
  contusuario: usuarioRolDTO[] = [];
  dataSource: MatTableDataSource<usuarioRolDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['contusuario','rol']

  constructor(private eS: UsuarioService, private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.eS.usuariosporrol().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  usuariosporrol(): void {
    this.eS.usuariosporrol()
      .subscribe((data: usuarioRolDTO[]) => {
        this.contusuario = data;
      });
  }
}

