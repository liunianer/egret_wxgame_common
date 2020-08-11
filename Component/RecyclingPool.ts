class RecyclingPool{

    public static RoleBullet:Array<Role_zidan>=[];//黄蜂子弹回收池
    public static CarBullet:Array<Role_zidan2>=[];//汽车子弹回收池

    public static RedaoBullet:Array<Redao_zidan>=[];//热导子弹回收池

    public static Boom:Array<Boom>=[];//爆炸回收池

    public static MonsterBullet1:Array<Monster_zidan1>=[];//怪物子弹1
    public static MonsterBullet2:Array<Monster_zidan2>=[];//怪物子弹2
    public static MonsterBullet3:Array<Monster_zidan3>=[];//怪物子弹3


    public static Leidian:Array<Leidian>=[];//雷电;
    public static Gold:Array<Gold>=[];//金币;

    public static Dankong:Array<Dankong>=[];//弹孔;
    public static Kouxue:Array<Kouxue>=[];//扣血文本;
    public static Jiaqian:Array<Jiaqian>=[];//加钱文本;




    
    public static recycle(obj:UiBase){

        if(obj instanceof Role_zidan){
            this.RoleBullet.push(obj);
        }else if(obj instanceof Role_zidan2){
            this.CarBullet.push(obj);
        }else if(obj instanceof Redao_zidan){
            this.RedaoBullet.push(obj);
        }else if(obj instanceof Boom){
            this.Boom.push(obj);
        }else if(obj instanceof Monster_zidan1){
            this.MonsterBullet1.push(obj);
        }else if(obj instanceof Monster_zidan2){
            this.MonsterBullet2.push(obj);
        }else if(obj instanceof Leidian){
            this.Leidian.push(obj);
        }else if(obj instanceof Gold){
            this.Gold.push(obj);
        }else if(obj instanceof Dankong){
            this.Dankong.push(obj);
        }else if(obj instanceof Monster_zidan3){
            this.MonsterBullet3.push(obj);
        }else if(obj instanceof Kouxue){
            this.Kouxue.push(obj);
        }else if(obj instanceof Jiaqian){
            this.Jiaqian.push(obj);
        }
    }

    public static getBullet(i=0):BulletBase{
        let obj :BulletBase;
        switch(i){
            case 0 : obj=this.RoleBullet.shift() || new Role_zidan();
                break;
            case 1 : obj = this.CarBullet.shift() || new Role_zidan2();
                break;
            case 2 : obj = this.MonsterBullet1.shift() || new Monster_zidan1();
                break;
            case 3 : obj = this.MonsterBullet2.shift() || new Monster_zidan2();
                break;
            case 4 : obj = this.RedaoBullet.shift() || new Redao_zidan();
                break;
            case 5 : obj = this.MonsterBullet3.shift() || new Monster_zidan3();
                break;
        }
        return obj;
    }

    public static getBoom():Boom{
        let obj = this.Boom.shift() || new Boom();
        return obj; 
    }

    public static getLeidian():Leidian{
        let obj = this.Leidian.shift() || new Leidian();
        return obj; 
    }

    public static getGold():Gold{
        let obj = this.Gold.shift() || new Gold();
        return obj; 
    }

    public static getDankong():Dankong{
        let obj = this.Dankong.shift() || new Dankong();
        return obj; 
    }

    public static getKouxue():Kouxue{
        let obj = this.Kouxue.shift() || new Kouxue();
        return obj; 
    }

    public static getJiaqian():Jiaqian{
        let obj = this.Jiaqian.shift() || new Jiaqian();
        return obj; 
    }
}