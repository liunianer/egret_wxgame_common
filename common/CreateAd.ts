class CreateAd {
	public constructor() {
	}

	public static _type: string;
	public static videoad: any;
	public static ad_arr =
		['adunit-f91fcae806e565ff'];

	public static showvideoAd(type: string, fun: Function = null) {

		if (DataConfig.develop) {
			this.succeed(type, fun);
			return
		}

		// console.log(fun);
		// 用户触发广告后，显示激励视频广告
		this._type = type;
		if (!this.videoad) {
			let wx_ = window['wx'];
			// 创建激励视频广告实例，提前初始化
			this.videoad = wx_.createRewardedVideoAd({
				adUnitId: 'adunit-6f41b28e7e470e36'
			})
			this.videoad.onError(res => {
				console.log(res);
			});
			this.videoad.onClose(res => {
				console.log('看完视频' + res.isEnded)
				if (res.isEnded) {
					this.succeed(this._type, fun);
				} else {
					if (this._type == 'tili') {
						fun(5);
					}
				}

				if (this._type == 'game') {
					if (DataConfig.touchAd > 0) {
						//设置为间隔出现
						DataConfig.touchAd--;
						// SceneManager.Instance.rootLayer.stage.addChild(SceneManager.Instance.fixerCarscene = new SquirrelScene());
					} else {
						if (DataConfig.level == 1) {
							DataConfig.now_level = 1;
							// DownloadData.downloadJson(1);
						} else {
							SceneManager.Instance.rootLayer.stage.addChild(SceneManager.Instance.checkpointScene);
							// SceneManager.Instance.indexScene.parent.removeChild(SceneManager.Instance.indexScene);
						}
					}
				}
			});
		}
		this.videoad.show().catch(() => {
			// 失败重试
			let wx_ = window['wx'];
			this.videoad = wx_.createRewardedVideoAd({
				adUnitId: 'adunit-6f41b28e7e470e36'
			})
			this.videoad.load()
				.then(() => this.videoad.show())
				.catch(err => {
					console.log('激励视频 广告显示失败')
					if (this._type == 'game') {
						if (DataConfig.touchAd > 0) {
							//设置为间隔出现
							DataConfig.touchAd--;
							// SceneManager.Instance.rootLayer.stage.addChild(SceneManager.Instance.fixerCarscene = new SquirrelScene());
						} else {
							if (DataConfig.level == 1) {
								DataConfig.now_level = 1;
								// DownloadData.downloadJson(1);
							} else {
								SceneManager.Instance.rootLayer.stage.addChild(SceneManager.Instance.checkpointScene);
								// SceneManager.Instance.indexScene.parent.removeChild(SceneManager.Instance.indexScene);
							}
						}
					}
				})
		})


	}

	private static succeed(type: string, fun: Function = null) {

		if (type == 'revive') {
			if (SceneManager.Instance.overScene && SceneManager.Instance.overScene.parent) {
				SceneManager.Instance.overScene.parent.removeChild(SceneManager.Instance.overScene);
			}
			// SceneManager.Instance.gameScene._revive();
		} else if (type == 'infinite') {
			// DownloadData.invincible = true;
			if (SceneManager.Instance.overScene && SceneManager.Instance.overScene.parent) {
				SceneManager.Instance.overScene.parent.removeChild(SceneManager.Instance.overScene);
			}
			// DownloadData.replay();
		} else {
			fun();
		}

	}

	public static location_x = 1;
	public static location_y = 3;
	public static prestrain = false;

	/**
	 * 
	 * @param location_x 1 居中 2左边3右边
	 * @param location_y 1 居中 2上边3下边
	 * @param prestrain 
	 */
	public static showbannerAd(location_x = 1, location_y = 3, prestrain = false) {
		CreateAd.location_x = location_x;
		CreateAd.location_y = location_y;
		CreateAd.prestrain = prestrain;
		if (DataConfig.develop) {
			return
		}
		this.hideAd();

		const {
			windowWidth,
			windowHeight,
		} = wx.getSystemInfoSync();
		// if (!CreateAd.bannerAd) {

			let n = Math.floor(Math.random() * this.ad_arr.length);


			let targetBannerAdWidth = Math.min(windowWidth, 280);
			// let targetBannerAdWidth = windowWidth;
			let w = targetBannerAdWidth;
			// if (zadan) {
			// 	w = windowWidth;
			// }
			let h = windowHeight - (targetBannerAdWidth / 16 * 9);
			let l = (windowWidth - targetBannerAdWidth) / 2;
			let bannerAd = window["wx"].createBannerAd({
				adUnitId: this.ad_arr[n],
				// adIntervals: 30,
				style: { left: l, top: h, width: w }
			});


			let sys = wx.getSystemInfoSync();
			let bottom = 0;
			if (sys.system.indexOf('iOS') >= 0) {
				if (sys.model.indexOf("X") >= 0 || sys.model.indexOf("11") >= 0) {
					bottom = 5;
				}
			}

			bannerAd.onResize(function () {
				// console.log('location_x'+CreateAd.location_x+":"+"location_y"+CreateAd.location_y)
				// if(CreateAd.location_x ==1){
				// 	bannerAd.style.left = (windowWidth - bannerAd.style.realWidth) / 2 + 0.1;
				// }else if(CreateAd.location_x ==2){
				// 	bannerAd.style.left = (windowWidth/2 - bannerAd.style.realWidth)/2;
				// }else{
				// 	bannerAd.style.left = windowWidth/2+(windowWidth/2 - bannerAd.style.realWidth)/2;
				// }

				// if (CreateAd.location_y==1) {
				// 	bannerAd.style.top = (windowHeight - bannerAd.style.realHeight)/2;
				// }else if(CreateAd.location_y==2){
				// 	bannerAd.style.top = 0;
				// }else {
				// 	bannerAd.style.top = windowHeight - bannerAd.style.realHeight - bottom;
				// }
				CreateAd.move_location();

			})

			bannerAd.onError(res => {
				console.log(res);
			})

			bannerAd.onLoad(() => {
				console.log('banner广告加载成功!!!!');
				CreateAd.bannerAd = bannerAd;
			})
			CreateAd.bannerAd = bannerAd;
		// }else{
		// 	CreateAd.move_location();
		// }
		// CreateAd.bannerAd.style.width = Math.min(windowWidth, 280);
		// CreateAd.move_location();
		if (!prestrain) {
			CreateAd.bannerAd.show();
		}
	}

	public static move_location() {
		if(!CreateAd.bannerAd){
			return ;
		}
		let {
			windowWidth,
			windowHeight,
			system,
			model
		} = wx.getSystemInfoSync();
		let bottom = 0;
		if (system.indexOf('iOS') >= 0) {
			if (model.indexOf("X") >= 0 || model.indexOf("11") >= 0) {
				bottom = 5;
			}
		}
		console.log('location_x' + CreateAd.location_x + ":" + "location_y" + CreateAd.location_y +'bootm'+bottom)
		if (CreateAd.location_x == 1) {
			CreateAd.bannerAd.style.left = (windowWidth - CreateAd.bannerAd.style.realWidth) / 2 + 0.1;
		} else if (CreateAd.location_x == 2) {
			CreateAd.bannerAd.style.left = (windowWidth / 2 - CreateAd.bannerAd.style.realWidth) / 2;
		} else {
			CreateAd.bannerAd.style.left = windowWidth / 2 + (windowWidth / 2 - CreateAd.bannerAd.style.realWidth) / 2;
		}

		if (CreateAd.location_y == 1) {
			CreateAd.bannerAd.style.top = (windowHeight - CreateAd.bannerAd.style.realHeight) / 2;
		} else if (CreateAd.location_y == 2) {
			CreateAd.bannerAd.style.top = 0;
		} else {
			CreateAd.bannerAd.style.top = windowHeight - CreateAd.bannerAd.style.realHeight - bottom;
		}
	}


	public static hideAd() {
		if (CreateAd.bannerAd) {
			console.log('hide');
			CreateAd.bannerAd.hide();
			CreateAd.bannerAd.destroy();
			CreateAd.bannerAd = null;
		}
	}

	public static showAd() {
		if (CreateAd.bannerAd) {
			console.log('show');
			CreateAd.bannerAd.show();
		}
	}

	public static bannerAd: any = null;
}


