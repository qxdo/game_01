import { _decorator, Component, Node, input, Input, EventTouch, Touch } from 'cc';
import {GameManager} from "../framework/GameManager";
const { ccclass, property } = _decorator;

@ccclass('UIMain')
export class UIMain extends Component {
    @property
    public planeMoveSpeed = 1;

    @property(Node)
    public playerPlane: Node = null;

    @property(GameManager)
    public gameManager: GameManager = null;


    start() {
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this)
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)
    }

    onDestroy () {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this)
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)
    }

    onTouchMove(event: EventTouch) {
        const moveDelta = event.getDelta()
        let playerPlanePos = this.playerPlane.position
        this.playerPlane.setPosition(playerPlanePos.x + this.planeMoveSpeed * moveDelta.x * 0.01, moveDelta.y, playerPlanePos.z - moveDelta.y * this.planeMoveSpeed * 0.01)
    }

    onTouchStart(event: EventTouch) {
        console.log("touchStart", event.getLocation())
        this.gameManager.isShooting(true)
    }

    onTouchEnd(event: EventTouch) {
        console.log("touchEnd", event.getLocation())
    }
}

