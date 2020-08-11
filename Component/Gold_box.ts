class Gold_box extends UiBase{
    public constructor(){
        super();
        this.skinName='Gold_boxSkin';
    }

    public num:eui.BitmapLabel;

    public init(){
        this.updata();
    }

    public updata(v=0){
        DataConfig.gold +=v;
        DataConfig.gold = parseInt(''+DataConfig.gold);
        this.num.text = DataConfig.gold+'';
    }
}