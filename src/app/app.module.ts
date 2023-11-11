import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { CreditCardMaskPipe } from './helpers/creditcard.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BannedCountryListComponent } from './banned-country-list/banned-country-list.component';
import { HelperService } from './helpers/helper.service';
import {MatListModule} from '@angular/material/list'
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CreditCardMenuComponent } from './credit-card-menu/credit-card-menu.component';
import { CreditCardListComponent } from './credit-card-list/credit-card-list.component';
import { MatDividerModule } from '@angular/material/divider';
@NgModule({
  declarations: [
    AppComponent, CreditCardMaskPipe, CreditCardMenuComponent, BannedCountryListComponent, CreditCardListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDividerModule
  ],
  providers: [HelperService],
  bootstrap: [AppComponent, CreditCardMaskPipe, CreditCardMenuComponent, BannedCountryListComponent]
})
export class AppModule { }
