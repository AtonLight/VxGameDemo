import { _decorator, Component, Node } from 'cc';
import { Item } from './Game';
import { Character } from './Character';
import { BattleFlowEnum,CharacterType,SkillTurn} from './Enum';
const { ccclass, property } = _decorator;


export class BattleFlow  {
    
    characters:Character[];
    attackCharacter:Character;
    defineCharacter:Character;
    action:boolean = false;
    times:number = 0;
    turn:number = 1;
    skillTime:number = 0;
    private totalTime:number = 0;
    constructor() { 
        this.action = false;
        this.times= 0;
    }  


    public update(deltaTime: number) {
       if(this.action == true){
            this.times = this.times + deltaTime;
            this.totalTime = this.totalTime + this.times;
            this.skillTime = this.skillTime+ deltaTime;
            if (this.times>= 0.15){
                for(let i = 0;i< this.characters.length;i++){
                    this.characters[i].currentSpeed = this.characters[i].currentSpeed + this.characters[i].speed
                    if (this.characters[i].currentSpeed>= 100){
                        this.action = false;
                        this.setAttackAndDenfine(i);
                        break;
                    }
                }
                this.times = 0;
            }

            if (this.skillTime >= 0.25){
                Item.skillMgr.update();
                this.skillTime = 0;
            }
       }
    }

    public initBattle(){
        Item.view.reset();
        this.action = false;
        this.characters = new Array();
        this.characters[0] = new Character(10001,CharacterType.First);
        this.characters[1] = new Character(10002,CharacterType.Second);
        this.times  = 0;
        this.turn = 1;
        this.action = true;
        this.characters[0].setCurrHealth();
        this.characters[1].setCurrHealth();

        Item.skillMgr.addCharactor(this.characters[0]);
        //Item.skillMgr.addCharactor(this.characters[1]);

        Item.animate.animateReset();
        Item.skillMgr.excuteByTurn(SkillTurn.BATTLE_START);
    }

    setAttackAndDenfine(index:number){
        if(index == 0){
            this.attackCharacter = this.characters[0]
            this.defineCharacter = this.characters[1]
        }else{
            this.attackCharacter = this.characters[1]
            this.defineCharacter = this.characters[0]
        }
        Item.animate.setAnimate();
        this.nextFlow(BattleFlowEnum.GetWeapon);
    }

    nextFlow(flow:BattleFlowEnum){
        if(flow == BattleFlowEnum.GetWeapon){
            this.attackCharacter.RandomWeapon();
        }else if(flow == BattleFlowEnum.ThrowWeapon){
            this.attackCharacter.throwWeapon();
        }else if(flow == BattleFlowEnum.Attack){
            Item.skillMgr.excuteByTurn(SkillTurn.PRE_ATTACK,this.attackCharacter)
            this.setDamage(this.attackCharacter.Attacks())
        }else if(flow == BattleFlowEnum.NextTurn){
            this.attackCharacter.resetSpeed();
            this.attackCharacter.resetState();
            this.defineCharacter.resetState();
            this.turn ++;
            this.action = true;
        }
    }

    setDamage(damage:number){
        if(this.defineCharacter.dodgeAndBlock() == false){
            this.defineCharacter.getDamage(damage)
           /* if(this.defineCharacter.getDamage(damage)){
               /* setTimeout(()=>{
                    this.attackCharacter.setTotalDamge(damage);
                    this.attackCharacter.resetSpeed();
                    this.turn ++;
                    this.action = true;
                },0.5)
            }
        }else{
            setTimeout(()=>{
                //this.nextFlow(BattleFlowEnum.NextTurn)
            },0.5)*/
        }
    }

    getTotalTime(){
        return this.totalTime;
    }

}


