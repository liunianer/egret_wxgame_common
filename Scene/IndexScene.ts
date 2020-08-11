class IndexScene extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = 'IndexSceneSkin';
		this.width = DataConfig.unscaledWidth;
		this.height = DataConfig.unscaledHeight;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public index_g:eui.Group;
	public touch_img:eui.Image;
	public zhujue_img:eui.Image;
	public list1:eui.List;
	public list_g:eui.Group;
	public list0:eui.List;
	public game_btn:eui.Image;
	public jineng_btn:eui.Image;
	public share_btn:eui.Image;
	public more_btn:eui.Group;



	private collection0 = new eui.ArrayCollection();
	private collection1 = new eui.ArrayCollection();
	// private collection2 = new eui.ArrayCollection();
	// private collection3 = new eui.ArrayCollection();

	private sst(v:string):Array<any>{
		let s='';
		for(let i of v){

			if(i!='' && i!=' '){
				s+=i;
			}
		}
		s+='';
		return JSON.parse(`${v}`);
	}
	
	protected childrenCreated(): void {
		super.childrenCreated();

		this.list0.itemRenderer = Index_gameItem1;
		this.list1.itemRenderer = Index_gameItem2;

		this.list_g.touchThrough=  true;
		this.list0.touchThrough = true;
		

		//屏幕点击去玩左 右
		if (!DataConfig.GAME_CUSTOMS) {
			Net.getAdv(this, AdId.GAME_CUSTOMS).then(res => {
				let data: any = res.result;

				data = Aes.aesDecode(data);	
				data = JSON.parse(data);
				console.log(data);

				DataConfig.GAME_CUSTOMS = data;
				if (data.length <= 0) return;
				this.loadingAd(data);
			})
		} else {
			this.loadingAd(DataConfig.GAME_CUSTOMS);
		}
		
		

		egret.Tween.get(this.zhujue_img,{loop:true}).wait(200).call(()=>{
			if(this.zhujue_img.source=='index_jiqiren0_png'){
				this.zhujue_img.source='index_jiqiren1_png'
			}else{
				this.zhujue_img.source='index_jiqiren0_png'
			}
		})
 
		this.game_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch_, this);
		// this.touch_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch_, this);
		this.more_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.moregame,this);
		this.jineng_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			SceneManager.addScene(SceneManager.Instance.skillScene);
			SceneManager.removeScene(this);
		},this);


		this.share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
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
		}, this);

		this.addStage();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);

		
		// let h = 0.5;
		// setInterval(() => {
		// 	let max = this.scr1.viewport.contentHeight - this.scr1.height;
		// 	let min = 0;
		// 	if (max <= 0) return
		// 	this.scr1.viewport.scrollV = this.scr1.viewport.scrollV + h;
		// 	if (this.scr1.viewport.scrollV >= max || this.scr1.viewport.scrollV <= 0) {
		// 		h = h * -1;
		// 	}
		// }, 20);


		// this.rank_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {

		// 	this.stage.addChild(new RankScene());

		// }, this);
		// if (!this.user_data) {
		// 	wx.getUserInfo({
		// 		withCredentials: true,
		// 		openIdList: [],
		// 		lang: "zh_CN",
		// 		success: (res: any) => {
		// 			if (res.rawData) {
		// 				this.saveUserInfo(res);
		// 			} else {
		// 				this.userInfo_button();
		// 			}
		// 		},
		// 		fail: (res: any) => {
		// 			this.userInfo_button();
		// 		},
		// 		complete: (res: any) => {
		// 		}
		// 	})
		// }
		// BGM.playBgm();
	}

	private user_data = false;

	private shuffle(arr) {
		return arr.sort(() => (Math.random() - 0.5))
	}

	private loadingAd(data) {

		let data2 = [...data];
		data2 = data2.reverse();
		setInterval(() => {
			// let i = (Math.floor(Math.random() * data.length));
			// let item = data[i];
			data = this.shuffle(data);
			this.collection0.removeAll();
			for (let i = 0; i < 4; i++) {
				if (data[i]) {
					let item = data[i];
					this.collection0.addItem({
						"logo": item.logo,      //广告图标
						"appid": item.appid,                                                                  //广告APPID
						"url": item.url,       //跳转路径参数，请务必在跳转的时候带上此参数                        //广告跳转路径
						"locationid": item.locationid, "id": item.id,                                                                    //广告位id
						"sort": item.sort,                                                                          //排序
						"title": item.title,                                                                   //广告名称
						"content": item.content,                                                                       //广告描述
						"effected": item.effected,                                           //广告效果图片
						"efftype": item.efftype
					});
				}
			}

			let i2 = (Math.floor(Math.random() * data2.length));
			let item2 = data2[i2];
			this.collection1.removeAll();
			this.collection1.addItem({
				"logo": item2.logo,      //广告图标
				"appid": item2.appid,                                                                  //广告APPID
				"url": item2.url,       //跳转路径参数，请务必在跳转的时候带上此参数                        //广告跳转路径
				"locationid": item2.locationid,                                                                    //广告位id
				"sort": item2.sort,                                                                          //排序
				"title": item2.title,                                                                   //广告名称
				"content": item2.content,                                                                       //广告描述
				"effected": item2.effected,                                           //广告效果图片
				"efftype": item2.efftype
			});
		}, 5000);
		// let item = data[0];
		for (let i = 0; i < 4; i++) {
			if (data[i]) {
				let item = data[i];
				this.collection0.addItem({
					"logo": item.logo,      //广告图标
					"appid": item.appid,                                                                  //广告APPID
					"url": item.url,       //跳转路径参数，请务必在跳转的时候带上此参数                        //广告跳转路径
					"locationid": item.locationid, "id": item.id,                                                                    //广告位id
					"sort": item.sort,                                                                          //排序
					"title": item.title,                                                                   //广告名称
					"content": item.content,                                                                       //广告描述
					"effected": item.effected,                                           //广告效果图片
					"efftype": item.efftype
				});
			}
		}

		for (let i = 0; i < 1; i++) {
			if (data[i]) {
				let item = data[i];
				this.collection1.addItem({
					"logo": item.logo,      //广告图标
					"appid": item.appid,                                                                  //广告APPID
					"url": item.url,       //跳转路径参数，请务必在跳转的时候带上此参数                        //广告跳转路径
					"locationid": item.locationid, "id": item.id,                                                                    //广告位id
					"sort": item.sort,                                                                          //排序
					"title": item.title,                                                                   //广告名称
					"content": item.content,                                                                       //广告描述
					"effected": item.effected,                                           //广告效果图片
					"efftype": item.efftype
				});
			}
		}

		// let item2 = data2[0];
		// this.collection1.addItem({
		// 	"logo": item2.logo,      //广告图标
		// 	"appid": item2.appid,                                                                  //广告APPID
		// 	"url": item2.url,       //跳转路径参数，请务必在跳转的时候带上此参数                        //广告跳转路径
		// 	"locationid": item2.locationid,                                                                    //广告位id
		// 	"sort": item2.sort,                                                                          //排序
		// 	"title": item2.title,                                                                   //广告名称
		// 	"content": item2.content,                                                                       //广告描述
		// 	"effected": item2.effected,                                           //广告效果图片
		// 	"efftype": item2.efftype
		// });

		this.list0.dataProvider = this.collection0;
		this.list1.dataProvider = this.collection1;
	}

	public addStage() {

		CreateAd.showbannerAd(1,2);
		setTimeout(() => {
			CreateAd.hideAd();
		}, 2000);

		// BGM.playBgm();
		egret.Tween.get(this.game_btn, { loop: true })
			.to({ scaleX: 0.85, scaleY: 0.85 }, 300)
			.to({ scaleX: 1, scaleY: 1 }, 300)
			.wait(600);

		egret.Tween.get(this.jineng_btn, { loop: true })
			.to({ scaleX: 0.85, scaleY: 0.85 }, 300)
			.to({ scaleX: 1, scaleY: 1 }, 300)
			.wait(1300);

		egret.Tween.get(this.share_btn, { loop: true })
			.to({ scaleX: 0.85, scaleY: 0.85 }, 300)
			.to({ scaleX: 1, scaleY: 1 }, 300)
			.wait(1300);

		SceneManager.Instance.goldBox.x=30;
		SceneManager.Instance.goldBox.y=0;
		SceneManager.addScene(SceneManager.Instance.goldBox,this.index_g);
		SceneManager.addScene(SceneManager.Instance.bottomList,this.index_g);
	}

	private touch_(event: egret.Event) {

		if(!SceneManager.Instance.checkpointScene){
			SceneManager.Instance.checkpointScene = new CheckpointScene()
		}

		// if( DataConfig.shipin_open>0){
		// 	CreateAd.showvideoAd('game');
		// }else{
		// 	if( DataConfig.touchAd>0){
		// 				//设置为间隔出现
		// 		DataConfig.touchAd--;
		// 		SceneManager.addScene(SceneManager.Instance.fixerCarscene= new FixerCarScene());
		// 	}else{
				SceneManager.addScene(SceneManager.Instance.checkpointScene);
				SceneManager.removeScene(this);
		// 	}
			
		// }
		
	}

	private moregame() {
		console.log('moreGmae')
		SceneManager.addScene(SceneManager.Instance.riverScene2);
	}
}