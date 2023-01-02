/*  DBMacros.ts
* Created by Lee on 2023-01.
*/
import {Weapondata, IWeapondata} from './template/Weapondata';
import {Characterdata, ICharacterdata} from './template/Characterdata';

// @ts-ignore
function DB_ARRAY(_DATA_, _ARRAY_){if (null == _ARRAY_) { let keys = Object.keys(_DATA_);_ARRAY_ = [];for(let k of keys) {let v = _DATA_[k];_ARRAY_.push(v);}}return _ARRAY_; }
// _KEY_ (PRIMARY KEY)
function DB_ARRAY_ITEM(_DATA_:any, _KEY_:string) { return _DATA_[_KEY_]; }

let pWeapondataArr:IWeapondata[] = null;
export function DB_WEAPONDATA_ARRAY():IWeapondata[]{ return DB_ARRAY(Weapondata, pWeapondataArr); }
export function DB_WEAPONDATA_ITEM(_KEY_:string):IWeapondata { return DB_ARRAY_ITEM(Weapondata, _KEY_); }

let pCharacterdataArr:ICharacterdata[] = null;
export function DB_CHARACTERDATA_ARRAY():ICharacterdata[]{ return DB_ARRAY(Characterdata, pCharacterdataArr); }
export function DB_CHARACTERDATA_ITEM(_KEY_:string):ICharacterdata { return DB_ARRAY_ITEM(Characterdata, _KEY_); }

