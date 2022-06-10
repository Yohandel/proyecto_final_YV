import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BillsComponent } from './bills/bills.component';
import { IncomeComponent } from './income/income.component';
import { IncomeBllsComponent } from './income-blls/income-blls.component';

import { GridTemplateComponent } from './grid-template/grid-template.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddModalComponent } from './components/add-modal/add-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BillsComponent,
    IncomeComponent,
    IncomeBllsComponent,
    GridTemplateComponent,
    AddModalComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
