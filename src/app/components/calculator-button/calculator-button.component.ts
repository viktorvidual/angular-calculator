import { Component, Input } from '@angular/core';

@Component({
  selector: 'calculator-button',
  template: `
    <button
      [class]="type"
      [disabled]="disabled"
      [style.width]="width"
      [style.borderRadius]="borderRadius"
    >
      {{ label }}
    </button>
  `,
  styleUrls: ['calculator-button.component.scss'],
})
export class CalculatorButton {
  @Input() label: string = '';
  @Input() type: 'dark' | 'orange' = 'dark';
  @Input() disabled: boolean = false;
  @Input() width: string = '64px';
  @Input() borderRadius: string = '50%';
}
