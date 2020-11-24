import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { ReminderComponent } from './routes/reminder/reminder.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
import {CadastroService} from 'src/app/services/cadastro.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ReminderComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [BsModalService, CadastroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
