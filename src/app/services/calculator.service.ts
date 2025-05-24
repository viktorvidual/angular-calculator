import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  input = '0';
  lastInput = '';
  executed = false;

  getInput(): string {
    return this.input;
  }

  press(key: string) {
    if (this.input === '0') {
      this.input = key;
    } else {
      this.input += key;
    }
  }

  backspace() {
    if (this.input.length === 1) {
      this.input = '0';
    } else {
      this.input = this.input.slice(0, -1);
    }
  }

  evaluate() {}

  clear() {
    this.input = '0';
    this.executed = false;
  }
}
