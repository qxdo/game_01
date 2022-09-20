import { _decorator, Component, Node, Vec2, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

const temp_v2 = new Vec2();

@ccclass('Test')
export class Test extends Component {
    private originTouchPos = new Vec2();

    start() {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this)

    }

    touchStart(touch: Touch, event: EventTouch) {
        console.log('touch start')
    }

    update(deltaTime: number) {
        
    }
}

