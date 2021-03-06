import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import {
  fetchRepositoryList,
  repositoryListFetchError,
  repositoryListFetchSuccess,
  RepositoryListItem,
  selectRepositoryList
} from '../../../data-access/github';
import { DemoBasics4ViewModelService } from './demo-basics4.view-model.service';
import { DemoBasicsItem } from '../demo-basics-item.interface';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'demo-basics-4',
  templateUrl: './demo-basics-4.view.html',
  styles: [
    `
      .list .mat-expansion-panel-header {
        position: relative;
      }
      .list .mat-expansion-panel-header mat-progress-bar {
        position: absolute;
        top: 0px;
        left: 0;
      }

      .list .mat-expansion-panel-content .mat-expansion-panel-body {
        padding-top: 10px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DemoBasics4ViewModelService]
})
export class DemoBasicsComponent4 {
  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 4000) {
      this.vm.set({ refreshInterval });
    }
  }

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }

  constructor(
    public vm: DemoBasics4ViewModelService,
    private store: Store<any>,
    private actions$: Actions
  ) {
    this.vm.connect(
      'list',
      this.store.select(selectRepositoryList).pipe(map(this.parseListItems))
    );
    this.vm.hold(
      this.vm.refreshListSideEffect$.pipe(
        tap(_ => this.store.dispatch(fetchRepositoryList({})))
      )
    );
    this.vm.connect(
      'isPending',
      this.actions$.pipe(
        ofType(
          repositoryListFetchError,
          repositoryListFetchSuccess,
          fetchRepositoryList
        ),
        map(a => a.type === fetchRepositoryList.type)
      )
    );
  }

  parseListItems(l: RepositoryListItem[]): DemoBasicsItem[] {
    return l.map(({ id, name }) => ({ id, name }));
  }
}
