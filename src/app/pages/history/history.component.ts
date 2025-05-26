import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  template: `
    <div>
      <h1>History</h1>
      <p>History of calculations will be displayed here.</p>
    </div>
  `,
    styleUrls: ['history.component.scss'],
})
export class HistoryComponent {
  // This component will display the history of calculations.
  // You can implement the logic to fetch and display the history here.
}
