import { Component, inject } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';
import { CalculatorButton } from '../../components/button/button.component';

@Component({
  selector: 'app-calculator',
  templateUrl: 'calculator.component.html',
  styleUrls: ['calculator.component.scss'],
  imports: [CalculatorButton],
})
export class CalculatorComponent {
  calculator = inject(CalculatorService);
}
