class CheckpointItem extends eui.ItemRenderer implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName='CheckpointItemSkin';
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	public xx:eui.Group;


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this._touch,this);
	}

	private _touch(){
		CreateAd.hideAd();
		DataConfig.now_level=this.data.index;
		// if( DataConfig.shipin_open>0){
		// 	CreateAd.showvideoAd('game');
		// }else{
			DownloadData.downloadJson(DataConfig.now_level);
			SceneManager.removeScene(SceneManager.Instance.checkpointScene);
		// }
	}
	
	protected dataChanged(){
	
		for(let i=0;i<3;i++){
			if(i<this.data.xingxing){
				this.xx.getChildAt(i).visible= true;
			}else{
				this.xx.getChildAt(i).visible= false;
			}
		}
		
		if(this.data.index>DataConfig.level){
			this.enabled = false;
		}else{
			this.enabled = true;
		}

	}

	public up_dataChanged(){
		this.dataChanged();
	}
}