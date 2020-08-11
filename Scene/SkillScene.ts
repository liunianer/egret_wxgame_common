class SkillScene extends UiBase {
    public constructor() {
        super();
        this.skinName = 'SkillSceneSkin';
        this.width = DataConfig.unscaledWidth;
        this.height = DataConfig.unscaledHeight;
    }

    public close_btn:eui.Image;
    public g_:eui.Group;
    public list:eui.List;
    public title:eui.Label;
    public level:eui.Label;
    public text:eui.Label;
    public up_btn:eui.Group;
    public need_gold:eui.BitmapLabel;
    public add_gold:eui.Image;



    public init() {


        this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            SceneManager.addScene(SceneManager.Instance.indexScene);
            SceneManager.removeScene(this);
        }, this);
        this.list.selectedIndex = 0;
        this.change();
        this.list.addEventListener(eui.UIEvent.CHANGE, this.change, this);
        this.addtostage();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addtostage,this);

        this.up_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            console.log(DataConfig.gold)
            console.log(this.need_gold.text)
            if(DataConfig.gold>=+this.need_gold.text){
                SceneManager.Instance.goldBox.updata(-this.need_gold.text);
                DataConfig.skill_data[this.list.selectedIndex]+=1;
                this.change();
                BGM.playEffect(13);
            }else{
                Tips.show('金币不足');
            }
        },this);

        this.add_gold.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            // if(DataConfig.gold>=+this.need_gold.text){
            //     SceneManager.Instance.goldBox.updata(-this.need_gold.text);
            //     DataConfig.skill_data[this.list.selectedIndex]+=1;
            //     this.change();
            // }else{
                Tips.show('无激励视频');
            // }
        },this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,()=>{
            Net.saveData(this,{
                    level:DataConfig.level,
                    data:DataConfig.level_data_list,
                    skill_data:DataConfig.skill_data,
                    gold:DataConfig.gold
            })
        },this);
    }

    private addtostage(){
        SceneManager.Instance.goldBox.x=120;
        SceneManager.Instance.goldBox.y=450;
        SceneManager.addScene(SceneManager.Instance.goldBox,this.g_);
    }


    private change() {
        // console.log(this.list.selectedIndex);
        switch (this.list.selectedIndex) {
            case 0: this.title.text = '热导飞弹', this.text.textFlow = <Array<egret.ITextElement>>[
                { text: "发射6个热导飞弹，每个飞弹伤害", style: { "size": 30 } },
                { text: (DataConfig.skill_data[0]*5+20-5), style: { "textColor": 0xFF0000, "size": 30, } },
                { text: "点", style: { "size": 30 } },
            ];
                break;
            case 1: this.title.text = '离子护盾', this.text.textFlow = <Array<egret.ITextElement>>[
                { text: "护盾时间免受伤害，持续", style: { "size": 30 } },
                { text: Common.changeTwoDecimal((DataConfig.skill_data[1]*0.2+5-0.2)), style: { "textColor": 0xFF0000, "size": 30, } },
                { text: "秒", style: { "size": 30 } },
            ];
                break;
            case 2: this.title.text = '雷电牵引', this.text.textFlow = <Array<egret.ITextElement>>[
                { text: "向可视区域内所有敌人发射雷电，造成", style: { "size": 30 } },
                { text: (DataConfig.skill_data[2]*10+100-10), style: { "textColor": 0xFF0000, "size": 30, } },
                { text: "点伤害", style: { "size": 30 } },
            ];
                break;
        }
    
        this.level.text = DataConfig.skill_data[this.list.selectedIndex]+'';
        this.need_gold.text = DataConfig.skill_data[this.list.selectedIndex]*1000+'';
    }
}