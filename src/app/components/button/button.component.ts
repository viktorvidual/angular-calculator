import { Component, Input } from '@angular/core';

@Component({
  selector: 'calculator-button',
  template: `
    <button [class]="type" [disabled]="disabled">
      {{ label }}
    </button>
  `,
  styleUrls: ['button.component.scss'],
})

export class CalculatorButton {
  @Input() label: string = '';
  @Input() type: 'dark' | 'orange' = 'dark';
  @Input() disabled: boolean = false;
}
