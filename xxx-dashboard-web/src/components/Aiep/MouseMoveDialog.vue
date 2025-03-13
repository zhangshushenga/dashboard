<template>
    <el-dialog title="图片详情" :visible.sync="dialogVisible" :before-close="handleDialogClose">
        <el-form ref="dataForm" :model="formData"  fullscreen>
            <div style="position: relative; display: inline-block;">
                <img width="60%" :src="this.mouseMoveFile" alt=""
                    @mouseenter="setupCanvas" 
                    @mouseleave="clearCanvas"
                    style="display: block;">
                
                <canvas v-if="dialogVisible" ref="canvas" style="position: absolute; top: 0; left: 0; width: 60%; height: 100%;"
                    @mousedown="handleMouseDown" 
                    @mousemove="handleMouseMove"
                    @mouseup="handleMouseUp"
                    @mouseleave="handleMouseLeave"></canvas>
            </div>

            <!-- 显示鼠标按下和松开位置的百分比 -->
            <div v-if="startPosition.x && startPosition.y && endPosition.x && endPosition.y">矩形位置:  [{{ startPosition.x }}, {{ startPosition.y }}, {{ endPosition.x }}, {{ endPosition.y }}]</div>
            <!-- <div v-if="endPosition.x && endPosition.y">松开位置 - X: {{ endPosition.x }}%, Y: {{ endPosition.y }}%</div> -->

            <!-- 显示鼠标位置的百分比 -->
            <div v-if="position.x && position.y">X: {{ position.x }}%, Y: {{ position.y }}%</div>
        </el-form>

        <span slot="footer" class="footer-flex">
        <el-button @click="closeDialog" >关闭</el-button>
        <el-button type="primary" @click="submitData">保存</el-button>
        </span>
    </el-dialog>
</template>
      
<script>

export default {
    props: {
        dialogVisible: {
            type: Boolean,
            required: true
        },
        mouseMoveFile: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            formData: {
                url: this.mouseMoveFile,
                position: {
                    "start": {"x":null, "y":null},
                    "end":{"x":null, "y":null}
                }
            },
            formRules: {
            },
            position: {
                x: null,
                y: null
            },
            startPosition: {
                x: null,
                y: null
            },
            endPosition: {
                x: null,
                y: null
            },
            isDrawing: false,
        }
    },
    watch: {
        dialogVisible(newVal) {
            if (newVal) {
                this.$nextTick(() => {
                    this.setupCanvas();
                })
            }
        }
    },
    mounted(){
        console.log("thisURL", this.formData.url)
        this.$nextTick(() => { this.setupCanvas(); });
    },
  
    methods: {
        handleDialogClose(done) {
        // 在对话框关闭前触发的事件处理程序
        // 这里可以进行必要的处理
        // 在这个示例中，我们简单地将 DialogVisible 设置为 false
        this.$emit('update:dialogVisible', false);
        console.log("Closing dialog");
        // 调用 done() 表示允许关闭对话框
        done();
        },

        closeDialog() {
            console.log("关闭对话框")
            this.$emit('update:dialogVisible', false);
            },
        submitData() {
            const text = `[ ${this.startPosition.x}, ${this.startPosition.y}, ${this.endPosition.x}, ${this.endPosition.y}]`
            this.copyText(text)
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    // 这里执行请求操作
                    console.log("formData", this.formData)
                    this.$emit('submit', this.formData);
                    this.closeDialog();
                } 
                else {
                    console.log('输入有误!');
                    return false;
                }
            });
        },
        handleMouseMove(event) {
            // 获取图片的尺寸和位置
            const { width, height, top, left } = event.target.getBoundingClientRect();
            // 计算鼠标位置的百分比
            const xPercent = ((event.clientX - left) / width) * 100;
            const yPercent = ((event.clientY - top) / height) * 100;
            // 更新position对象
            this.position.x = xPercent.toFixed(0);
            this.position.y = yPercent.toFixed(0);


            if (this.isDrawing) {
                const canvas = this.$refs.canvas;
                const rect = canvas.getBoundingClientRect();
                const scaleX = canvas.width / rect.width;    // canvas实际宽度与CSS宽度的比例
                const scaleY = canvas.height / rect.height;  // canvas实际高度与CSS高度的比例

                // 计算当前鼠标位置相对于canvas的百分比位置
                const x = (event.clientX - rect.left) * scaleX;
                const y = (event.clientY - rect.top) * scaleY;

                // 清除之前的绘制
                this.clearCanvas();

                // 开始新的绘制
                this.ctx.beginPath();
                // this.ctx.setLineDash([5, 3]); // 设置虚线样式
                this.ctx.setLineDash([]); // 移除虚线样式，使线条变为实线
                this.ctx.strokeStyle = 'red'; // 设置线条颜色为红色


                // 根据起始点和当前鼠标位置绘制矩形
                // 将起始点和当前点转换为实际的像素值
                const startX = this.startPosition.x * canvas.width / 100;
                const startY = this.startPosition.y * canvas.height / 100;
                const width = x - startX;
                const height = y - startY;

                this.ctx.rect(startX, startY, width, height);
                this.ctx.stroke();
            }
        },
        calculatePosition(event) {
            // 获取图片的尺寸和位置
            const { width, height, top, left } = event.target.getBoundingClientRect();
            // 计算鼠标位置的百分比
            const xPercent = ((event.clientX - left) / width) * 100;
            const yPercent = ((event.clientY - top) / height) * 100;
            return { x: xPercent.toFixed(0), y: yPercent.toFixed(0) };
        },
        handleMouseDown(event) {
            this.isDrawing = true;

            event.preventDefault(); // 阻止默认行为，包括图片的拖动
            // 计算并更新鼠标按下位置
            this.startPosition = this.calculatePosition(event);
            this.formData.position.start = this.startPosition
        },
        handleMouseUp(event) {
            this.isDrawing = false;


            // 计算并更新鼠标松开位置
            this.endPosition = this.calculatePosition(event);
            this.formData.position.end = this.endPosition
        },
        resetPosition() {
            // 当鼠标离开图片时重置位置
            this.position.x = null;
            this.position.y = null;
        },

        // 绘制矩形图案
        setupCanvas() {
            console.log("jianchanshifoucunzai",this.$refs.canvas);
            const img = this.$el.querySelector('img');
            const canvas = this.$refs.canvas;
            canvas.width = img.offsetWidth;
            canvas.height = img.offsetHeight;
            this.ctx = canvas.getContext('2d');
            this.clearCanvas();
        },
        clearCanvas() {
            if (this.ctx) {
                this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
            }
        },
        handleMouseLeave() {
            this.isDrawing = false;
            this.clearCanvas(); // 当鼠标离开时清除画布
        },

        // 复制文本
        async copyText(text) {
            try {
                await navigator.clipboard.writeText(text);
                console.log('Text copied', text);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    }
}
</script>

<style>

</style>