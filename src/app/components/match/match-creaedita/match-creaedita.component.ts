import { Component, OnInit } from '@angular/core';
import { Matchs } from 'src/app/model/matchs';
import { MatchService } from 'src/app/service/match.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ReclutadorService } from 'src/app/service/reclutador.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Reclutador } from 'src/app/model/reclutador';
import { Estudiante } from 'src/app/model/estudiante';
import { EstudianteService } from 'src/app/service/estudiante.service';

@Component({
  selector: 'app-match-creaedita',
  templateUrl: './match-creaedita.component.html',
  styleUrls: ['./match-creaedita.component.css'],
})
export class MatchCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  match: Matchs = new Matchs();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  idEstudiante: number = 0;
  idReclutador: number = 0;
  reclutadores: Reclutador[] = [];
  estudiantes: Estudiante[] = [];

  constructor(
    private matchService: MatchService,
    private rS: ReclutadorService,
    private eS: EstudianteService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;

      // Inicializar el formulario
      this.form = new FormGroup({
        id: new FormControl(),
        reclutador: new FormControl(),
        estudiante: new FormControl(),
        confirmacion_match: new FormControl(),
      });

      // Llamar a init() en modo de edición
      if (this.edicion) {
        this.init();
      }
    });

    this.rS.List().subscribe((data) => {
      this.reclutadores = data;
    });
    this.eS.list().subscribe((data) => {
      this.estudiantes = data;
    });
  }

  aceptar(): void {
    this.match.id = this.form.value['id'];
    this.match.confirmacion_match = this.form.value['confirmacion_match'];
    let r = new Reclutador();
    let e = new Estudiante();
    console.log(this.idEstudiante);
    console.log(this.idReclutador);
    this.rS.ListId(this.idReclutador).subscribe((data) => {
      r = data;
      this.match.reclutador = r;
      this.eS.listId(this.idEstudiante).subscribe((data) => {
        e = data;
        this.match.estudiante = e;
        if (1 > 0) {
          if (this.edicion) {
            //actualice
            this.matchService.Update(this.match).subscribe(() => {
              this.matchService.List().subscribe((data) => {
                this.matchService.SetList(data);
              });
            });
          } else {
            this.matchService.Insert(this.match).subscribe((data) => {
              this.matchService.List().subscribe((data) => {
                this.matchService.SetList(data);
                console.log(this.match);
              });
            });
            console.log(this.match.reclutador);
          }

          this.router.navigate(['/pages/Match']);
          console.log(this.match.reclutador);
        } else {
          this.mensaje = 'Complete todos los campos!';
        }
      });
    });
  }

  init() {
    if (this.edicion) {
      this.matchService.ListId(this.id).subscribe((data) => {
        this.form.setValue({
          id: data.id,
          reclutador: data.reclutador.id, // Asegúrate de que esto sea el valor correcto
          estudiante: data.estudiante.idEstudiante, // Asegúrate de que esto sea el valor correcto
          confirmacion_match: data.confirmacion_match ? true : false,
        });
      });
    }
  }
}
