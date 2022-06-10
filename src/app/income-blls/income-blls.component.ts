import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/servicios/data.service';
import { Budget } from '../models/budget';

@Component({
  selector: 'app-income-blls',
  templateUrl: './income-blls.component.html',
  styleUrls: ['./income-blls.component.css']
})
export class IncomeBllsComponent implements OnInit {
  title = "Lista de Gastos y Ingresos"
  inpSearch: any;
  totBudget: number = 0
  budgetCopy: Budget[] = []
  public budget: Budget[] = [];
  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    this.getData()

  }

  getData(){
    this._dataService.getData().subscribe(res=>{
      this.budget = res.sort(function(a, b) {
        return b.id - a.id;
      });
      this.budgetCopy = [...this.budget]
 
    })
    
  }

  getTotalMont() {
    return this.budget.reduce(
      (previousValue, currentValue) => previousValue + currentValue.monto,
      0);

  }


}
