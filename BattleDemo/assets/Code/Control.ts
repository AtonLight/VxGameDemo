import { _decorator, Component, Node, Button } from 'cc';
import { Item } from './Game';

const { ccclass, property } = _decorator;

@ccclass('Control')
export class Control extends Component {
    @property({ type: Button })
    private btnReset = null;
    start() {

    }

    update(deltaTime: number) {
        
    }

    btnResetOnClick(value:string){
        Item.battleFlow.initBattle();
    }
}


