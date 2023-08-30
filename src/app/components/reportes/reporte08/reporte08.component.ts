import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { empresaMatchDTO } from 'src/app/model/empresaMatchDTO';
import { EmpresaService } from 'src/app/service/empresa.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-reporte08',
  templateUrl: './reporte08.component.html',
  styleUrls: ['./reporte08.component.css']
})
export class Reporte08Component implements OnInit{
  role:string="";
  reclutadorCount: empresaMatchDTO[] = [];
  dataSource: MatTableDataSource<empresaMatchDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['countestudiantesmatch','empresam']

  constructor(private eS: EmpresaService, private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.eS.MatchEmpresa().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  MatchEmpresa(): void {
    this.eS.MatchEmpresa()
      .subscribe((data: empresaMatchDTO[]) => {
        this.reclutadorCount = data;
      });
  }
}
