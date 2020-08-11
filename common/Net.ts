
class Net {

	public static urlIP:string = "https://bxjjzs.youdongxi.cn/v1.1/api/";
	public static urlIP2:string = "https://ad.geyian.ink/v1.2/api/";
	public static urlIP3:string = "https://tj.geyian.ink/v1.1/api/";

	public static softid  ='wxcc006da8ffa4fb04'; // 游戏 appid
	
	public static doReqPost(thisObj:any, callback:Function, rtype:string, value:string,type: string=egret.HttpResponseType.TEXT) {
		var req = new egret.HttpRequest();
		req.responseType = type;
		req.open(this.urlIP+rtype,egret.HttpMethod.POST);
		req.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
		req.send(value);
		req.addEventListener(egret.Event.COMPLETE,callback,thisObj);
	}

	public static doReqGet(thisObj:any, callback:Function, rtype:string, value:string,type: string=egret.HttpResponseType.TEXT) {
		var req = new egret.HttpRequest();
		req.responseType = type;
		req.open(this.urlIP+rtype+value,egret.HttpMethod.GET);
		req.send();
		req.addEventListener(egret.Event.COMPLETE,callback,thisObj);
	}

	public static doReqPostJson(thisObj:any, callback:Function, rtype:string, value:Object,type: string=egret.HttpResponseType.TEXT) {
		var req = new egret.HttpRequest();
		req.responseType = type;
		req.open(this.urlIP+rtype,egret.HttpMethod.POST);
		req.setRequestHeader("Content-Type","application/json;charset=utf-8");
		req.send(value);
		req.addEventListener(egret.Event.COMPLETE,callback,thisObj);
	}

	public static doReqGetJson(thisObj:any, callback:Function, rtype:string, value:Object,type: string=egret.HttpResponseType.TEXT) {
		var req = new egret.HttpRequest();
		req.responseType = type;
		req.open(this.urlIP+rtype+value,egret.HttpMethod.GET);
		req.setRequestHeader("Content-Type","application/json");
		req.send();
		req.addEventListener(egret.Event.COMPLETE,callback,thisObj);
	}

	public static doReqPostPromise(thisObj:any, rtype:string, value:Object,type: string=egret.HttpResponseType.TEXT):Promise<any> {
		return new Promise((resolve, reject) => {
			const self = this;
			var req = new egret.HttpRequest();
			req.responseType = type;
			req.open(this.urlIP+rtype,egret.HttpMethod.POST);
			req.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
			req.send(value);
			req.addEventListener(egret.Event.COMPLETE,function (e: egret.Event) {
				self.onComplete.call(self, e, resolve)
			},thisObj);
		})
	}

	public static doReqGetPromise(thisObj:any, rtype:string, value:Object,type: string=egret.HttpResponseType.TEXT):Promise<any> {
		return new Promise((resolve, reject) => {
			const self = this;
			var req = new egret.HttpRequest();
			req.responseType = type;
			req.open(this.urlIP+rtype+value,egret.HttpMethod.GET);
			req.send();
			req.addEventListener(egret.Event.COMPLETE,function (e: egret.Event) {
				self.onComplete.call(self, e, resolve)
			},thisObj);
		})
	}

	public static doReqGetPromiseGameJson(thisObj:any, rtype:string, value:Object,type: string=egret.HttpResponseType.TEXT):Promise<any> {
		return new Promise((resolve, reject) => {
			const self = this;
			var req = new egret.HttpRequest();
			req.responseType = type;
			let url= "https://img.youdongxi.cn/res/bzhcs/v"+DataConfig.version+"/"
			req.open(url+rtype+value,egret.HttpMethod.GET);
			req.send();
			req.addEventListener(egret.Event.COMPLETE,function (e: egret.Event) {
				self.onComplete.call(self, e, resolve)
			},thisObj);
		})
	}

	public static doReqPostAdPromise(thisObj:any, rtype:string, value:Object,type: string=egret.HttpResponseType.TEXT):Promise<any> {
		return new Promise((resolve, reject) => {
			const self = this;
			var req = new egret.HttpRequest();
			req.responseType = type;
			req.open(this.urlIP2+rtype,egret.HttpMethod.POST);
			req.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
			req.send(value);
			req.addEventListener(egret.Event.COMPLETE,function (e: egret.Event) {
				self.onComplete.call(self, e, resolve)
			},thisObj);
		})
	}

