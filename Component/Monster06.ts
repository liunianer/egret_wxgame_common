class Monster06 extends MonsterBase{
    public constructor(){
        super();
        this.skinName='Monster06Skin';
    }

    public point:eui.Rect;

    public old_hp:number = 800;
    public _hp = 800;
    public _gold = 5;

    public _data =[{state:'b',harm:30,hp:160,gold:17},{state:'a',harm:60,hp:240,gold:19},{state:'s',harm:90,hp:480,gold:35}]
   
	public init(){
        
		this.anchorOffsetX=this.width/2;
		this.anchorOffsetY=this.height/2;
        


        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);

		let t = setInterval(()=>{
            if(this.kaiqiang_flag){
                this._kaiqiang();
            }
        },4000+Math.random()*1000);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,()=>{
            clearInterval(t);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        },this);
        


    }
    
    
    private point_xy = new egret.Point();
    private _showzidan(_angle){
        if(!this.parent){
            return;
        }
        this.point.parent.localToGlobal(this.point.x,this.point.y,this.point_xy);
        this.parent.globalToLocal(this.point_xy.x,this.point_xy.y,this.point_xy);
        let zidan = RecyclingPool.getBullet(5);
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

    
    public _kaiqiang(){
        for(let i=0;i<3;i++){
            setTimeout(()=>{
                // let angle = 20*i+40;
                let angle = 90;
                this._showzidan(angle);
            },150*i);
        }
        BGM.playEffect(6);
    }
    
    private enterFrameHandler(e: egret.Event) {
        if(!this.p2_body){
            return
        }
        this.p2_body.position[0] += 0.7 * this.scaleX /50;
        this.xuetiao.scaleX = this.scaleX;
	}
}