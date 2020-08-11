class Monster_zidan3 extends MonsterBulletBase{
    public constructor(){
        super();
        this.skinName='Monster_zidan3Skin';
    }
    public _speed:number = 5;
    public init(){
        this.anchorOffsetX=this.width/2;
        this.anchorOffsetY=this.height/2;

        this._body = P2converEgret.addBullet(this);

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addtostage,this);
    }

    private c;
    private addtostage(){
        this.genzong= true;
        clearTimeout(this.c);
        this.c=setTimeout(() => {
            this.genzong = false;
        }, 1000);
    }

    public genzong=false;
}