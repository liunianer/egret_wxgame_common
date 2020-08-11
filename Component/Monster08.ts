class Monster08 extends MonsterBase{
    public constructor(){
        super();
        this.skinName='Monster08Skin';
    }
    
    public point:eui.Rect;

    public old_hp:number = 400;
    public _hp = 400;
    public _gold = 4;

    public state =0;
    public _data =[{state:'b',harm:4,hp:80,gold:5},{state:'a',harm:8,hp:160,gold:7},{state:'s',harm:12,hp:240,gold:10}]

    private now_x=0;
    public armatureDisplay: dragonBones.EgretArmatureDisplay;
	public init(){
        
        this.armatureDisplay = Common.creatDragonbones('xiezi');
        

        // this.width=this.width*0.7;
        // this.height=this.height*0.7;
        // this.armatureDisplay.scaleX  = this.armatureDisplay.scaleY= 0.7;

        this.addChildAt(this.armatureDisplay,1);
        this.armatureDisplay.x=this.width/2;
		this.armatureDisplay.y=this.height;
		this.anchorOffsetX=this.width/2;
		this.anchorOffsetY=this.height/2;
        this.armatureDisplay.addDBEventListener(egret.Event.LOOP_COMPLETE,this.complete,this);
        
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);

        this.now_x = this.x;
		let t = setInterval(()=>{
            if(Math.abs(this.now_x - this.x)<20 && this.jump_flag){
                this.p2_body.velocity[1] = 10;
                this.stop_=true;
                setTimeout(() => {
                    this.stop_=false;
                }, 300);
            }else{
                if(this.kaiqiang_flag){
                    this._kaiqiang();
                }
            }
            this.now_x = this.x;
        },4000+Math.random()*1000);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,()=>{
            clearInterval(t);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        },this);
        
        this._zou();

        // setInterval(()=>{
        //     this._kaiqiang();
        // },2000);
    }
    
    private complete(){
		
		if(this.armatureDisplay.animation.lastAnimationName=='kaiqiang'){
            // console.log('开枪');
            this._showzidan();
            this._zou();
            BGM.playEffect(7);
            // console.log(this.point.parent.localToGlobal(this.point.x,this.point.y));
            // this.scaleX=this.scaleX*-1;
        }

    }
    private point_xy = new egret.Point();
    private _showzidan(){
        if(!this.parent){
            return;
        }
        this.point.parent.localToGlobal(this.point.x,this.point.y,this.point_xy);
        this.parent.globalToLocal(this.point_xy.x,this.point_xy.y,this.point_xy);
        let zidan = RecyclingPool.getBullet(2);
        this.parent.addChildAt(zidan,0);
        zidan._damage=this._harm;
        zidan.x = this.point_xy.x;
        zidan.y = this.point_xy.y;
        let angle = this.scaleX==1? 0:180;
        zidan.rotation = angle;
        zidan._angle = angle;
        zidan._body.angle = P2converEgret.convertEgretAngleToP2(angle);
        zidan._body.position=[P2converEgret.convertEgretValueToP2(this.point_xy.x),P2converEgret.convertEgretY_To_P2Y(this.point_xy.y)];
        P2converEgret.world.addBody(zidan._body);
    }

    public _zou(){
		this.armatureDisplay.animation.play('zou',0);
    }
    
    public _kaiqiang(){
        // for(let i=0;i<3;i++){
            // setTimeout(()=>{
                // this._showzidan();
        //     },150*i);
        // }
		this.armatureDisplay.animation.play('kaiqiang',1);
    }
    
    private stop_=false;
    private enterFrameHandler(e: egret.Event) {
        if(this.stop_ && this.kaiqiang_flag){
            return
        }
        if(!this.p2_body){
            return
        }
        this.p2_body.position[0] += 1 * this.scaleX /50;
        this.xuetiao.scaleX = this.scaleX;

	}
}