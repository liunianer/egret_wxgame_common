class BGM {
	public constructor() {
	}
	
	public sound_bgRes:Array<string>=["bgm_mp3","bianshen_wav","chekaiqiang_mp3","boos_mp3",
	"cheyidong_mp3","getgold_mp3","guaiwudaodang_mp3",
	"guaiwukaiqiang_mp3","guaiwusiwang_mp3","jiqirenkaiqiang_mp3",
	"jizhong_mp3","nopass_mp3","pass_mp3","shengjijineng_mp3"];
	/**
	 * 0 背景
	 * 1 变身
	 * 2 车开枪
	 * 3 boos
	 * 4 车移动
	 * 5 金币
	 * 6 怪物导弹
	 * 7 怪物开枪
	 * 8 怪物死亡
	 * 9 机器人开枪
	 * 10 击中
	 * 11 nopass
	 * 12 pass
	 * 13 升级技能
	 */
	public BGM_sound:Array<egret.Sound> =[];

	public static instance:BGM=null;
	public static getInstance():BGM{
		if(BGM.instance==null){
			BGM.instance= new BGM();
		}
		return BGM.instance;
	} 

	public static bgm1:egret.SoundChannel;
	public static bgm2:egret.SoundChannel;

	public init(){
		for(let i=0; i<this.sound_bgRes.length;i++){
			this.BGM_sound.push(RES.getRes(this.sound_bgRes[i]));
		}
	}

	public static index =0;
	/**
	 * 播放背景音乐
	 */
	public static playBgm(i:number=0){
		this.index++;
		try {
			if(this.bgm1) {
				this.bgm1.stop();
			}
			// if(this.index%2==0){
				this.bgm1 = BGM.getInstance().BGM_sound[i].play(0,-1);
			// }else{
			// 	this.bgm1 = BGM.getInstance().BGM_sound[7].play(0,-1);
			// }
			
		} catch (error) {
			console.log('playBgm'+error);
		}
	}
	public static stopBgm1(){
		try {
			if(this.bgm1) {
				this.bgm1.stop();
			}
		} catch (error) {
			console.log('stopBgm1'+error);
		}
	}

	/**
	 * 播放背景音乐2
	 */
	public static playBgm2(i:number=1){
		try {
			if(this.bgm2) {
				this.bgm2.stop();
			}
			this.bgm2 = BGM.getInstance().BGM_sound[i].play(0,-1);
		} catch (error) {
			console.log('playBgm2'+error);
		}
	}

	public static stopBgm2(){
		try {
			if(this.bgm2) {
				this.bgm2.stop();
			}
		} catch (error) {
			console.log('stopBgm2'+error);
		}
	}

	/**
	 * 0 背景
	 * 1 变身
	 * 2 车开枪
	 * 3 boos
	 * 4 车移动
	 * 5 金币
	 * 6 怪物导弹
	 * 7 怪物开枪
	 * 8 怪物死亡
	 * 9 机器人开枪
	 * 10 击中
	 * 11 nopass
	 * 12 pass
	 * 13 升级技能
	 */
	public static playEffect(i:number=2){
		try {
			// if(DataConfig.muisc){
				BGM.getInstance().BGM_sound[i].play(0,1); 
			// }
		} catch (error) {
			console.log('playEffect'+error);
		}
	}
}