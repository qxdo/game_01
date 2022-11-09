import { _decorator, Component, Node, Prefab, instantiate, math, TERRAIN_HEIGHT_BASE } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { EnemyPlane } from '../plane/EnemyPlane';
import { Constant } from './Constant';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    public playerPlane: Node = null;

    @property(Prefab)
    public enemyPlane01: Prefab = null;
    @property(Prefab)
    public enemyPlane02: Prefab = null;

    @property(Node)
    public bulletRoot: Node = null;

    @property(Prefab)
    public bullet01: Prefab = null;
    @property(Prefab)
    public bullet02: Prefab = null;
    @property(Prefab)
    public bullet03: Prefab = null;
    @property(Prefab)
    public bullet04: Prefab = null;
    @property(Prefab)
    public bullet05: Prefab = null;

    @property
    public shootTime = 0.3;
    @property
    public bulletSpeed = 1;
    private isShoot = false;
    private currentShootTime = 0;

    @property
    public createEnemyTime = 1;

    @property
    public enemy01Speed = 0.5;

    @property
    public enemy02Speed = 0.7;

    private currentCreateEnemyTime = 0;

    private combinationInterval = Constant.Combination.Plan1;



    start() {
        this.init()
    }
    private init() {
        this.currentShootTime = this.shootTime
        this.changeMode()
    }

    public createPlayerBullet() {
        const bullet = instantiate(this.bullet01)
        bullet.setParent(this.bulletRoot)
        const playerPos = this.playerPlane.position
        bullet.setPosition(playerPos.x, playerPos.y, playerPos.z - 7)
        const bulletComp = bullet.getComponent(Bullet)
        bulletComp.bulletSpeed = this.bulletSpeed
    }

    update(deltaTime: number) {
        this.currentShootTime += deltaTime
        this.currentCreateEnemyTime += deltaTime
        if(this.isShoot && this.currentShootTime > this.shootTime) {
            this.createPlayerBullet()
            this.currentShootTime = 0
        }
        
        if(this.combinationInterval === Constant.Combination.Plan1) {
            
            if (this.currentCreateEnemyTime > this.createEnemyTime) {
                this.createEnemyPlaneCombine1()
                this.currentCreateEnemyTime = 0
            }
        } else if(this.combinationInterval === Constant.Combination.Plan2) {
            if (this.currentCreateEnemyTime > this.createEnemyTime * 0.8) {
                this.createEnemyPlaneCombine2()
                this.currentCreateEnemyTime = 0
            }
        } else {
            this.createEnemyPlaneCombine1()
            this.currentCreateEnemyTime = 0
        }
    }

    public isShooting(value: boolean) {
        this.isShoot = value
    }

    private changeMode() {
        console.log("changeMode func")
        this.schedule(this.onSchedule, 10, 3)
    }    
    private onSchedule() {
        this.combinationInterval++
        console.log("combinationInterval:", this.combinationInterval)
    }

    public createEnemyPlaneCombine1(){
        console.log("create enemy plane")
        const enemyType = math.randomRangeInt(1,3)
        console.log("create enemy plane", enemyType)
        let plane: Prefab = null
        let planeSpeed = 0
        if(enemyType == Constant.EnemyType.Type1) {
            plane = this.enemyPlane01
            planeSpeed = this.enemy01Speed
        } else {
            plane = this.enemyPlane02
            planeSpeed = this.enemy02Speed
        }

        const enemy = instantiate(plane)
        enemy.setParent(this.node)
        const randomPos = math.randomRangeInt(-25, 26)
        enemy.setPosition(randomPos, 0, -50)

        const enemyComp = enemy.getComponent(EnemyPlane)

        enemyComp.show(planeSpeed)
    }

    public createEnemyPlaneCombine2(){
        console.log("create enemy plane plan 2")
        const enemyArray = new Array<Node>(7)
        const enemyPos = [
            -21, 0, -60,
            -14, 0, -55,
            -7, 0, -50,
            0, 0, -45,
            7, 0, -50,
            14, 0, -55,
            21, 0, -60,
        ]
        for (let index = 0; index < enemyArray.length; index++) {
            enemyArray[index] = instantiate(this.enemyPlane02)
            const element = enemyArray[index]
            element.setParent(this.node)
            const startIndex = index * 3
            element.setPosition(element[startIndex], element[startIndex + 1], element[startIndex + 2])
            const enemyComp = element.getComponent(EnemyPlane)
            enemyComp.show(this.enemy02Speed)
            
        }
    }
}

