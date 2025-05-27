import { Component, inject } from '@angular/core'
import { CalculatorService } from '../../services/calculator/calculator.service';
import { CalculatorButton } from '../../components/calculator-button/calculator-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculator',
  templateUrl: 'calculator.component.html',
  styleUrls: ['calculator.component.scss'],
  imports: [CalculatorButton],
})
export class CalculatorComponent {
  private router = inject(Router);
  calculator = inject(CalculatorService);

  goToHistory(): void {
    this.router.navigate(['/history']);
  }
}
