import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from '../components/add-modal/add-modal.component';
import { DataService } from '../data/servicios/data.service';
import { Budget } from '../models/budget';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  title = "Lista de Gastos"
  inpSearch: any;
  totBills: number = 0
  billsCopy: Budget[] = []
  constructor(private dialogBill: MatDialog,
    private data: DataService) { }
  public bills: Budget[] = [];

  ngOnInit(): void {
    this.getBills();
  }

  getBills() {
    this.data.getData().subscribe(data => {
      this.bills = data.filter(el => el.type == 1).sort(function(a, b) {
        return b.id - a.id;
      });
      this.billsCopy = [...this.bills]
    })
  }


  getTotalMont() {
    return this.bills.reduce(
      (previousValue, currentValue) => previousValue + currentValue.monto,
      0);
  }

  openModalBills() {
    this.dialogBill.open(AddModalComponent, {
      data: {
        type: 1,
        title:'Gasto'
      }
    })
      .afterClosed().subscribe(data => {
        if (data?.created) {
          this.getBills()
        }
      })
      ;
  }


}
