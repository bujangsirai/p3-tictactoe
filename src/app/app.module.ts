import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TictactoeMainComponent } from './tictactoe-main/tictactoe-main.component';
import { BoardMainComponent } from './board-main/board-main.component';
import { MenuAwalComponent } from './menu-awal/menu-awal.component';
import { MenuMainComponent } from './menu-main/menu-main.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TictactoeMainComponent,
    BoardMainComponent,
    MenuAwalComponent,
    MenuMainComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
