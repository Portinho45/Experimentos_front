import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { reclutadorMatchDTO } from 'src/app/model/reclutadorMatchDTO';
import { ReclutadorService } from 'src/app/service/reclutador.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-reporte09',
  templateUrl: './reporte09.component.html',
  styleUrls: ['./reporte09.component.css']
})
export class Reporte09Component implements OnInit{
  role:string="";
  reclutadorCount: reclutadorMatchDTO[] = [];
  dataSource: MatTableDataSource<reclutadorMatchDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['countestudiantesmatch','reclutadorm']

  constructor(private eS: ReclutadorService, private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.eS.MatchReclutador().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  MatchReclutador(): void {
    this.eS.MatchReclutador()
      .subscribe((data: reclutadorMatchDTO[]) => {
        this.reclutadorCount = data;
      });
  }
}
