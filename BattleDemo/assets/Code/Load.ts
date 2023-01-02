import { _decorator, Component, Node ,resources,JsonAsset,error} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Load')
export class Load  {
    weaponData:object;

    constructor() { 
        this.loadData('weapon');
      }  
    start() {

    }

    update(deltaTime: number) {
        
    }

   public loadData(dataName:string):any
    {
         let js:object = null;
        resources.load(dataName, (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            // 获取到 Json 数据
            //console.log(res.json!);
            //return res.json!;
            this.weaponData = res.json;
            console.log(this.weaponData);
        })
    }
}


