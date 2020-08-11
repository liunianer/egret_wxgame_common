class Monster_zidan2 extends MonsterBulletBase{
    public constructor(){
        super();
        this.skinName='Monster_zidan2Skin';
    }
    public _speed:number = 5;
    public init(){
        this.anchorOffsetX=this.width/2;
        this.anchorOffsetY=this.height/2;

        this._body = P2converEgret.addBullet(this);
    }
}