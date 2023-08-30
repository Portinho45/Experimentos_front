import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router} from '@angular/router'
import { Rol } from 'src/app/model/rol';
import { RolService } from 'src/app/service/rol.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent implements OnInit {
  r: Rol = new Rol();
  form: FormGroup = new FormGroup({});
  u: Usuario = new Usuario();
  mensaje: string = "";
  username:String="";
  rol:String="";
  id:number=0;
  cont:number=0;
  form2: FormGroup = new FormGroup({});

  constructor(
    private uS: UsuarioService,
    private rS: RolService,
    private fb: FormBuilder,
    private router: Router

  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      dni: new FormControl(),
      usuario: new FormControl(),
      nombre: new FormControl(),
      correo: new FormControl(),
      contraseña: new FormControl(),
      tipo: new FormControl(),
    });
    this.form2=new FormGroup({
      rol:new FormControl(),
      usuario_id:new FormControl(),
    })
  }

  registrar(): void {
    this.u.idUsuario= this.form.value['id'];
    this.u.dni_Usuario= this.form.value['dni'];
    this.u.username= this.form.value['usuario'];
    this.u.nombre_Usuario= this.form.value['nombre'];
    this.u.correo_Usuario= this.form.value['correo'];
    this.u.contrasena_Usuario= this.form.value['contraseña'];
    this.u.rol= this.form.value['tipo'];
    if (this.form.value['dni'] && this.form.value['dni'].length > 0 &&
    this.form.value['usuario'] && this.form.value['usuario'].length > 0 &&
    this.form.value['nombre'] && this.form.value['nombre'].length > 0 &&
    this.form.value['correo'] && this.form.value['correo'].length > 0 &&
    this.form.value['contraseña'] && this.form.value['contraseña'].length > 0 &&
    this.form.value['tipo'] && this.form.value['tipo'].length > 0 ) {
      this.registrarusuario();
      this.cont=1;
      } else {
         alert("Complete los campos requeridos ¬¬");
        }
  }
  registrarusuario():void{
    this.uS.insert(this.u).subscribe(data => {
      this.uS.list().subscribe(data => {
       this.uS.setList(data);
      });
    });
  }
  registrarrol():void{
    this.username=this.u.username;
    this.uS.listUsername(this.u.username).subscribe(data => {
      this.rol=data.rol;
      this.id=data.idUsuario;
      console.log(this.id);
      this.r.rol=this.rol;
      this.r.usuario.idUsuario=this.id;
      console.log(this.id);
      if(this.id>0){
        console.log(this.id);
        this.rS.Insert(this.r).subscribe(data=> {
        this.rS.List().subscribe(data=>{
        this.rS.SetList(data);
      })
    })
    console.log(this.rol)
    if(this.rol=="ADMIN"){
      this.router.navigate(['login']);
    }
    if(this.rol=="ESTUDIANTE"){
      this.router.navigate(['registrar-estudiante',this.u.username]);
    }
    if(this.rol=="RECLUTADOR"){
      this.router.navigate(['registrar-reclutador',this.u.username]);
    }
      }
    })
  }
}
