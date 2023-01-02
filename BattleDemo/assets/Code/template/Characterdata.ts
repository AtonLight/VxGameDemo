/* Characterdata.ts
* Created by Lee on 2023-01.
*/

// PRIMARY KEY => ICharacterdata
export const Characterdata = {
	["C001"]: { ID: "C001", Name: "大毛驴", Weapons: ['D001', 'D002', 'D001', 'D001', 'D001'], Health: 100.0, Speed: 15.0, Attack: 25.0, BaseThrow: 0.2, DoubleHit: 0.3, CriticalStrike: 0.2, CriticalDamage: 1.3, Dodge: 0.2, Block: 0.2 },
	["C002"]: { ID: "C002", Name: "小锯鳄", Weapons: ['D001', 'D002', 'D001', 'D001', 'D002'], Health: 100.0, Speed: 15.0, Attack: 35.0, BaseThrow: 0.3, DoubleHit: 0.3, CriticalStrike: 0.3, CriticalDamage: 1.3, Dodge: 0.3, Block: 0.3 }
};

export interface ICharacterdata {
    ID: string; // ID (PRIMARY KEY)
    Name: string[]; // 名字
    Weapons: string[]; // 武器库
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