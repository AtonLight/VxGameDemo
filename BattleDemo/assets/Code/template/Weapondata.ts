/* Weapondata.ts
* Created by Lee on 2023-01.
*/

// PRIMARY KEY => IWeapondata
export const Weapondata = {
	['20001']: { ID: 20001, Name: "屠龙刀", Attack: 25.0, ThrowDamage: 1.2, Times: 3, BaseThrow: 0.2, DoubleHit: 0.3, CriticalStrike: 0.2, CriticalDamage: 0.2, Dodge: 0.2, Block: 0.2 },
	['20002']: { ID: 20002, Name: "倚天剑", Attack: 35.0, ThrowDamage: 1.2, Times: 3, BaseThrow: 0.3, DoubleHit: 0.3, CriticalStrike: 0.3, CriticalDamage: 0.2, Dodge: 0.3, Block: 0.3 }
};

export interface IWeapondata {
    ID: number; // ID (PRIMARY KEY)
    Name: string[]; // 名字
    Attack: number[]; // 攻击加成
    ThrowDamage: number[]; // 投掷伤害
    Times: number[]; // 次数
    BaseThrow: number[]; // 基础投掷率
    DoubleHit: number[]; // 连击率加成
    CriticalStrike: number[]; // 暴击率加成
    CriticalDamage: number[]; // 暴伤加成
    Dodge: number[]; // 闪避率加成
    Block: number[]; // 格挡率加成
}