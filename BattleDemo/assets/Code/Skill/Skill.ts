import { _decorator, Component, Node,math} from 'cc';
import { Character } from '../Character';
import { SkillTurn,SkillTarget,SkillEffectType} from '../Enum';
import { SkillEffectBase} from './SkillFactory';
import { ConditionBase } from './SkillCondition';
import { Item } from '../Game';
const { ccclass, property } = _decorator;


export class Skill  { 
    public id:number;
    public our:Character;
    public targets:Character[];
    public skillTurn:string;
    public skillCondition:ConditionBase;
    public duration:number;
    public now:number;
    public probability:number;
    public skillEffect:SkillEffectBase;
    public effectArgs:number[];
    public skillInfo:string;
    public skillName:string;

    /*constructor(id:number,our:Character,targets:Character[],skillTurn:SkillTurn,skillCondition:SkillConditionBase,
        duration:number,probability:number,skillEffect:SkillEffectBase, effectArgs:number[]){
            this.id = id;
            this.our = our;
            this.targets = targets;
            this.skillTurn = skillTurn;
            this.skillCondition = skillCondition;
            this.duration = duration;
            this.now = this.duration;
            this.probability = probability;
            this.skillEffect = skillEffect;
            this.effectArgs = effectArgs;
    };*/
    private effectExcute(){
        for(let i = 0 ;i<this.targets.length;i++){
            Item.view.setSkillMsg(this.our.charNme,this.skillName,this.skillInfo);
            this.skillEffect.excute(this.our,this.targets[i],this.effectArgs)
        }


    }

    private effectClose(){
        for(let i = 0 ;i<this.targets.length;i++){
            this.skillEffect.close()
        }
    }
    public skillExcute(){
        let rand = math.random();
        if (this.probability >= rand){
            if(this.skillCondition.canExcute()){
                //Item.animate.setSkillMsg(this.our,"发动技能 "+this.skillName);
                if (this.now == this.duration){
                    this.effectExcute()
                }else{
                    this.now = this.duration;
                }

            }
        }
    }

    public update(){
        if(this.now > 0){
            this.now = this.now - 1;
            if(this.skillEffect.getType() == SkillEffectType.TICK){
                this.effectExcute()
            }
            
        } else if(this.now <= 0){
            this.effectClose()
        }
    }


}


