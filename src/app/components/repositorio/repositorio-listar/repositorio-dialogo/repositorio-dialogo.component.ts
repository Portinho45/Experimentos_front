import { Component, OnInit } from '@angular/core';
import { RepositorioService } from 'src/app/service/repositorio.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-repositorio-dialogo',
  templateUrl: './repositorio-dialogo.component.html',
  styleUrls: ['./repositorio-dialogo.component.css']
})
export class RepositorioDialogoComponent implements OnInit {
  constructor(private repositorioService: RepositorioService,
    private dialogRef: MatDialogRef<RepositorioDialogoComponent>) { }
  ngOnInit(): void {}
    confirmar(estado: boolean){
      this.repositorioService.SetConfirmDelete(estado);
      this.dialogRef.close();
    }

}
