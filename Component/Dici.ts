class Dici extends UiBase{
    public constructor(){
        super();
        this.skinName='DiciSkin';
    }

    public p2_body:p2.Body;
    public positon_x=0;
    public positon_y=0;
    public move = 100;

    public init(){
        this.anchorOffsetX=this.width/2;
		this.anchorOffsetY=this.height/2;
        this.p2_body = P2converEgret.addBullet(this);
        this.updata_xy();
        this.move_out();

    }

    public updata_xy(){
        this.positon_x= this.p2_body.position[0];
        this.positon_y= this.p2_body.position[1];
    }

    public move_in(){
        if(!this.parent){
            return;
        }
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({factor_y:this.positon_y},Math.abs(this.move*10)).wait(5000).call(this.move_out,this);
	}

    public move_out(){
        if(!this.parent){
            return;
        }
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({factor_y:this.positon_y-this.move/P2converEgret.factor},Math.abs(this.move*10)).wait(5000).call(this.move_in,this);
	}



    public get factor_y():number {
        if(this.p2_body){
            return this.p2_body.position[1];
        }else{
            return 0;
        }
    }

	public set factor_y(value:number) {
        this.p2_body.position[1] = value;
    }
}