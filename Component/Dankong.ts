class Dankong extends UiBase{
    public constructor(){
        super();
        this.skinName='DankongSkin';
        this.anchorOffsetX=this.width/2;
        this.anchorOffsetY=this.height/2;
    }

    public init(){
        this.addtostage();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addtostage,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,()=>{
            RecyclingPool.recycle(this);
        },this);
    }

    private addtostage(){
        setTimeout(() => {
            if(this.parent){
                this.parent.removeChild(this);
            }
        }, 100);
    }
}