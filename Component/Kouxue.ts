class Kouxue extends UiBase{
    public constructor(){
        super();
        this.skinName='KouxueSkin';
    }

    public tet:eui.BitmapLabel;

    public init(){
        this.scaleX=this.scaleY=2;
    }

    public updata(v){
        this.tet.text = '-'+v;
        let _y = this.y;
        egret.Tween.get(this).to({y:_y-80},1000).call(()=>{
            if(this.parent){
                this.parent.removeChild(this);
                RecyclingPool.recycle(this);
            }
        })
    }
}