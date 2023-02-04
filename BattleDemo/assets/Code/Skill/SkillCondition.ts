import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SkillCondition')
export class ConditionFactory  {
    public GetCondition(condition:string){
        switch(condition){
            case "NULL" :
                return new Null();
        }
    }
}

export class ConditionBase {
    public canExcute():boolean{return}
}

class Null extends ConditionBase{
    public canExcute(): boolean {
        return true;
    }
}
