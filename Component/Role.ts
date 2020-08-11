class Role extends RoleBase {
	public constructor(loading=false) {
		super();
		this.skinName='RoleSkin';
		this.loading_ = loading;
	}
	private loading_ = false;

	public qiang1:eui.Group;
	public qiangkou1:eui.Rect;
	public huohua1:eui.Image;
	public qiang2:eui.Group;
	public qiangkou2:eui.Rect;
	public huohua2:eui.Image;


	public hudun;

	public armatureDisplay: dragonBones.EgretArmatureDisplay;
	public init(){
		
		if(!this.loading_){
			this.hudun = new Hudun();
			this.hudun.visible=false;
			this.addChild(this.hudun);
		}
		this.armatureDisplay = Common.creatDragonbones('dahuangfeng');
		this.init_wh();
		this.armatureDisplay.scaleX = -1;
		this.addChild(this.armatureDisplay);
		this._daiji();
		this.armatureDisplay.addDBEventListener(egret.Event.LOOP_COMPLETE,this.complete,this);
		console.log('isloading'+this.loading_);
		
		if(this.loading_){
			this._zou();
		}
		

	}
	
	public role_body:p2.Body;
	public ren_body:p2.Body;
	public che_body:p2.Body;

	public speed =5;
	public jump=12;
	public jump_height=150;

	public move(sp){
		if(this.state_=='ren'){
			this.role_body = this.ren_body;
			// this.role_body.velocity[0]=sp;
			this.role_body.position[0]+=sp/50;
		}else{
			this.role_body = this.che_body;
			let ang= P2converEgret.convertP2BodyAngleToEgret(this.role_body)%360;
			// console.log(ang)
			if(ang<45 || ang>315){
				this.role_body.position[0]+=sp/50*1.5;
			}
		}
	}

	private complete(){
		// console.log(this.armatureDisplay.animation.lastAnimationName)
		if(this.armatureDisplay.animation.lastAnimationName=='bianshen' || this.armatureDisplay.animation.lastAnimationName=='bianren'){
			// this.init_wh();
			// this.init_wh();   
			// this.show_qiang(); 
			this.playAnimation(0);
		}
	}

	private init_wh(){
		if(this.state_ =='ren'){
			this.width=90;
			this.height=190;
		}else{
			this.width=200;
			this.height=50;
		}
		this.armatureDisplay.x=this.width/2-8;
		this.armatureDisplay.y=this.height;
		this.anchorOffsetX=this.width/2;
		this.anchorOffsetY=this.height/2;
		if(!this.loading_){
			this.hudun.verticalCenter=0;
			this.hudun.horizontalCenter=0;
		}
		
	}

	public state_ ='ren';
	private ing_index=0;
	/**
	 * 0站立 1跑 2下落 3跳 4切换
	 */
	public playAnimation(num){
		
		if(this.ing_index!=num || num==3){
			switch(num){
				case 0 : this._daiji();
					break;
				case 1 : this._zou();
					break;
				case 2 : this._xialuo();
					break;
				case 3 : this._tiao();
					break;
				case 4 : this._change();
					break;
			}
			this.ing_index=num;
		}
		
	}

	public _change(){
		console.log('change:    '+ this.state_);
		if(this.state_=='ren'){
			this.state_ = 'che';
			this.role_body = this.che_body;

			this.che_body.position[0] = this.ren_body.position[0];
            this.che_body.position[1] = this.ren_body.position[1] + 50 / 50;
            this.che_body.angle = 0;
            P2converEgret.world.removeBody(this.ren_body);
            P2converEgret.world.addBody(this.che_body);
            this.che_body.displays = [this];

			this.armatureDisplay.animation.play('bianshen',1);
		}else{
			this.state_ = 'ren';
			this.armatureDisplay.animation.play('bianren',1);
			this.role_body = this.ren_body;

			this.ren_body.position[0] = this.che_body.position[0];
            this.ren_body.position[1] = this.che_body.position[1] + 120 / 50;
            P2converEgret.world.removeBody(this.che_body);
			P2converEgret.world.addBody(this.ren_body);
            this.ren_body.displays = [this];
			
			
		}
		 this.init_wh();   
		this.show_qiang();        
	}

	public show_qiang(){
		if(this.state_=='ren'){
			this.qiang1.visible=true;
			this.qiang2.visible=false;
		}else{
			this.qiang1.visible=false;
			this.qiang2.visible=true;
		}
	}

	public show_huohua(){
		if(this.state_=='ren'){
			egret.Tween.removeTweens(this.huohua1);
			this.huohua1.visible=true;
			this.huohua1.alpha=1;
			egret.Tween.get(this.huohua1).to({alpha:0},100);

		}else{
			egret.Tween.removeTweens(this.huohua2);
			this.huohua2.visible=true;
			this.huohua2.alpha=1;
			egret.Tween.get(this.huohua2).to({alpha:0},100);
		}
	}

	public _daiji(){
		if(this.state_ =='ren'){
			this.armatureDisplay.animation.play('daiji',0);
		}else{
			this.armatureDisplay.animation.play('chedaiji',0);
		}
	}

	public _zou(){
		if(this.armatureDisplay.animation.lastAnimationName=='tiao'){
			return
		}
		if(this.state_ =='ren'){
			this.armatureDisplay.animation.play('pao',0);
		}else{
			this.armatureDisplay.animation.play('che',0);
		}
	}

	public positon_x=0;
    public positon_y=0;
	public _tiao(){
		if(this.state_ =='che'){
			this.playAnimation(4);
		}
		if(this.state_ =='ren'){
        	this.positon_y= this.ren_body.position[1];
			egret.Tween.removeTweens(this);
			this.alpha=1;
			// console.log('跳');
			this.ren_body.velocity[1]=0;
			egret.Tween.get(this).to({factor_y:this.positon_y+P2converEgret.convertEgretValueToP2(this.jump_height)},300)
			this.armatureDisplay.animation.play('tiao',1);
		}
		
	}

	public _xialuo(){
		this.armatureDisplay.animation.gotoAndPlayByTime('tiao')
	}

	public over(){
		this.armatureDisplay.animation.play('siwang',0);
	}

	public get factor_y():number {
        if(this.ren_body){
            return this.ren_body.position[1];
        }else{
            return 0;
        }
    }

	public set factor_y(value:number) {
		this.ren_body.position[1] = value;
		
    }
}