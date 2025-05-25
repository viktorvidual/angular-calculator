import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  const tests: { input: string; expected: number | string }[] = [
    { input: '2+2', expected: 4 },
    { input: '10-3', expected: 7 },
    { input: '5×5', expected: 25 },
    { input: '20÷4', expected: 5 },
    { input: '2+3×4', expected: 14 },
    { input: '5×5+9×5', expected: 70 },
    { input: '10+2×3-4÷2', expected: 14 },
    { input: '2,5+2,5', expected: 5 },
    { input: '10,2×2', expected: 20.4 },
    { input: '9,5÷2', expected: 4.75 },
    { input: '5÷0', expected: 'Cannot divide by zero' },
    { input: '100-100×1', expected: 0 },
  ];

  tests.forEach(({ input, expected }) => {
    it(`should evaluate ${input} = ${expected}`, () => {
      service.setInput(input);
      service.setError('');
      service.evaluate();

      const result = service.getError() ? service.getError() : Number(service.getInput());

      if (typeof expected === 'string') {
        expect(result).toBe(expected);
      } else {
        expect(typeof result).toBe('number');
        expect(result).toBeCloseTo(expected, 5);
      }
    });
  });
});
