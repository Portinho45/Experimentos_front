import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { repositorioEstudianteDTO } from 'src/app/model/repositorioEstudianteDTO';
import { RepositorioService } from 'src/app/service/repositorio.service';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-reporte02',
  templateUrl: './reporte02.component.html',
  styleUrls: ['./reporte02.component.css']
})
export class Reporte02Component implements OnInit{
  role:string="";
  reclutadorCount: repositorioEstudianteDTO[] = [];
  dataSource: MatTableDataSource<repositorioEstudianteDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['nombre', 'correo', 'edad', 'practicante', 'repositorioCount']

  constructor(private rS: RepositorioService, private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.rS.getRepositoriobyEstudiante().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  getBookCountByAuthor(): void {
    this.rS.getRepositoriobyEstudiante()
      .subscribe((data: repositorioEstudianteDTO[]) => {
        this.reclutadorCount = data;
      });
  }
}
