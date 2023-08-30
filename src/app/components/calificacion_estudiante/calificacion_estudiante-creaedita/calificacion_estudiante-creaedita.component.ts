import { Component, OnInit } from '@angular/core';
import { Calificacion_EstudianteService } from 'src/app/service/calificacion_estudiante.service'

import { Calificacion_Estudiante } from 'src/app/model/calificacion_estudiante';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Estudiante } from 'src/app/model/estudiante';
import { Calificacion } from 'src/app/model/calificacion';
import { CalificacionService } from 'src/app/service/calificacion.service';
import { EstudianteService } from 'src/app/service/estudiante.service';

@Component({
  selector: 'app-calificacion_estudiante-creaedita',
  templateUrl: './calificacion_estudiante-creaedita.component.html',
  styleUrls: ['./calificacion_estudiante-creaedita.component.css']
})
export class Calificacion_EstudianteCreaeditaComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  calificacion_estudiante : Calificacion_Estudiante = new Calificacion_Estudiante();
  mensaje: string = "";
  id: number = 0;
  edicion: boolean = false;
  listae: Estudiante[] = [];
  idEstudianteSeleccionado: number = 0;
  listac: Calificacion[] = [];
  idCalificacionSeleccionado: number = 0;

  constructor(private calificacion_estudianteService: Calificacion_EstudianteService, private router: Router, private route: ActivatedRoute,
    private eS: EstudianteService, private cS: CalificacionService ) {

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
    Calificacion: new FormControl(''),
  });
  }

  aceptar(): void {
    this.calificacion_estudiante.id= this.form.value['id'];
    this.calificacion_estudiante.estudiante.usuario_Estudiante.nombre_Usuario= this.form.value['estudiante.usuario_Estudiante.nombre_Usuario'];
    this.calificacion_estudiante.calificacion.id = this.form.value['calificacion.id'];

    if (1>0){
      let e = new Estudiante();
      e.idEstudiante = this.idEstudianteSeleccionado;
      let c=new Calificacion();
      c.id=this.idCalificacionSeleccionado;
      this.calificacion_estudiante.estudiante=e;
      this.calificacion_estudiante.calificacion=c;

      if (this.edicion) {
        //actualice
        this.calificacion_estudianteService.Update(this.calificacion_estudiante).subscribe(() => {
          this.calificacion_estudianteService.List().subscribe(data => {
            this.calificacion_estudianteService.SetList(data);
          })
        })

      } else {
        this.calificacion_estudianteService.Insert(this.calificacion_estudiante).subscribe(data => {
          this.calificacion_estudianteService.List().subscribe(data => {
            this.calificacion_estudianteService.SetList(data);
          })
        })
      }

      this.router.navigate(['/pages/Calificacion_Estudiante']);
  }else {
      this.mensaje = "Complete todos los campos!";
    }
  }

  init() {
    if (this.edicion) {
      this.calificacion_estudianteService.ListId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          Estudiante: new FormControl(data.estudiante.usuario_Estudiante.nombre_Usuario),
          Calificacion: new FormControl(data.calificacion.id),
        })
      })
    }
  }

}
