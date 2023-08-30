import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { estudianteEdadDTO } from 'src/app/model/estudianteEdadDTO';
import { EstudianteService } from 'src/app/service/estudiante.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-reporte03',
  templateUrl: './reporte03.component.html',
  styleUrls: ['./reporte03.component.css']
})
export class Reporte03Component {
  role:string="";
  estudianteEdad: estudianteEdadDTO[] = [];
  dataSource: MatTableDataSource<estudianteEdadDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['mayor', 'menor']

  constructor(private eS: EstudianteService, private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.eS.getEstudianteEdad().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  getBookCountByAuthor(): void {
    this.eS.getEstudianteEdad()
      .subscribe((data: estudianteEdadDTO[]) => {
        this.estudianteEdad = data;
      });
  }
}

