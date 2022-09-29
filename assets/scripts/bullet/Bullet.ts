import { _decorator, Component, Node, MeshType, math } from 'cc';
const { ccclass, property } = _decorator;

const Bullet_Max_Moving_Range = 50;
@ccclass('Bullet')
export class Bullet extends Component {
    @property
    public bulletSpeed = 0.01;

    start() {

    }

    update(deltaTime: number) {
        const pos = this.node.position
        const moveLength = pos.z - this.bulletSpeed
        this.node.setPosition(pos.x, pos.y, moveLength)
        if(math.bits.abs(moveLength) > Bullet_Max_Moving_Range) {
            this.node.destroy()
            console.log("bullet destroyed")
        }
    }
}

