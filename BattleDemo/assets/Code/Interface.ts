import { _decorator, Component, Node } from 'cc';
import { SkillEffectType } from './Enum';
const { ccclass, property } = _decorator;

export interface SkillEffect {
    type:SkillEffectType;
    excute:{};
    close:{};
}


