import { _decorator, Component, Node, input, Input, EventTouch, Touch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playerPlane')
export class playerPlane extends Component {
    @property
    public planeMoveSpeed = 1;
    start() {

    }

    update(deltaTime: number) {
        
    }

    onDestroy () {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchMove(event: EventTouch) {
        const moveDelta = event.getDelta()
        let playerPlanePos = this.node.position
        this.node.setPosition(playerPlanePos.x + this.planeMoveSpeed * moveDelta.x * 0.01, moveDelta.y, playerPlanePos.z - moveDelta.y * this.planeMoveSpeed * 0.01)
    }

    onTouchStart(event: EventTouch) {
        console.log("touchStart", event.getLocation())
    }
}

