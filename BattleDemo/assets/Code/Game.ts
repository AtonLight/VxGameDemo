import { _decorator, Component, Node } from 'cc';
import { BattleFlow } from './BattleFlow'; 
import { View } from './View';
import { Load } from './Load';
import { Tools } from './Tools';
import { Control } from './Control';
const { ccclass, property } = _decorator;


export class Item  {
    static battleFlow:BattleFlow;
    static view:View;
    static load:Load;
    static tools:Tools;
    static control:Control;
}


