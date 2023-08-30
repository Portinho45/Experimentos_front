import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { empresaReclutadorDTO } from 'src/app/model/empresaReclutadorDTO';
import { EmpresaService } from 'src/app/service/empresa.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-reporte01',
  templateUrl: './reporte01.component.html',
  styleUrls: ['./reporte01.component.css']
})
export class Reporte01Component implements OnInit{
  role:string="";
  reclutadorCount: empresaReclutadorDTO[] = [];
  dataSource: MatTableDataSource<empresaReclutadorDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['empresa','cantidad']

  constructor(private eS: EmpresaService, private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.eS.getEmpresabyReclutador().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  getBookCountByAuthor(): void {
    this.eS.getEmpresabyReclutador()
      .subscribe((data: empresaReclutadorDTO[]) => {
        this.reclutadorCount = data;
      });
  }
}
