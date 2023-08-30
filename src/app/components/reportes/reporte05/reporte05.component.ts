import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { estudiantePracticasDTO } from 'src/app/model/estudiantePracticasDTO';
import { EstudianteService } from 'src/app/service/estudiante.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-reporte05',
  templateUrl: './reporte05.component.html',
  styleUrls: ['./reporte05.component.css']
})
export class Reporte05Component {
  role:string="";
  estudiantePracticas: estudiantePracticasDTO[] = [];
  dataSource: MatTableDataSource<estudiantePracticasDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['practicas', 'nopracticas']

  constructor(private eS: EstudianteService, private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.eS.getEstudiantePracticas().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  getBookCountByAuthor(): void {
    this.eS.getEstudiantePracticas()
      .subscribe((data: estudiantePracticasDTO[]) => {
        this.estudiantePracticas = data;
      });
  }
}
