class ButtonEvent {
	public constructor() {
	}

	public static addButtonEvent(target:egret.DisplayObject,func:Function,thisObject?:any):void{
		if(!target) return;
			target.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				target.scaleX=1;
				target.scaleY=1;
				func();
			},thisObject||this);
			target.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
				target.scaleX=0.9;
				target.scaleY=0.9;
		   },thisObject||this);

		   target.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,()=>{
				target.scaleX=1;
				target.scaleY=1;
		   },thisObject||this);
		   
	} 

	public static removeButtonEvent(target:egret.DisplayObject,func:Function,thisObject?:any){
		if(!target) return;
			target.removeEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				target.scaleX=1;
				target.scaleY=1;
				func();
			},thisObject||this);
			target.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
				target.scaleX=0.9;
				target.scaleY=0.9;
		   },thisObject||this);

		   target.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,()=>{
				target.scaleX=1;
				target.scaleY=1;
		   },thisObject||this);
	}

	public static scaleReduction(target:egret.DisplayObject,func:Function){
		target.scaleX=1;
		target.scaleY=1;
		func();
	}
	public static scaleNarrow(target:egret.DisplayObject){
		target.scaleX=0.9;
		target.scaleY=0.9;
	}
}