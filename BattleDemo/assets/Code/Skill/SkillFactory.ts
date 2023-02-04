import { _decorator, Component, Node } from 'cc';
import { Character } from '../Character';
import { SkillTurn,SkillTarget,SkillEffectType} from '../Enum';
import { Item } from '../Game';
import { SkillEffect } from '../Interface';

const { ccclass, property } = _decorator;

export class SkillEffectFactory {
   public GetSkillEffect(effectEnum:String){
        switch(effectEnum){
            case "POSION" :
                return new Poison();
            case "DAMAGE_INCREASE" :
                return new DamageIncrease();
        }
   }
}

export class SkillEffectBase {
    /*private owner:Character;
    private targets:Character[];
    private skillTurn:SkillTurn;
    private skillCondition;
    private duration:number;
    private probability:number;*/
    protected type:SkillEffectType;
    protected target:Character;
    constructor(){};
    public excute(owner:Character,target:Character,args:number[]) {}
     public close(){} 
     public getType(){
        return this.type;
     } 
}


export class Poison extends SkillEffectBase{
     constructor(){
         super();
        this.type = SkillEffectType.TICK;
     };
     public excute(owner: Character, target: Character, args: number[]): void {
        this.target = target;
        target.getDamage(100);
        Item.view.seteffectMsg(target.charNme,"中毒，生命-100");
     }
}

class DamageIncrease extends SkillEffectBase{
    constructor(){
        super();
       this.type = SkillEffectType.RUN;
    };
    public excute(owner: Character, target: Character, args: number[]): void {
        this.target = target;
        target.currentDamage = target.currentDamage + args[0];
        Item.view.seteffectMsg(target.charNme,"伤害增加"+args[0]+"点");
     }
}