import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repositorio',
  templateUrl: './repositorio.component.html',
  styleUrls: ['./repositorio.component.css']
})
export class RepositorioComponent implements OnInit{

  constructor(public route:ActivatedRoute){}

  ngOnInit(): void {

  }
}
