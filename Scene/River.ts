class River extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName= 'RiverSkin';
		this.width = DataConfig.unscaledWidth;
		this.height = DataConfig.unscaledHeight;
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	public scr_1:eui.Scroller;
	public list_1:eui.List;
	public close:eui.Image;
	public jixuyouxi:eui.Image;



	// private collection1 = new eui.ArrayCollection();
	private collection2 = new eui.ArrayCollection();
	protected childrenCreated():void
	{
		super.childrenCreated();

		this.scr_1.horizontalScrollBar= null;
		this.scr_1.scrollPolicyV='off';

		this.list_1.itemRenderer = XIaodaoliuItem;

			Net.getAdv(this,AdId.GLOBAL_RIVER).then(res =>{
				let data = res.result;
				data = Aes.aesDecode(data);	
				data = JSON.parse(data);
				if(data.length<=0) return;
				for(let item of data){
					this.collection2.addItem({				
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
				let r = Math.floor(Math.random()*this.collection2.length);
				MoreItem.touchToApp(this.collection2.getItemAt(r),false);
			})


		
		this.list_1.dataProvider = this.collection2;


		let w = 2;
		setInterval(()=>{
			let max = this.scr_1.viewport.contentWidth - this.scr_1.width;
			let min = 0;
			this.scr_1.viewport.scrollH = this.scr_1.viewport.scrollH + w;
			if (this.scr_1.viewport.scrollH > max || this.scr_1.viewport.scrollH < 0) {
				w = w * -1;
			}
		},10);

		// let h = 2;
		// setInterval(()=>{
		// 	let max = this.scr_1.viewport.contentHeight - this.scr_1.height;
		// 	let min = 0;
		// 	this.scr_1.viewport.scrollV =this.scr_1.viewport.scrollV + h;
		// 	if(this.scr_1.viewport.scrollV>max || this.scr_1.viewport.scrollV<0){
		// 		h =  h*-1;
		// 	}
		// },10);

		this.close.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			SceneManager.removeScene(this);
		},this);

		this.jixuyouxi.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			let r = Math.floor(Math.random()*this.collection2.length);
			MoreItem.touchToApp(this.collection2.getItemAt(r),false);
		},this);
		

		this.addEventListener(egret.Event.ADDED_TO_STAGE,()=>{
			CreateAd.hideAd();
			this.t=setInterval(()=>{
				CreateAd.hideAd();
			},100);
			// this.close.visible=  false;
			// this.back_index.visible= false;			
			setTimeout(()=>{
				this.close.visible=  true;
				// this.back_index.visible= true;
			},DataConfig.button_show);
			let r = Math.floor(Math.random()*this.collection2.length);
			MoreItem.touchToApp(this.collection2.getItemAt(r),false);
		},this);

		// this.close.visible=  false;		
		// this.back_index.visible= false;			
		setTimeout(()=>{
			this.close.visible=  true;
			// this.back_index.visible= true;
		},DataConfig.button_show)

		clearInterval(this.t);
		this.t=setInterval(()=>{
			CreateAd.hideAd();
		},100);

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,()=>{
			CreateAd.hideAd();
			clearInterval(this.t);
			if(SceneManager.Instance.overScene && SceneManager.Instance.overScene.parent){
				if(SceneManager.Instance.overScene.pass_){
					SceneManager.Instance.overScene._pass_ad();
				}else{
					SceneManager.Instance.overScene._nopass_ad();
				}
			}
			if(SceneManager.Instance.checkpointScene && SceneManager.Instance.checkpointScene.parent){
				CreateAd.showbannerAd();
			}
			
			
		},this);
	}
	private t =0;
	
}