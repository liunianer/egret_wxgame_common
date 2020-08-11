class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.width = DataConfig.unscaledWidth;
		this.height = DataConfig.unscaledHeight;
        this.createView();
    }

    // public armatureDisplay: dragonBones.EgretArmatureDisplay;
    public r:Role ;
    private createView(): void {
        

        CreateAd.showbannerAd();
        setTimeout(() => {
            CreateAd.hideAd();
        }, 2000);

        this.g_.width = this.width;
        this.g_.height =this.height;
        this.addChild(this.g_);
 
        

        let bg = new eui.Image();
        bg.source = 'loading_bg_png';
        // bg.anchorOffsetX = 1624/2;
        // bg.anchorOffsetY = 750/2;
        bg.width=this.width;
        bg.height=this.height;
        // bg.x = this.width/2;
        // bg.y = this.height/2;
        this.g_.addChild(bg);

        
        this.r =new Role(true);
        this.g_.addChild(this.r);
        this.r.x = this.g_.width/2;
        this.r.y = this.g_.height/2;
        // this.r.playAnimation(1);
        

        // let mc = new eui.Image();
        // mc.source = 'index_frame_png';
        // mc.anchorOffsetX = 2000/2;
        // mc.anchorOffsetY = 750/2;
        // mc.width=2000;
        // mc.height=750;
        // mc.x = this.width/2;
        // mc.y = this.height/2;
        // this.g_.addChild(mc);
        

        // let logo = new eui.Image();
        // logo.source = 'loading_logo_png';
        // logo.width=721;
        // logo.height=231;
        // logo.anchorOffsetX = logo.width/2;
        // logo.anchorOffsetY = logo.height/2;
        // logo.x = this.width/2;
        // logo.y = this.height/2-260;
        // this.g_.addChild(logo);

        // let text = new eui.Image();
        // text.source = 'loading_logo_png';
        // text.x = (750-420)/2;
        // text.y = this.height/2+300;
        // this.g_.addChild(text)


        this.loading_1.source = 'loading_1_png';
        this.loading_1.x = (this.width-654)/2;
        this.loading_1.y = this.height/2+130;
        this.g_.addChild(this.loading_1)

    //     let img = new eui.Image('loading_2_png');
    //     img.x = (this.height-441)/2;
    //    img.y = this.width/2+155;
    //      this.g_.addChild(img);
    //      img.mask = this.loading_2;

        this.loading_2.source = 'loading_2_png';
        this.loading_2.width = 0;
        this.loading_2.x = (this.width-634)/2;
        this.loading_2.y = this.height/2+136;
        this.g_.addChild(this.loading_2);
        // this.showTips();
        // this.g_.addChild(SceneManager.Instance.bottomList);

        // this.textimg = new eui.Image('loading_text1_png');
        // this.textimg.height=33;
        // this.textimg.anchorOffsetY=this.textimg.height/2;
        // this.textimg.x = (this.width-91)/2;
        // this.textimg.y = this.height/2+230;
        // this.g_.addChild(this.textimg); 
    }

    private g_ = new eui.Group();
    private loading_1 = new eui.Image();
    private loading_2 = new eui.Image();
    private textimg:eui.Image;

    public onProgress(current: number, total: number): void {
        this.loading_2.width = 34+ 600 * current/total;

        if(current/total==1){
            // this.armatureDisplay.animation.stop();
            // this.g_.removeChild(this.r);
            // this.r.armatureDisplay.animation.stop();
            // this.r = null;
        }
    }

    public showTips(){
        // let text = new eui.Label();
        // text.size = 21;
        // text.text ='首次加载场景中，请耐心等待';
        // text.x = (750-text.width)/2;
        // text.y = this.height/2+320;
        // this.g_.addChild(text);

    }

}
