import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/service/rol.service'

import { Rol } from 'src/app/model/rol';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor(private rolService: RolService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
   this.route.params.subscribe((data: Params) =>{
    this.id = data['id'];
    this.edicion = data['id']!=null;
    this.init();
   })
   this.form = new FormGroup({
    id: new FormControl(),
    rol: new FormControl(),
    usuarioId: new FormControl()
  });
  }

  aceptar(): void {
    this.rol.id= this.form.value['id'];
    this.rol.rol= this.form.value['rol'];
    this.rol.usuario.idUsuario = this.form.value['usuarioId'];
    if (this.form.value['rol'].length > 0 ){

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
        this.form = new FormGroup({
          id: new FormControl(data.id),
          rol: new FormControl(data.rol),
          usuarioId: new FormControl(data.usuario.idUsuario),
        })
      })
    }
  }

}
