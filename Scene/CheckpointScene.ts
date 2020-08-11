class CheckpointScene extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName='CheckpointSceneSkin';
		this.width = DataConfig.unscaledWidth;
		this.height = DataConfig.unscaledHeight;	
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public body:eui.Group;
	public zhangjie:eui.Image;
	public ad_list0:eui.List;
	public ad_list1:eui.List;
	public g_:eui.Group;
	public scr:eui.Scroller;
	public scr_g:eui.Group;
	public list:eui.List;
	public left_btn:eui.Image;
	public rigth_btn:eui.Image;
	public pkbtn:eui.Image;
	public jinengbtn:eui.Image;


	private collection = new eui.ArrayCollection();
	private collection_ad0 = new eui.ArrayCollection();
	private collection_ad1 = new eui.ArrayCollection();
	

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.scr.verticalScrollBar = null;
		this.scr.horizontalScrollBar = null;


		// this.scr.scrollPolicyV='off';

		// let a = [];
		// for(let i=0;i<10;i++){
		// 	let s=this.g_.getChildAt(i);
		// 	let data =[s.x,s.y];
		// 	a.push(data);
		// }
		// console.log(a);


		this.ad_list0.itemRenderer = Guanqia_gameitem;
		this.ad_list1.itemRenderer = Guanqia_gameitem;
		this.ad_list0.dataProvider = this.collection_ad0;
		this.ad_list1.dataProvider = this.collection_ad1;

		if (!DataConfig.GAME_CUSTOMS) {
			Net.getAdv(this, AdId.GAME_CUSTOMS).then(res => {
				let data: any = res.result;
				data = Aes.aesDecode(data);	
				data = JSON.parse(data);
				DataConfig.GAME_CUSTOMS = data;
				if (data.length <= 0) return;
				this.loadingAd(data);
			})
		} else {
			this.loadingAd(DataConfig.GAME_CUSTOMS);
		}
		
		this.left_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			this.page_--;
			if(this.page_<0){
				this.page_=0;
				Tips.show('到顶了');
			}else{
				this.scr.viewport.scrollH = this.page_*this.scr.width;
			}
			// else{
			// 	this.addStage();
			// }
			this.zhangjie.source = 'zhangjie_'+(this.page_+1)+'_png';
		},this);

		this.rigth_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			this.page_++;
			if(this.page_>=DataConfig.total/10){
				this.page_--;
				Tips.show('暂时没有啦');
			}
			this.scr.viewport.scrollH = this.page_*this.scr.width;
			
			// else{
			// 	this.addStage();
			// }
			this.zhangjie.source = 'zhangjie_'+(this.page_+1)+'_png';
			
		},this);

		this.pkbtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			let n = Math.floor(Math.random() * DataConfig.share.length);
			wx.shareAppMessage({
				title: DataConfig.share[n].title,
				imageUrl: DataConfig.share[n].img,
				success: function (res) {
					console.log('转发成功');
				},
				query: '',
				fail: (res) => { },
				complete: (res) => { },
			})
		},this)

		this.jinengbtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			SceneManager.addScene(SceneManager.Instance.skillScene);
			SceneManager.removeScene(this);
		},this);

		// this.body.addChild(new bottomList2());
		this.addStage();
		this.scr.addEventListener(eui.UIEvent.CHANGE_END,this.scr_changend,this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addStage,this);
		
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,()=>{
			CreateAd.hideAd();
		},this);



		//滚动
		// this.scr_tween();
		// this.scr_ad0.addEventListener(eui.UIEvent.CHANGE_START,()=>{
		// 	egret.Tween.removeTweens(this.scr_ad0.viewport);
		// },this);

		// this.scr_ad0.addEventListener(eui.UIEvent.CHANGE_END,()=>{
		// 	this.scr_tween();
		// },this);

		// this.scr_tween2();
		// this.scr_ad1.addEventListener(eui.UIEvent.CHANGE_START,()=>{
		// 	egret.Tween.removeTweens(this.scr_ad1.viewport);
		// },this);

		// this.scr_ad1.addEventListener(eui.UIEvent.CHANGE_END,()=>{
		// 	this.scr_tween2();
		// },this);

	}

	// private direction = 1;
	// private scr_tween(){
	// 	let max =this.scr_ad0.viewport.contentHeight - this.scr_ad0.height;
	// 	let	min = 0;
	// 	let distance = 0;
	// 	let location = max;
	// 	if(this.direction>0){
	// 		distance = max - this.scr_ad0.viewport.scrollV;
	// 	}else{
	// 		distance = this.scr_ad0.viewport.scrollV;
	// 		location = 0;
	// 	}
	// 	egret.Tween.removeTweens(this.scr_ad0.viewport);
	// 	egret.Tween.get(this.scr_ad0.viewport).to({scrollV:location},distance*5).call(()=>{
	// 		this.direction=-1*this.direction;
	// 		this.scr_tween();
	// 	},this);
	// }

	// private direction2 = 1;
	// private scr_tween2(){
	// 	let max =this.scr_ad1.viewport.contentHeight - this.scr_ad1.height;
	// 	let	min = 0;
	// 	let distance = 0;
	// 	let location = max;
	// 	if(this.direction2>0){
	// 		distance = max - this.scr_ad1.viewport.scrollV;
	// 	}else{
	// 		distance = this.scr_ad1.viewport.scrollV;
	// 		location = 0;
	// 	}
	// 	egret.Tween.removeTweens(this.scr_ad1.viewport);
	// 	egret.Tween.get(this.scr_ad1.viewport).to({scrollV:location},distance*5).call(()=>{
	// 		this.direction2=-1*this.direction2;
	// 		this.scr_tween2();
	// 	},this);
	// }

	private shuffle(arr) {
		return arr.sort(() => (Math.random() - 0.5))
	}

	private loadingAd(data) {
		let data2 = [...data];
		data2 = data2.reverse();
		// for (let i = 0; i < data.length; i++) {
		// 	if (data[i]) {
		// 		let item = data[i];
		// 		this.collection_ad0.addItem({
		// 			"logo": item.logo,      //广告图标
		// 			"appid": item.appid,                                                                  //广告APPID
		// 			"url": item.url,       //跳转路径参数，请务必在跳转的时候带上此参数                        //广告跳转路径
		// 			"locationid": item.locationid, "id": item.id,                                                                    //广告位id
		// 			"sort": item.sort,                                                                          //排序
		// 			"title": item.title,                                                                   //广告名称
		// 			"content": item.content,                                                                       //广告描述
		// 			"effected": item.effected,                                           //广告效果图片
		// 			"efftype": item.efftype
		// 		});
		// 	}
		// 	if (data2[i]) {
		// 		let item = data2[i];
		// 		this.collection_ad1.addItem({
		// 			"logo": item.logo,      //广告图标
		// 			"appid": item.appid,                                                                  //广告APPID
		// 			"url": item.url,       //跳转路径参数，请务必在跳转的时候带上此参数                        //广告跳转路径
		// 			"locationid": item.locationid, "id": item.id,                                                                    //广告位id
		// 			"sort": item.sort,                                                                          //排序
		// 			"title": item.title,                                                                   //广告名称
		// 			"content": item.content,                                                                       //广告描述
		// 			"effected": item.effected,                                           //广告效果图片
		// 			"efftype": item.efftype
		// 		});
		// 	}
		// }
		this.collection_ad0.removeAll();
		this.collection_ad1.removeAll();

		let r =Math.floor(Math.random()*(data.length-1));
		let r2 =Math.floor(Math.random()*(data.length-1));

		if (data[r]) {
			let item = data[r];
			this.collection_ad0.addItem({
				"logo": item.logo,      //广告图标
				"appid": item.appid,                                                                  //广告APPID
				"url": item.url,       //跳转路径参数，请务必在跳转的时候带上此参数                        //广告跳转路径
				"locationid": item.locationid, "id": item.id,                                                                    //广告位id
				"sort": item.sort,                                                                          //排序
				"title": item.title,                                                                   //广告名称
				"content": item.content,                                                                       //广告描述
				"effected": item.effected,                                           //广告效果图片
				"efftype": item.efftype,
				"index":0
			});
		}

		if (data2[r2]) {
			let item = data2[r2];
			this.collection_ad1.addItem({
				"logo": item.logo,      //广告图标
				"appid": item.appid,                                                                  //广告APPID
				"url": item.url,       //跳转路径参数，请务必在跳转的时候带上此参数                        //广告跳转路径
				"locationid": item.locationid, "id": item.id,                                                                    //广告位id
				"sort": item.sort,                                                                          //排序
				"title": item.title,                                                                   //广告名称
				"content": item.content,                                                                       //广告描述
				"effected": item.effected,                                           //广告效果图片
				"efftype": item.efftype,
				"index":0
			});
		}

		setTimeout(()=>{
			this.loadingAd(data);
		},5000);

		// this.list1.dataProvider = this.collection1;
	}

	private scr_changend(){
		let y =  Math.round(this.scr.viewport.scrollH / 500);
		this.scr.viewport.scrollH = y*500;
	}

	private page_=0;
	

	// private addStage(){
	// 	// DataConfig.total = 30;
	// 	console.log('关卡数'+DataConfig.total)

	// 	// this.body.addChild(SceneManager.Instance.goldBox);
		

	// 	// CreateAd.showbannerAd();

	// 	// setTimeout(() => {
	// 	// 	CreateAd.showbannerAd();
	// 	// }, 1000);
    //     // setTimeout(() => {
    //     //     CreateAd.hideAd();
	// 	// }, 3000);
		
	// 	// SceneManager.addScene(SceneManager.Instance.bottomList,this.body);
	// 	// SceneManager.Instance.physicalBox.x = 582; 
	// 	// this.body.addChild(SceneManager.Instance.physicalBox);

	// 	this.collection.removeAll();
	// 	let x =Math.ceil(DataConfig.total/6);
	// 	console.log(x)
	// 	for(let i=0;i<DataConfig.total;i++){
			
	// 		this.collection.addItem({
	// 			// index:DataConfig.level_data_list[i].index,
	// 			index:i+1,				
	// 			xingxing:DataConfig.level_data_list[i].xingxing
	// 		})
	// 	}		
	// }

	private addStage(){
		// DataConfig.total = 30;
		console.log('关卡数'+DataConfig.total)

		// this.body.addChild(SceneManager.Instance.goldBox);
		SceneManager.addScene(SceneManager.Instance.bottomList,this.body);

		// CreateAd.showbannerAd();

		// setTimeout(() => {
		// 	CreateAd.showbannerAd();
		// }, 1000);
        // setTimeout(() => {
        //     CreateAd.hideAd();
		// }, 3000);
		


		let n = this.scr_g.numChildren-1;
		for(let i=0;i<n;i++){
			this.scr_g.removeChildAt(1);
		}

		// this.collection.removeAll();
		let x =Math.ceil(DataConfig.total/10);

		console.log(x)
		let list_n = this.list.numChildren;
		for(let i=0;i<list_n;i++){
			this.list.removeChildAt(0);
		}

		for(let i=0;i<DataConfig.total;i++){
			// if(i<DataConfig.total){
				let c = new CheckpointItem();
				c.anchorOffsetX=c.width/2;
				c.anchorOffsetY=c.height/2;
				c.data = {
					index:i+1,				
					xingxing:DataConfig.level_data_list[i].xingxing
				}
				c.up_dataChanged();
				c.x = this.g_.getChildAt(i%10).x + Math.floor(i/10)*1334;
				c.y = this.g_.getChildAt(i%10).y;
				// this.collection.addItem({
				// 	// index:DataConfig.level_data_list[i].index,
				// 	index:i+1,				
				// 	xingxing:DataConfig.level_data_list[i].xingxing
				// })
				this.list.addChild(c)
			// }
			
		}
		// this.list.dataProvider = this.collection;
		// this.list.itemRenderer = CheckpointItem;

	
		// console.log(this.list.layout);
		// for(let i =1;i<x;i++){
		// 	let collection = new eui.ArrayCollection();
		// 	let list = new eui.List();
		// 	let layout = new eui.BasicLayout();
		// 	// layout.horizontalGap = 37.5;
		// 	// layout.verticalGap = 66;
		// 	// layout.requestedColumnCount =0;
		// 	// layout.requestedRowCount = 2;
		// 	// layout.paddingTop = 0;
		// 	// layout.paddingLeft = 0;
		// 	// layout.horizontalAlign = "contentJustify";
		// 	// layout.verticalAlign = "contentJustify";
		// 	// layout.columnAlign = "justifyUsingGap";
		// 	// layout.rowAlign = "justifyUsingGap";
		// 	list.layout = layout;
		// 	list.x = i*1334;
		// 	list.y = 0;
		// 	list.width = 1334;
		// 	list.height = 400;
		// 	this.scr_g.addChild(list);			
		// 	for(let j=0;j<10;j++){
		// 		// console.log(j+i*9)
		// 		if(j+i*10<DataConfig.total){
		// 			collection.addItem({
		// 				// index:DataConfig.level_data_list[j+i*9].index,
		// 				index:j+i*10+1,						
		// 				xingxing:DataConfig.level_data_list[j+i*10].xingxing
		// 			})
		// 		}
		// 	}
		// 	list.dataProvider = collection;
		// 	list.itemRenderer = CheckpointItem;
		// 	// for(let i=0;i<10;i++){
		// 	// 	let s=this.g_.getChildAt(i);
		// 	// 	list.getChildAt(i).x=s.x;
		// 	// 	list.getChildAt(i).y=s.y;
		// 	// }
		// }
	}
}