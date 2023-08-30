import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { estudianteEdadPromedioDTO } from 'src/app/model/estudianteEdadPromedioDTO';
import { EstudianteService } from 'src/app/service/estudiante.service';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-reporte04',
  templateUrl: './reporte04.component.html',
  styleUrls: ['./reporte04.component.css']
})
export class Reporte04Component {
  role:string="";
  estudianteEdadPromedio: estudianteEdadPromedioDTO[] = [];
  dataSource: MatTableDataSource<estudianteEdadPromedioDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['promedio', 'count']

  constructor(private eS: EstudianteService, private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.eS.getEstudianteEdadPromedio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  getBookCountByAuthor(): void {
    this.eS.getEstudianteEdadPromedio()
      .subscribe((data: estudianteEdadPromedioDTO[]) => {
        this.estudianteEdadPromedio = data;
      });
  }
}