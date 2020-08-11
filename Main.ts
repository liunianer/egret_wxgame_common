
class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        egret.ImageLoader.crossOrigin = "anonymous";
   
       
        await this.loadResource()
        //  let login = await platform.login();
        // this.Login(login.code,login.anonymousCode)
        // if(1){
        //     SceneManager.Instance.rootLayer = this;
        //     Tips.getInstance().setLayer(this.stage);
        //     await RES.loadGroup('level',0);
        //     this.stage.addChild(new MapScene());
        //     // this.stage.addChild(new GameScene2());
        //     for(let i=1;i<=50;i++){
        //         let d = {"index":i,"xingxing":0};
        //         DataConfig.level_data_list.push(d);
        //     }
        //     // this.stage.addChild(new IndexScene());
        //     // this.stage.addChild(new CheckpointScene());
        //     // this.stage.addChild(new GameScene());
        //     // this.stage.addChild(new FixerCarScene());
        //      this.stage.removeChild(this.loadingView);
        //      return;
        // }  
        // if(1){ 
        //     // this.init();
        //     // this.addChild(new Map());
        //     // DataConfig.level_data_list = [];
        //     // for(let i=1;i<=50;i++){
        //     //     let d = {"index":i,"xingxing":0};
        //     //     DataConfig.level_data_list.push(d);
        //     // }
        //     // Tips.getInstance().setLayer(this.stage)
        //      SceneManager.Instance.rootLayer = this;
        //       BGM.getInstance().init();
        //      Tips.getInstance().setLayer(this.stage)            
        //     this.stage.removeChild(this.loadingView);
        //      this.addChild(SceneManager.Instance.indexScene= new IndexScene());                          
        //      return;
        // }
        // this.login();
       
    }
    // private Login(code,anonymousCode){
    //     Net.sendSessionCode2(this, code,anonymousCode).then(res => {
    //         DataConfig.openid = res.result.openid;
    //         DataConfig.sessid = res.result.sessid;
    //         let launch: any = wx.getLaunchOptionsSync()
    //         let tj_openid = egret.localStorage.getItem('openid')
    //         let date = new Date().valueOf();            
    //         // Net.uclick(this, '30239173',
    //         // tj_openid, Math.floor(date / 1000), launch.query.key, DataConfig.openid, launch.referrerInfo.appId)
    //         // .then(res => { egret.localStorage.setItem('openid', res.Result.OpenId);})
    //         this.createGameScene();
    //         this.time1 = Math.floor(new Date().valueOf() / 1000);

    //     })
    //    this.wxshareInit();
    // }

    private async login(){
        let login = await platform.login();
        Net.sendSessionCode(this, login.code).then(res => {
            DataConfig.openid = res.result.openid;
            DataConfig.sessid = res.result.sessid;

            let launch: any = wx.getLaunchOptionsSync()
            let tj_openid = egret.localStorage.getItem('openid')
            let date = new Date().valueOf();
           
           let strkey = '';
            if(launch.query.key){
                strkey = launch.query.key;
            }
            Net.uclick(this, Net.softid,
                tj_openid, Math.floor(date / 1000), strkey, DataConfig.openid, launch.referrerInfo.appId)
                .then(res => {
                    egret.localStorage.setItem('openid', res.Result.OpenId);
                })
            
            // window['wx'].aldSendOpenid(DataConfig.openid);
            this.createGameScene();
            this.time1 = Math.floor(new Date().valueOf() / 1000);

        })
        this.wxshareInit();
    }

    private centerX: number = 375;
    private centerY: number = 667;
    private radius: number = 300;
    private degree: number = 0;
    private display: egret.Shape;
    public init() {
        this.display = new egret.Shape();
        this.display.graphics.beginFill(0xFF9900);
        this.display.graphics.drawCircle(0, 0, 10);
        this.display.graphics.endFill();
        this.addChild(this.display);
        let s = new egret.Shape();
        s.graphics.beginFill(0xFFffff);
        s.graphics.drawCircle(375, 667, 299);
        s.graphics.endFill();
        this.addChild(s);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }

    private enterFrameHandler(e: egret.Event) {
        var pt: egret.Point = egret.Point.polar(this.radius, this.degree * Math.PI / 180);
        this.display.x = this.centerX + pt.x;
        this.display.y = this.centerY + pt.y;
        this.degree += 1;
    }

    /**
     * 微信分包加载
     */
    private async loadSubpackage() {
        console.log('分包加载开始')
        let that = this;
        const loadTask = window['wx'].loadSubpackage({
            name: 'stage1', // name 可以填 name 或者 root
            success: async function (res) {
                // 分包加载成功后通过 success 回调
                // RES.loadGroup("stage1", 1, this.loadingView);
                await RES.loadGroup("preload", 1, that.loadingView);            
                DataConfig.loadSubpackage = true;
                that.login();
                console.log('分包加载完毕')
            },
            fail: function (res) {
                // 分包加载失败通过 fail 回调
                console.log('分包加载失败');
            }
        })
        this.loadingView.showTips();
        loadTask.onProgressUpdate(res => {
            console.log('下载进度', res.progress)
            console.log('已经下载的数据长度', res.totalBytesWritten)
            console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
            this.loadingView.onProgress(res.totalBytesWritten,res.totalBytesExpectedToWrite);
        })
    }


    /**
  * 微信监听初始化
  */
    private wxshareInit() {
        wx.onShow(res => {
            this.time1 = Math.floor(new Date().valueOf() / 1000);
            if (SceneManager.Instance.fixerCarscene && SceneManager.Instance.fixerCarscene.parent) {
                // CreateAd.showbannerAd(1,3,true);
                SceneManager.removeScene(SceneManager.Instance.fixerCarscene);
            }
            BGM.playBgm();
            // CreateAd.showbannerAd();
            // setTimeout(() => {
            //     CreateAd.hideAd();
            // }, 2000);
            // if(
            //     (res.scene== 1038 || res.scene == 1067 || res.scene== 1020 || res.scene==1058 || res.scene==1102)
            //     && SceneManager.Instance.fixerCarscene && SceneManager.Instance.fixerCarscene.parent){
            //     setTimeout(()=>{
            //         SceneManager.removeScene(SceneManager.Instance.fixerCarscene);
            //     },1000);
            // }
        })
        wx.onHide(() => {
            this.time2 = Math.floor(new Date().valueOf() / 1000);
            let openid = egret.localStorage.getItem('openid')
            Net.stay(this, Net.softid, openid, this.time2, this.time2 - this.time1);

            Net.saveData(this,{
                    level:DataConfig.level,
                    data:DataConfig.level_data_list,
                    skill_data:DataConfig.skill_data,
                    gold:DataConfig.gold
            })
        })
        wx.showShareMenu({
            withShareTicket: true,
            success: function (res) {
                console.log("设置分享成功");
            },
            fail: function (res) {

            }, complete: function (res) {

            }
        })

        wx.onShareAppMessage(() => {
            let n = Math.floor(Math.random() * DataConfig.share.length);
            return {
                title: DataConfig.share[n].title,
                imageUrl: DataConfig.share[n].img,
                success: function (res) {
                    console.log('转发成功');
                },
                query: '',
            }
        })

        const updateManager = wx.getUpdateManager()

        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate)
        })

        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function (res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                },
                showCancel: false,
                cancelText: '',
                cancelColor: '',
                confirmText: '确定',
                confirmColor: '#576B95',
                fail: (res: any) => { },
                complete: (res: any) => { }
            })
        })

        updateManager.onUpdateFailed(function () {
            // 新版本下载失败
        })
    }
    private time1;
    private time2;
    private loadingView: LoadingUI;

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            // await RES.loadConfig("subpackage/game.res.json", "subpackage/");
            await this.loadTheme();
            await RES.loadGroup("loading");
            this.loadingView = new LoadingUI();
            SceneManager.Instance.loading = this.loadingView;
            this.stage.addChild(this.loadingView);
            // await RES.loadGroup("preload", 0, this.loadingView);
            // this.login();
            // await RES.loadGroup("preload");            
            this.loadSubpackage();
            
        }
        catch (e) {
            console.error(e);
        }
    }

    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void {
        // console.log(unscaledWidth + "," + unscaledHeight);
        if (this.$layout) {
            DataConfig.unscaledWidth = unscaledWidth;
            DataConfig.unscaledHeight = unscaledHeight;
            this.$layout.updateDisplayList(unscaledWidth, unscaledHeight);
        }
        // this.updateScrollRect();
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        console.log('createGame')
        SceneManager.Instance.rootLayer = this;
        BGM.getInstance().init();
        Tips.getInstance().setLayer(this.stage);
        // GameRecorder.init();
        Net.init(this).then((res) => {
            DataConfig.version = res.result.config.version;
            DataConfig.total = res.result.config.total;
            DataConfig.share = res.result.share;
            Net.getData(this).then((res2) => {
                let data = res2.result.data;
                let time_ =null;
                // if (data) {
                    if(data && data.level){
                         DataConfig.level = parseInt(data.level);
                    }

                    if(data && data.data && data.data.length>=50){
                        DataConfig.level_data_list = data.data;
                    }else{
                         DataConfig.level_data_list = [];
                        for(let i=1;i<=50;i++){
                            let d = {"index":i,"xingxing":0};
                            DataConfig.level_data_list.push(d);
                        }
                        console.log('dataconfig.data')
                        console.log(DataConfig.level_data_list);
                    }
                    if(data && data.skill_data){
                        DataConfig.skill_data=data.skill_data;
                    }
                    
                    if(data && data.gold){
                        DataConfig.gold=data.gold;
                    }
                // }
               
                Net.saveData(this,{
                        level:DataConfig.level,
                        data:DataConfig.level_data_list,
                        skill_data:DataConfig.skill_data,
                        gold:DataConfig.gold
                 })
                
                 Net.getGameParam(this).then(res => {
                    let s ='';
                    for (let data of res.result) {
        
                        if(data.name == 'flow_open'){
                            DataConfig.flow_open = data.value;
                        }
        
                        if (data.name == 'xiuche_limit') {
                            DataConfig.touchAd = data.value;
                        }
                        if (data.name == 'zadan_limit') {
                            DataConfig.touchAd2 = data.value;
                        }
                        if(data.name =='scene_limit'){
                           s= data.value;
                        }
                        if(data.name =='shipin_open'){
                            DataConfig.shipin_open= data.value;
                         }
                    }
                    let launch:any= wx.getLaunchOptionsSync();
                    console.log('场景值'+launch.scene);
                    console.log(s.indexOf(launch.scene))
                    if(s.indexOf(launch.scene)>=0){
                        DataConfig.touchAd = 0;
                        DataConfig.touchAd2 = 0;
                        DataConfig.shipin_open = 0;
                    }
                    var date = new Date();
                    let d= egret.localStorage.getItem('date');
                    if(d){
                        let d2=date.getDate();
                        if(d == d2+''){
                            DataConfig.shipin_open=0;
                        }
                    }
                    egret.localStorage.setItem('date',date.getDate()+'');
        
                    SceneManager.addScene(SceneManager.Instance.indexScene = new IndexScene());
                        this.stage.removeChild(this.loadingView);
                    })
                })

               
        });
       
        //    this.addChild(new mapConfig())
 
    }

  
}


    

    


    // let s1 = Factory.create(Floor3);
    // s1.height=153*5;
    // let s2 = this.copyThisOfSonClass(s1);
    // console.log(s2);
    // console.log(s2 instanceof Floor4);
    // s2.x=100;
    // this.addChild(s1);
    // this.addChild(s2);
    // let construClassName = egret.getQualifiedClassName(s2);
    // console.log(construClassName);
    // let z:UiBase = Factory.create(window[construClassName]);
    // z.x= 300;
    // this.addChild(z);


