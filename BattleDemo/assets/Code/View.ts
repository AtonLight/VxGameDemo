import { _decorator, Component, Node, Label,Prefab,instantiate, ProgressBar} from 'cc';
import { CharacterType } from './Enum';
import { Item } from './Game';
const { ccclass, property } = _decorator;

@ccclass('View')
export class View extends Component {

    @property({ type: Prefab })
    private txtBattle = null;
    @property({ type: Node })
    private context = null;
    @property({ type: ProgressBar })
    private barPlayer = null;
    @property({ type: ProgressBar })
    private barEnemy = null;
    @property({ type: Label })
    private txtPlayerHealth= null;
    @property({ type: Label })
    private txtEnemyHealth= null;
    private txtLevel:number = 0;
    private isLog:boolean = true;
    start() {
    }

    update(deltaTime: number) {
        
    }

    public setTxtBattle(value:string){
        let txt = instantiate(this.txtBattle)
        this.context.addChild(txt);
        txt.getComponent(Label).string = "第"+Item.battleFlow.turn+"回合："+value;
       if(this.isLog == true){
            console.log("第"+Item.battleFlow.turn+"回合："+value);
       }
       
    }

    public setHeath(type:CharacterType,health:number,present:number){
        if (type == CharacterType.First){
            this.txtPlayerHealth.string = health;
            this.barPlayer.progress = present;
        }else if(type == CharacterType.Second){
            this.txtEnemyHealth.string = health;
            this.barEnemy.progress = present;
        }
    }

    public reset(){
        let child = this.context.children;
        if (child.length > 0 ){
            for(let i = 0;i<= child.length;i++){
                if (child[i] != null){
                    child[i].destroy();
                }
            }
        }
    }
}


