import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  height: any = 300;
  width: any = 385;
  constructor() { }
  
 videoId=[
  {id:"8U1hOMrxhr4"},
  {id:"CG8eFZWE4Xo"},
  {id:'H_Cer1OKvgw'}
 ]
  ngOnInit(): void {
    if (window.innerWidth < 600) {
      this.width = window.innerWidth - 70;
      this.height = window.innerHeight - 430;
    }
    else {
      this.width = window.innerWidth - 1150;
      this.height = window.innerHeight - 450;
    }
  }

}
