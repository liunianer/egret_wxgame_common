class Monster04 extends MonsterBase{
    public constructor(){
        super();
        this.skinName='Monster04Skin';
    }

    public point:eui.Rect;

    public old_hp:number = 300;
    public _hp = 300;
    public _gold = 3;

    public _data =[{state:'b',harm:28,hp:160,gold:10},{state:'a',harm:56,hp:240,gold:15},{state:'s',harm:84,hp:480,gold:20}]

    // public armatureDisplay: dragonBones.EgretArmatureDisplay;
	public init(){
        
        // this.armatureDisplay = Common.creatDragonbones('xiaoguai4');
        
        // this.width=this.width*0.7;
        // this.height=this.height*0.7;
        // this.armatureDisplay.scaleX  = this.armatureDisplay.scaleY= 0.7;

        // this.addChild(this.armatureDisplay);
        // this.armatureDisplay.x=this.width/2;
		// this.armatureDisplay.y=this.height;
		this.anchorOffsetX=this.width/2;
		this.anchorOffsetY=this.height/2;
        // this.armatureDisplay.addDBEventListener(egret.Event.LOOP_COMPLETE,this.complete,this);
        
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);

		let t = setInterval(()=>{
            if(this.kaiqiang_flag){
                this._kaiqiang();
            }
        },3000+Math.random()*1000);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,()=>{
            clearInterval(t);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        },this);
        
        this._zou();

    }
    
    private complete(){
		
		// if(this.armatureDisplay.animation.lastAnimationName=='kaiqiang'){
        //     // console.log('开枪');
        //     this._zou();
        //     // console.log(this.point.parent.localToGlobal(this.point.x,this.point.y));
        //     // this.scaleX=this.scaleX*-1;
        // }

    }
    
    private point_xy = new egret.Point();
    private _showzidan(_angle){
        if(!this.parent){
            return;
        }
        this.point.parent.localToGlobal(this.point.x,this.point.y,this.point_xy);
        this.parent.globalToLocal(this.point_xy.x,this.point_xy.y,this.point_xy);
        let zidan = RecyclingPool.getBullet(3);
        this.parent.addChildAt(zidan,0);
        zidan._damage=this._harm;
        zidan.x = this.point_xy.x;
        zidan.y = this.point_xy.y;
        let angle = _angle;
        zidan.rotation = angle;
        zidan._angle = angle;
        zidan._body.angle = P2converEgret.convertEgretAngleToP2(angle);
        zidan._body.position=[P2converEgret.convertEgretValueToP2(this.point_xy.x),P2converEgret.convertEgretY_To_P2Y(this.point_xy.y)];
        P2converEgret.world.addBody(zidan._body);
    }

    public _zou(){
		// this.armatureDisplay.animation.play('zou',0);
    }
    
    public _kaiqiang(){
        for(let i=0;i<3;i++){
            setTimeout(()=>{
                // let angle = 45*(i+1);
                let angle = 90;
                this._showzidan(angle);
            },150*i);
        }
        BGM.playEffect(7);
		// this.armatureDisplay.animation.play('kaiqiang',1);
    }
    
    private enterFrameHandler(e: egret.Event) {
        if(!this.p2_body){
            return
        }
        this.p2_body.position[0] += 0.9 * this.scaleX /50;
        this.xuetiao.scaleX = this.scaleX;
	}
}