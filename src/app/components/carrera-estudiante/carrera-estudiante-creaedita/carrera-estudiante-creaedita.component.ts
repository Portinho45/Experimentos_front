import { Component, OnInit } from '@angular/core';
import { Carreras_EstudianteService } from 'src/app/service/carrera_estudiante.service'

import { Carreras_Estudiante } from 'src/app/model/carrera_estudiante';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Estudiante } from 'src/app/model/estudiante';
import { Carrera } from 'src/app/model/carrera';
import { CarreraService } from 'src/app/service/carrera.service';
import { EstudianteService } from 'src/app/service/estudiante.service';

@Component({
  selector: 'app-carrera-estudiante-creaedita',
  templateUrl: './carrera-estudiante-creaedita.component.html',
  styleUrls: ['./carrera-estudiante-creaedita.component.css']
})
export class CarreraEstudianteCreaeditaComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  carrera_estudiante : Carreras_Estudiante = new Carreras_Estudiante();
  mensaje: string = "";
  id: number = 0;
  edicion: boolean = false;
  listae: Estudiante[] = [];
  idEstudianteSeleccionado: number = 0;
  listac: Carrera[] = [];
  idCarreraSeleccionado: number = 0;

  constructor(private carerras_estudianteService: Carreras_EstudianteService, private router: Router, private route: ActivatedRoute,
    private eS: EstudianteService, private cS: CarreraService ) {

  }
  ngOnInit(): void {
   this.route.params.subscribe((data: Params) =>{
    this.id = data['id'];
    this.edicion = data['id']!=null;
    this.init();
   })

   this.eS.list().subscribe(data => { this.listae = data });
   this.cS.list().subscribe(data => { this.listac = data });

   this.form = new FormGroup({
    id: new FormControl(),
    Estudiante: new FormControl(''),
    Carrera: new FormControl(''),
  });

  }

  aceptar(): void {
    this.carrera_estudiante.id= this.form.value['id'];
    this.carrera_estudiante.estudiante.usuario_Estudiante.nombre_Usuario= this.form.value['estudiante.usuario_Estudiante.nombre_Usuario'];
    this.carrera_estudiante.carrera.id = this.form.value['carrera.id'];

    if (1>0){
      let e = new Estudiante();
      e.idEstudiante = this.idEstudianteSeleccionado;
      let c=new Carrera();
      c.id=this.idCarreraSeleccionado;
      this.carrera_estudiante.estudiante=e;
      this.carrera_estudiante.carrera=c;

      if (this.edicion) {
        //actualice
        this.carerras_estudianteService.Update(this.carrera_estudiante).subscribe(() => {
          this.carerras_estudianteService.List().subscribe(data => {
            this.carerras_estudianteService.SetList(data);
          })
        })

      } else {
        this.carerras_estudianteService.Insert(this.carrera_estudiante).subscribe(data => {
          this.carerras_estudianteService.List().subscribe(data => {
            this.carerras_estudianteService.SetList(data);
          })
        })
      }

      this.router.navigate(['/pages/carrera_estudiante']);
  }else {
      this.mensaje = "Complete todos los campos!";
    }
    this.init(); // Llama a la función init() después de enviar el formulario

  }

  init() {
    if (this.edicion) {
      this.carerras_estudianteService.ListId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          Estudiante: new FormControl(data.estudiante.usuario_Estudiante.nombre_Usuario),
          Carrera: new FormControl(data.carrera.id),
        })
      })
    }
  }

}

