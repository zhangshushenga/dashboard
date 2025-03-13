<template>
    <div class="container">
        <div>客服测试</div>
        <el-input v-model="question" type="textarea" :rows="1"
            style="font-size: 20px; margin-top: 20px;" />
        <el-button :loading="loading" style="height: 40px;width: 120px ;margin-top: 20px;"
            type="primary" @click="smartTestRequest">获取答案</el-button>
        <div style="margin-top: 40px;">输出结果:</div>
        <div style="margin-top: 20px">
            <div style="font-size: 20px;">{{ resultText }}</div>
        </div>
    </div>
</template>

<script>
import { smartTest } from '@/api/api-aiep'
export default {
    data() {
        return {
            loading:false,
            resultText: "",
            question: ""
        }
    },
    methods: {
        smartTestRequest() {
            this.loading = true
            const param = {}
            param.question = this.question
            console.log("param", param)
            smartTest(param).then(response => {
                console.log(response)
                if (response.code === 0) {
                    this.resultText = response.data
                    this.loading = false
                }
            }).catch(error => {
                this.loading = false
                console.log(error)
            }).finally(() => {
                this.loading = false
                console.log("error")
            })
        },
    }
}
</script>

<style>
.container {
    margin: 20px;
    background-color: white;
}
</style>