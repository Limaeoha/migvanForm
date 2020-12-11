import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'app-formly-field-stepper',
  templateUrl: './stepper.type.html',
  styleUrls: ['./stepper.type.css']
})
export class FormlyFieldStepperComponent extends FieldType implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  ngOnInit(): void {
    setTimeout(() => {
      this.field.templateOptions.stepper = this.stepper;
    });
  }

  isValid(field: FormlyFieldConfig): boolean {
    return field.key ? field.formControl.valid : field.fieldGroup.every(f => this.isValid(f));
  }

  nextDisabled(): boolean {
    const valid: boolean = this.isValid(this.field.fieldGroup[this.stepper.selectedIndex]);
    return this.stepper.selectedIndex === this.stepper.steps.length || !valid;
  }

  previousDisabled(): boolean {
    return this.stepper.selectedIndex === 0;
  }
}
