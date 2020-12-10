import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'app-formly-list-input',
  encapsulation: ViewEncapsulation.None,
  template: `
    <mat-selection-list #items [multiple]="false" [formlyAttributes]="field">
      <input #filterInput *ngIf="to.filter">
      <mat-list-option *ngFor="let item of this.keys()" [value]="item" (click)="onClick(item)">
        {{ printItem(item) }}
      </mat-list-option>
    </mat-selection-list>`
})
export class FormlyListInputComponent extends FieldType {
  @ViewChild('filterInput') filter: ElementRef;
  list: object;

  keys = () => {
    this.list = this.to.list;
    const filter = this.filter?.nativeElement.value;
    if (this.list) {
      const k = Object.keys(this.list);
      if (filter) {
        return k.filter((val) => {
          return (
            (!(this.list instanceof Array) && val.search(filter) >= 0) ||
            this.list[val].toString().search(filter) >= 0);
        });
      }
      return k;
    }
    return [];
  }

  onClick = (input: string) => {
    this.formControl.setValue((this.list instanceof Array) ? this.list[input] : input);
    if (this.list instanceof Object) { 
      this.model[ this.field.key + '_val' ] = this.list[input]
    }
    this.field.parent.parent.templateOptions.stepper.next();
  }

  printItem(item: number): string {
    return (this.list instanceof Array) ? this.list[item] : `${item} - ${this.list[item]}`;
  }
}
