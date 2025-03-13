<template>
    <div class="container">
        <div>客服prompt测试</div>
        
        <el-input v-model="question" type="textarea" :rows="1"
            placeholder="请输入您的问题"
            style="font-size: 20px; margin-top: 20px;" />
        <el-input v-model="prompt" type="textarea" :rows="8"
            placeholder="请输入您的prompt"
            style="font-size: 20px; margin-top: 20px;" />
        
        <!-- 使用el-select选择框 -->
        <el-select v-model="languageType" placeholder="请选择语言" style="margin-top: 20px;">
            <el-option label="英语" value="en"></el-option>
            <el-option label="日语" value="ja"></el-option>
        </el-select>

        <el-button :loading="loading" style="height: 40px;width: 120px ;margin-top: 20px;margin-left: 50px;"
            type="primary" @click="smartTestRequest">获取答案</el-button>
        
        <div style="margin-top: 40px;">输出结果:</div>
        <div style="margin-top: 20px">
            <div style="font-size: 20px;">{{ resultText }}</div>
        </div>
    </div>
</template>

<script>
import { openaiChat } from '@/api/api-aiep'
export default {
    data() {
        return {
            loading:false,
            resultText: "",
            question: "",
            prompt:"",
            languageType:""
        }
    },
    methods: {
        smartTestRequest() {
            this.loading = true
            const param = {}
            param.question = this.question
            param.prompt = this.prompt
            param.languageType = this.languageType
            console.log("param", param)
            openaiChat(param).then(response => {
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