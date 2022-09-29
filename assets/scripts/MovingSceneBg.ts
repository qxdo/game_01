import { _decorator, Component, Node, JsonAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MovingSceneBg')
export class MovingSceneBg extends Component {
    
    @property(Node)
    bg01: Node = null;

    @property(Node)
    bg02: Node = null;

    private bgSpeed = 10;

    private movingMaxRange = 90;

    start() {

    }

    test() {
        this.init()
    }

    private init() {
        this.bg01.setPosition(0,-20,0)
        this.bg02.setPosition(0,-20,-this.movingMaxRange)
    }

    update(deltaTime: number) {
        this.moveBackground(deltaTime)
    }

    private moveBackground(deltaTime: number) {
        this.bg01.setPosition(0,-20, this.bg01.position.z + this.bgSpeed * deltaTime)
        this.bg02.setPosition(0,-20, this.bg02.position.z + this.bgSpeed * deltaTime)

        if (this.bg01.position.z > this.movingMaxRange) {
            this.bg01.setPosition(0,-20, this.bg02.position.z  - this.movingMaxRange)
        } else if (this.bg02.position.z > this.movingMaxRange) {
            this.bg02.setPosition(0,-20, this.bg01.position.z  - this.movingMaxRange)
        }
    }
}

