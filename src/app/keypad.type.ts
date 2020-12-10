import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-formly-keypad-input',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="simple-keyboard-wrapper">
      <input
        type="input"
        readonly
        (input)="onInputChange($event)"
        class="sum-input"
        value={{value}}
        placeholder="הקש את הסכום הרצוי">
      <div class="simple-keyboard"></div>
    </div>
  `,
  styles: [
    `.simple-keyboard-wrapper {
      text-align: center;
      direction: ltr;
    }`,
    `.sum-input {
      border: none;
      font-size: 15vmin;
      text-align: center;
      direction: ltr;
      max-width: 100%;
    }
    .sum-input::placeholder {
      font-size: 7vw;
    }`
  ],
  styleUrls: [
    '../../node_modules/simple-keyboard/build/css/index.css',
  ]
})
export class FormlyKeypadInputComponent extends FieldType implements AfterViewInit {
  value = '';
  keyboard: Keyboard;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        layout: {
          default: ['1 2 3', '4 5 6', '7 8 9', '. 0 {bksp}']
        },
        theme: 'hg-theme-default hg-layout-numeric numeric-theme',
        inputPattern: /^\d+(?:\.\d{0,2})?$/,
        display: { '{bksp}': '<span class="material-icons">keyboard_backspace</span>' },
        maxLength: 5
      });
    });
  }

  onChange = (input: string) => {
    this.value = input;
    this.formControl.setValue(input);
  }

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  }
}
