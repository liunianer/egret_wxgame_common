class FixerCarScene extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "FixerCarSceneSkin";
		this.width = DataConfig.unscaledWidth;
		this.height = DataConfig.unscaledHeight;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public g_:eui.Group;
	public loading:eui.Image;
	public touch_:eui.Group;

	
	private _timer: number;
	protected childrenCreated(): void {
		super.childrenCreated();


		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			clearInterval(this._timer);
			CreateAd.hideAd();
			if(SceneManager.Instance.checkpointScene && SceneManager.Instance.checkpointScene.parent){
				// DownloadData.downloadJson(DataConfig.now_level);
				SceneManager.removeScene(SceneManager.Instance.checkpointScene);
			}
			if (SceneManager.Instance.overScene && SceneManager.Instance.overScene.parent) {
				SceneManager.Instance.overScene.left_2();
			}
			
		}, this)


		this.addtostage();


		let num = 0;
		let suijishu = 1 + Math.floor(Math.random() * 5);
		
		ButtonEvent.addButtonEvent(this.touch_, () => {

			
			// this.loading.width += 50;
			// if (this.loading.width >= 384) {
			// 	this.loading.width = 384;
			// }
			// this.Reach.tween_open();
			num++;
			if (num == 6) {
				// this.yaoshi.visible=false;
				// this.tanchu.visible=true;
				// this.armatureDisplay.animation.play('kaixiang',1);
				CreateAd.showAd();
				setTimeout(() => {
					CreateAd.showbannerAd(1,3,true);
					num=Math.floor(Math.random()*6);
					// if (this.parent) {
					// 	this.parent.removeChild(this); 
					// }
				}, 2000);
			}
		});

	}

	private touch_jiasu=1;
	// private Reach = new Reach();
	private addtostage() {
		// this.Reach.x=667;
		// this.Reach.y=265;
		// this.g_.addChild(this.Reach);
		this._timer = setInterval(() => {
			// this.loading.width = this.loading.width - 2;
			// if (this.loading.width < 0) {
			// 	this.loading.width = 0;
			// }
			// if (this.loading.width >= 384) {
			// 	this.loading.width = 384;
			// }
			// this.Reach.tween_off();
		}, 10);
		CreateAd.showbannerAd(1,3,true);
	}

	private move_x = 10;
	private move_y = 3.3;


	private show = false;
	private countDown = false;
	private repairing = false;

}