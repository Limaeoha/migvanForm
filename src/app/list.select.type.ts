import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'app-formly-list-input',
  encapsulation: ViewEncapsulation.None,
  template: `
    <mat-selection-list #items [multiple]="false" [formlyAttributes]="field">
      <input #filterInput class="filter-input" *ngIf="to.filter" placeholder="הקלד שם לסינון או בחר חשבון">
      <div class="list-wrapper">
        <mat-list-option *ngFor="let item of this.keys()" [value]="item" (click)="onClick(item)">
          {{ printItem(item) }}
        </mat-list-option>
      </div>
    </mat-selection-list>`,
  styles: [
    `mat-selection-list {
      display: flex;
      flex-direction: column;
    }`,
    `mat-list-option {
      flex-grow: 1;
      border-radius: 10px;
      box-shadow: 5px 5px 10px black;
      margin-bottom: 15px;
    }`,
    `.filter-input {
      margin-bottom: 15px;
      width: 100%;
      box-sizing: border-box;
    }`,
    `.list-wrapper {
      flex-grow: 1;
      overflow: auto;
      padding-left: 15px;
      height: 100px;
      padding-right: 15px;
      padding-top: 15px;
    }`
  ]
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
    this.model[ this.field.key + '_val' ] = this.list[input];
    this.field.parent.parent.templateOptions.stepper.next();
  }

  printItem(item: number): string {
    return (this.list instanceof Array) ? this.list[item] : `${item} - ${this.list[item]}`;
  }
}
