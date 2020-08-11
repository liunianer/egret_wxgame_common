class Role_zidan extends RoleBulletBase{
    public constructor(){
        super();
        this.skinName='Role_zidan1Skin';
        
    }
    public _damage:number = 50;
    public init(){
        this.anchorOffsetX=this.width/2;
        this.anchorOffsetY=this.height/2;

        this._body = P2converEgret.addBullet(this);
    }
}