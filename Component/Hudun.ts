class Hudun extends UiBase{
    public constructor(){
        super();
        this.skinName='';
    }

    public armatureDisplay: dragonBones.EgretArmatureDisplay;
	public init(){
        // this.p2_body = P2converEgret.addBody(this,p2.Body.DYNAMIC);
        this.armatureDisplay = Common.creatDragonbones('hudun');

        this.addChild(this.armatureDisplay);
        this.armatureDisplay.x=this.width/2;
		this.armatureDisplay.y=this.height/2;
		this.anchorOffsetX=this.width/2;
		this.anchorOffsetY=this.height/2;

        this.star();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.star,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.stop,this);

        this.armatureDisplay.addDBEventListener(egret.Event.LOOP_COMPLETE,this.complete,this);
    }

    private complete(){
		
		if(this.armatureDisplay.animation.lastAnimationName=='animation'){
            // SceneManager.removeScene(this);
            // RecyclingPool.recycle(this);
        }
    }

    private star(){
        // P2converEgret.world.addBody(this.p2_body);
        this.armatureDisplay.animation.play('animation',0);
    }

    private stop(){
        this.armatureDisplay.animation.stop();
    }
}