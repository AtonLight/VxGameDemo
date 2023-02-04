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

export enum SkillTurn{
    BATTLE_START = 0,
    PRE_ATTACK = 1,
}

export enum SkillTarget{
    SELF = 0,
    PARTNER_TEAM = 1,
    EMEMY = 2,
    ENMEMY_TEAM =3,
    SELF_PET = 4,
    ENEMY_PET = 5,
    RAND_PARTNER = 6,
    RAND_ENEMY = 7,
    RAND_SELF_PET = 8,
    RAND_ENEMY_PET = 0,
}
export enum SkillEffectType{
    RUN = 0,
    TICK = 1,
}

export enum SkillEffect{
    POSION = 0,
    DAMAGE_INCREASE = 1,
}

