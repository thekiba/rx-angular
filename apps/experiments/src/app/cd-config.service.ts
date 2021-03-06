import { Injectable } from '@angular/core';
import { DEFAULT_STRATEGY_NAME } from '@rx-angular/ngrx-component-experiments';
import { RxState } from '@rx-angular/state';

export interface CdConfig {
  strategies: string[];
  strategy: string;
}

@Injectable({ providedIn: 'root' })
export class CdConfigService extends RxState<CdConfig> {
  private state: CdConfig;

  constructor() {
    super();
    this.hold(this.select(), state => (this.state = state));
    this.set({
      strategy: DEFAULT_STRATEGY_NAME
    });
  }

  getConfig(prop?: string): CdConfig | string {
    return prop ? this.state[prop] : this.state;
  }
}
