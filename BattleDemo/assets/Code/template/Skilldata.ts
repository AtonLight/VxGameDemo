/* Skilldata.ts
* Created by Lee on 2023-01.
*/

// PRIMARY KEY => ISkilldata
export const Skilldata = {
	['30001']: { Id: 30001, Name: "被动1", SkillType: "0.0", SkillEffect: "damage_increase_5", SkillInfo: "伤害增加5点",  SkillProbability: 100, EffectTime: "-1.0" },
	['30002']: { Id: 30002, Name: "主动1", SkillType: "1.0", SkillEffect: "poison_debuff_5", SkillInfo: "中毒每秒掉血5",  SkillProbability: 50, EffectTime: "10.0" }
};

export interface ISkilldata {
    Id: number; // 技能ID (PRIMARY KEY)
    Name: string[]; // 技能名称
    SkillType: string[]; // 技能类型
    SkillEffect: string[]; // 技能效果
    SkillInfo: string[]; // 技能效果描述
     SkillProbability: number[]; // 技能触发几率
    EffectTime: string[]; // 技能持续时间
}