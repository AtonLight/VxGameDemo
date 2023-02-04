/* Skilldata.ts
* Created by Lee on 2023-02.
*/

// PRIMARY KEY => ISkilldata
export const Skilldata = {
	['30001']: { Id: 30001, Name: "致命打击", SkillType: "0.0", SkillTarget: "SELF", SkillTurn: "BATTLE_START", EffectCondition: "NULL", SkillEffect: "DAMAGE_INCREASE", EffectArgs: [100.0], SkillInfo: "伤害增加5点",  SkillProbability: 100, EffectTime: -1 },
	['30002']: { Id: 30002, Name: "毒液攻击", SkillType: "1.0", SkillTarget: "ENEMY", SkillTurn: "PRE_ATTACK", EffectCondition: "NULL", SkillEffect: "POSION", EffectArgs: [-1.0], SkillInfo: "中毒每秒掉血5",  SkillProbability: 50, EffectTime: 10 }
};

export interface ISkilldata {
    Id: number; // 技能ID (PRIMARY KEY)
    Name: string[]; // 技能名称
    SkillType: string[]; // 技能类型
    SkillTarget: string[]; // 技能目标
    SkillTurn: string[]; // 技能触发时机
    EffectCondition: string[]; // 效果触发条件
    SkillEffect: string[]; // 技能效果
    EffectArgs: number[]; // 效果参数
    SkillInfo: string[]; // 技能效果描述
     SkillProbability: number[]; // 技能触发几率
    EffectTime: number[]; // 技能持续时间
}