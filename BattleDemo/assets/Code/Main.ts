import { _decorator, Component, Node ,resources,JsonAsset,error} from 'cc';
import { BattleFlow } from './BattleFlow';
import { Item } from './Game';
import { Load } from './Load';
import { Tools } from './Tools';
import { View } from './View';
import { Control } from './Control';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    onLoad(){
        Item.battleFlow = new BattleFlow();
        Item.view = this.node.getComponent(View);
        Item.control = this.node.getComponent(Control);
    }

    start() {
       /* resources.load('weapon', (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            // 获取到 Json 数据
            const js:object = res.json!;
            console.log(js);
            
        })*/
        Item.battleFlow.initBattle();
    }

    update(deltaTime: number) {
        Item.battleFlow.update(deltaTime);
    }
}


