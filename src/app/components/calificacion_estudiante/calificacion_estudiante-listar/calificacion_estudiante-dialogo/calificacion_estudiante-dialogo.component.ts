import { Component, OnInit } from '@angular/core';
import { Calificacion_EstudianteService } from 'src/app/service/calificacion_estudiante.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calificacion_estudiante-dialogo',
  templateUrl: './calificacion_estudiante-dialogo.component.html',
  styleUrls: ['./calificacion_estudiante-dialogo.component.css']
})
export class Calificacion_EstudianteDialogoComponent implements OnInit {

  constructor(private calificacion_estudianteService: Calificacion_EstudianteService,
    private dialogRef: MatDialogRef<Calificacion_EstudianteDialogoComponent>) { }
  ngOnInit(): void {}
    confirmar(estado: boolean){
      this.calificacion_estudianteService.SetConfirmDelete(estado);
      this.dialogRef.close();
    }

}
