import {observable} from 'mobx';

export class ChronosAppState {
    // @todo:demo
    @observable total = 0;
}

export const chronosAppState = new ChronosAppState();
