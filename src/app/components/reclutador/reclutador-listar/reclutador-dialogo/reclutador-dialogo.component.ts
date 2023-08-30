import { Component, OnInit } from '@angular/core';
import { ReclutadorService } from 'src/app/service/reclutador.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reclutador-dialogo',
  templateUrl: './reclutador-dialogo.component.html',
  styleUrls: ['./reclutador-dialogo.component.css']
})
export class ReclutadorDialogoComponent implements OnInit {

  constructor(private reclutadorService: ReclutadorService,
    private dialogRef: MatDialogRef<ReclutadorDialogoComponent>) { }
  ngOnInit(): void {}
    confirmar(estado: boolean){
      this.reclutadorService.SetConfirmDelete(estado);
      this.dialogRef.close();
    }

}
