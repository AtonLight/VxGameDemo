import { _decorator, Component, Node } from 'cc';
import { Item } from './Game';
import { Weapondata,IWeapondata} from './template/Weapondata';
const { ccclass, property } = _decorator;

@ccclass('Weapon')
export class weapon  {
  attack: number; // 攻击加成
  times: number; // 次数
  baseThrow: number; // 基础投掷率
  ThrowDamage:number;// 投掷伤害加成
  doubleHit: number; // 连击率加成
  criticalStrike: number; // 暴击率加成
  criticalDamage:number;//暴伤加成
  dodge: number; // 闪避率加成
  block: number; // 格挡率加成
  weaponName:string;//武器名字
    data:IWeapondata;
    constructor(dataName:string) { 
      this.data = Weapondata[dataName];
      this.weaponName = Weapondata[dataName].Name;
      this.attack = Weapondata[dataName].Attack;
      this.times = Weapondata[dataName].Times;
      this.baseThrow = Weapondata[dataName].BaseThrow;
      this.ThrowDamage = Weapondata[dataName].ThrowDamage;
      this.doubleHit = Weapondata[dataName].DoubleHit;
      this.criticalStrike = Weapondata[dataName].CriticalStrike;
      this.criticalDamage = Weapondata[dataName].CriticalDamage;
      this.dodge = Weapondata[dataName].Dodge;
      this.block = Weapondata[dataName].Block;
    }  
    
}


