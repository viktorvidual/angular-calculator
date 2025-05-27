import { Injectable } from '@angular/core';

export type HistoryItem = {
  input: string;
  result: string;
};

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private STORAGE_KEY = 'calculator-history';

  private history: HistoryItem[] = [];

  private loadHistory(): void {
    try {
      this.history = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch (e) {
      console.error('Failed to parse history from localStorage:', e);
      this.history = [];
    }
  }

  constructor() {
    this.loadHistory();
  }

  get currentHistory(): HistoryItem[] {
    return this.history;
  }

  addToHistory(newItem: HistoryItem): void {
    this.history.push(newItem);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.history));
  }

  clearHistory() {
    this.history = [];
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
