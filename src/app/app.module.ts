import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { FormlyFieldStepperComponent } from './stepper.type';
import { FormlyKeypadInputComponent } from './keypad.type';
import { FormlyListInputComponent } from './list.select.type';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from './material.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    FormlyFieldStepperComponent,
    FormlyListInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
    MaterialModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
      types: [
        { name: 'stepper', component: FormlyFieldStepperComponent, wrappers: ['form-field'] },
        { name: 'keypad', component: FormlyKeypadInputComponent },
        { name: 'list', component: FormlyListInputComponent, wrappers: ['form-field']}
      ]
    }),
    FormlyMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SweetAlert2Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