	public static doReqPostPromise_ml(thisObj:any, rtype:string, value:Object,type: string=egret.HttpResponseType.TEXT):Promise<any> {
		return new Promise((resolve, reject) => {
			const self = this;
			var req = new egret.HttpRequest();
			req.responseType = type;
			req.open(this.urlIP3+rtype,egret.HttpMethod.POST);
			req.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
			req.send(value);
			req.addEventListener(egret.Event.COMPLETE,function (e: egret.Event) {
				self.onComplete.call(self, e, resolve)
			},thisObj);
		})
	}

	/**
   * Http 成功执行行数
   */
	public static onComplete(event: egret.Event, resolve: (value?: {} | PromiseLike<{}>) => void) {
		let req = <egret.HttpRequest>event.currentTarget
		let res
		try {
		res = JSON.parse(req.response)
		console.log('%c [HTTP res]', 'color:red', res)
		} catch (error) {
		egret.error(error)
		}
		resolve(res)
	}

	/*
	 * 进入登录
	 **/
	public static login(thisObj:any,callback:Function,code:string,source:Object):void {
		// var value:string = "wx_code="+code+"&source="+source;
		var value={
			"wx_code":code,
			"source":source
		}
		this.doReqPostJson(thisObj,callback,"login",value);
	}

	/**
	 * 根据code换取openid、session_key
	 */
	public static sendSessionCode(thisObj:any,code:string):Promise<any> {
		// var value:string = "wx_code="+code+"&source="+source;
		var value="code="+code
		return this.doReqPostPromise(thisObj,"User/sendSessionCode.html",value);
	}

	/**
	 * 根据code换取openid、session_key
	 */
	// public static getUserInfo(thisObj:any,callback:Function,sessid:string = 'bzhcs'):void {
	// 	// var value:string = "wx_code="+code+"&source="+source;
	// 	var value="sessid="+sessid;
	// 	this.doReqPost(thisObj,callback,"User/getUserInfo.html",value);
	// }
	public static getUserInfo(thisObj:any,sessid:string = DataConfig.sessid):Promise<any> {
		// var value:string = "wx_code="+code+"&source="+source;
		var value="sessid="+sessid;
		return this.doReqPostPromise(thisObj,"User/getUserInfo.html",value);
	}
	/**
	 * 获取数据
	 */
	public static getData(thisObj:any,sessid:string = DataConfig.sessid):Promise<any> {
		var value="sessid="+sessid;
		return this.doReqPostPromise(thisObj,"Utils/getData.html",value);
	}
	/**
	 * 保存数据
	 */
	public static saveData(thisObj:any,data:any,sessid:string = DataConfig.sessid):Promise<any> {
		data = JSON.stringify(data);
		var value="sessid="+sessid+'&data='+data;
		return this.doReqPostPromise(thisObj,"Utils/saveData.html",value);
	}
	
	/**
	 * 保存用户数据
	 */
	public static saveUserInfo(thisObj:any,iv:any,data:string,sessid:string = DataConfig.sessid):Promise<any> {
		
		var value="sessid="+sessid+'&iv='+iv+'&data='+data;
		return this.doReqPostPromise(thisObj,"User/saveUserInfo.html",value);
	}

	/**
	 * 获取启动参数
	 */
	public static init(thisObj:any):Promise<any> {
		var value="";
		return this.doReqGetPromise(thisObj,"Utils/init.html",value);
	}
	
	/**
	 * 获取关卡数据
	 */
	public static getGameJson(thisObj:any,level:number):Promise<any> {
		var value="game"+level+'.json';
		return this.doReqGetPromiseGameJson(thisObj,"",value);
	}

	/**
	 * 获取排行榜数据
	 */
	public static getGuankaRank(thisObj:any,pageindex:number,pagesize=10,sessid:string = DataConfig.sessid):Promise<any> {

		var value="sessid="+sessid+'&pageindex='+pageindex+'&pagesize='+pagesize
		return this.doReqPostPromise(thisObj,"Activity/getGuankaRank.html",value);
	}

