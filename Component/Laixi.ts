class Laixi extends UiBase{
    public constructor(){
        super();
        this.skinName='guaiwulaixiSkin';
        
    }

    public init(){
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        let j=0;
        egret.Tween.get(this,{loop:true}).wait(200).call(()=>{
            
            for(let i=0;i<this.numChildren;i++){
                this.getChildAt(i).visible=false;
                if(j%3==i){
                    this.getChildAt(j%3).visible=true;
                }
            }
            j++;
            if(j==15){
                if(this.parent){
                    egret.Tween.removeTweens(this);
                    this.parent.removeChild(this);
                }
            }
        })
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,()=>{
            egret.Tween.removeTweens(this);
        },this);
    }
}