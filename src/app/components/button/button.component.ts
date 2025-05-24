import { Component, Input } from '@angular/core';

@Component({
  selector: 'calculator-button',
  template: `
    <button [class]="type">
      {{ label }}
    </button>
  `,
  styleUrls: ['button.component.scss'],
})
export class CalculatorButton {
  @Input() label: string = '';
  @Input() type: 'dark' | 'orange' = 'dark';
}
