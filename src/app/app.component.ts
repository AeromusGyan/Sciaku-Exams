import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Sciaku ia a Learning platform for Engineering Students - Sciaku.com';
  constructor(private _meta:Meta, private _title:Title){ }


  ngOnInit(): void {
    // this._title.setTitle(this.title);
    // this._meta.updateTag({name:'keywords',content:'Angular Blog,Blogger'});
    // this._meta.updateTag({name:'description',content:'Angular Blog,Blogger'});
  }



  onActivate(event:any) {
    // window.scroll(0,0);
 
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 }
//  onActivate(event:any) {
//   let scrollToTop = window.setInterval(() => {
//       let pos = window.pageYOffset;
//       if (pos > 0) {
//           window.scrollTo(0, pos - 20); // how far to scroll on each step
//       } else {
//           window.clearInterval(scrollToTop);
//       }
//   }, 16);
// }
}
