import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from '../components/add-modal/add-modal.component';
import { DataService } from '../data/servicios/data.service';
import { Budget } from '../models/budget';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  title = "Lista de Ingresos"

  constructor(private dialogIncome: MatDialog,
    private data: DataService) { }

  incomes: Budget[] = []
  inpSearch: string = "";
  totMonto: number = 0;
  incomesCopy: Budget[] = []
  ngOnInit(): void {
    this.getIncomes()

  }

  getIncomes() {
    this.data.getData().subscribe(data => {
      this.incomes = data.filter(el => el.type == 2).sort(function(a, b) {
        return b.id - a.id;
      });
      this.incomesCopy = [...this.incomes]

    })

  }

  openModalBills() {
    this.dialogIncome.open(AddModalComponent, {
      data: {
        type: 2,
        title: "Ingreso"
      }
    })
      .afterClosed().subscribe(data => {
        if (data?.created) {
          this.getIncomes()
        }
      })
      ;
  }

  getTotalMont() {
    return this.incomes.reduce(
      (previousValue, currentValue) => previousValue + currentValue.monto,
      0);
  }



}
