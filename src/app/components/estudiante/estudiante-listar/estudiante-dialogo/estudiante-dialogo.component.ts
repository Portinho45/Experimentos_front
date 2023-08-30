import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { EstudianteService } from 'src/app/service/estudiante.service';


@Component({
  selector: 'app-estudiante-dialogo',
  templateUrl: './estudiante-dialogo.component.html',
  styleUrls: ['./estudiante-dialogo.component.css']
})
export class EstudianteDialogoComponent implements OnInit {
  constructor(private estudianteService: EstudianteService,
    private dialogRef: MatDialogRef<EstudianteDialogoComponent>) { }
  ngOnInit(): void {}
    confirmar(estado: boolean){
      this.estudianteService.setConfirmDelete(estado);
      this.dialogRef.close();
    }

}

