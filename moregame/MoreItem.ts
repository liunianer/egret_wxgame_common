class MoreItem{
	public constructor() {

	}

	public static touchToApp(data,skip=true){
		Net.userpreclick(this,data.appid,data.locationid,data.id)
		let wx_ = window["wx"];
		wx_.navigateToMiniProgram({
				appId: data.appid,
				path: data.url,
				extraData:data.appid,
				success: function (res) {
					console.log("openApp");
					Net.userclick(this,data.appid,data.locationid,data.id)
				},
				fail:function(){
					console.log('失败')
					if(skip){
						SceneManager.Instance.pushScene(SceneManager.Instance.riverScene)
					}
				}
			})
	}
}