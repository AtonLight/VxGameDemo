import { _decorator, Component, Node, math, game, Game } from 'cc';
import { weapon } from './Weapon';
import { Item } from './Game';
import { BattleFlowEnum,CharacterType} from './Enum';
import { Characterdata,ICharacterdata } from './template/Characterdata';
const { ccclass, property } = _decorator;


export class Character {
   
    speed:number = 0;
    health:number = 0;
    getWeaponHit:number = 0.5;
    attack: number; // 基础攻击力
    throw: number; // 基础投掷率
    doubleHit: number; // 基础连击率
    criticalStrike: number; // 基础暴击率
    criticalDamage:number;//基础暴伤
    dodge: number; // 基础闪避率
    block: number; // 基础格挡率
    charNme:string;//名字

    data:ICharacterdata;
    charactertype:CharacterType;
    currentWeapon:weapon = null;
    currentSpeed:number = 0;
    isThrowWeapon:boolean = false;
    currentHealth:number = 0;
    weapons:weapon[];

    constructor(dataName:string,type:CharacterType) { 
      this.charactertype = type;
      this.data = Characterdata[dataName]
      this.charNme = Characterdata[dataName].Name;
      this.health = Characterdata[dataName].Health;
      this.currentHealth = this.health;
      this.speed = Characterdata[dataName].Speed;
      this.attack =  Characterdata[dataName].Attack;
      this.throw = Characterdata[dataName].BaseThrow;
      this.doubleHit = Characterdata[dataName].DoubleHit;
      this.criticalStrike = Characterdata[dataName].CriticalStrike;
      this.criticalDamage = Characterdata[dataName].CriticalDamage;
      this.dodge = Characterdata[dataName].Dodge;
      this.block = Characterdata[dataName].Block;
      this.weapons = new Array();
      for(let i = 0;i< this.data.Weapons.length;i++){
          this.weapons[i] = new weapon(Characterdata[dataName].Weapons[i]);
      }
      Item.view.setHeath(this.charactertype,this.currentHealth,this.currentHealth/this.health)
    }  

    public getweapon(index:number){
      this.currentWeapon = this.weapons[index];
      this.attack = this.attack + this.currentWeapon.attack;
      this.throw = this.throw + this.currentWeapon.baseThrow;
      this.doubleHit = this.doubleHit + this.currentWeapon.doubleHit;
      this.criticalStrike = this.criticalStrike + this.currentWeapon.criticalStrike;
      this.dodge = this.dodge + this.currentWeapon.dodge;
      this.criticalDamage = this.criticalDamage + this.currentWeapon.criticalDamage;
      this.block = this.block+ this.currentWeapon.block;
    }

    public removeWeapon(){
      this.attack = this.attack - this.currentWeapon.attack;
      this.throw = this.throw - this.currentWeapon.baseThrow;
      this.doubleHit = this.doubleHit - this.currentWeapon.doubleHit;
      this.criticalStrike = this.criticalStrike - this.currentWeapon.criticalStrike;
      this.dodge = this.dodge - this.currentWeapon.dodge;
      this.criticalDamage = this.criticalDamage - this.currentWeapon.criticalDamage;
      this.block = this.block - this.currentWeapon.block;
    }
    public RandomWeapon(){
      if(this.currentWeapon != null && this.isThrowWeapon){
        this.removeWeapon();
        this.currentWeapon = null;
      }
      if(this.currentWeapon == null && this.weapons.length > 0){
        let ran = math.random();
        if(this.getWeaponHit >= ran){
          let i = math.randomRangeInt(0,this.weapons.length);
          this.getweapon(i);
          this.weapons.splice(i,1);
          Item.view.setTxtBattle(this.charNme+" 获得武器: "+this.currentWeapon.weaponName);
        }
      }

      Item.battleFlow.nextFlow(BattleFlowEnum.ThrowWeapon);
      /*setTimeout(()=>{
        Item.battleFlow.nextFlow(BattleFlowEnum.ThrowWeapon);
      },0.1)*/
    }

    public throwWeapon(){
      if(this.currentWeapon != null){
        let rand = math.random();
        if(this.currentWeapon.baseThrow>= rand || this.currentWeapon.times <= 0){
          this.isThrowWeapon = true;
          //console.log(this.data.ID+"投掷武器:"+this.currentWeapon.data.ID);
          Item.view.setTxtBattle(this.charNme+" 投掷武器:"+this.currentWeapon.weaponName);
        }
      }
      Item.battleFlow.nextFlow(BattleFlowEnum.Attack);
      /*setTimeout(()=>{
        Item.battleFlow.nextFlow(BattleFlowEnum.Attack);
      },0.1)*/
    }

    public Attacks():number{
      let damage = this.attack;
      if (this.isThrowWeapon == true && this.currentWeapon != null){
        damage = this.attack + this.currentWeapon.attack * this.currentWeapon.ThrowDamage;
      }

      if(this.currentWeapon != null){
        this.currentWeapon.times --;
      }

      let rand = math.random();
      if(this.criticalStrike >= rand){
        damage = damage * this.criticalDamage;
        //console.log(this.data.ID+"打出了暴击");
        Item.view.setTxtBattle(this.charNme+" 打出了暴击");
      }
      rand = math.random();
      if(this.doubleHit >= rand){
        damage = damage * 2;
        //console.log(this.data.ID+"打出了连击");
        Item.view.setTxtBattle(this.charNme+" 打出了连击");
      }
      //console.log(this.data.ID+"开始攻击 "+damage);
      return damage;
    }

    public dodgeAndBlock():boolean{
      let rand = math.random();
      if(this.dodge >= rand){
        //console.log(this.data.ID+"闪避了攻击！");
        Item.view.setTxtBattle(this.charNme+" 闪避了攻击！");
        return true;
      }else{
        rand = math.random();
        if(this.block >= rand){
          //console.log(this.data.ID+"格挡了攻击！");
          Item.view.setTxtBattle(this.charNme+" 格挡了攻击！");
          return true;
        }else{
          return false;
        }
      }
    }

    public getDamage(damage:number):boolean{
      this.currentHealth = this.currentHealth - damage;
      Item.view.setTxtBattle(this.charNme+" 受到了"+damage+"点伤害！");
      if (this.currentHealth <= 0){
        //console.log(this.data.ID+"被打败了");
        Item.view.setTxtBattle(this.charNme+" 被打败了");
        this.currentHealth = 0;
        Item.view.setHeath(this.charactertype,this.currentHealth,this.currentHealth/this.health)
        return false;
      }else{
        Item.view.setHeath(this.charactertype,this.currentHealth,this.currentHealth/this.health) 
        return true;
      }
    }

    public resetSpeed(){
      this.currentSpeed = 0;
    }
    update(deltaTime: number) {
        
    }
}


