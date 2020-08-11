class DownloadData {
	public constructor() {
	}
	public static downloadJson(level=1){
		var urlloader: egret.URLLoader = new egret.URLLoader();
		var urlreq: egret.URLRequest = new egret.URLRequest();
		if(DataConfig.level>DataConfig.total){
		  DataConfig.now_level=	DataConfig.level =1;
		}

        urlreq.url = "https://img.youdongxi.cn/res/bxjjzs/v"+DataConfig.version+"/level"+level+".json";
        urlloader.load(urlreq);
        urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
			
	}

	//读取配置文件完成
	public static onComplete(event: egret.Event): void {
		var data = event.target.data;
		var obj = JSON.parse(data);
		// // console.log(obj)
		// DataConfig.game_data = obj;
		this.now_data = obj;
		this.loadScene(obj)

	}

	public static replay(){
		this.loadScene(this.now_data);
	}

	
	public static invincible = false;
	public static loadScene(data = this.now_data){
		SceneManager.removeScene(SceneManager.Instance.gameScene);
		this.now_data = data;
		SceneManager.addScene(SceneManager.Instance.gameScene = new GameScene(data));
		// if(DownloadData.invincible){
		// 	// SceneManager.Instance.gameScene._invincible();
		// 	DownloadData.invincible = false;
		// }
	}

	//预先下载
	public static prestrain(){
		var urlloader: egret.URLLoader = new egret.URLLoader();
		var urlreq: egret.URLRequest = new egret.URLRequest();
		// if(DataConfig.level>DataConfig.total){
		// 	DataConfig.level =1;
		// }
		// urlreq.url = "https://img.youdongxi.cn/res/zsjjy/v"+DataConfig.version+"/"+"game"+DataConfig.level+'.json';
		// urlloader.load(urlreq);
		// urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete2, this);
	}

	public static prestrainData=null;
	public static now_data=null;

	public static onComplete2(event: egret.Event): void {
		var data = event.target.data;
		var obj = JSON.parse(data);
		// console.log(obj)
		this.prestrainData = obj;
		this.now_data = obj;
	}
	
}