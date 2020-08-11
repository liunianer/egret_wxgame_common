class OverScene extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName='OverSceneSkin';
		this.width = DataConfig.unscaledWidth;
		this.height = DataConfig.unscaledHeight;		
	}

	public pass_g:eui.Group;
	public scr_1:eui.Scroller;
	public list_1:eui.List;
	public xiayiguan:eui.Image;
	public shuangrenmoshi:eui.Image;
	public jinbifanbei:eui.Image;
	public nopass_g:eui.Group;
	public close_btn:eui.Image;
	public scr_2:eui.Scroller;
	public list2:eui.List;
	public chongxinkaishi:eui.Image;
	public haoyoupk:eui.Image;
	public jiaqiangkaiju:eui.Image;




	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public pass_ = false;
	private collection1 = new eui.ArrayCollection();
	private collection2 = new eui.ArrayCollection();
	private collection3 = new eui.ArrayCollection();
	// private collection4 = new eui.ArrayCollection();
	// private collection5 = new eui.ArrayCollection();

	public gold:egret.tween.TweenGroup;
	protected childrenCreated():void
	{
		super.childrenCreated();
	
		this.validateNow();
		this.scr_1.verticalScrollBar= this.scr_2.verticalScrollBar=null;
		this.scr_1.horizontalScrollBar= this.scr_2.horizontalScrollBar = null;

		this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			SceneManager.removeScene(this);
			SceneManager.addScene(SceneManager.Instance.indexScene);
		},this);

		
		Net.getAdv(this, AdId.GAME_PASS).then(res => {
			let data: any = res.result;
			data = Aes.aesDecode(data);	
			data = JSON.parse(data);
			// DataConfig.GAME_PASS = data;
			if (data.length <= 0) return;
			// this.loadingAd_nopass(data);
			this.loadingAd_pass(data);
		})

		Net.getAdv(this, AdId.GAME_NOPASS).then(res => {
			let data: any = res.result;
			data = Aes.aesDecode(data);	
			data = JSON.parse(data);
			// DataConfig.GAME_PASS = data;
			if (data.length <= 0) return;
			this.loadingAd_nopass(data);
		})


		let h3 = 2;
		setInterval(()=>{
			let max = this.scr_1.viewport.contentWidth - this.scr_1.width;
			let min = 0;
			this.scr_1.viewport.scrollH =this.scr_1.viewport.scrollH + h3;
			if(this.scr_1.viewport.scrollH>max || this.scr_1.viewport.scrollH<min){
				h3 =  h3*-1;
			}
		},10);	

		let h2 = 2;
		setInterval(()=>{
			let max = this.scr_2.viewport.contentWidth - this.scr_2.width;
			let min = 0;
			this.scr_2.viewport.scrollH =this.scr_2.viewport.scrollH + h2;
			if(this.scr_2.viewport.scrollH>max || this.scr_2.viewport.scrollH<min){
				h2 =  h2*-1;
			}
		},10);	

		
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,()=>{
			clearInterval(this.over_time);
		},this);

		this.xiayiguan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.left_,this);
		this.chongxinkaishi.addEventListener(egret.TouchEvent.TOUCH_TAP,this.left_,this);

		this.haoyoupk.addEventListener(egret.TouchEvent.TOUCH_TAP,this.share,this);
		this.shuangrenmoshi.addEventListener(egret.TouchEvent.TOUCH_TAP,this.share,this);

		this.jiaqiangkaiju.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tiaoguo,this);
		this.jinbifanbei.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tiaoguo,this);
	}

	private chongxinwan(){
			console.log('重新玩')
			// DownloadData.replay();
			// this.parent.removeChild(this);
		
	}


	private loadingAd_pass(data) {
			if(!data){
				return
			}
			for(let i=0;i<data.length;i++){
				let item = data[i];
				if(item){
					this.collection1.addItem({				
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
			}
			let data2 = [...data];
			data2 =data2.reverse();
			for(let i=0;i<data2.length;i++){
				let item = data2[i];
				if(item){
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
			}
			this.list_1.dataProvider = this.collection1;
			this.list_1.itemRenderer = New_gameItem2;
			// this.list2.dataProvider = this.collection2;
			// this.list2.itemRenderer = New_gameItem2;
	}

	private loadingAd_nopass(data) {
		if(!data){
			return
		}
		for(let i=0;i<data.length;i++){
			let item = data[i];
			if(item){
				this.collection3.addItem({				
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
		}
		this.list2.dataProvider = this.collection3;
		this.list2.itemRenderer = New_gameItem2;
	}

	private shuffle(arr) {
		return arr.sort(() => (Math.random() - 0.5))
	}

	// private getgold=0;
	public updata(pass,num,gold:number){
		this.xingxing_num=num;
		this.pass_ = pass;
		// this.getgold = gold;
		SceneManager.Instance.goldBox.updata(gold);

		SceneManager.addScene(SceneManager.Instance.riverScene2)
		if(this.pass_){
			this.Pass();
		}else{
			this.noPass();
		}

		
	}
	public xingxing_num=0;
	
	private noPass(){
		this.currentState = 'nopass';
		this.pass_ = false;
		// this.nopass_g.addChild(SceneManager.Instance.goldBox);
		Net.saveData(this,{
			level:DataConfig.level,
			data:DataConfig.level_data_list,
			skill_data:DataConfig.skill_data,
			gold:DataConfig.gold
		})

		// window['wx'].aldStage.onEnd({
		// 	stageId: DataConfig.now_level + '',    //关卡ID 该字段必传
		// 	stageName: "第" + DataConfig.now_level + "关", //关卡名称  该字段必传
		// 	userId: DataConfig.openid,  //用户ID 可选
		// 	event: "fail",   //关卡完成  关卡进行中，用户触发的操作    该字段必传
		// 	params: {
		// 		desc: "关卡失败"   //描述
		// 	}
		// })
	}
	private Pass(){
		this.currentState = 'pass';
		this.pass_ = true;
		// this.pass_g.addChild(SceneManager.Instance.goldBox);
		// if(this.xingxing_num<3){
		// 	this.sanxingtongguo.visible=true;
		// }else{
		// 	this.sanxingtongguo.visible=false;
		// }

		// for(let i=0; i<this.gold_g.numChildren;i++){
		// 	this.gold_g.getChildAt(i).visible=false;
		// 	if(i+1<=this.xingxing_num){
		// 		this.gold_g.getChildAt(i).visible=true;
		// 	}
		// }
		
		let num = 0;
		for (let i = 0; i < DataConfig.total; i++) {
			if (DataConfig.level_data_list[i].index == DataConfig.now_level) {
				if (DataConfig.level_data_list[i].xingxing < this.xingxing_num) {
					DataConfig.level_data_list[i].xingxing = this.xingxing_num;
				}
			}
			// num +=DataConfig.level_data_list[i].xingxing;
		}

		// window['wx'].aldStage.onEnd({
		// 	stageId: DataConfig.now_level + '',    //关卡ID 该字段必传
		// 	stageName: "第" + DataConfig.now_level + "关", //关卡名称  该字段必传
		// 	userId: DataConfig.openid,  //用户ID 可选
		// 	event: "complete",   //关卡完成  关卡进行中，用户触发的操作    该字段必传
		// 	params: {
		// 		desc: "关卡完成"   //描述
		// 	}
		// })

		if(DataConfig.now_level>DataConfig.level){
			DataConfig.level = DataConfig.now_level;
		}

		if(DataConfig.now_level==DataConfig.level){
			DataConfig.level++;
		}
		DataConfig.now_level++;
		if(DataConfig.now_level > DataConfig.total){
			DataConfig.now_level=2;
		}

		Net.saveData(this,{
				level:DataConfig.level,
				data:DataConfig.level_data_list,
				skill_data:DataConfig.skill_data,
				gold:DataConfig.gold
		})
		
		
	}

	private over_time =0 
	public _nopass_ad() {
		CreateAd.showbannerAd(3,3);
	}

	public _pass_ad() {
		
		CreateAd.showbannerAd();
	}
	
	private left_(){
		CreateAd.hideAd();
		clearInterval(this.over_time);
		if(DataConfig.touchAd>0){
			//设置为间隔出现
			DataConfig.touchAd--;
			SceneManager.addScene(SceneManager.Instance.fixerCarscene= new FixerCarScene());
		}else{
			this.left_2();
		}
		
	}

	public left_2(){
		
		SceneManager.removeScene(SceneManager.Instance.gameScene);
		SceneManager.Instance.gameScene=null;
		DownloadData.downloadJson(DataConfig.now_level);
		SceneManager.removeScene(this);
		SceneManager.addScene(SceneManager.Instance.checkpointScene);
	}

	private share(){
		let n = Math.floor(Math.random()*DataConfig.share.length);
		wx.shareAppMessage({
			title: DataConfig.share[n].title,
			imageUrl: DataConfig.share[n].img,
			success: function (res) {
				console.log('转发成功');
			},
			query: '',
			fail: (res)=>{},
			complete: (res)=>{},
		})
		
	}

	private tiaoguo(){
		Tips.show('无激励视频广告');
		// CreateAd.showvideoAd('skip',this.skip.bind(this));
	}

	public skip(){
		
		let num = 0;
		for (let i = 0; i < DataConfig.total; i++) {
			if (DataConfig.level_data_list[i].index == DataConfig.now_level) {
				if (DataConfig.level_data_list[i].xingxing < this.xingxing_num) {
					DataConfig.level_data_list[i].xingxing = 3;
				}
			}
			num +=DataConfig.level_data_list[i].xingxing;
		}
		if(DataConfig.level == DataConfig.now_level){
			DataConfig.level++;
		}
		DataConfig.now_level++;
		if(DataConfig.now_level > DataConfig.total){
			DataConfig.now_level=1;
		}
		// SceneManager.Instance.goldBox.set_num(num);

		Net.saveData(this,{
			level:DataConfig.level,
			data:DataConfig.level_data_list,
		})

		this.left_2();
	}

	private saveUserdata(guanka,star){
		wx.setUserCloudStorage({
			KVDataList: [
				{'key':'guanka','value':guanka.toString()},
				{'key':'star','value':star.toString()}],
			success: res => {
				console.log(res);
			},
			fail: err => {
				// console.log(err);
			},
			complete: () => {

			}
			})
	}
}