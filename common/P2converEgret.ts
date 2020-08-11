class P2converEgret{


    public static world:p2.World=new p2.World({
        gravity: [0, -9.82]
        // gravity: [0, -30]
    });;

    public static factor=50;
    public static worldRect ={
        height :750
    }
    /**
    * 获得p2Body的egret显示旋转角度
    */ 
    public static convertP2BodyAngleToEgret(body:p2.Body):number{
        var result: number;
        result = 360 - body.angle * 180 / Math.PI;
        return result;
    }
                
    /**
    * 把egret角度转换为p2角度
    */ 
    public static convertEgretAngleToP2(angle:number):number{
        var result: number;
        result = (360-angle)*Math.PI/180;
        return result;
    }
            
    /**
    * 物理世界的长度标量到显示世界的转换
    * 适合如 x,width,height的转换，y值不适合
    */ 
    public static convertP2ValueToEgret(value:number):number {
        return value * this.factor;
    }
        
    /**
    * 显示世界物理世界的长度标量到物理世界的转换
    * 适合如 x,width,height的转换，y值不适合
    */ 
    public static convertEgretValueToP2(value:number):number {
        return value / this.factor;
    }
        
    /**
    * 把egretY值转换到p2Y值，仅适合y转换
    */ 
    public static convertEgretY_To_P2Y(egretY:number):number{
        return ( this.worldRect.height - egretY ) / this.factor;
    }
                
                
    /**
    * 把p2y值转换到egretY值，仅适合y转换
    */ 
    public static convertP2Y_To_EgretY(p2Y:number):number{
        return this.worldRect.height - p2Y * this.factor;
    }




    /**
	 * 创建墙体刚体
	 */
	public static addWall(obj: egret.DisplayObject,world,material) {
		let x = obj.x + obj.width / 2 - obj.anchorOffsetX;
		let y = obj.y + obj.height / 2 - obj.anchorOffsetY;
		var positionX: number = x / this.factor;
		var positionY: number = (obj.parent.height - y) / this.factor;
		var display: egret.DisplayObject = obj;
		var boxShape: p2.Shape = new p2.Box({ width: display.width / 50, height: display.height / 50 });
		var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 0 });

		boxBody.addShape(boxShape);
        boxShape.material =material;
        boxBody.fixedY=true;
        boxBody.fixedX=true;
        boxBody.fixedRotation=true;
		// boxBody.damping = 0;
		// boxBody.inertia = 0;
		boxBody.mass = 1;
        world.addBody(boxBody);
        boxBody.angle = P2converEgret.convertEgretAngleToP2(obj.rotation);

		display.anchorOffsetX = display.width / 2;
		display.anchorOffsetY = display.height / 2;
		boxBody.type = p2.Body.DYNAMIC;
		boxBody.displays = [display];

        boxBody.updateMassProperties();
    }
    


    /**
     * 
     * @param 创建海拔形状
     */
    public static addHeightfield(obj:Map1,world,material){
        let start_point = obj.g_.getChildAt(0);
        let start_x=start_point.parent.localToGlobal(start_point.x,start_point.y).x;
        let arr =[];
        obj.g_.visible=false;
        for (let i of obj.g_.$children) {
            // console.log(i.parent.localToGlobal(i.x,i.y));
            let y_ = this.convertEgretY_To_P2Y(i.parent.localToGlobal(i.x, i.y).y);
            // let convertEgretY_To_P2Y = (this.height - i.parent.localToGlobal(i.x, i.y).y) / this.factor;
            arr.push(y_);
        }

        // this.heightsData = arr;
        let heiFieldElemWid = obj.g_.getChildAt(1).x - obj.g_.getChildAt(0).x;
        var p2ElemWid = heiFieldElemWid/this.factor;
        let heightfieldShape: p2.Heightfield = new p2.Heightfield({ heights: arr, elementWidth: p2ElemWid });
        var heightfield = new p2.Body({
            //注意这里的Y不能传入>0数值，会产生诡异错误
            //x根据场景需求来决定
            position: [start_x/this.factor, 0]
        });
        heightfield.addShape(heightfieldShape);
        heightfieldShape.material = material;
        heightfield.displays=[null];
        // heightfield.displays=[obj];

        // this.hField = heightfield;
        world.addBody(heightfield);
        // this.drawHeightField(heightfield,arr,heiFieldElemWid);
    }

      /**
	 * 角色刚体
	 */
	public static addRole(obj: RoleBase,world,material) {
		let x = obj.x + obj.width / 2 - obj.anchorOffsetX;
		let y = obj.y + obj.height / 2 - obj.anchorOffsetY;
		var positionX: number = x / this.factor;
		var positionY: number = (obj.parent.height - y) / this.factor;
		var display: egret.DisplayObject = obj;
		var boxShape: p2.Shape = new p2.Box({ width: display.width*display.scaleX / 50, height: display.height*display.scaleY / 50 });
		var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 0 ,fixedRotation: true});

		boxBody.addShape(boxShape);

		boxShape.material =material;
		// boxBody.damping = 0.5;
		// boxBody.inertia = 0;
		boxBody.mass = 1;
		boxBody.gravityScale=2;
        boxBody.type = p2.Body.DYNAMIC;
        // boxBody.type = p2.Body.STATIC;
		boxBody.displays = [display];
		world.addBody(boxBody);
		// console.log(boxBody.mass);
		// display.anchorOffsetX = display.width / 2;
		// display.anchorOffsetY = display.height / 2;

        obj.role_body = boxBody;
        obj.ren_body = boxBody;
		boxBody.updateMassProperties();
        this.car_body(obj,material);
		// console.log(boxBody);
    }
    
    public static car_body(obj:RoleBase,material){

		var positionX: number = obj.ren_body.position[0] / this.factor;
		var positionY: number = obj.ren_body.position[1] / this.factor;
		var display: egret.DisplayObject = obj;
		var boxShape: p2.Shape = new p2.Box({ width: 200 / 50, height: 50 / 50 });
		var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 0 });

		boxBody.addShape(boxShape);

		boxShape.material = material;
		// boxBody.damping = 0.5;
		// boxBody.inertia = 0;
		boxBody.mass = 1;
		boxBody.gravityScale=2;
        boxBody.type = p2.Body.DYNAMIC;

		boxBody.displays = [display];
		// this._world.addBody(boxBody);
        obj.che_body = boxBody;
        // console.log(boxBody);
		boxBody.updateMassProperties();
    }

    /**
     * 怪物刚体
     * @param obj 
     * @param world 
     * @param material 
     */
    public static addMonster(obj: MonsterBase,world,material,type:number=p2.Body.DYNAMIC,fixedY:boolean){
        let x = obj.x + obj.width / 2 - obj.anchorOffsetX;
		let y = obj.y + obj.height / 2 - obj.anchorOffsetY;
		var positionX: number = x / this.factor;
		var positionY: number = (obj.parent.height - y) / this.factor;
		var display: egret.DisplayObject = obj;
		var boxShape: p2.Shape = new p2.Box({ width: display.width / 50, height: display.height / 50 });
		var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 0 ,fixedRotation: true});

		boxBody.addShape(boxShape);
		boxShape.material =material;
		boxBody.mass = 1;
        boxBody.type = type;
        boxBody.displays = [display];
        boxBody.fixedY = fixedY;
		world.addBody(boxBody);
		display.anchorOffsetX = display.width / 2;
		display.anchorOffsetY = display.height / 2;
        obj.p2_body = boxBody;

		boxBody.updateMassProperties();

    }

    /**
     * 子弹刚体
     * @param obj 
     */
    public static addBullet(obj: egret.DisplayObject):p2.Body {
		let x = obj.x + obj.width / 2 - obj.anchorOffsetX;
		let y = obj.y + obj.height / 2 - obj.anchorOffsetY;
		var positionX: number = x / this.factor;
		var positionY: number = (obj.parent.height - y) / this.factor;
		var display: egret.DisplayObject = obj;
		var boxShape: p2.Shape = new p2.Box({ width: display.width / 50, height: display.height / 50 });
		var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 0 });

		boxBody.addShape(boxShape);
		boxBody.mass = 1;
        boxBody.angle = P2converEgret.convertEgretAngleToP2(obj.rotation);

		display.anchorOffsetX = display.width / 2;
		display.anchorOffsetY = display.height / 2;
		boxBody.type = p2.Body.KINEMATIC;
        boxBody.displays = [display];

        boxBody.updateMassProperties();
        return boxBody;
    }


    /**
     * 刚体
     * @param obj 
     */
    public static addBody(obj: egret.DisplayObject,type:number=p2.Body.STATIC):p2.Body {
		let x = obj.x + obj.width / 2 - obj.anchorOffsetX;
		let y = obj.y + obj.height / 2 - obj.anchorOffsetY;
		var positionX: number = x / this.factor;
		var positionY: number = (obj.parent.height - y) / this.factor;
		var display: egret.DisplayObject = obj;
		var boxShape: p2.Shape = new p2.Box({ width: display.width / 50, height: display.height / 50 });
		var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 0 });

		boxBody.addShape(boxShape);
		boxBody.mass = 1;
        boxBody.angle = P2converEgret.convertEgretAngleToP2(obj.rotation);

		display.anchorOffsetX = display.width / 2;
		display.anchorOffsetY = display.height / 2;
		boxBody.type = type;
        boxBody.displays = [display];

        boxBody.updateMassProperties();
        return boxBody;
    }
}