class Role_zidan2 extends RoleBulletBase{
    public constructor(){
        super();
        this.skinName='Role_zidan2Skin';
    }

    public _damage:number = 100;
    public _speed:number=10;
    public init(){
        this.anchorOffsetX=this.width/2;
        this.anchorOffsetY=this.height/2;

        this._body = P2converEgret.addBullet(this);
    }
}