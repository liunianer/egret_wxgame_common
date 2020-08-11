class Jiaqian extends UiBase{
    public constructor(){
        super();
        this.skinName='JiaqianSkin';
    }

    public tet:eui.BitmapLabel;

    public init(){
        this.scaleX=this.scaleY=2;
    }

    public updata(v){
        this.tet.text = '+'+v;
        this.anchorOffsetX=this.width;
        let _y = this.y;
        egret.Tween.get(this).to({y:_y-80},1000).call(()=>{
            if(this.parent){
                this.parent.removeChild(this);
                RecyclingPool.recycle(this);
            }
        })
    }
}