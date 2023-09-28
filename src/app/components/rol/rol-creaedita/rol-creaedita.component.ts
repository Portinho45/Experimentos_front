import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/service/rol.service'
import { Rol } from 'src/app/model/rol';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-rol-creaedita',
  templateUrl: './rol-creaedita.component.html',
  styleUrls: ['./rol-creaedita.component.css']
})
export class RolCreaeditaComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  rol : Rol = new Rol();
  mensaje: string = "";
  id: number = 0;
  edicion: boolean = false;
  listau: Usuario[] = [];
  idUsuarioSeleccionado: number = 0;

  constructor(private rolService: RolService, private router: Router, private route: ActivatedRoute, private uS: UsuarioService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;

      // Inicializa el formulario
      this.form = new FormGroup({
        id: new FormControl(),
        rol: new FormControl(),
        usuarioId: new FormControl()
      });

      // Llama a init() en modo de edición
      if (this.edicion) {
        this.init();
      }
    });

    this.uS.list().subscribe(data => { this.listau = data });
  }


  aceptar(): void {
    this.rol.id= this.form.value['id'];
    this.rol.rol= this.form.value['rol'];
    this.rol.usuario.username = this.form.value['usuarioId.username'];
    if (this.form.value['rol'].length > 0 ){

      let u = new Usuario();
      u.idUsuario=this.idUsuarioSeleccionado;
      this.rol.usuario=u;

      if (this.edicion) {
        //actualice
        this.rolService.Update(this.rol).subscribe(() => {
          this.rolService.List().subscribe(data => {
            this.rolService.SetList(data);
          })
        })

      } else {
        this.rolService.Insert(this.rol).subscribe(data => {
          this.rolService.List().subscribe(data => {
            this.rolService.SetList(data);
          })
        })
      }

      this.router.navigate(['/pages/Rol']);
    } else {
      this.mensaje = "Complete todos los campos!";
    }
  }

  init() {
    if (this.edicion) {
      this.rolService.ListId(this.id).subscribe(data => {
        this.form.setValue({
          id: data.id,
          rol: data.rol,
          usuarioId: data.usuario.idUsuario // Asegúrate de que esto sea el valor correcto
        });

        this.idUsuarioSeleccionado = data.usuario.idUsuario; // Configura idUsuarioSeleccionado
      });
    }
  }


}
