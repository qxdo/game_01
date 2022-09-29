import { _decorator, Component, Node, Vec2, EventTouch, input,  } from 'cc';
const { ccclass, property } = _decorator;

const temp_v2 = new Vec2();

@ccclass('Test')
export class Test extends Component {
    private originTouchPos = new Vec2();

    start() {

    }

    update(deltaTime: number) {
        
    }
}

