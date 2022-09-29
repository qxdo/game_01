import { _decorator, Component, Node, math } from 'cc';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

const EnemyPlane_Max_Moving_Range = 50;

@ccclass('enemyPlane')
export class enemyPlane extends Component {
    private enemySpeed = 0;

    // private enemyType = Constant.EnemyType.Type1;

    start() {

    }

    update(deltaTime: number) {
        const enemyPos = this.node.position
        const movingLength = enemyPos.z + this.enemySpeed
        this.node.setPosition(enemyPos.x, enemyPos.y, movingLength)
        if(math.bits.abs(movingLength) > EnemyPlane_Max_Moving_Range) {
            this.node.destroy()
        }
    }
    
    show(speed: number) {
        this.enemySpeed = speed
    }
}

