import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Estudiante } from 'src/app/model/estudiante';
import { Institucion_Educativa } from 'src/app/model/institucion';
import { Carrera } from 'src/app/model/carrera';
import { Usuario } from 'src/app/model/usuario';
import { EstudianteService } from 'src/app/service/estudiante.service';
import { InstitucionService } from 'src/app/service/institucion.service';
import { CarreraService } from 'src/app/service/carrera.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-registrar-estudiante',
  templateUrl: './registrar-estudiante.component.html',
  styleUrls: ['./registrar-estudiante.component.css']
})
export class RegistrarEstudianteComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  estudiante : Estudiante = new Estudiante();
  mensaje: string = "";
  id: number = 0;
  username: string="";
  edicion: boolean = false;
  listau: Usuario[] = [];
  idUsuarioSeleccionado: number = 0;
  listai: Institucion_Educativa[] = [];
  idInstitucionSeleccionado: number = 0;
  listac: Carrera[] = [];
  idCarreraSeleccionado: number = 0;
  role:string="";

  constructor(private estudianteService: EstudianteService, private router: Router, private route: ActivatedRoute,
    private uS: UsuarioService, private iS: InstitucionService, private loginService: LoginService, private cS: CarreraService) {

  }
  ngOnInit(): void {

    this.route.params.subscribe((data: Params) =>{
    this.id = data['id'];
    this.edicion = data['id']!=null;
    this.username= data['username'];
    this.init();
    console.log(this.username)
    })

    this.uS.list().subscribe(data => { this.listau = data });
    this.iS.List().subscribe(data => { this.listai = data });
    this.cS.list().subscribe(data => { this.listac = data });

    this.form = new FormGroup({
    idEstudiante: new FormControl(),
    Semestre_Estudiante: new FormControl(),
    Edad_Estudiante: new FormControl(),
    Genero_Estudiante: new FormControl(''),
    Practicante_Estudiante: new FormControl(),
    Descripcion_Estudiante: new FormControl(),
    Institucion_Estudiante: new FormControl(''),
    carrera_Estudiante: new FormControl(''),
    Usuario_Estudiante: new FormControl(this.username),
    Usuario: new FormControl('')
    });
    console.log(this.username)
  }

  aceptar(): void {
    this.estudiante.idEstudiante= this.form.value['idEstudiante'];
    this.estudiante.semestre_Estudiante= this.form.value['Semestre_Estudiante'];
    this.estudiante.edad_Estudiante= this.form.value['Edad_Estudiante'];
    this.estudiante.genero_Estudiante= this.form.value['Genero_Estudiante'];
    this.estudiante.practicante_Estudiante= this.form.value['Practicante_Estudiante'];
    this.estudiante.descripcion_Estudiante= this.form.value['Descripcion_Estudiante'];
    this.estudiante.institucion_Estudiante.nombre_Institucion= this.form.value['Institucion_Estudiante.nombre_Institucion'];
    this.estudiante.carrera_Estudiante= this.form.value['carrera_Estudiante.nombre_Carrera'];
    if (1>0){
      let u = new Usuario();
      let i=new Institucion_Educativa();
      let c=new Carrera();
      i.id=this.idInstitucionSeleccionado;
      c.id=this.idCarreraSeleccionado;

      console.log(this.estudiante.usuario_Estudiante.username)
      this.estudiante.institucion_Estudiante=i;
      this.estudiante.carrera_Estudiante=c;

      if (this.edicion) {
        //actualice
        this.estudianteService.update(this.estudiante).subscribe((data) => {
          this.estudianteService.list().subscribe(data => {
            this.estudianteService.setList(data);
          })
        })

      } else {
        this.uS.listUsername(this.username).subscribe(data=>{
          u=data;
          this.estudiante.usuario_Estudiante=u;
          this.estudianteService.insert(this.estudiante).subscribe((data) => {
            this.estudianteService.list().subscribe(data => {
              this.estudianteService.setList(data);
            })
          })
        })
        console.log(this.estudiante.usuario_Estudiante.username)
      }

      this.router.navigate(['login']);
    } else {
      this.mensaje = "Complete todos los campos ¬¬";
    }
  }

  init() {
    if (this.edicion) {
      this.estudianteService.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          idEstudiante: new FormControl(data.idEstudiante),
          Semestre_Estudiante: new FormControl(data.semestre_Estudiante),
          Edad_Estudiante: new FormControl(data.edad_Estudiante),
          Genero_Estudiante: new FormControl(data.genero_Estudiante),
          Practicante_Estudiante: new FormControl(data.practicante_Estudiante),
          Descripcion_Estudiante: new FormControl(data.descripcion_Estudiante),
          Institucion_Estudiante: new FormControl(data.institucion_Estudiante.nombre_Institucion),
          carrera_Estudiante: new FormControl(data.carrera_Estudiante.nombre_Carrera),
          Usuario_Estudiante: new FormControl(data.usuario_Estudiante.username),
          Usuario: new FormControl(data.usuario_Estudiante)
          })
      })
    }
  }

  verificar() {
    this.role=this.loginService.showRole();
    return this.loginService.verificar();
  }
}
