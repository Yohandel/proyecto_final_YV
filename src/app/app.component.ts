import { Component } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'expenses-and-income';


  ngOnInit(){
    AOS.init();
    window.addEventListener('load',AOS.refresh)
  }
}
