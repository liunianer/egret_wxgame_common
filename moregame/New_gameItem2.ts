class New_gameItem2 extends eui.ItemRenderer implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName='New_gameItem2Skin';
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this._touch,this);

		
	}

	private _touch(){
		console.log('touch');
		MoreItem.touchToApp(this.data)
	}

	protected dataChanged(){
		// console.log(this.data);
	}
}