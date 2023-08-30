import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialogoComponent } from './usuario-dialogo/usuario-dialogo.component';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css']
})
export class UsuarioListarComponent implements OnInit {

  role:string=""
  lista:Usuario[]=[]
  dataSource: MatTableDataSource<Usuario> =new MatTableDataSource();
  idMayor: number = 0;
  displayedColumns: string[]=['id','dni','usuario','nombre','email','rol','enabled','accion01','accion02']
  @ViewChild(MatPaginator,{ static:true }) paginator!: MatPaginator;
  constructor(private uS: UsuarioService, private dialog: MatDialog,private ls:LoginService){

  }
  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.uS.list().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.uS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.uS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
    })
  }
  filtrar(e:any){
    this.dataSource.filter= e.target.value.trim();
  }
  confirm(id: number) {
    this.idMayor = id;
    this.dialog.open(UsuarioDialogoComponent);
  }
  eliminar(id: number) {
    this.uS.delete(id).subscribe(() => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data);
      })
    })
  }
}
