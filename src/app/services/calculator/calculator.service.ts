import { Injectable, inject } from '@angular/core';
import { HistoryService } from '../history/history.service';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private input = '0';
  private executed = false;
  private error = '';

  historyService = inject(HistoryService);

  get errorMessage(): string {
    return this.error;
  }

  get calculatorInput(): string {
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
    this.error = '';
    const lastChar = this.input[this.input.length - 1];

    //after execution, start new input if key is number, or continue input if key is operator
    if (this.executed) {
      this.executed = false;

      if (this.isNumberToken(key) || key === ',') {
        this.input = key;
      } else if (this.isOperatorToken(key)) {
        this.input += key;
      }

      return;
    }

    //case where user presse "," but prev char is not a number
    if (key === ',' && !(lastChar >= '0' && lastChar <= '9')) {
      return;
    }

    //replace zero with current key if input is zero
    if (this.input === '0' && this.isNumberToken(key)) {
      this.input = key;
      return;
    }

    //case where input is empty and user tries devision
    if (this.input === '0' && key === '÷') {
      this.input = '0';
      return;
    }

    //case where first char is 0 and second is operator different than division, but
    //user tries to divide, which would result in zero division error
    if (this.input.length === 2 && key === '÷' && this.isOperatorToken(lastChar)) {
      return;
    }

    // Replace operator if two are typed in a row
    if (this.isOperatorToken(key)) {
      if (this.input === '') {
        if (key === '-') this.input = key;
        return;
      }

      if (this.isOperatorToken(lastChar)) {
        this.input = this.input.slice(0, -1) + key;
      } else {
        this.input += key;
      }

      return;
    }

    this.input += key;
  }

  backspace(): void {
    if (this.input.length === 1) {
      this.input = '0';
    } else {
      this.input = this.input.slice(0, -1);
    }
  }

  clear(): void {
    this.input = '0';
    this.executed = false;
  }

  evaluate(): void {
    let tokens = this.input.split('');
    console.log(tokens);

    //calculator operators are binary, so if last token is operator it is going to beignored
    if (this.isOperatorToken(tokens[tokens.length - 1])) {
      tokens.pop();
    }

    let values: number[] = [];
    let operators: string[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const element = tokens[i];

      console.log(element);

      //Case 1, token is a number
      if (this.isNumberToken(tokens[i])) {
        let sbuf = '';

        while (i < tokens.length && this.isNumberToken(tokens[i])) {
          sbuf = sbuf + (tokens[i] === ',' ? '.' : tokens[i]);
          i++;
        }

        values.push(parseFloat(sbuf));
        i--;
      }

      //Case 2, token is an operator
      else if (this.isOperatorToken(tokens[i])) {
        while (
          operators.length > 0 &&
          this.hasPrecedence(tokens[i], operators[operators.length - 1])
        ) {
          const result = this.applyOperation(
            operators.pop() ?? '',
            values.pop() ?? 0,
            values.pop() ?? 0,
          );

          if (typeof result === 'string') {
            this.error = 'Invalid calculation';
            return;
          }
          values.push(result);
        }
        operators.push(tokens[i]);
      }
    }

    console.log('values', values, 'operators', operators);

    while (operators.length > 0) {
      const result = this.applyOperation(
        operators.pop() ?? '',
        values.pop() ?? 0,
        values.pop() ?? 0,
      );
      if (typeof result === 'string') {
        this.error = 'Invalid calculation';
        return;
      }
      values.push(result);
    }

    let calculated = String(values.pop());

    if (calculated === 'NaN' || calculated === 'Infinity') {
      this.error = 'Invalid calculation';
      return;
    } else {
      this.error = '';
    }

    //save result to local storage
    const originalInput = this.input;
    const result = calculated;

    this.historyService.addToHistory({
      input: originalInput,
      result: result,
    });

    this.input = calculated;
    this.executed = true;
  }

  private isNumberToken(value: string): boolean {
    return (value >= '0' && value <= '9') || value === ',';
  }

  private isOperatorToken(value: string): boolean {
    return value === '+' || value === '-' || value === '×' || value === '÷';
  }

  //A utility method that returns true if op2 has higher or the same precedense as op1
  private hasPrecedence(op1: string, op2: string): boolean {
    const highPrecedenceOps = ['×', '÷'];
    const lowPrecedenceOps = ['+', '-'];

    // If op1 is high precedence and op2 is low precedence, op2 does NOT have higher or same precedence
    if (highPrecedenceOps.includes(op1) && lowPrecedenceOps.includes(op2)) {
      return false;
    }

    // Otherwise op2 has higher or same precedence
    return true;
  }

  //A utility method to apply an operator and operands. Returns the result
  private applyOperation(operator: string, b: number, a: number) {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        if (b === 0) {
          return 'Cannot divide by zero';
        }
        return a / b;
    }

    return 0;
  }
}
