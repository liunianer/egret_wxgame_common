
class DataConfig {
	public constructor() {
	}
	public static unscaledWidth;
	public static unscaledHeight;


	public static develop = true;
	public static map = false;

	public static level :number= 5;
	public static now_level :number= 1;
	
	public static level_data_list=[{
		"index":1,
		"xingxing":0
	}]

	public static gold :number = 0;

	public static skin = [{
		"index":'1',
		"unlock":true
	}]

	public static now_skin=1;
	

	public static addtime = false;
	public static touchAd= 0;
	public static touchAd2 = 0;
	public static move_btn = 1;
	public static button_show = 2000;
	public static repairing = false;
	public static shipin_open = 0;
	public static flow_open = 1;

	public static openid;
	public static sessid;
	
	public static game_data;

	public static version =1;
	public static total =30;
	public static share =[{
		img: "https://img.youdongxi.cn/bzhcs/share_1.jpg",
		title: "好友@你，你的兰博基尼被撞了，还不去看看？"
	}];	

	public static login_ = false;

	public static adData;
	public static adData_GLOBAL;

	public static checkpointData:Array<any> =[];


	public static GAME_RIGHT_ad;
	public static RIGHT_ad;
	public static GAME_BANER_AD;
	public static GAME_NOPASS;
	public static GAME_PASS;
	public static GLOBAL_RIVER_QUI;
	public static GAME_CUSTOMS;
	
	public static loadSubpackage = false;

	public static muisc = true;

	public static skill_data = [1,1,1]
	
}
enum AdId {
	INDEX_CAROUSEL = 388,//首页轮播
	GAME_CUSTOMS = 393,//关卡1左右去玩
	GAME_PASS = 389,//过关页1
	GAME_NOPASS = 390,//失败页
	GLOBAL_RIVER_M = 391,//大导游1
	GLOBAL_RIVER =392,//全导游页1
	// WX_FRIENDS= 221, //微信好友框
	// GAME_BANNER=160,//关卡选择banner
	// INDEX_FLEX=193,//伸缩栏
	
	
} 