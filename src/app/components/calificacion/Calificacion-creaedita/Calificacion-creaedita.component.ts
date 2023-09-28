import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Calificacion } from 'src/app/model/calificacion';

import { CalificacionService } from 'src/app/service/calificacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router'
@Component({
  selector: 'app-Calificacion-creaedita',
  templateUrl: './Calificacion-creaedita.component.html',
  styleUrls: ['./Calificacion-creaedita.component.css']
})
export class CalificacionCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  Calificacion: Calificacion = new Calificacion();
  mensaje: string = "";
  id: number = 0;
  edicion: boolean = false;

  constructor(private aS: CalificacionService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    })
    this.form = new FormGroup({
      id: new FormControl(),
      id_estudiante: new FormControl(),
      estudiante_ponecalificacion: new FormControl(),
      calificacion: new FormControl(),
    });
  }
  aceptar(): void {
    this.Calificacion.id = this.form.value['id'];
    this.Calificacion.id_estudiante = this.form.value['id_estudiante'];
    this.Calificacion.estudiante_ponecalificacion = this.form.value['estudiante_ponecalificacion'];
    this.Calificacion.calificacion = this.form.value['calificacion'];
    if (this.form.value['id_estudiante'].length > 0 ||
      this.form.value['calificacion'].length > 0 &&
      this.form.value['calificacion'] >= 0 &&
      this.form.value['calificacion'] <= 5) {

      if (this.edicion) {
        this.aS.update(this.Calificacion).subscribe((data) => {
          this.aS.list().subscribe(data => {
            this.aS.setList(data);
          })
        })
      } else {
        this.aS.insert(this.Calificacion).subscribe((data)=> {
          this.aS.list().subscribe(data => {
            this.aS.setList(data);
          })
        })
      }
      this.router.navigate(['/pages/Calificacion']);
    } else {
      this.mensaje = "Ocurrio un problema en el registro, revisa lo que ingresaste";
    }
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          id_estudiante: new FormControl(data.id_estudiante),
          estudiante_ponecalificacion: new FormControl(data.estudiante_ponecalificacion),
          calificacion: new FormControl(data.calificacion),
        })
      })
    }
  }
}
