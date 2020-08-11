class TipItem extends egret.Sprite{
	public constructor() {
		super();
		this.init();
	}

	private textField:egret.TextField;
	private bg:egret.Texture;

	private init(){
		// this.width= this.stage.$stageWidth*0.6;
		// this.width=1334*0.6;
		this.width=320;
		this.textField=new egret.TextField();
		this.textField.size=26;
		this.textField.lineSpacing=30;
		this.textField.bold=true;
		this.textField.textColor= 0xffffff;
		this.textField.multiline=true;
		this.textField.wordWrap=true;
		this.textField.textAlign=egret.HorizontalAlign.CENTER;
		this.textField.width=320;
		// this.textField.width= 1334*5;
		// this.textField.width=this.stage.stageWidth*5;
		this.textField.y=10;

		this.addChild(this.textField);
	}

	public set text(v : string){
		this.textField.text=v;
		this.anchorOffsetX=this.width/2;
		this.anchorOffsetY=this.height/2;
		this.graphics.clear();
		this.graphics.beginFill(0x000000,0.8);
		this.graphics.drawRoundRect(-30,-20,this.width+60,this.height+60,32,32);
		this.graphics.endFill();
		this.textField.x=(this.width-this.textField.width)/2;
	}
}