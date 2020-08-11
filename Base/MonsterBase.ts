class MonsterBase extends UiBase{
    public constructor(){
        super();
    }

    public _speed:number=5;
    public p2_body:p2.Body;


    public xuetiao :MonsterHP;
    public old_hp:number;
    public _hp:number;
    public _gold:number=3;
    public _harm = 20;

    public kaiqiang_flag=false;
    public jump_flag=false;

    public _data;

    public state =0;
    public set_state(v=0){
        // console.log('state'+v);
        v = v%3;
        this.state = v;

        let d = this._data[this.state];
        this.old_hp=this._hp=d.hp;
        this._gold=d.gold;
        this.xuetiao = new MonsterHP();
        this.xuetiao.currentState = d.state;
        this.xuetiao.xuetiao.width=60;
        this.xuetiao.horizontalCenter=0;
        this.addChildAt(this.xuetiao,10);
    }

    public _zou(){
		
    }
    
    public _kaiqiang(){
		
    }
    
    public _kouxue(value:number){
        this._hp-=value;
        this.xuetiao.updata(this._hp,this.old_hp);
        if(this._hp<=0 && this.parent){
            let boom = RecyclingPool.getBoom();
            boom.x=this.x;
            boom.y=this.y;
            // for(let i=0;i<this._gold;i++){
                let gold = RecyclingPool.getGold();
                gold.x=this.x+Math.random()*100;
                gold.y=this.y-Math.random()*100;
                gold.value = this._gold;
                // setTimeout(()=>{
                    this.parent.addChild(gold);
                // },i*150);
            // }
            this.parent.addChild(boom);
            this.parent.removeChild(this);
            P2converEgret.world.removeBody(this.p2_body);
            BGM.playEffect(8)
        }
        BGM.playEffect(10);

    }

    public positon_x=0;
    public positon_y=0;

    public get factor_y():number {
        if(this.p2_body){
            return this.p2_body.position[1];
        }else{
            return 0;
        }
    }

	public set factor_y(value:number) {
		this.p2_body.position[1] = value;
		
    }
}