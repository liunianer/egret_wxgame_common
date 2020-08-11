class Gold extends UiBase{
    public constructor(){
        super();
        this.skinName='GoldSkin';
        
    }

    public value = 5;

    public p2_body:p2.Body;
    public armatureDisplay: dragonBones.EgretArmatureDisplay;
	public init(){
        this.p2_body = P2converEgret.addBody(this,p2.Body.DYNAMIC);
        this.armatureDisplay = Common.creatDragonbones('gold');

        this.addChild(this.armatureDisplay);
        this.armatureDisplay.x=this.width/2;
		this.armatureDisplay.y=this.height/2;
		this.anchorOffsetX=this.width/2;
		this.anchorOffsetY=this.height/2;

        this.star();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.star,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.stop,this);
   
    }

    public remove_(){
        P2converEgret.world.removeBody(this.p2_body);
		if(this.parent){
			this.parent.removeChild(this);
        }
        RecyclingPool.recycle(this);
	}

    private star(){
        if(this.p2_body){
            P2converEgret.world.removeBody(this.p2_body);
            this.p2_body.displays=[];
        }
        this.p2_body = P2converEgret.addBody(this,p2.Body.DYNAMIC);
        P2converEgret.world.addBody(this.p2_body);
        this.p2_body.position=[P2converEgret.convertEgretValueToP2(this.x),P2converEgret.convertEgretY_To_P2Y(this.y)];
        this.p2_body.angle=0;
        this.armatureDisplay.animation.play('animation',0);
    }

    private stop(){
        this.armatureDisplay.animation.stop();
    }
}