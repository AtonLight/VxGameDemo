/* Characterdata.ts
* Created by Lee on 2023-01.
*/

// PRIMARY KEY => ICharacterdata
export const Characterdata = {
	['10001']: { ID: 10001, Name: "骑士", Weapons: [20001, 20002, 20001, 20001], Health: 500.0, Speed: 15.0, Attack: 25.0, BaseThrow: 0.2, DoubleHit: 0.3, CriticalStrike: 0.2, CriticalDamage: 1.3, Dodge: 0.2, Block: 0.2 },
	['10002']: { ID: 10002, Name: "法师", Weapons: [20001, 20002, 20001, 20002], Health: 500.0, Speed: 15.0, Attack: 35.0, BaseThrow: 0.3, DoubleHit: 0.3, CriticalStrike: 0.3, CriticalDamage: 1.3, Dodge: 0.3, Block: 0.3 }
};

export interface ICharacterdata {
    ID: number; // ID (PRIMARY KEY)
    Name: string[]; // 名字
    Weapons: number[]; // 武器库
    Health: number[]; // 生命值
    Speed: number[]; // 速度
    Attack: number[]; // 基础攻击力
    BaseThrow: number[]; // 基础投掷率
    DoubleHit: number[]; // 基础连击率
    CriticalStrike: number[]; // 基础暴击率
    CriticalDamage: number[]; // 基础暴击伤害
    Dodge: number[]; // 基础闪避率
    Block: number[]; // 基础格挡率
}