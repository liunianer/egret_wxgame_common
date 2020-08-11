class Redao_zidan extends RoleBulletBase{
    public constructor(){
        super();
        this.skinName='Redao_zidanSkin';
    }

    public _damage:number = 20;
    public _speed:number=10;
    public init(){
        this.anchorOffsetX=this.width/2;
        this.anchorOffsetY=this.height/2;
        this._body = P2converEgret.addBullet(this)
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addtostage,this);
    }

    private addtostage(){
        this._damage=(DataConfig.skill_data[0]*5+20-5);
    }
}