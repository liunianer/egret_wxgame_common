class riverItem1 extends eui.ItemRenderer implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName='riverItem1Skin';
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public guang:eui.Image;
	public mask_:eui.Rect;
	public new:eui.Image;
	public dian:eui.Image;

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this._touch,this);
		

	
	}

	private _touch(){
		console.log('touch');
		MoreItem.touchToApp(this.data);
	}

	protected dataChanged(){
		// console.log(this.data);
		if(this.data.efftype==1){
			this.guang.source = this.data.effected;
			egret.Tween.get(this.guang,{loop:true}).to({x:155,y:-155},1000)
		}
		if(this.data.efftype==2){
			this.new.source = this.data.effected;
				egret.Tween.get(this.new,{loop:true})
				.to({scaleY:1.1},800,egret.Ease.bounceOut)
		}
		if(this.data.efftype==3){
			this.dian.source = this.data.effected;
			egret.Tween.get(this.dian,{loop:true})
			.to({scaleX:0.9,scaleY:0.9},300,egret.Ease.bounceOut)
			.to({scaleX:1,scaleY:1},200,egret.Ease.bounceOut)
		}
	}
}