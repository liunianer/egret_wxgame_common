class SceneManager {
	private static _manager:SceneManager;
	public static get Instance(){
		if( SceneManager._manager==null){
			SceneManager._manager = new SceneManager();
		}
		return SceneManager._manager;
	}
	public constructor() {

	}
	public rootLayer:eui.UILayer;//起始场景
	private currentScene:eui.Component;//需要显示的场景
	public pop_scene:eui.Component;//弹出场景层

	public gameScene :GameScene;
	public indexScene :IndexScene;
	public overScene :OverScene = new OverScene();
	public riverScene :River = new River();	
	public riverScene2 :River2 = new River2();

	public bottomList = new bottomList();

	public fixerCarscene:FixerCarScene;


	public checkpointScene :CheckpointScene;
	public skillScene :SkillScene = new SkillScene();
	public goldBox:Gold_box=new Gold_box();

	public loading:LoadingUI;
	public loading2;

	public timer=0;
	
	/**
	 * 添加到场景上
	 * @param s 需要的场景
	 * @param p 父级
	 * @param z z-index
	 */
	public static addScene(s:egret.DisplayObject,p:egret.DisplayObjectContainer=SceneManager.Instance.rootLayer.stage,z:number=-1){
		if(z<0){
			z=p.numChildren;
		}
		if(s && p){
			p.addChildAt(s,z);
		}
	}


	/**
	 * 关闭页面
	 * @param s 移除的场景
	 */
	public static removeScene(s:egret.DisplayObject){
		if(s && s.parent){
			s.parent.removeChild(s);
		}
	}


	/**
	 * 弹出场景层
	 */
	public pushScene(s:eui.Component){
		this.popScene();
		if(!this.pop_scene){
			this.rootLayer.stage.addChild(s);
			this.pop_scene = s;
		}
	}
	/**
	 * 关闭场景层
	 */
	public popScene(){
		if(this.pop_scene){
			this.rootLayer.stage.removeChild( this.pop_scene);
			this.pop_scene = null;
		}
	}
}