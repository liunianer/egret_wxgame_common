class Tips {

	public constructor() {
	}

	private static instance: Tips =null;

	public static getInstance():Tips{
		if(Tips.instance == null){
			Tips.instance=new Tips();
		}
		return Tips.instance;
	}

	private layer:egret.DisplayObjectContainer;
	private pool:Array<TipItem>;
	private queue:Array<number>;

	//Tips.getInstance().setLayer(this.stage);
	public setLayer(layer:egret.DisplayObjectContainer):void{

		this.layer=layer;
		this.pool=[];
		this.queue=[];
	}

	public static show(msg:string):void{
		Tips.getInstance().initView(msg);
	}

	private initView(msg:string):void{
		var item:TipItem =this.pool.length>0? this.pool.pop():new TipItem();
		item.text = msg;
		this.layer.addChild(item);
		item.alpha=0;
		item.x=(this.layer.stage.$stageWidth)/2;

		
		var ty:number = this.layer.stage.$stageHeight/2 +100;
		item.y=ty;
		item.scaleX=item.scaleY = 1.2;
		var time:number = this.queue.length>0 ? 1500: 0;
		this.queue.push(1);
		egret.Tween.get(item).wait(time).to({y:ty-100,alpha:1,scaleX:1,scaleY:1},500,egret.Ease.quadOut).wait(1500)
		.to({y:ty-180,alpha:0},500,egret.Ease.quadIn).call((target)=>{
			this.layer.removeChild(target);
			this.pool.push(target);
			this.queue.pop();
		},this,[item]);
	}
}