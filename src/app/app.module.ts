import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTableModule } from '@angular/material/table'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { RegistrarEstudianteComponent } from './components/registrar-usuario/registrar-estudiante/registrar-estudiante.component';
import { RegistrarReclutadorComponent } from './components/registrar-usuario/registrar-reclutador/registrar-reclutador.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    RegistrarUsuarioComponent,
    RegistrarEstudianteComponent,
    RegistrarReclutadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
