class riverItem2 extends eui.ItemRenderer implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName='riverItem2Skin'
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
	public d_bg:eui.Image;


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this._touch,this);
		// let n = Math.floor(Math.random()*8)+1;
		// this.d_bg.source = "river_bottom"+n+"_png";
	}

	private _touch(){
		console.log('touch');
		MoreItem.touchToApp(this.data)
	}

	protected dataChanged(){
		// console.log(this.data);
	}
	
}