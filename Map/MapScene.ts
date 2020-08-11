
class MapScene extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName='MapSceneSkin';
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public index_g:eui.Group;
	public scene_g:eui.Group;
	public zhuangshitu:eui.Button;
	public yidongwuti:eui.Button;
	public zhangaiwu:eui.Button;
	public w_input:eui.TextInput;
	public h_input:eui.TextInput;
	public x_input:eui.TextInput;
	public y_input:eui.TextInput;
	public z_input:eui.TextInput;
	public move_input:eui.TextInput;
	public guai_input:eui.TextInput;
	public shanchu:eui.Button;
	public dangqianguanqia:eui.Label;
	public baocun:eui.Button;
	public g_:eui.Group;
	public level_input:eui.TextInput;
	public jiazai:eui.Button;
	public xinjian:eui.Button;
	public zhuangshi_g:eui.Group;
	public yidongwu_g:eui.Group;
	public qiangti_g:eui.Group;



	protected childrenCreated():void
	{
		super.childrenCreated();
		
		this.index_g.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			this.zhuangshi_g.visible=false;
			this.yidongwu_g.visible=false;
			this.qiangti_g.visible=false;
		},this);

		this.zhuangshitu.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			this.zhuangshi_g.visible = !this.zhuangshi_g.visible;
		},this);
		this.yidongwuti.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			this.yidongwu_g.visible = !this.yidongwu_g.visible;
		},this);
		this.zhangaiwu.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			this.qiangti_g.visible = !this.qiangti_g.visible;
		},this);

		this.w_input.addEventListener(eui.UIEvent.CHANGE,()=>{
			if (this._selected && this._selected.parent
				 && this._selected instanceof Map1){
					this._selected.width = parseInt(this.w_input.text);
			}

		},this);
		this.h_input.addEventListener(eui.UIEvent.CHANGE,()=>{
			if (this._selected && this._selected.parent
					&& this._selected instanceof Map1){
					this._selected.height = parseInt(this.h_input.text);
			}

			if (this._selected && this._selected.parent
				&& this._selected instanceof Shudi){
				this._selected.height = parseInt(this.h_input.text);
			}

		},this);
		this.x_input.addEventListener(eui.UIEvent.CHANGE,()=>{
			if (this._selected && this._selected.parent ){
				this._selected.x = parseInt(this.x_input.text)|| 0;
			}
		},this);
		this.y_input.addEventListener(eui.UIEvent.CHANGE,()=>{
			if (this._selected && this._selected.parent ){
				this._selected.y  = parseInt(this.y_input.text)|| 0;
			}
		},this);
		this.z_input.addEventListener(eui.UIEvent.CHANGE,()=>{
			if (this._selected && this._selected.parent){
				// this._selected.zIndex = parseInt(this.z_input.text)|| 0;
				this.scene_g.addChildAt(this._selected,parseInt(this.z_input.text));
			}
		},this);
		this.move_input.addEventListener(eui.UIEvent.CHANGE,()=>{
			if (this._selected && this._selected.parent 
				&& this._selected instanceof MonsterBase ){
					this._selected.state = parseInt(this.move_input.text)||0;
					this.move_input.text = this._selected.state+'';
					// console.log(this._selected.state)
					// console.log(this.move_input.text)
			}
		},this);

		// this.guai_input.addEventListener(eui.UIEvent.CHANGE,()=>{

		// },this);
		// this.copyThisOfSonClass(s1);

		this.shanchu.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			if (this._selected && this._selected.parent){
				// if(this._selected instanceof Role || this._selected instanceof Role2
				// || this._selected instanceof Reach || this._selected instanceof Gold){
				// 	alert('必需物品不能删除');
				// 	return;
				// }
				this._selected.parent.removeChild(this._selected);
				this._selected = undefined;
			}
		},this);

		this.baocun.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			//保存
			let data=[];
			for(let item of this.scene_g.$children){
				let class_name = '';
				let source='';
				let state = 0;
				let skin_='';
				if(item instanceof egret.Shape){
					continue;
				}
				
				if(item instanceof eui.Image){
					class_name = 'img';
					source = item.source+'';
				}else{
					class_name = egret.getQualifiedClassName(item);
					skin_=(<UiBase>item).skinName;
					if(item instanceof MonsterBase){
						state = item.state;
					}
				}

				data.push({
					x: item.x,
					y: item.y,
					w: item.width,
					h: item.height,
					class_name: class_name,
					source: source,
					skin_:skin_,
					state:state
					// move:move
				})
			}
			let json ={level:+egret.localStorage.getItem('level'),
						data:data,
						guai:eval(this.guai_input.text)
					};
			this.save(json);
		},this);

		this.level_input.addEventListener(eui.UIEvent.CHANGE,()=>{
			
			egret.localStorage.setItem('level',this.level_input.text);
		},this);

		this.jiazai.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			 if(+this.level_input.text>0){
				egret.localStorage.setItem('level',this.level_input.text);
				this.dangqianguanqia.text = '第'+egret.localStorage.getItem('level')+'关';
				this.g_.visible=false;
				for(let i=0;i<this.scene_g.numChildren;i){
					this.scene_g.removeChildAt(0);
				}
				let level = egret.localStorage.getItem('level');
				
				let data = RES.getRes('level'+level+'_json');
				console.log(data);
				console.log(data.guai)
				if(data.guai){
					this.guai_input.text = JSON.stringify(data.guai);
					// console.log(JSON.stringify(data.guai));
				}
				
				for(let i of  data.data){
					if(i.class_name =='egret.Shape'){
						continue;
					}
					if(i.class_name == 'img'){
						let img = new eui.Image(i.source);
						img.x=i.x;
						img.y=i.y;
						img.width=i.w;
						img.height=i.h;
						this.scene_g.addChild(img);
					}else{
						let s:UiBase = Factory.create(window[i.class_name+'']);
						s.x=i.x;
						s.y=i.y;
						s.width=i.w;
						s.height=i.h;
						if(s instanceof Map1){
							s.skinName = i.skin_;
						}
						if (s instanceof MonsterBase) {
							s.set_state(i.state);
						} 
						this.scene_g.addChild(s);
						
					}
				}

			 }else{
				this.level_input.text='1';
				 alert('输入大于0的数字')
			 }
			 this.addObj();
		},this);

		this.xinjian.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			if(+this.level_input.text>0){
			egret.localStorage.setItem('level',this.level_input.text);
			this.dangqianguanqia.text = '第'+egret.localStorage.getItem('level')+'关';
			this.g_.visible=false;
			}else{
				this.level_input.text='1';
				alert('输入大于0的数字')
			}
		},this);


		this.windowAddMouseWheel();


		//
		for (let i = 1; i < this.zhuangshi_g.numChildren; i++) {
			let item =<eui.Image>this.zhuangshi_g.getChildAt(i);
			item.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				let s = new eui.Image();
				s.source = item.source;
				let d=this.scene_g.globalToLocal(1334/2,100);
				s.x=d.x;
				s.y=d.y;
				this.scene_g.addChild(s);
				this.addObj();
			},this);
		}

		for (let i = 1; i < this.yidongwu_g.numChildren; i++) {
			let item =<UiBase>this.yidongwu_g.getChildAt(i);
			item.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				let s:UiBase = Factory.create(window[egret.getQualifiedClassName(item)])
				
				let d=this.scene_g.globalToLocal(1334/2,100);
				s.x=d.x;
				s.y=d.y;
				s.skinName = item.skinName;
				this.scene_g.addChild(s);
				this.addObj();
			},this);
		}

		for (let i = 1; i < this.qiangti_g.numChildren; i++) {
			let item = this.qiangti_g.getChildAt(i);
			item.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				let s:UiBase = Factory.create(window[egret.getQualifiedClassName(item)])
				let d=this.scene_g.globalToLocal(1334/2,100);
				s.x=d.x;
				s.y=d.y;
				this.scene_g.addChild(s);
				this.addObj();
			},this);
		}

		this.addObj();
	}

	private up_(){
		this.scene_g.x-=10;
	}
	private down_(){
		this.scene_g.x+=10;
		if(this.scene_g.x>=0){
			this.scene_g.x=0;
		}
	}
	private windowAddMouseWheel() {
		let that = this;
		let scrollFunc = function (e) {
			e = e || window.event;
			if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
				if (e.wheelDelta > 0) { //当滑轮向上滚动时
					// alert("滑轮向下滚动");
					that.down_();
				}
				if (e.wheelDelta < 0) { //当滑轮向下滚动时
					// alert("滑轮向上滚动");
					that.up_();
				}
			} else if (e.detail) {  //Firefox滑轮事件
				if (e.detail > 0) { //当滑轮向上滚动时
					// alert("滑轮向下滚动");
					that.down_();
				}
				if (e.detail < 0) { //当滑轮向下滚动时
					// alert("滑轮向上滚动");
					that.up_();
				}
			}
		};
		//给页面绑定滑轮滚动事件
		if (document.addEventListener) { //火狐使用DOMMouseScroll绑定
			document.addEventListener('DOMMouseScroll', scrollFunc, false);
		}
		//其他浏览器直接绑定滚动事件
		window.onmousewheel = document.onmousewheel = scrollFunc;
	}

	private _selected: egret.DisplayObject;
	//更新选择的对象信息
	private updataMsg() {
		if (this._selected && this._selected.parent) {
			this.w_input.text = this._selected.width + '';
			this.h_input.text = this._selected.height+'';

			this.x_input.text = this._selected.x + '';
			this.y_input.text = this._selected.y + '';
			this.z_input.text = this.scene_g.getChildIndex(this._selected) + 1 + '';
			if(this._selected instanceof MonsterBase){
				this.move_input.visible=true;
				this.move_input.text = this._selected.state+'';
			}else{
				this.move_input.visible=false;
			}

		} else {
			this.w_input.text = '';
			this.h_input.text = '';
			this.x_input.text =  '';
			this.y_input.text =  '';
			this.z_input.text = '';
			this.move_input.text = '';
		}
	}


	private addObj() {
		for (let p of this.scene_g.$children) {
			p.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this)
			p.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
			p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
			p.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
		}
	}

	public copyThisOfSonClass(item: UiBase): UiBase {
		let construClassName = egret.getQualifiedClassName(item);
        let obj = new window[construClassName];
		
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                if (key == "__class__" || key == "__types__") continue;
                var element = item[key];
                obj[key] = element;
            }
        }
	
        return obj;
	}



	private _touch: egret.DisplayObject;
	private _touchStatus: boolean = false;              //当前触摸状态，按下时，值为true
	private _distance: egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
	private mouseDown(evt: egret.TouchEvent) {
		// console.log("Mouse Down.");
		
		this._touchStatus = true;
		if (evt.currentTarget instanceof UiBase) {
			this._touch = evt.currentTarget; 
			this._selected = evt.currentTarget;
			this._distance.x = evt.stageX - this._touch.x;
			this._distance.y = evt.stageY - this._touch.y;
			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
		}else if (evt.currentTarget instanceof eui.Image) {
			this._touch = evt.currentTarget;
			this._selected = evt.currentTarget;
			this._distance.x = evt.stageX - this._touch.x;
			this._distance.y = evt.stageY - this._touch.y;
			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
		}

		this.box= this.drawImg(this._selected);	
		let len = this._selected.parent.numChildren;
		this._selected.parent.addChildAt(this.box,len - 1);  
	}

	private box;

	private mouseMove(evt: egret.TouchEvent) {
		if (this._touchStatus && this._touch) {
			// console.log("moving now ! Mouse: [X:"+evt.stageX+",Y:"+evt.stageY+"]");
			this._touch.x = evt.stageX - this._distance.x;
			this._touch.y = evt.stageY - this._distance.y;
			this.box= this.drawImg(this._selected);	
			let len = this._selected.parent.numChildren;
			this._selected.parent.addChildAt(this.box,len - 1); 
		}
	}

	private mouseUp(evt: egret.TouchEvent) {
		// console.log("Mouse Up.");
		this._touchStatus = false;
		this._touch = undefined;
		this.box= this.drawImg(this._selected);	
		let len = this._selected.parent.numChildren;
		this._selected.parent.addChildAt(this.box,len - 1);  
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
		this.updataMsg();
	}


	private drawPen: egret.Shape = new egret.Shape;
	 private drawImg(obj: egret.DisplayObject): egret.Shape{
        this.drawPen.graphics.clear();
        this.drawPen.graphics.lineStyle(1,0xec0023,1.0);
        // 获取矩形区域的四个顶点坐标位置
        let points = CollisionUitls.getRectangleVerPoints(obj);
        this.drawPen.graphics.moveTo(points[0].x,points[0].y);
        for(let i: number = 1; i < points.length; i++) {
            this.drawPen.graphics.lineTo(points[i].x,points[i].y);
        }
        this.drawPen.graphics.lineTo(points[0].x,points[0].y);
        this.drawPen.graphics.endFill();
        return this.drawPen;
    }
	

	protected save(data) {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		// request.open('http://192.168.0.128:8888', egret.HttpMethod.POST);
		request.open('http://127.0.0.1:8888', egret.HttpMethod.POST);
		request.setRequestHeader("Content-Type", "application/json");
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		let txt = JSON.stringify(data);
		request.send(txt);
		request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
			var request = <egret.HttpRequest>event.currentTarget;
			var str = request.response;
			console.log(str);
			if (str) {
				// alert('关卡添加成功');
				this.level(data.level);
			}
		}, this);
	}

	private async level(level){
		RES.destroyRes('level'+level+'_json');
		await RES.loadGroup('level',0);
		this.stage.addChild(new GameScene(RES.getRes('level'+level+'_json')));
	}
}