import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reclutador',
  templateUrl: './reclutador.component.html',
  styleUrls: ['./reclutador.component.css']
})
export class ReclutadorComponent implements OnInit{

  constructor(public route:ActivatedRoute){}

  ngOnInit(): void {

  }

}
