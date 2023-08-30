import { Component, OnInit } from '@angular/core';
import { ReclutadorService } from 'src/app/service/reclutador.service';

import { Reclutador } from 'src/app/model/reclutador';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Empresa } from 'src/app/model/empresa';
import { EmpresaService } from 'src/app/service/empresa.service';

@Component({
  selector: 'app-reclutador-creaedita',
  templateUrl: './reclutador-creaedita.component.html',
  styleUrls: ['./reclutador-creaedita.component.css']
})
export class ReclutadorCreaeditaComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  reclutador : Reclutador = new Reclutador();
  mensaje: string = "";
  id: number = 0;
  edicion: boolean = false;
  username: string="";
  listae: Empresa[] = [];
  idEmpresaSeleccionado: number = 0;

  constructor(private reclutadorService: ReclutadorService,private uS: UsuarioService,private es: EmpresaService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
   this.route.params.subscribe((data: Params) =>{
    this.id = data['id'];
    this.edicion = data['id']!=null;
    this.username= data['username'];
    this.init();
   })
   this.es.List().subscribe(data => { this.listae = data });
   this.form = new FormGroup({
    id: new FormControl(),
    descripcion_Reclutador: new FormControl(),
    empresaId: new FormControl(),
    usuarioId: new FormControl(this.username)
  });
  console.log(this.username)
  }

  aceptar(): void {
    this.reclutador.id = this.form.value['id'];
    this.reclutador.descripcion_Reclutador = this.form.value['descripcion_Reclutador'];
    this.reclutador.empresa = this.form.value['empresaId'];
    if (1 > 0 ){
      let e=new Empresa();
      let u =new Usuario();
      this.es.ListId(this.idEmpresaSeleccionado).subscribe(data=>{
        this.reclutador.empresa=data
      });
      if (this.edicion) {
        //actualice
        this.reclutadorService.Update(this.reclutador).subscribe(() => {
          this.reclutadorService.List().subscribe(data => {
            this.reclutadorService.SetList(data);
          })
        })

      } else {
        this.uS.listUsername(this.username).subscribe(data=>{
          u=data;
          this.reclutador.usuario=u;
          console.log(this.reclutador.usuario);
          this.reclutadorService.Insert(this.reclutador).subscribe(data => {
            this.reclutadorService.List().subscribe(data => {
              this.reclutadorService.SetList(data);
              console.log(this.reclutador.usuario);
            })
          })
        })
      }

      this.router.navigate(['login']);
    } else {
      this.mensaje = "Complete todos los campos!";
    }
  }

  init() {
    if (this.edicion) {
      this.reclutadorService.ListId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          descripcion_Reclutador: new FormControl(data.descripcion_Reclutador),
          empresaId: new FormControl(data.empresa.id),
          usuarioId: new FormControl(data.usuario.username),
        })
      })
    }
  }

}

