class River2 extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName='River2Skin';
		this.width = DataConfig.unscaledWidth;
		this.height = DataConfig.unscaledHeight;
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public scr_:eui.Scroller;
	public list_:eui.List;
	public close:eui.Image;



	private collection = new eui.ArrayCollection();
	protected childrenCreated():void
	{
		super.childrenCreated();

		this.scr_.verticalScrollBar=null;
		
		
			Net.getAdv(this,AdId.GLOBAL_RIVER_M).then(res =>{
				let data = res.result;
				data = Aes.aesDecode(data);	
				data = JSON.parse(data);
				DataConfig.GLOBAL_RIVER_QUI = data;
				if(data.length<=0) return;
				for(let item of data){
					this.collection.addItem({				
						"logo": item.logo,      //广告图标
						"appid": item.appid,                                                                  //广告APPID
						"url": item.url,       //跳转路径参数，请务必在跳转的时候带上此参数                        //广告跳转路径
						"locationid": item.locationid, "id": item.id,                                                                    //广告位id
						"sort": item.sort,                                                                          //排序
						"title": item.title,                                                                   //广告名称
						"content": item.content,                                                                       //广告描述
						"effected": item.effected,                                           //广告效果图片
						"efftype":  item.efftype
					});
				}
				this.addstage();
			})
	

		this.close.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			SceneManager.removeScene(this);
		},this);


		this.list_.dataProvider = this.collection;
		this.list_.itemRenderer = DadaoliuItem;

		
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addstage,this);
	

		clearInterval(this.t);
		this.t=setInterval(()=>{
			CreateAd.hideAd();
		},100);

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,()=>{
			// CreateAd.hideAd();
			clearInterval(this.t);
			if (SceneManager.Instance.overScene && SceneManager.Instance.overScene.parent) {	
				//   CreateAd.showbannerAd();
				if(SceneManager.Instance.overScene.pass_){
					SceneManager.Instance.overScene._pass_ad();
				}else{
					SceneManager.Instance.overScene._nopass_ad();
				}
			}

			if(SceneManager.Instance.indexScene && SceneManager.Instance.indexScene.parent){
				SceneManager.Instance.indexScene.addStage();
			}
		},this);

		let h = 2;
		setInterval(()=>{
			let max = this.scr_.viewport.contentHeight - this.scr_.height;
			let min = 0;
			this.scr_.viewport.scrollV =this.scr_.viewport.scrollV + h;
			if(this.scr_.viewport.scrollV>max || this.scr_.viewport.scrollV<0){
				h =  h*-1;
			}
		},10);
	}
	private t =0;
	private index = 3;
	private addstage(){
		if(this.collection.length>0){
			let r = Math.floor(Math.random()*this.collection.length);
			MoreItem.touchToApp(this.collection.getItemAt(r),false);
		}
		clearInterval(this.t);
		this.t=setInterval(()=>{
			CreateAd.hideAd();
		},100);

	}
	
}