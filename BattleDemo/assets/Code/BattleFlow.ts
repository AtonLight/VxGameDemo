import { _decorator, Component, Node } from 'cc';
import { Item } from './Game';
import { Character } from './Character';
import { BattleFlowEnum,CharacterType} from './Enum';
const { ccclass, property } = _decorator;


export class BattleFlow  {
    
    characters:Character[];
    attackCharacter:Character;
    defineCharacter:Character;
    action:boolean = false;
    times:number = 0;
    turn:number = 1;
    private totalTime:number = 0;
    constructor() { 
        this.action = false;
        this.times= 0;
    }  


    public update(deltaTime: number) {
       if(this.action == true){
            this.times = this.times + deltaTime;
            this.totalTime = this.totalTime + this.times;
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
       }
    }

    public initBattle(){
        Item.view.reset();
        this.action = false;
        this.characters = new Array();
        this.characters[0] = new Character("C001",CharacterType.First);
        this.characters[1] = new Character("C002",CharacterType.Second);
        console.log(this.characters[0].speed);
        this.times  = 0;
        this.turn = 1;
        this.action = true;
    }

    setAttackAndDenfine(index:number){
        if(index == 0){
            this.attackCharacter = this.characters[0]
            this.defineCharacter = this.characters[1]
        }else{
            this.attackCharacter = this.characters[1]
            this.defineCharacter = this.characters[0]
        }
        this.nextFlow(BattleFlowEnum.GetWeapon);
    }

    nextFlow(flow:BattleFlowEnum){
        if(flow == BattleFlowEnum.GetWeapon){
            this.attackCharacter.RandomWeapon();
        }else if(flow == BattleFlowEnum.ThrowWeapon){
            this.attackCharacter.throwWeapon();
        }else if(flow == BattleFlowEnum.Attack){
            this.setDamage(this.attackCharacter.Attacks())
        }
    }

    setDamage(damage:number){
        if(this.defineCharacter.dodgeAndBlock() == false){
            if(this.defineCharacter.getDamage(damage) == true){
                setTimeout(()=>{
                    this.attackCharacter.setTotalDamge(damage);
                    this.attackCharacter.resetSpeed();
                    this.turn ++;
                    this.action = true;
                },0.5)
            }
        }else{
            setTimeout(()=>{
                this.attackCharacter.resetSpeed();
                this.attackCharacter.resetState();
                this.defineCharacter.resetState();
                this.turn ++;
                this.action = true;
            },0.5)
        }
    }

    getTotalTime(){
        return this.totalTime;
    }

}


