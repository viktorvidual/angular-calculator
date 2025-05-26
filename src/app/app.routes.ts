import { Routes } from '@angular/router';
import { CalculatorComponent, HistoryComponent } from './pages';

export const routes: Routes = [
    {
        path: '',
        component: CalculatorComponent,
        title: 'Calculator',
    }, {
        path: 'history',
        component: HistoryComponent,
        title: 'History',
    }
];
