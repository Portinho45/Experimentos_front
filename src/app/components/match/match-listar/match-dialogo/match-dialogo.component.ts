import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/service/match.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-match-dialogo',
  templateUrl: './match-dialogo.component.html',
  styleUrls: ['./match-dialogo.component.css']
})
export class MatchDialogoComponent implements OnInit{

  constructor(private matchService: MatchService,
    private dialogRef: MatDialogRef<MatchDialogoComponent>) { }
  ngOnInit(): void {}
    confirmar(estado: boolean){
      this.matchService.SetConfirmDelete(estado);
      this.dialogRef.close();
    }
}
