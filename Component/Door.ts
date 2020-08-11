class Door extends UiBase{
    public constructor(){
        super();
        this.skinName='DoorSkin';
    }
    public p2_body:p2.Body;
    public armatureDisplay: dragonBones.EgretArmatureDisplay;
	public init(){
        
        this.anchorOffsetX=this.width/2;
        this.anchorOffsetY=this.height/2;
        this.armatureDisplay = Common.creatDragonbones('door');
        
        // this.armatureDisplay.scaleX  = this.armatureDisplay.scaleY= 0.5;

        this.addChild(this.armatureDisplay);
        this.armatureDisplay.x=this.width/2;
		this.armatureDisplay.y=this.height/2;

        this.p2_body = P2converEgret.addBullet(this);
        // this.armatureDisplay.addDBEventListener(egret.Event.LOOP_COMPLETE,this.complete,this);
                
        this.door();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,()=>{
            this.armatureDisplay.animation.stop();
        },this);
    }


    public door(){
        this.armatureDisplay.animation.play('animation',0);
        P2converEgret.world.addBody(this.p2_body);
    }
}