	/**
	 * 获取广告位数据
	 */
	public static getAdv(thisObj:any,locationid :number,softid:string = this.softid):Promise<any> {
		var value="locationid="+locationid+'&softid='+softid;
		if(DataConfig.flow_open == 0){
			return new Promise((resolve, reject) => {
				resolve= null;
			});
		}
		return this.doReqPostAdPromise(thisObj,"getAdv.html",value);
	}
	/**
	 * 广告点击前
	 */
	public static userpreclick(thisObj:any,advid :any,locationid:any,id:any,uid :string=DataConfig.openid,softid:string= this.softid):Promise<any> {
		var value="softid="+softid+'&uid='+uid+'&advid='+advid+'&locationid='+locationid+"&id="+id;
		return this.doReqPostAdPromise(thisObj,"userpreclick.html",value);
	}

	/**
	 * 确定广告点击
	 */
	public static userclick(thisObj:any,advid :any,locationid:any,id:any,uid :string=DataConfig.openid,softid:string= this.softid):Promise<any> {
		var value="softid="+softid+'&uid='+uid+'&advid='+advid+'&locationid='+locationid+"&id="+id;
		return this.doReqPostAdPromise(thisObj,"userclick.html",value);
	}


	/**
	 * 点击数据
	 */
	public static uclick(thisObj:any,appid:string,openid:string,posttime :any,key :string,wxopenid :string,fromapp:string):Promise<any> {
		// var value:string = "wx_code="+code+"&source="+source;
		if(!fromapp){
			fromapp = '';
		}
		var value="appid="+appid+"&openid="+openid+"&posttime="+posttime+"&key="+key+"&wxopenid="+wxopenid+"&fromapp="+fromapp
		return this.doReqPostPromise_ml(thisObj,"Activity/uclick.html",value);
	}

	/**
	 * 停留数据
	 */
	public static stay(thisObj:any,appid:string,openid:string,posttime :any,time:any):Promise<any> {
		// var value:string = "wx_code="+code+"&source="+source;
		var value="appid="+appid+"&openid="+openid+"&posttime="+posttime+"&time="+time;
		return this.doReqPostPromise_ml(thisObj,"Activity/stay.html",value);
	}

	/**
	 * 获取游戏参数
	 */
	public static getGameParam(thisObj:any,softid:string= this.softid):Promise<any> {
		var value="softid="+softid;
		return this.doReqPostAdPromise(thisObj,"getGameParam.html",value);
	}


	/**
	 * 获取假数据
	 */
	public static getAiUser(thisObj:any,sessid:string = DataConfig.sessid):Promise<any> {
		// var value:string = "wx_code="+code+"&source="+source;
		var value="";
		return this.doReqPostPromise(thisObj,"User/getAiUser.html",value);
	}


	
	public static save(thisObj:any,callback:Function,token:string,rawData:any,signature:any,encryptedData:any,iv:any):void {
		// let rawDatas_=rawData;
		// let signature_=signature;
		// let encryptedData_=encryptedData;
		// let iv_=iv;
		// rawDatas_ = rawData.replace(/\+/g, "%2B").replace(/\&/g, "%26");  
		// signature_ = signature.replace(/\+/g, "%2B").replace(/\&/g, "%26");  
		// encryptedData_ = encryptedData.replace(/\+/g, "%2B").replace(/\&/g, "%26");     
		// iv_ = iv.replace(/\+/g, "%2B").replace(/\&/g, "%26");  
		// var value:string = "?token="+token+"&rawData="+encodeURIComponent(rawDatas_)+"&signature="+encodeURIComponent(signature_)+"&encryptedData="+encodeURIComponent(encryptedData_)+"&iv="+encodeURIComponent(iv_);
		// rawDatas_ = rawDatas_.replace(/\+/g, "%2B");  		
		let value ={
			"token":token,
			"rawData":rawData,
			"signature":signature,
			"encryptedData":encryptedData,
			"iv":iv
		}
		this.doReqPostJson(thisObj,callback,"post_user_info",value);
	}
	
	/*提交信息
	 *name 参数说明
	 *phone 参数说明
	 *addr 参数说明
	 **/
	public static submit(thisObj:any,callback:Function,name:string,phone:string,addr:string):void {
		var value:string = "name="+name+"&phone="+phone+"&addr="+addr;
		this.doReqPost(thisObj,callback,"api.php?a=submit",value);
	}


}