import { _decorator, Component, Node } from 'cc';
import { Character } from '../Character';
import { SkillTurn,SkillTarget,SkillEffectType} from '../Enum';
import { Skill } from './Skill';
import { SkillEffectFactory } from './SkillFactory';
import { ConditionFactory } from './SkillCondition';
import { Skilldata } from '../template/Skilldata'; 
import { SkillEffectBase } from './SkillFactory';
import { Item } from '../Game';

type effect = {
    battleStart:Skill[],
    preAttack:Skill[],
    t:number
}
export class SkillMgr  {
    private effectFactory:SkillEffectFactory;
    private conditionFactory:ConditionFactory;
    private charactors:Map<number,effect>;
    private skillsTick:Skill[]
    constructor(){
        this.charactors = new Map();
        this.effectFactory = new SkillEffectFactory();
        this.conditionFactory = new ConditionFactory();  
        this.skillsTick = new Array();
    }

    private getTarget(targetEnum:string,char:Character):Character[] {
        let chars:Character[] = new Array();
        if(targetEnum == 'SELF'){
            chars.push(char);
        }else if(targetEnum == 'ENEMY'){
            if(char.id == 10001){
                chars.push(Item.battleFlow.characters[1]);
            }else{
                chars.push(Item.battleFlow.characters[0]);
            }
        }
        return chars;
    }

    private getSkill(id:number,char:Character){
        let index = id.toString();
        let skillIns:Skill = new Skill();
        skillIns.id = id;
        skillIns.duration = Skilldata[id].EffectTime;
        skillIns.our = char;
        skillIns.targets = this.getTarget(Skilldata[id].SkillTarget,char);
        skillIns.skillTurn = Skilldata[id].SkillTurn;
        skillIns.skillCondition = this.conditionFactory.GetCondition(Skilldata[id].EffectCondition);
        skillIns.duration = Skilldata[id].duration;
        skillIns.now = skillIns.duration;
        skillIns.probability = Skilldata[id].SkillProbability;
        skillIns.skillEffect = this.effectFactory.GetSkillEffect(Skilldata[id].SkillEffect);
        skillIns.effectArgs = Skilldata[id].EffectArgs;
        skillIns.skillName = Skilldata[id].Name;
        skillIns.skillInfo = Skilldata[id].SkillInfo;
        return skillIns;
    }
    private setEffect(skillObj:Skill){
        let be:Skill[] = new Array();
        let pa:Skill[] = new Array();
        let e:effect = {
            battleStart:be,
            preAttack:pa,
            t:10

        };
       // e.battleStart = new Array();
        //e.preAttack = new Array();
        e.t = 10;
        if(skillObj.skillTurn == 'BATTLE_START'){
            e.battleStart.push(skillObj);
        }else if(skillObj.skillTurn == 'PRE_ATTACK'){
            e.preAttack.push(skillObj);
        }
        return e;
    }
    public addCharactor(char:Character){
        let p:effect;
        let skillIns:Skill;
        for(let i = 0;i< char.skill.length;i++){
            skillIns = this.getSkill(char.skill[i],char);
            p = this.setEffect(skillIns);
        }
        this.charactors.set(char.id,p)
    }

    public excuteByTurn(turn:SkillTurn,char?:Character){
        if(turn == SkillTurn.BATTLE_START){
            for (let v of this.charactors.values()) {
               this.skillExcute(v.battleStart)              
            }
        }else if(turn == SkillTurn.PRE_ATTACK){
            for (let v of this.charactors.values()) {
                this.skillExcute(v.preAttack)              
             }
        }
    }

    private skillExcute(skills:Skill[]){
        for(let i = 0;i<skills.length;i++){
            skills[i].skillExcute();
            if(skills[i].skillEffect.getType() == SkillEffectType.TICK){
                this.skillsTick.push(skills[i])
            }
        }
    }

    public update(){
        if(this.skillsTick.length> 0){
            for(let i = 0;i<this.skillsTick.length;i++){
                this.skillsTick[i].update()
                if(this.skillsTick[i].now <= 0){
                    this.skillsTick.splice(i,1)
                }
            }
        }
    }
}


