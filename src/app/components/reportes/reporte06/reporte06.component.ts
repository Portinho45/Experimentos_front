import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { estudianteSemestreDTO } from 'src/app/model/estudianteSemestreDTO';
import { EstudianteService } from 'src/app/service/estudiante.service';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-reporte06',
  templateUrl: './reporte06.component.html',
  styleUrls: ['./reporte06.component.css']
})
export class Reporte06Component {
  role:string="";
  estudianteSemestre: estudianteSemestreDTO[] = [];
  dataSource: MatTableDataSource<estudianteSemestreDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['semestre', 'count']

  constructor(private eS: EstudianteService, private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.eS.getEstudianteSemestre().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  getBookCountByAuthor(): void {
    this.eS.getEstudianteSemestre()
      .subscribe((data: estudianteSemestreDTO[]) => {
        this.estudianteSemestre = data;
      });
  }
}
