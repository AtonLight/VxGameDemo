import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum BattleFlowEnum{
    GetWeapon = 0,
    ThrowWeapon = 1,
    Attack = 2,
    Damage = 3,
    NextTurn = 4,
}

export enum CharacterType{
    First = 0,
    Second = 1,
}



