class Huoyan extends UiBase{
    public constructor(){
        super();
        this.skinName='HuoyanSkin';
    }

    public p2_body:p2.Body;

    public armatureDisplay: dragonBones.EgretArmatureDisplay;
	public init(){
        this.armatureDisplay = Common.creatDragonbones('huoyan');
        this.addChild(this.armatureDisplay);
        this.armatureDisplay.x=this.width/2;
		this.armatureDisplay.y=this.height;
		this.anchorOffsetX=this.width/2;
		this.anchorOffsetY=this.height/2;
        this.armatureDisplay.addDBEventListener(egret.Event.LOOP_COMPLETE,this.complete,this);
        
        // this._penhuo();
        let i= setInterval(()=>{
            this._penhuo();
        },3000);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,()=>{
			clearInterval(i);
        },this);
        this.p2_body = P2converEgret.addBullet(this);

    }

    public _penhuo(){
        this.is_penhuo=true;
        P2converEgret.world.addBody(this.p2_body);
        this.armatureDisplay.animation.play('huoyan',1);
    }

    public is_penhuo=false;
    private complete(){
		
		if(this.armatureDisplay.animation.lastAnimationName=='huoyan'){
            this.is_penhuo=false;
            P2converEgret.world.removeBody(this.p2_body);
        }

    }
}