import { Component } from '@angular/core';
import * as $ from 'jquery';


 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WarehouseManagement';

  

  ngOnInit() {

     $(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
        });


 }
}
