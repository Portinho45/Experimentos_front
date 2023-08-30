import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrera-estudiante',
  templateUrl: './carrera-estudiante.component.html',
  styleUrls: ['./carrera-estudiante.component.css']
})
export class CarreraEstudianteComponent implements OnInit {

  constructor(public route:ActivatedRoute) {

  }
  ngOnInit(): void {

  }

}
