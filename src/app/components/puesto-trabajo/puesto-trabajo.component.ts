import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-puesto-trabajo',
  templateUrl: './puesto-trabajo.component.html',
  styleUrls: ['./puesto-trabajo.component.css']
})
export class PuestoTrabajoComponent implements OnInit{

  constructor(public route:ActivatedRoute){}

  ngOnInit(): void {

  }

}
