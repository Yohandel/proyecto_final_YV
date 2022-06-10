import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DataService } from '../data/servicios/data.service';
import { Budget } from '../models/budget';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'tabla-template',
  templateUrl: './grid-template.component.html',
  styleUrls: ['./grid-template.component.css']
})
export class GridTemplateComponent implements OnInit, OnChanges {
  @Input() title: string = ""
  @Input() data: Budget[] = [];
  @Input() fecha: string = "";
  @Input() monto: number = 0;
  @Input() montoTot: number = 0
  @Output() getData =  new EventEmitter<boolean>()
  @Input() titleTot: string = "Total";
  filterInp: string = ""
  endIndex: number = 5;


  public pageSlice: Budget[] = [];
  public pageSliceCopy: Budget[] = [];


  constructor(private _dataService: DataService, private _toastSrv: ToastrService,) { }


  ngOnInit(): void {
  }


  //Construccion de Paginador
  ngOnChanges(changes: SimpleChanges): void {
    this.pageSlice = this.data.slice(0, this.endIndex)
  }

  filter() {
    if (this.filterInp == '') {
      this.pageSlice = this.data.slice(0, this.endIndex)
    } else {
      this.pageSlice = this.data.filter((budget: Budget) => budget.fecha.toLocaleLowerCase().includes(this.filterInp.toLocaleLowerCase()) || budget.monto.toString().includes(this.filterInp.toLocaleLowerCase()) || budget.descripcion.toLocaleLowerCase().includes(this.filterInp.toLocaleLowerCase()));
    }

  }

  OnPageChange(e: PageEvent) {
    const startIndex = e.pageIndex * e.pageSize;
    this.endIndex = startIndex + e.pageSize;
    if (this.endIndex > this.data.length) {
      this.endIndex = this.data.length;
    }
    this.pageSlice = this.data.slice(startIndex, this.endIndex)

  }

  deleteBudgetElement(budgetId:number){
    Swal.fire({
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#eb220c',
      title: "¿Está seguro que desea eliminar este registro?",
      icon: "question"
    }).then(res => {
      if (res.isConfirmed) {
        this._dataService.deleteData(budgetId).subscribe((res:any)=>{
          this.getData.emit(true)
          this._toastSrv.success('Resgitro eliminado satisfactoriamente')
        }, err => this._toastSrv.error('Sucedio un error trartando de eliminar el registro'))
      }
    });
  
  }


}
