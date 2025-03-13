<template>
    <div class="root-container">
        <div ref="container"></div>
        <div v-if="showGif" class="fullscreen-gif">
            <img src="../../views/agentDashboard/assets/transGif.gif" alt="Transition Animation">
        </div>
        <div style="position: absolute; left: 0%; top: 0%; width: 100%; height: 100%;" @click="showAnimation"></div>
    </div>
</template>

<script>
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

import {
    agentDashboardEventsImageList
} from '../../api/agent-dashBoard'

//card speed
const speed = 0.3;

const fadeDuration = 1; // 0.25 秒的消失持续时间

const cameraZ = 80;//摄像机的z轴坐标

const zNum = cameraZ + 1;//照片消失的平面z轴坐标

const textureLoader = new THREE.TextureLoader();

const imageNum = 100;//接口返回图片数量

const isInto = false;//切换动画效果是飞入还是飞出

export default {

    props: {
        
    },
    data() {
        return {
            cardMaterial: null,  // 初始化为null
            renderer: null,
            scene: null,
            light: null,
            camera: null,
            composer: null,
            cards: [],
            eventsImageList: [],
            imageIndex: 0,
            showGif: false,
        }
    },
    mounted() {
        this.getEventsImages()

        this.initRender();
        this.initScene();
        this.initAmbientLight();
        this.initCamera();
        // this.initCards();

        // 渲染和动画循环
        this.$refs.container.appendChild(this.renderer.domElement)
        // this.animate()

        // 监听窗口大小变化
        window.addEventListener('resize', this.onWindowResize)

        // 添加点击事件监听
        // window.addEventListener('click', this.showAnimation.bind(this))
    },
    beforeDestroy() {
        console.log('beforeDestroy')

        // 清理网格的材质和几何体
        if (this.scene) {
            this.scene.children.forEach(child => {
                if (child instanceof THREE.Mesh) {
                    if (child.material) {
                        child.material.dispose();
                    }
                    if (child.geometry) {
                        child.geometry.dispose();
                    }
                }
            });
        }

        // 清理渲染器和其它资源
        if (this.renderer) {
            this.renderer.dispose();
        }
        // 清理资源
        // this.renderer.dispose()
        // this.scene.dispose()
        window.removeEventListener('resize', this.onWindowResize)
        // window.removeEventListener('click', this.makeCardsGlow) // 移除事件监听器
        // window.removeEventListener('click', this.showAnimation.bind(this))
    },
    methods: {
        async getEventsImages() {
            agentDashboardEventsImageList().then((response) => {
                if (response.code == 0) {
                    console.log("eventImageList")
                    console.log(response)
                    this.eventsImageList = response.data
                    this.initCards();
                    this.animate();
                    // this.preloadAllNewsImages()
                }
            }).catch((error) => {

            })
        },
        // async preloadAllNewsImages() {
        //     try {
        //         // 等待所有图片加载完成
        //         this.eventsImageList = await Promise.all(this.eventsImageList.map(this.preloadImage));
        //         // 设置所有图片已加载
        //         this.eventsImagesSuccess = true;
        //         // this.animate();
        //     } catch (error) {
        //         console.error('加载图片时出错:', error);
        //     }
        // },
        // preloadImage(url) {
        // return new Promise((resolve, reject) => {
        //         const img = new Image();
        //         img.onload = () => resolve(url);
        //         img.onerror = reject;
        //         img.src = url;
        //     });
        // },
        initRender() {
            // 初始化渲染器
            this.renderer = new THREE.WebGLRenderer({ antialias: true })
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.renderer.shadowMap.enabled = true; // 开启阴影映射
            this.renderer.toneMapping = THREE.ReinhardToneMapping;

            this.renderer.setClearColor(0x000000, 0); // 背景透明度设置为0，避免清除为黑色
            this.renderer.autoClear = false; // 关闭自动清除，手动控制清除时机
            this.renderer.clearDepth(); // 清除深度缓存
        },
        initScene() {
            //初始化场景
            this.scene = new THREE.Scene()

            const loader = new THREE.TextureLoader();
            loader.load(
            '../assets/eventsBack.png', // 确保路径正确
                texture => {
                    this.scene.background = texture;
                    console.log('Background texture loaded successfully');
                },

                error => {
                    console.error('Failed to load background texture:', error);
                }
            );
        },
        initAmbientLight() {
            //初始化环境光
            this.light = new THREE.AmbientLight(0xffffff, 1.7);
            this.light.position.set(10, 10, 10);
            this.scene.add(this.light);
        },
        initCamera() {

            const fieldOfView = 45; // 相机的视场角度
            const aspectRatio = window.innerWidth / (window.innerHeight * 1.0); // 窗口宽高比
            const nearClip = 0.1; // 近裁剪面
            const farClip = 100; // 远裁剪面

            // 创建透视相机
            this.camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearClip, farClip);

            const distance = 0;
            this.camera.position.set(distance, 0, cameraZ); // 设置相机位置
            this.camera.lookAt(this.scene.position); // 设置相机朝向

        },
        initCards() {
            const cardCount = 100;
            const cardSize = { width: 0.9, height: 1.2 };

            // 使用纹理加载器加载网络图片
            // const textureLoader = new THREE.TextureLoader();
            const centerPoint = new THREE.Vector3(0, 0, 0);

            for (let i = 0; i < cardCount; i++) {
                const imageUrl = this.getImageUrl();
                console.log('imageUrl', imageUrl);
                // const imageUrl = "https://rvi-test-ai-image.s3.us-west-2.amazonaws.com/B84C8750050D/2024-05-13/B84C8750050D121715619572_1715619572000_20_1_101/16dc568334374b9bbb8d849904f007b0.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240513T172749Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Credential=AKIAZRCRESPG5XCYBHHF%2F20240513%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=bc7ff74e2ca165f2fb9639b51739b0b0e4bf6f79505086ca967f3147951a089b"
                const cardTexture = textureLoader.load(imageUrl);

                // 设置材质，应用加载的纹理
                const cardMaterial = new THREE.MeshPhongMaterial({
                    map: cardTexture,
                    transparent: true, // 支持透明度调整
                    opacity: 1, // 完全不透明
                    emissive: new THREE.Color(0x000000), // 初始不发光
                    emissiveIntensity: 0, // 初始发光强度为0 
                    side: THREE.DoubleSide // 确保材料在正反两面都显示
                });

                const cardGeometry = new THREE.PlaneGeometry(cardSize.width, cardSize.height);
                const cardMesh = new THREE.Mesh(cardGeometry, cardMaterial);

                // 随机设置卡片的初始位置和方向
                if(isInto){
                    let random = this.generateRandomVector();
                    cardMesh.position.set(random.x,random.y,random.z);
                }else{
                    cardMesh.position.set(0,0,0);
                }
 
                this.cards.push({
                    mesh: cardMesh,
                    speed: this.getRandomSpeed(),//设置初始速度
                    targetP: isInto?centerPoint:this.generateRandomVector()
                });

                // 添加到场景中
                this.scene.add(cardMesh);
            }

            // 为为centerCube周围添加光辉
            this.composer = new EffectComposer(this.renderer);
            this.composer.addPass(new RenderPass(this.scene, this.camera));
        },
        animate() {
            requestAnimationFrame(this.animate)

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
            const cameraPosition = this.camera.position; // 获取摄像机的位置

            this.cards.forEach(card => {

                // 计算朝向中心的向量
                const direction = new THREE.Vector3().copy(card.targetP).sub(card.mesh.position).normalize();

                if(isInto){
                    if(card.mesh.position.z <= 0){
                        
                        // 重置卡片位置到原点或者其他初始位置
                        let random = this.generateRandomVector();
                        card.mesh.position.set(random.x, random.y, random.z);

                        // 加载新纹理
                        // const imageUrl = "https://rvi-test-ai-image.s3.us-west-2.amazonaws.com/B84C8750050D/2024-05-13/B84C8750050D121715614839_1715614849000_20_1_0/nopush/cfb3f067e01f46448d0fe9db4b726d71.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240513T161209Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Credential=AKIAZRCRESPG5XCYBHHF%2F20240513%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=b739d41d0eb77be9548be95185e721fe9bfb25825969696d774e3a87485793ad"; // 这里替换成新图片的URL
                        // const imageUrl = this.getImageUrl();
                        // const newTexture = textureLoader.load(imageUrl, (texture) => {
                        //     card.mesh.material.map = texture;
                        //     card.mesh.material.needsUpdate = true; // 确保材质更新
                        // });

                        // 生成新的随机目标位置
                        card.targetP = centerPoint;

                        // 可以在这里重新设置其他需要重置的属性，比如速度等
                        card.speed = this.getRandomSpeed();
                    }else{
                        // 更新卡片位置，朝向中心点移动
                        card.mesh.position.add(direction.multiplyScalar(card.speed));
                    }
                }else{
                    if(card.mesh.position.z >= zNum){
                        
                        // 重置卡片位置到原点或者其他初始位置
                        card.mesh.position.set(0, 0, 0);

                        // 加载新纹理
                        // const imageUrl = "https://rvi-test-ai-image.s3.us-west-2.amazonaws.com/B84C8750050D/2024-05-13/B84C8750050D121715614839_1715614849000_20_1_0/nopush/cfb3f067e01f46448d0fe9db4b726d71.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240513T161209Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Credential=AKIAZRCRESPG5XCYBHHF%2F20240513%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=b739d41d0eb77be9548be95185e721fe9bfb25825969696d774e3a87485793ad"; // 这里替换成新图片的URL
                        // const imageUrl = this.getImageUrl();
                        // const newTexture = textureLoader.load(imageUrl, (texture) => {
                        //     card.mesh.material.map = texture;
                        //     card.mesh.material.needsUpdate = true; // 确保材质更新
                        // });

                        // 生成新的随机目标位置
                        card.targetP = this.generateRandomVector();

                        // 可以在这里重新设置其他需要重置的属性，比如速度等
                        card.speed = this.getRandomSpeed();
                    }else{
                        // 更新卡片位置，朝向中心点移动
                        card.mesh.position.add(direction.multiplyScalar(card.speed));
                    }
                }
            });
        },
        // generateRandomVector() {
        //     return {
        //     x: Math.random() * 18 - 9, 
        //     y: Math.random() * 8 - 4,  
        //     z: zNum
        //     };
        // },
        generateRandomVector() {
            let x, y;
            do {
                x = Math.random() * 18 - 9; // Generate a random x between -9 and 9
                y = Math.random() * 8 - 4;  // Generate a random y between -4 and 4
            } while ((x > -1 && x < 1) || (y > -1 && y < 1)); // Ensure neither x nor y are in the -1 to 1 range

            return {
                x: x,
                y: y,
                z: zNum
            };
        },
        getImageUrl() {
            if(this.imageIndex >= imageNum){
                this.imageIndex = 0;
            }
            return this.eventsImageList[this.imageIndex++];
        },
        showAnimation() {
            this.showGif = !this.showGif;
            this.$emit('gotoIntelligent');
        },
        getRandomSpeed() {
            return 0.03 + Math.random() * 0.045;
        }
    }
}
</script>

<style>
.root-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.fullscreen-gif {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8); /* 半透明背景 */
}

.fullscreen-gif img {
    width: 100%;  /* 保持宽高比 */
    height: auto; /* 全高 */
    object-fit: cover; /* 覆盖容器完全无空隙 */
}
</style>