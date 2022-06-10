import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data/servicios/data.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {

  fechaBill: string = ""
  montoBill: number = 0
  descriptBill: string = ""
  datePipe = new DatePipe("en-Us")

  constructor(
    private dialogRef: MatDialogRef<AddModalComponent>,
    private _toastSrv: ToastrService,
    private _dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close({
      created:true
    });
  }

  setBudget() {
    if (this.montoBill <= 0 || !this.fechaBill || !this.descriptBill) {
      this._toastSrv.error("Favor Valide los Campos", "Ocurrio un Error")
      return
    }

    let budget = {
      id: Date.now(),
      type: this.data.type,
      descripcion: this.descriptBill,
      fecha: this.datePipe.transform(this.fechaBill, "dd/MM/yyyy") ?? '',
      monto: (this.montoBill)
    }

    this._dataService.setData(budget).subscribe((res:any)=>{
      this._toastSrv.success(`${this.data.title} agregado satisfactoriamente`)
      this.closeDialog()
    },err => this._toastSrv.error(`Sucedio un error trartando de agregar el ${this.data.title}`))

  }

}
