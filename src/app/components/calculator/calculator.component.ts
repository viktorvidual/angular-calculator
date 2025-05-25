import { Component, inject } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';
import { CalculatorButton } from '../button/button.component';

@Component({
  selector: 'app-calculator',
  templateUrl: 'calculator.component.html',
  styleUrls: ['calculator.component.scss'],
  imports: [CalculatorButton],
})
export class CalculatorComponent {
  calculator = inject(CalculatorService);

  handleButtonPress(label: string) {
    if (label === 'AC') {
      this.calculator.clear();
    } else if (label === 'del') {
      console.log('press del');
      this.calculator.backspace();
    } else if (label === '=') { 
      this.calculator.evaluate();
    } else {
      this.calculator.press(label);
    }
  }
}
