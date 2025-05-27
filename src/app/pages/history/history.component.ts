import { Component, inject } from '@angular/core';
import { HistoryItem, HistoryService } from '../../services/history/history.service';

@Component({
  selector: 'app-history',
  template: `
    <div class="container">
      <h1>History</h1>

      @if (historyService.currentHistory.length > 0) {
        <button (click)="historyService.clearHistory()">Clear History</button>
      }

      <ul>
        @for (item of historyService.currentHistory; track item.input) {
          <li class="history-item">{{ item.input }} = {{ item.result }}</li>
        } @empty {
          <li>Current history is empty.</li>
        }
      </ul>
    </div>
  `,
  styleUrls: ['history.component.scss'],
})
export class HistoryComponent {
  historyService = inject(HistoryService);
}
