import { Component, OnInit } from '@angular/core';
import { FunctionService } from '../services/function.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  constructor(
    private functionservice: FunctionService    
    ) { }

  ngOnInit() {
  }

}
