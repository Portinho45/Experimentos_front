import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit{

  constructor(public route:ActivatedRoute){}

  ngOnInit(): void {

  }

}
