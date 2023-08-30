import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Repositorio } from 'src/app/model/repositorio';
import { RepositorioService } from 'src/app/service/repositorio.service';
import * as moment from 'moment'

@Component({
  selector: 'app-repositorio-creaedita',
  templateUrl: './repositorio-creaedita.component.html',
  styleUrls: ['./repositorio-creaedita.component.css']
})
export class RepositorioCreaeditaComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  repositorio : Repositorio = new Repositorio();
  mensaje: string = "";
  maxFecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;

  constructor(private repositorioService: RepositorioService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
   this.route.params.subscribe((data: Params) =>{
    this.id = data['id'];
    this.edicion = data['id']!=null;
    this.init();
   })
   this.form = new FormGroup({
    id: new FormControl(),
    nombreRepositorio: new FormControl(),
    descripcionRepositorio: new FormControl(),
    enlaceRepositorio: new FormControl(),
    fechaRepositorio: new FormControl(),
    estudiante: new FormControl()
  });
  }

  aceptar(): void {
    this.repositorio.id= this.form.value['id'];
    this.repositorio.nombreRepositorio= this.form.value['nombreRepositorio'];
    this.repositorio.descripcionRepositorio = this.form.value['descripcionRepositorio'];
    this.repositorio.enlaceRepositorio = this.form.value['enlaceRepositorio'];
    this.repositorio.fechaRepositorio = this.form.value['fechaRepositorio'];
    this.repositorio.estudiante.idEstudiante = this.form.value['estudiante'];
    if (this.form.value['nombreRepositorio'].length > 0 ){

      if (this.edicion) {
        //actualice
        this.repositorioService.Update(this.repositorio).subscribe(() => {
          this.repositorioService.List().subscribe(data => {
            this.repositorioService.SetList(data);
          })
        })

      } else {
        this.repositorioService.Insert(this.repositorio).subscribe(data => {
          this.repositorioService.List().subscribe(data => {
            this.repositorioService.SetList(data);
          })
        })
      }

      this.router.navigate(['/pages/Repositorio']);
    } else {
      this.mensaje = "Complete todos los campos!";
    }
  }

  init() {
    if (this.edicion) {
      this.repositorioService.ListId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombreRepositorio: new FormControl(data.nombreRepositorio),
          descripcionRepositorio: new FormControl(data.descripcionRepositorio),
          enlaceRepositorio: new FormControl(data.enlaceRepositorio),
          fechaRepositorio: new FormControl(data.fechaRepositorio),
          estudiante: new FormControl(data.estudiante.idEstudiante),
        })
      })
    }
  }

}

