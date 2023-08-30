import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calificacion_estudiante',
  templateUrl: './calificacion_estudiante.component.html',
  styleUrls: ['./calificacion_estudiante.component.css']
})
export class Calificacion_EstudianteComponent implements OnInit{

  constructor(public route:ActivatedRoute){}

  ngOnInit(): void {

  }

}
