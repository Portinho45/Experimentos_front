import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Requisito } from 'src/app/model/requisito';
import { RequisitoService } from 'src/app/service/requisito.service';
import { Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-requisitos-creaedita',
  templateUrl: './requisitos-creaedita.component.html',
  styleUrls: ['./requisitos-creaedita.component.css']
})
export class RequisitosCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  R: Requisito = new Requisito();
  mensaje: string = "";
  id: number = 0;
  edicion: boolean = false;

  constructor(private rS: RequisitoService, private router: Router,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    })
    this.form = new FormGroup({
      id: new FormControl(),
      descripcion_Requisito: new FormControl(),

    });
  }
  aceptar(): void {
    this.R.id = this.form.value['id'];
    this.R.descripcion_Requisito = this.form.value['descripcion_Requisito'];
    if (1 > 0 ) {

      if (this.edicion) {
        //actualice
        this.rS.update(this.R).subscribe(() => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data);
          })
        })

      } else {
        this.rS.insert(this.R).subscribe(data => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data);
          })
        })
      }

      this.router.navigate(['/pages/requisitos']);
    } else {
      this.mensaje = "Complete los campos requeridos!!!";
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          descripcion_Requisito: new FormControl(data.descripcion_Requisito),

        })
      })
    }
  }

}
