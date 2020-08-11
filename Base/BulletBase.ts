class BulletBase extends UiBase{
    public constructor(){
        super();
    }

    public _speed:number = 14;
    public _body:p2.Body;
    public _angle:number;

    public _damage:number = 20;

    public point:eui.Rect;

}