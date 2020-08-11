class bottomList extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = 'bottomListSkin';
		// this.y = 1150;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	public g_:eui.Group;
	public scr0:eui.Scroller;
	public list0:eui.List;

	private collection = new eui.ArrayCollection();
	protected childrenCreated(): void {
		super.childrenCreated();
		
		this.horizontalCenter = 0;

		this.bottom = 0;
		// if(window['wx']){
		// 	let sys = wx.getSystemInfoSync();
			
		// 	if (sys.system.indexOf('iOS') >= 0) {
		// 		if (sys.model.indexOf("X") >= 0 || sys.model.indexOf("11") >= 0) {
		// 			this.bottom = 30;
		// 		}
		// 	}
		// }
		this.g_.touchThrough=true;
		this.scr0.horizontalScrollBar = null;
		//底部list

		if (DataConfig.adData) {
			let data = DataConfig.adData;
			for (let item of data) {
				this.collection.addItem({
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
		} else {
			Net.getAdv(this, AdId.INDEX_CAROUSEL).then(res => {
				let data = res.result;
				data = Aes.aesDecode(data);	
				data = JSON.parse(data);
				if(data.length<=0) return;
				DataConfig.adData = data;
				for (let item of data) {
					this.collection.addItem({
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
				
			})
		}
		this.list0.dataProvider = this.collection;

		this.list0.itemRenderer = gameItem2;

		let w = 0.5;
		setInterval(() => {
			let max = this.scr0.viewport.contentWidth - this.scr0.width;
			let min = 0;
			this.scr0.viewport.scrollH = this.scr0.viewport.scrollH + w;
			if (this.scr0.viewport.scrollH > max || this.scr0.viewport.scrollH < 0) {
				w = w * -1;
			}
		}, 20);

	}

}