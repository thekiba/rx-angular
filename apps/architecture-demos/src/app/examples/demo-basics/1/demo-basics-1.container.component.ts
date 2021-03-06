import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'demo-basics1-container',
  template: `
    <h1>Step 1</h1>
    <small>Parent re-renders: {{ rerenders() }}</small
    ><br />
    <mat-form-field>
      <label>RefreshInterval</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <demo-basics-1
      [refreshInterval]="refreshInterval$ | async"
      (listExpandedChange)="listExpandedChange$.next($event)"
    >
    </demo-basics-1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoBasics1ContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );
  listExpandedChange$ = new Subject<Event>();

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }
}
