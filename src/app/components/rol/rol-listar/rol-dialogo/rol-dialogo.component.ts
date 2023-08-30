import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/service/rol.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rol-dialogo',
  templateUrl: './rol-dialogo.component.html',
  styleUrls: ['./rol-dialogo.component.css']
})
export class RolDialogoComponent implements OnInit {

  constructor(private rolService: RolService,
    private dialogRef: MatDialogRef<RolDialogoComponent>) { }
  ngOnInit(): void {}

}
