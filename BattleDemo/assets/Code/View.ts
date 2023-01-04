import { _decorator, Component, Node, Label,Prefab,instantiate, ProgressBar, math} from 'cc';
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

    public setBattleMsg(value:number){
        let txt = instantiate(this.txtBattle)
        this.context.addChild(txt);
       
       let weaponMsg,attackMsg,damageMsg
       let atkName = Item.battleFlow.attackCharacter.charNme;
       let defName = Item.battleFlow.defineCharacter.charNme;
       let nowTime = this.showTime(Item.battleFlow.getTotalTime());
       if(Item.battleFlow.attackCharacter.currentWeapon == null){
            weaponMsg = " 赤手空拳 "
       }else if(Item.battleFlow.attackCharacter.isThrowWeapon == true){
            weaponMsg = " 投掷武器 " + Item.battleFlow.attackCharacter.currentWeapon.weaponName;
       }else{
            weaponMsg = " 掏出武器 " + Item.battleFlow.attackCharacter.currentWeapon.weaponName;
       }

       if (Item.battleFlow.attackCharacter.isDouble == true){
            attackMsg = "【连续攻击】 "
       }else{
            attackMsg = " 攻击 "
       }

       if(Item.battleFlow.defineCharacter.isDodge){
            damageMsg = " 【被闪避了！】"
       }else if(Item.battleFlow.defineCharacter.isBlock){
            damageMsg = " 【被格挡了！】"
       }else if(Item.battleFlow.attackCharacter.isDodge){
            damageMsg = " 造成了 "+value+ " 点【暴击】伤害"
       }else{
            damageMsg = " 造成了 "+value+ " 点伤害"
       }

       txt.getComponent(Label).string = nowTime + atkName + weaponMsg + attackMsg + defName + damageMsg;
       if(this.isLog == true){
            console.log( nowTime + atkName + weaponMsg + attackMsg + defName + damageMsg);
       }
    }

    public setFinalMsg(){
        let txtFirst = instantiate(this.txtBattle)
        txtFirst.getComponent(Label).string = "【结算】"
        this.context.addChild(txtFirst);

        let nowTime = this.showTime(Item.battleFlow.getTotalTime());
        let atkName = Item.battleFlow.attackCharacter.charNme;
        let defName = Item.battleFlow.defineCharacter.charNme;

        let txtSecend = instantiate(this.txtBattle)
        txtSecend.getComponent(Label).string = nowTime + " "+atkName+" 击败了 "+defName;
        this.context.addChild(txtSecend);

        let atkDamage = Item.battleFlow.attackCharacter.totalDamage;
        let defDamage = Item.battleFlow.defineCharacter.totalDamage;

        let txtThird = instantiate(this.txtBattle)
        txtThird.getComponent(Label).string = atkName+" 共造成了 "+atkDamage+" 点伤害";
        this.context.addChild(txtThird);

        let txtFourth = instantiate(this.txtBattle)
        txtFourth.getComponent(Label).string = defName+" 共造成了 "+defDamage+" 点伤害";
        this.context.addChild(txtFourth);

        let txtFifth = instantiate(this.txtBattle)
        txtFifth.getComponent(Label).string = atkName +" 获得了胜利！"
        this.context.addChild(txtFifth);
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

    public showTime(totalTime:number):string {
        let times;
        let min = Math.floor((totalTime / 60))
        let sec = Math.floor(((totalTime /60) - min) * 60) 
        if (min < 10 ){
            times = "0"+min+":"
        }else{
            times = min+":"
        }

        if(sec < 10){
            return times + "0" + sec+" ";
        }else{
            return  times + sec+" ";
        }
    }
}


