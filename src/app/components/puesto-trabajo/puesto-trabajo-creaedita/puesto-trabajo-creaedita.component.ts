import { Component, OnInit } from '@angular/core';
import { Puesto_trabajoService } from 'src/app/service/puesto-trabajo.service'

import { Puesto_trabajo } from 'src/app/model/puesto_trabajo';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-puesto-trabajo-creaedita',
  templateUrl: './puesto-trabajo-creaedita.component.html',
  styleUrls: ['./puesto-trabajo-creaedita.component.css']
})
export class PuestoTrabajoCreaeditaComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  puesto_trabajo : Puesto_trabajo = new Puesto_trabajo();
  mensaje: string = "";
  id: number = 0;
  edicion: boolean = false;

  constructor(private puesto_trabajoService: Puesto_trabajoService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
   this.route.params.subscribe((data: Params) =>{
    this.id = data['id'];
    this.edicion = data['id']!=null;
    this.init();
   })
   this.form = new FormGroup({
    id: new FormControl(),
    reclutadorId: new FormControl(),
    requisito: new FormControl(),
  });
  }

  aceptar(): void {
    this.puesto_trabajo.id= this.form.value['id'];
    this.puesto_trabajo.reclutador.id= this.form.value['reclutadorId'];
    this.puesto_trabajo.requisito = this.form.value['requisito'];
    if (1 > 0 ){

      if (this.edicion) {
        //actualice
        this.puesto_trabajoService.Update(this.puesto_trabajo).subscribe(() => {
          this.puesto_trabajoService.List().subscribe(data => {
            this.puesto_trabajoService.SetList(data);
          })
        })

      } else {
        this.puesto_trabajoService.Insert(this.puesto_trabajo).subscribe(data => {
          this.puesto_trabajoService.List().subscribe(data => {
            this.puesto_trabajoService.SetList(data);
          })
        })
      }

      this.router.navigate(['/pages/Puesto_trabajo']);
    } else {
      this.mensaje = "Complete todos los campos!";
    }
  }

  init() {
    if (this.edicion) {
      this.puesto_trabajoService.ListId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          reclutadorId: new FormControl(data.reclutador.id),
          requisito: new FormControl(data.requisito),
        })
      })
    }
  }

}
