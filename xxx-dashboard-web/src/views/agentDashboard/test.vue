<template>
    <div ref="container"></div>
</template>

<script>
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

//最大振幅 s
const maxAmplitude = 1.8
//center cube 长宽
const centerCubeSize = 0.7
//外侧正方体长宽
const boundsCubeSize = 4
//小正方体的最大个数
const numberOfSmallCubes = 800;
//上一次cube振幅
let preAgentsCall = 0.0;

//历史调用数据量档位
//A档
const gearA = 100000
const gearASize = 0.3
//B档
const gearB = 10000
const gearBSize = 0.2
//C档
const gearC = 1000
const gearCSize = 0.2
//D档
const gearD = 100
const gearDSize = 0.2

//Agents size
const agentsSize = 0.3

//card speed
const speed = 0.03;

const fadeDuration = 1; // 0.25 秒的消失持续时间

export default {
    name: 'ThreeJsCube',
    props: {
        //当前Agent调用量比例: 当前Agent调用量/历史调用峰值 + 20%
        currentAgentsCall: {
            type: Number,
            default: 0.0
        },
        //累计Agent调用量
        totalAgentsCall: {
            type: Number,
            default: 800000
        },
        //已上线的agent总数
        agentTotalNum: {
            type: Number,
            default: 0
        },
        //当前请求的agent
        currentRequestAgentNum: {
            type: Number,
            default: 0
        }
    },
    watch: {
        totalAgentsCall(newValue) {
            this.initSmallCubes();
        }
    },
    data() {
        return {
            renderer: null,
            scene: null,
            light: null,
            cube: null,
            camera: null,
            composer: null,
            radius: 2,
            height: 0.5,
            smallCubes: [],
            agentCubes: [],
            cards: []
        }
    },
    mounted() {
        this.initRender();
        this.initScene();
        this.initAmbientLight();
        this.initCamera();
        this.initCenterCube();
        this.initSmallCubes();
        this.initCards();

        // 渲染和动画循环
        this.$refs.container.appendChild(this.renderer.domElement)
        this.animate()

        // 监听窗口大小变化
        window.addEventListener('resize', this.onWindowResize)
    },
    beforeUnmount() {
        // 清理资源
        this.renderer.dispose()
        this.scene.dispose()
        window.removeEventListener('resize', this.onWindowResize)
    },
    methods: {
        initRender() {
            // 初始化渲染器
            this.renderer = new THREE.WebGLRenderer({ antialias: true })
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.renderer.shadowMap.enabled = true; // 开启阴影映射
            this.renderer.toneMapping = THREE.ReinhardToneMapping;
        },
        initScene() {
            //初始化场景
            this.scene = new THREE.Scene()
        },
        initAmbientLight() {
            //初始化环境光
            this.light = new THREE.AmbientLight(0xffffff, 1.7);
            this.light.position.set(10, 10, 10);
            this.scene.add(this.light);
        },
        initCamera() {

            const fieldOfView = 45; // 相机的视场角度
            const aspectRatio = window.innerWidth / (window.innerHeight * 0.9); // 窗口宽高比
            const nearClip = 0.1; // 近裁剪面
            const farClip = 100; // 远裁剪面

            // 创建透视相机
            this.camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearClip, farClip);

            const distance = 4.5;
            this.camera.position.set(distance, 3, 10); // 设置相机位置
            this.camera.lookAt(this.scene.position); // 设置相机朝向

        },
        initCenterCube() {
            // 创建立方体柱子几何体和材质
            const darkGreenMaterial = new THREE.MeshBasicMaterial({
                color: 0x73E477
            });

            const lightGreenMaterial = new THREE.MeshBasicMaterial({
                color: 0x66ff66
            });
            const materials = [
                darkGreenMaterial, // px 正x面
                darkGreenMaterial, // nx 负x面
                lightGreenMaterial, // py 正y面（顶部面）
                darkGreenMaterial, // ny 负y面
                darkGreenMaterial, // pz 正z面
                darkGreenMaterial  // nz 负z面
            ];
            const geometry = new THREE.BoxGeometry(centerCubeSize, 6, centerCubeSize)
            this.cube = new THREE.Mesh(geometry, materials)
            this.cube.castShadow = true; // 让这个立方体可以产生阴影
            this.cube.receiveShadow = true; // 让这个立方体可以接收阴影
            this.scene.add(this.cube)

            // 为centerCube内部加入点光源
            // 创建点光源并将它们沿立方体的竖直方向排列
            // 确定光源的数量和间隔
            const numberOfLights = 10;
            const segmentHeight = geometry.parameters.height / numberOfLights;

            for (let i = 0; i < numberOfLights; i++) {
                const ponintLight = new THREE.PointLight(0x73E477, 2, 20);
                ponintLight.position.set(0, -geometry.parameters.height / 2 + segmentHeight / 2 + i * segmentHeight, 0);
                this.cube.add(ponintLight);
                ponintLight.castShadow = true;
            }

            // 为为centerCube周围添加光辉
            this.composer = new EffectComposer(this.renderer);
            this.composer.addPass(new RenderPass(this.scene, this.camera));

            const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, (window.innerHeight)), 1.5, 0.4, 0.85);
            bloomPass.threshold = 0;
            bloomPass.strength = 0.5; // 控制辉光强度
            bloomPass.radius = 1; // 控制辉光半径
            this.composer.addPass(bloomPass);
        },
        initSmallCubes() {
            // 清除已有的小立方体
            if (this.smallCubes) {
                this.smallCubes.forEach(smallCube => {
                    this.scene.remove(smallCube); // 从场景中移除小立方体
                });
                this.smallCubes.length = 0; // 清空小立方体数组
                this.agentCubes.length = 0; //清空agent立方体数组
            }

            // 创建小立方体
            const minSize = 0.01;
            const maxSize = 0.3;
            const buffer = 0.5; // 可以根据需要调整这个缓冲值
            const cubeCenterX = this.cube.position.x;
            const cubeCenterZ = this.cube.position.z;
            const halfCubeSizeX = centerCubeSize / 2 + buffer;
            const halfCubeSizeZ = centerCubeSize / 2 + buffer;

            // 存储已经创建的小立方体
            this.smallCubes = [];
            this.agentCubes = [];

            //累计总调用量
            const totalAgentsCall = this.totalAgentsCall == undefined ? 0 : this.totalAgentsCall
            const geas = this.numbersOfGeasWithCalls(totalAgentsCall)
            const totalCalls = geas.A + geas.B + geas.C + geas.D

            //已上线的Agent
            const agentTotalNum = this.agentTotalNum == undefined ? 0 : this.agentTotalNum

            //正在使用的Agent
            const currentRequestAgentNum = this.currentRequestAgentNum == undefined ? 0 : this.currentRequestAgentNum

            for (let i = 0; i < totalCalls + agentTotalNum; i++) {
                let smallCubeMaterial;
                let smallCubeGeometry;
                let smallCube;
                let overlaps;
                let size;

                // 一部分使用发光表示当前正在使用的Agents
                if (i < agentTotalNum) {
                    if (i < currentRequestAgentNum) {
                        smallCubeMaterial = new THREE.MeshBasicMaterial({ color: 0x66ff66 });
                    } else {
                        smallCubeMaterial = new THREE.MeshBasicMaterial({ color: 0x006400 });
                    }
                    smallCubeGeometry = new THREE.BoxGeometry(agentsSize, agentsSize, agentsSize);
                } else {
                    // 另一部分表示当前累计调用量
                    smallCubeMaterial = new THREE.MeshStandardMaterial({
                        color: 0x54545B,
                        roughness: 0.3,
                        metalness: 0.8
                    });

                    if (i >= agentTotalNum && i <= agentTotalNum + geas.A) {
                        size = gearASize
                    } else if (i >= agentTotalNum + geas.A && i <= agentTotalNum + geas.A + geas.B) {
                        size = gearBSize
                    } else if (i >= agentTotalNum + geas.A + geas.B && i <= agentTotalNum + geas.A + geas.B + geas.C) {
                        size = gearCSize
                    } else if (i >= agentTotalNum + geas.A + geas.B + geas.C && i <= agentTotalNum + totalCalls) {
                        size = gearDSize
                    }
                    smallCubeGeometry = new THREE.BoxGeometry(size, size, size);
                }

                do {
                    smallCube = new THREE.Mesh(smallCubeGeometry, smallCubeMaterial);

                    const x = Math.random() * boundsCubeSize - boundsCubeSize / 2;
                    const y = Math.random() * boundsCubeSize - 3.5;
                    const z = Math.random() * boundsCubeSize - boundsCubeSize / 2;
                    smallCube.position.set(x, y, z);

                    // 检查与大立方体的X和Z平面重叠
                    overlaps = this.smallCubes.some(otherCube => {
                        const distance = smallCube.position.distanceTo(otherCube.position);
                        const minDistance = (size / 2) + (otherCube.geometry.parameters.width / 2);
                        return distance < minDistance ||
                            (Math.abs(x - cubeCenterX) <= halfCubeSizeX && Math.abs(z - cubeCenterZ) <= halfCubeSizeZ);
                    });
                } while (overlaps); // 如果有重叠，重新生成位置

                this.smallCubes.push(smallCube); // 将新的小立方体添加到数组

                if (i < agentTotalNum) {
                    this.agentCubes.push(smallCube)
                }

                this.scene.add(smallCube); // 添加到场景
            }
        },
        initCards() {
            const cardCount = 50;
            const cardSize = { width: 0.7, height: 1.3 };

            // 使用纹理加载器加载网络图片
            const textureLoader = new THREE.TextureLoader();
            const imageUrl = "https://cdn.discordapp.com/attachments/1237226036882837515/1237415072821678190/image.png?ex=663b9017&is=663a3e97&hm=c10f95982ac8d10cdaad61dbd38dec09711c91a5a82e8574563a0cf9897302f5&"
            const cardTexture = textureLoader.load(imageUrl);

            // 设置材质，应用加载的纹理
            const cardMaterial = new THREE.MeshStandardMaterial({
                map: cardTexture,
                transparent: true, // 支持透明度调整
                opacity: 1 // 完全不透明
            });

            for (let i = 0; i < cardCount; i++) {
                const cardGeometry = new THREE.PlaneGeometry(cardSize.width, cardSize.height);
                const cardMesh = new THREE.Mesh(cardGeometry, cardMaterial);

                // 随机设置卡片的初始位置和方向
                cardMesh.position.set(
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20
                );

                cardMesh.rotation.set(
                    0, // 随机x轴旋转
                    Math.PI / 7, // 随机y轴旋转
                    0  // 随机z轴旋转
                );

                this.cards.push({
                    mesh: cardMesh,
                    speed
                });

                // 添加到场景中
                this.scene.add(cardMesh);
            }
        },
        updateUsingAgent() {
            if (this.agentCubes != undefined && this.currentRequestAgentNum != undefined) {
                console.log("currentRequestAgentNum: " + this.currentRequestAgentNum)
                this.agentCubes.forEach(cube => {
                    const newColor = new THREE.Color(0x006400);
                    cube.material.color = newColor;
                });

                const selectedIndices = [];
                const selectedCubes = [];

                // 创建一个函数来生成不重复的随机数
                function generateRandomIndex(maxIndex) {
                    let index;
                    do {
                        index = Math.floor(Math.random() * maxIndex);
                    } while (selectedIndices.includes(index));
                    selectedIndices.push(index);
                    return index;
                }

                // 随机选择指定数量的 smallCube
                for (let i = 0; i < this.currentRequestAgentNum; i++) {
                    const randomIndex = generateRandomIndex(this.agentCubes.length);
                    selectedCubes.push(this.agentCubes[randomIndex]);
                }

                // 修改选中的 smallCube 的颜色
                selectedCubes.forEach(cube => {
                    const newColor = new THREE.Color(0x66ff66); // 设置为红色
                    cube.material.color = newColor;
                });

            }
        },
        //根据Agent历史调用总量计算需要的各档位数量
        numbersOfGeasWithCalls(calls) {
            if (calls == 0) {
                return { "A": 0, "B": 0, "C": 0, "D": 0 }
            }

            if (calls > numberOfSmallCubes * gearA) {
                return { "A": numberOfSmallCubes, "B": 0, "C": 0, "D": 0 }
            } else {
                let numA = Math.floor(calls / gearA)
                let numB = Math.floor(calls % gearA / gearB)
                let numC = Math.floor(calls % gearA % gearB / gearC)
                let numD = Math.floor(calls % gearA % gearB % gearC / gearD)

                const totalNums = numA + numB + numC + numD
                if (totalNums >= numberOfSmallCubes) {
                    return { "A": numA, "B": numB, "C": numC, "D": numD }
                } else {
                    //最大值和当前值的差距，用来补块儿
                    let difference = numberOfSmallCubes - totalNums

                    while (difference > 10) {
                        if (numA > 0) {
                            numA -= 1
                            numB += 10
                        } else if (numB > 0) {
                            numB -= 1
                            numC += 10
                            difference -= 10
                        } else if (numC > 0) {
                            numC -= 1
                            numD += 10
                            difference -= 10
                        }
                        difference -= 10
                    }

                    const result = {
                        "A": numA,
                        "B": numB,
                        "C": numC,
                        "D": numD
                    }
                    console.log(result)
                    return result
                }
            }
        },
        animate() {
            requestAnimationFrame(this.animate)
            // 让立方体上下移动
            //当前振幅
            let targetAgentsCall = this.currentAgentsCall == undefined ? 0 : this.currentAgentsCall
            if (preAgentsCall == 0.0) {
                preAgentsCall = targetAgentsCall
            } else {
                //让前一次振幅以0.01平缓过渡到当前振幅
                if (preAgentsCall > targetAgentsCall) {
                    preAgentsCall -= 0.001
                } else if (preAgentsCall < targetAgentsCall) {
                    preAgentsCall += 0.001
                }
            }
            this.cube.position.y = -0.5 + Math.sin(Date.now() * 0.001) * maxAmplitude * preAgentsCall

            //更新小立方体的位置，使其围绕大立方体旋转
            const rotationSpeed = 0.02; // 旋转速度，调整此值以改变旋转速率
            const centerX = this.cube.position.x; // 大立方体中心X坐标
            const centerZ = this.cube.position.z; // 大立方体中心Z坐标

            this.smallCubes.forEach(smallCube => {
                // 获取当前小立方体相对于大立方体中心的位置
                const offsetX = smallCube.position.x - centerX;
                const offsetZ = smallCube.position.z - centerZ;

                // 计算新位置
                const newX = offsetX * Math.cos(rotationSpeed) - offsetZ * Math.sin(rotationSpeed);
                const newY = offsetX * Math.sin(rotationSpeed) + offsetZ * Math.cos(rotationSpeed);

                // 更新小立方体位置
                smallCube.position.x = centerX + newX;
                smallCube.position.z = centerZ + newY;
            });

            this.updateCards();

            this.composer.render(this.scene, this.camera)
        },
        onWindowResize() {
            this.camera.aspect = (window.innerWidth) / (window.innerHeight)
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.composer.setSize(window.innerWidth, window.innerHeight);
        },
        updateCards() {
            const centerPoint = new THREE.Vector3(0, 0, 0);

            this.cards.forEach(card => {

                // 计算朝向中心的向量
                const direction = new THREE.Vector3().copy(centerPoint).sub(card.mesh.position).normalize();
                // 更新卡片位置，朝向中心点移动
                card.mesh.position.add(direction.multiplyScalar(card.speed));

                // 如果进入 boundsCubeSize 框内，则重置到远处位置
                if (Math.abs(card.mesh.position.x) < 0.5 &&
                    Math.abs(card.mesh.position.y) < 0.5 &&
                    Math.abs(card.mesh.position.z) < 0.5) {

                    card.mesh.position.set(
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 20,
                        (Math.random()) * 20
                    );

                } else {

                    // 更新卡片位置，朝向中心点移动
                    card.mesh.position.add(direction.multiplyScalar(card.speed));

                    if (card.mesh.scale.x > 0.5) {
                        card.mesh.scale.x -= 0.002
                    }
                    if (card.mesh.scale.y > 0.5) {
                        card.mesh.scale.y -= 0.002
                    }
                }
            });
        },
    }
}
</script>
