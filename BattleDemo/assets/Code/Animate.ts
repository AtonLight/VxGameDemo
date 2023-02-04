import { _decorator, Component, Node, sp, tween,Vec3, Label, Prefab,instantiate, Tween} from 'cc';
import { Item } from './Game';
import { BattleFlowEnum } from './Enum';
import { Character } from './Character';
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Animate extends Component {
    @property({ type:  sp.Skeleton})
    private BA = null;
    @property({ type:  sp.Skeleton})
    private DW = null;
    @property({ type:  Node})
    private AtkNode = null;
    @property({ type:  Node})
    private DefNode = null;
    @property({ type:  Node})
    private uiNode = null;
    @property({ type:  Prefab})
    private txtDamage = null;
    private atkSpine : sp.Skeleton;
    private defSpine: sp.Skeleton;
    private txtAtkDamage : Label;
    private txtDefDamage : Label;

    private pos_porigin:Vec3;
    private pos_Attack:Vec3;
    private BA_origin:Vec3 = new Vec3(-275,330,0);
    private BA_Attack:Vec3 = new Vec3(-40,330,0);
    private DW_origin:Vec3 = new Vec3(265,330,0);
    private DW_Attack:Vec3 = new Vec3(-40,330,0);

    private pos_txtBA:Vec3 = new Vec3(-300,650,0);
    private pos_txtDW:Vec3 = new Vec3(300,650,0);

    private damageMsg:string;

    private tw :any;
    private BA_tween:any;
    private DW_tween:any;

    onLoad(){
      /*this.BA_origin = new Vec3(-275,330,0);
      this.BA_Attack = new Vec3(-40,330,0);
      this.DW_origin = new Vec3(265,330,0);
      this.DW_Attack = new Vec3(-40,330,0);
  
      this.pos_txtBA = new Vec3(250,1630,0);
      this.pos_txtDW = new Vec3(810,1630,0);*/
    }

    start() {
      /*tween(this.bone.node).to(0.5,{position:new Vec3(300, 0,0)}).call(()=>{
        this.setTrack();
      }).start();*/
    }

    public setAnimate(){
      if(Item.battleFlow.attackCharacter.id == 10001){
        //this.txtAtkDamage = this.txtBA;
        //this.txtDefDamage = this.txtDW;
       // this.AtkNode.addChild(this.BA.node);
       // this.DefNode.addChild(this.DW.node);
        this.atkSpine = this.BA;
        this.defSpine = this.DW;
        this.BA.node.parent = this.AtkNode;
        this.DW.node.parent = this.DefNode;
        this.pos_porigin = this.BA_origin;
        this.pos_Attack = this.BA_Attack;
      }else if(Item.battleFlow.attackCharacter.id == 10002){
        //this.txtAtkDamage = this.txtDW;
        //this.txtDefDamage = this.txtBA;
        //this.AtkNode.addChild(this.DW.node);
        //this.DefNode.addChild(this.BA.mode);
        this.atkSpine = this.DW;
        this.defSpine = this.BA;
        this.BA.node.parent = this.DefNode;
        this.DW.node.parent = this.AtkNode;
        this.pos_porigin = this.DW_origin;
        this.pos_Attack = this.DW_Attack;
      }
    }

    public setBattleAniamte(value:string){
      if(Item.battleFlow.defineCharacter.isDodge){
        this.damageMsg = "闪避"
      }else if(Item.battleFlow.defineCharacter.isBlock){
          this.damageMsg = "格挡"
      }else if(Item.battleFlow.attackCharacter.isDodge){
            this.damageMsg = " 暴击-"+value
      }else if(Item.battleFlow.attackCharacter.isDodge){
          this.damageMsg = " 连击-"+value
      }else{
        this.damageMsg = "-"+value
      }
      this.goAhead();
    }
     goAhead(){
      this.atkSpine.setAnimation(0, "Move", true);
        tween(this.atkSpine.node).to(0.5,{position:this.pos_Attack}).call(()=>{
            this.setTrack();
        }).start();
    }


    public retreat(){
      this.atkSpine.setAnimation(0, "Move", true);
      this.atkSpine.node.scale = new Vec3(-this.atkSpine.node.scale.x,1,1)
      tween(this.atkSpine.node).to(0.2,{position:this.pos_porigin})
      .call(()=>{
          this.atkSpine.node.scale = new Vec3(-this.atkSpine.node.scale.x,1,1)
          this.atkSpine.setAnimation(0, "Idle", true);
          if(Item.battleFlow.defineCharacter.currentHealth > 0){
            Item.battleFlow.nextFlow(BattleFlowEnum.NextTurn);
          }
      })
      .start();
    }

    setTrack(){
      let entry = this.atkSpine.setAnimation(0, "atk", false);
      let start = Date.now();

      /**

      * 给Spine动画添加事件侦听

      * @see http://zh.esotericsoftware.com/spine-events

      * */

      this.atkSpine.setTrackEventListener(entry, (trackIndex, event) => {
          this.setDamageMsg();
          Item.battleFlow.defineCharacter.setCurrHealth();
          if(Item.battleFlow.defineCharacter.currentHealth > 0){
            Item.view.setBattleMsg();
            let entry = this.defSpine.setAnimation(0, "Damaged", false);
            this.defSpine.setTrackCompleteListener(entry,()=>{
              this.defSpine.setAnimation(0, "Idle", true);
            })
          }else{
            Item.view.setFinalMsg();
            let entry = this.defSpine.setAnimation(0, "Death", false);
            this.defSpine.setTrackCompleteListener(entry,()=>{
              this.defSpine.setAnimation(0, "Fail", true);
          })
          }
      });
      this.atkSpine.setTrackCompleteListener(entry,()=>{
        this.retreat();
      })
    }

    setWeaponMsg(msg:string){
      let txt =  instantiate(this.txtDamage)
      this.uiNode.addChild(txt);
      txt.getComponent(Label).string = msg;

      let fromPos;
      //this.clearAnimate(Item.battleFlow.attackCharacter.id)
      if(Item.battleFlow.attackCharacter.id == 10001){
        txt.setPosition(this.pos_txtBA); 
        //this.BA_tween.stop();
      }else if(Item.battleFlow.attackCharacter.id == 10002){
        txt.setPosition(this.pos_txtDW); 
        //this.DW_tween.stop();
      }

      let tw = tween(txt)
      /*.to(0.2,{scale:new Vec3(1.2,1.2,1)})
      .delay(0.3)
      .call(()=>{
            txt.destroy();
        })
      .start();*/

      if(Item.battleFlow.attackCharacter.id == 10001){
        this.BA_tween = tw;
      }else if(Item.battleFlow.attackCharacter.id == 10002){
        this.DW_tween = tw;
      }

      tw.to(0.2,{scale:new Vec3(1.2,1.2,1)})
      .delay(0.3)
      .call(()=>{
            txt.destroy();
        })
      .start();

    }

    setSkillMsg(char:Character,msg:string){
      let txt =  instantiate(this.txtDamage)
      this.uiNode.addChild(txt);
      txt.getComponent(Label).string = msg;

      let fromPos;

      //this.clearAnimate(char.id)
      if(char.id == 10001){
        txt.setPosition(this.pos_txtBA); 
        //this.BA_tween.stop();
      }else if(Item.battleFlow.attackCharacter.id == 10002){
        txt.setPosition(this.pos_txtDW); 
        //this.DW_tween.stop();
      }

      let tw = tween(txt)

      if(char.id == 10001){
         this.BA_tween = tw;
      }else if(Item.battleFlow.attackCharacter.id == 10002){
        this.DW_tween = tw;
      }

      tw.to(0.2,{scale:new Vec3(1.2,1.2,1)})
      .delay(0.3)
      .call(()=>{ 
            txt.destroy();
        })
      .start();
    }

    setDamageMsg(){
      let txt =  instantiate(this.txtDamage)
      this.uiNode.addChild(txt);
      txt.getComponent(Label).string = this.damageMsg;
      let toPos,fromPos;
      if(Item.battleFlow.attackCharacter.id == 10001){
        toPos = new Vec3(this.pos_txtBA.x - 50,this.pos_txtBA.y,0);
        txt.setPosition(this.pos_txtDW);
      }else if(Item.battleFlow.attackCharacter.id == 10002){
        toPos = new Vec3(this.pos_txtDW.x + 50,this.pos_txtDW.y,0);
        txt.setPosition(this.pos_txtBA);
      }

      let tw = tween(txt)
      .to(0.2,{scale:new Vec3(1.2,1.2,1)})
      .delay(0.3)
      .call(()=>{
          txt.destroy();
      });

      tw.start();
    }

    public animateReset(){
      Tween.stopAll();
      this.BA.setAnimation(0,"Idle",true);
      this.BA.node.setPosition(this.BA_origin);
      this.DW.setAnimation(0,"Idle",true);
      this.DW.node.setPosition(this.DW_origin);
  }

  private clearAnimate(id:number){
    if(id == 10001 && this.BA_tween != null){
      this.BA_tween.stop();
   }else if(id == 10002 &&  this.DW_tween != null){
      this.DW_tween.stop();
   }

  }

    update(deltaTime: number) {
        
    }
}


