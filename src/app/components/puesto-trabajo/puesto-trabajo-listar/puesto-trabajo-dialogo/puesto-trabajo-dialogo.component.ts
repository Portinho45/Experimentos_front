import { Component, OnInit } from '@angular/core';
import { Puesto_trabajoService } from 'src/app/service/puesto-trabajo.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-puesto-trabajo-dialogo',
  templateUrl: './puesto-trabajo-dialogo.component.html',
  styleUrls: ['./puesto-trabajo-dialogo.component.css']
})
export class PuestoTrabajoDialogoComponent implements OnInit {

  constructor(private puesto_tranbajoService: Puesto_trabajoService,
    private dialogRef: MatDialogRef<PuestoTrabajoDialogoComponent>) { }
  ngOnInit(): void {}
    confirmar(estado: boolean){
      this.puesto_tranbajoService.SetConfirmDelete(estado);
      this.dialogRef.close();
    }

}
