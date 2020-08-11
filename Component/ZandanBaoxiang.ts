class ZandanBaoxiang extends UiBase{
    public constructor(){
        super();
        this.skinName='ZandanBaoxiangSkin';
    }
    public p2_body:p2.Body;
    public bx:eui.Image;

	public init(){
        
        this.anchorOffsetX=this.width/2;
        this.anchorOffsetY=this.height/2;
       
        this.p2_body = P2converEgret.addBullet(this);
                
        this.door();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,()=>{
            egret.Tween.removeTweens(this.bx);
        },this);
    }


    public door(){
        egret.Tween.get(this.bx,{loop:true}).to({y:-30},500).to({y:0},500);
        P2converEgret.world.addBody(this.p2_body);
    }
}