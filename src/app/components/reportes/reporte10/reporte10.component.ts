import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { institucionEstudianteDTO } from 'src/app/model/institucionEstudianteDTO';
import { EstudianteService } from 'src/app/service/estudiante.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-reporte10',
  templateUrl: './reporte10.component.html',
  styleUrls: ['./reporte10.component.css']
})
export class Reporte10Component {
  role:string="";
  institucionEstudiante: institucionEstudianteDTO[] = [];
  dataSource: MatTableDataSource<institucionEstudianteDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['institucion', 'count']

  constructor(private eS: EstudianteService, private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.eS.getInstitucionEstudiante().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  getBookCountByAuthor(): void {
    this.eS.getInstitucionEstudiante()
      .subscribe((data: institucionEstudianteDTO[]) => {
        this.institucionEstudiante = data;
      });
  }
}
