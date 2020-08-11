class MonsterHP extends MonsterBulletBase{
    public constructor(){
        super();
        this.skinName='MonsterHPSkin';
        
    }

    public xuetiao:eui.Image;

    public init(){
        this.anchorOffsetX=this.width/2;
        this.anchorOffsetY=this.height;
    }

    public updata(now,hp){
        this.xuetiao.width = 60 * now/hp;
    }
}