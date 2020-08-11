class Common {
	public constructor() {
	}

	//设置循环播放
	public static playAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
		if (isLoop) {
			for (let key in target.items) {
				target.items[key].props = { loop: true };
			}
		}
		target.play(0);
	}

	public static formatDate(value) :string{
        var secondTime:any = parseInt(value);// 秒
        var minuteTime:any = 0;// 分
        var hourTime = 0;// 时
        if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            minuteTime = Math.floor(secondTime / 60);
            //获取秒数，秒数取佘，得到整数秒数
            secondTime = secondTime % 60;
            //如果分钟大于60，将分钟转换成小时
            if(minuteTime > 60) {
                //获取小时，获取分钟除以60，得到整数小时
                hourTime = Math.floor(minuteTime / 60);
                //获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = minuteTime % 60;
            }
        }
		if(secondTime<10){
			secondTime = '0'+secondTime;
		}
        var result = "" +secondTime+ "";
        if(minuteTime >= 0) {
			if(minuteTime<10){
				minuteTime = '0'+minuteTime;
			}
            result = "" + minuteTime + "_" + result;
        }
//         if(hourTime > 0) {
//             result = "" +hourTime + "小时" + result;
//         }
        return result;
    }

	public static creatDragonbones(name,armature ='armatureName') :dragonBones.EgretArmatureDisplay{
		var dragonbonesData = RES.getRes(name+"_ske_json");
        var textureData = RES.getRes(name+"_tex_json");
        var texture = RES.getRes(name+"_tex_png");
        
        let egretFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        egretFactory.parseDragonBonesData(dragonbonesData);
        egretFactory.parseTextureAtlasData(textureData, texture);
        let armatureDisplay = egretFactory.buildArmatureDisplay(armature);

		return armatureDisplay
	}

	//取小数点后几位小数
	public static changeTwoDecimal(param)
	{
		var value = parseFloat(param);
		var value= Math.round(param*10)/10;
		return value;
	}
}