class RoleBase extends UiBase{
	public constructor() {
		super();
	}
	public playAnimation(num){

	}
	public biaozhi:eui.Image;
	public laolong:eui.Image;

	public _hp:number=1000;
	
	public role_body:p2.Body;
	public ren_body:p2.Body;
	public che_body:p2.Body;
	public speed;
	public jump;

	public over(){
		
	}

	public _kouxue(value:number){

		egret.Tween.removeTweens(this);
		egret.Tween.get(this)
		.to({alpha:0.7},100).to({alpha:0.9},100)
		.to({alpha:0.7},100).to({alpha:0.9},100)
		.to({alpha:0.7},100).to({alpha:0.9},100)
		.to({alpha:0.7},100).to({alpha:0.9},100)
		.to({alpha:0.7},100).to({alpha:1},100);
		this._hp-=value;
        if(this._hp<=0 && this.parent){
            let boom = RecyclingPool.getBoom();
            boom.x=this.x;
            boom.y=this.y;
            this.parent.addChild(boom);
            // this.parent.removeChild(this);
			// P2converEgret.world.removeBody(this.p2_body);
			// console.log('死亡')
		}
		let kx = RecyclingPool.getKouxue();
		kx.x = this.x;
		kx.y = this.y;
		this.parent.addChild(kx);
		kx.updata(value);
		BGM.playEffect(10);
		if(window['wx']){
			wx.vibrateShort({
				success: (res: any) => {},
				fail: (res: any) => {},
				complete: (res: any) => {},
			})
		}
		
	}
}