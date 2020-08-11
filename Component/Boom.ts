class Boom extends UiBase{
    public constructor(){
        super();
        this.skinName='BoomSkin';
    }

    public armatureDisplay: dragonBones.EgretArmatureDisplay;
	public init(){
        
        this.anchorOffsetX=this.width/2;
        this.anchorOffsetY=this.height/2;
        this.armatureDisplay = Common.creatDragonbones('boom');
        
        this.armatureDisplay.scaleX  = this.armatureDisplay.scaleY= 0.5;

        this.addChild(this.armatureDisplay);
        this.armatureDisplay.x=this.width/2;
		this.armatureDisplay.y=this.height/2;
		this.anchorOffsetX=this.width/2;
		this.anchorOffsetY=this.height/2;
        this.armatureDisplay.addDBEventListener(egret.Event.LOOP_COMPLETE,this.complete,this);
                
        this.boom();

    }

    private complete(){
		
		if(this.armatureDisplay.animation.lastAnimationName=='boom'){
            SceneManager.removeScene(this);
            RecyclingPool.recycle(this);
        }

	}

    public boom(){
        this.armatureDisplay.animation.play('boom',1);
    }
}