import { Component, OnInit } from '@angular/core';
import { Carreras_EstudianteService } from 'src/app/service/carrera_estudiante.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-carrera-estudiante-dialogo',
  templateUrl: './carrera-estudiante-dialogo.component.html',
  styleUrls: ['./carrera-estudiante-dialogo.component.css']
})
export class CarreraEstudianteDialogoComponent implements OnInit {

  constructor(private Carreras_EstudianteService: Carreras_EstudianteService,
    private dialogRef: MatDialogRef<CarreraEstudianteDialogoComponent>) { }
  ngOnInit(): void {}
    confirmar(estado: boolean){
      this.Carreras_EstudianteService.SetConfirmDelete(estado);
      this.dialogRef.close();
    }

}
