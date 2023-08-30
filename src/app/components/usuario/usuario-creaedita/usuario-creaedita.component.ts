import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Rol } from 'src/app/model/rol';
import { RolService } from 'src/app/service/rol.service';

@Component({
  selector: 'app-usuario-creaedita',
  templateUrl: './usuario-creaedita.component.html',
  styleUrls: ['./usuario-creaedita.component.css']
})
export class UsuarioCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  u: Usuario = new Usuario();
  r: Rol = new Rol();
  mensaje: string = "";
  id: number = 0;
  edicion: boolean = false;


  constructor(
    private uS: UsuarioService,
    private rS: RolService,
    private route: ActivatedRoute,
    private router: Router

  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    })
    this.form = new FormGroup({
      id: new FormControl(),
      dni: new FormControl(),
      usuario: new FormControl(),
      nombre: new FormControl(),
      correo: new FormControl(),
      contraseña: new FormControl(),
      rol: new FormControl(),
    });
  }

  aceptar(): void {
    this.u.idUsuario= this.form.value['id'];
    this.u.dni_Usuario= this.form.value['dni'];
    this.u.username= this.form.value['usuario'];
    this.u.nombre_Usuario= this.form.value['nombre'];
    this.u.correo_Usuario= this.form.value['correo'];
    this.u.contrasena_Usuario= this.form.value['contraseña'];
    this.u.rol= this.form.value['rol'];
    if (1>0) {

      if (this.edicion) {
        console.log(this.u)
        //actualice
        this.uS.update(this.u).subscribe(() => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data);
          })
        })

      } else {
        this.uS.insert(this.u).subscribe(data => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data);
          })
        })
        this.registrarrol()
      }
      this.router.navigate(['/pages/usuarios']);
    }
      else {
        this.mensaje = "Complete los campos requeridos ¬¬";
      }
  }

  registrarrol(){
    this.r.id=this.u.idUsuario
    this.r.rol= this.u.rol
    this.r.usuario.idUsuario=this.u.idUsuario
    this.rS.Insert(this.r).subscribe(data=> {
      this.rS.List().subscribe(data=>{
        this.rS.SetList(data);
      })
    })
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.idUsuario),
          dni: new FormControl(data.dni_Usuario),
          usuario: new FormControl(data.username),
          nombre: new FormControl(data.nombre_Usuario),
          correo: new FormControl(data.correo_Usuario),
          contraseña: new FormControl(data.contrasena_Usuario),
          rol: new FormControl(data.rol)
        })
      })
    }
  }
}
