class Monster_zidan1 extends MonsterBulletBase{
    public constructor(){
        super();
        this.skinName='Monster_zidan1Skin';
    }

    public _speed:number=8;
    public init(){
        this.anchorOffsetX=this.width/2;
        this.anchorOffsetY=this.height/2;

        this._body = P2converEgret.addBullet(this);
    }
}