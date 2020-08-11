class Index_gameItem2 extends eui.ItemRenderer implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName='Index_gameItem2Skin';
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

    public g_:eui.Group;

	protected childrenCreated():void
	{
		super.childrenCreated();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this._touch,this);
        egret.Tween.get(this.g_,{loop:true}).to({rotation:10},200)
		.to({rotation:0},200)
		.to({rotation:-10},200)
		.to({rotation:0},200).wait(Math.random()*2000);
	}

	private _touch(){
		console.log('touch');
		MoreItem.touchToApp(this.data)
	}

	protected dataChanged(){
		// console.log(this.data);
	}
	
}