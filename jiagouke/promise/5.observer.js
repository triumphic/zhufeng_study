// 发布订阅 特点是  订阅方和发布方没有任何关系
// 观察者模式   特点是  观察者和被观察者  是有关联的   观察者需要将自己放到被观察者之上  当被观察者状态发生变化时，需要通知所有的观察者

class substract{    // 被观察者
    constructor(name){
        this.state = '开心';
        this.name = name;
        this.observers = [];
    }
    attach(o){
        this.observers.push(o)
    }
    setState(state){
        this.observers.forEach( o => {
            o.update(this)
        } )
    }
}

class observer{     // 观察者
    constructor(name){
        this.name = name;
    }
    update(obj){
        console.log(obj)
    }
}

let baby = new substract("小宝宝");
let daddy = new observer("爸爸");
let mom = new observer("妈妈");

baby.attach(daddy);
baby.attach(mom);
baby.setState("不开心")
