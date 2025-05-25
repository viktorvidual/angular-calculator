import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private input = '0';
  private executed = false;
  private lastInput = '';
  private error = '';

  getInput(): string {
    return this.input;
  }

  wasExecuted(): boolean {
    return this.executed;
  }

  //method below is used for testing purposes
  setInput(input: string): void {
    this.input = input;
  }

  setError(error: string) {
    this.error = error;
  }

  getError() {
    return this.error;
  }

  press(key: string): void {
    //add edge cases
    if (this.executed) {
      this.input = key;
      this.executed = false;
    } else if (this.input === '0') {
      this.input = key;
    } else {
      this.input += key;
    }
  }

  backspace(): void {
    if (this.input.length === 1) {
      this.input = '0';
    } else {
      this.input = this.input.slice(0, -1);
    }
  }

  //A utility method that returns true if op2 has higher or the same precedense as op1
  hasPrecedence(op1: string, op2: string): boolean {
    if ((op1 == '×' || op1 == '÷') && (op2 == '+' || op2 == '-')) {
      return false;
    } else {
      return true;
    }
  }

  //A utility method to apply an operator and operands. Returns the result
  applyOperation(operator: string, b: number, a: number) {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        if (b === 0) {
          return (this.error = 'Cannot divide by zero');
        }
        return a / b;
    }

    return 0;
  }

  evaluate(): void {
    let tokens = this.input.split('');
    console.log(tokens);

    let values: number[] = [];
    let operators: string[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const element = tokens[i];

      console.log(element);

      //Case 1, token is a number
      if (tokens[i] >= '0' && tokens[i] <= '9') {
        let sbuf = '';

        while ((i < tokens.length && tokens[i] >= '0' && tokens[i] <= '9') || tokens[i] === ',') {
          sbuf = sbuf + (tokens[i] === ',' ? '.' : tokens[i]);
          i++;
        }

        values.push(parseFloat(sbuf));
        i--;
      }

      //Case 2, token is an operator
      else if (tokens[i] === '+' || tokens[i] === '-' || tokens[i] === '×' || tokens[i] === '÷') {
        while (
          operators.length > 0 &&
          this.hasPrecedence(tokens[i], operators[operators.length - 1])
        ) {
          const result = this.applyOperation(operators.pop() ?? '', values.pop() ?? 0, values.pop() ?? 0);

          if (typeof result === 'string') {
            return;
          }
          values.push(result);
        }
        operators.push(tokens[i]);
      }
    }

    console.log('tokens', tokens, 'values', values);

    while (operators.length > 0) {
      const result = this.applyOperation(operators.pop() ?? '', values.pop() ?? 0, values.pop() ?? 0);
      if (typeof result === 'string') {
        return;
      }
      values.push(result);
    }

    let calculated = String(values.pop());
    this.input = calculated;
    this.executed = true;
  }

  clear(): void {
    this.input = '0';
    this.executed = false;
  }
}
