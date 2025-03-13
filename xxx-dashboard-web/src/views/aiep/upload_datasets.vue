<template>
    <div style="width: 100%; min-height: 100dvh;">
        <div style="font-size: 35px; font-weight: 600; margin: 20px">验证集上传图片</div>
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="验证集">
            <el-select v-model="selecteDataset" placeholder="请选择验证集">
                <el-option
                v-for="item in datasets"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        </el-form>
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">

            <el-upload
                ref="upload"
                :action="uploadBaseUrl"
                :auto-upload="false"
                :before-upload="beforeAvatarUpload"
                :data="form"
                :http-request="uploadToS3"
                :limit="30"
                :multiple="true"
                :on-error="onUploadFail"
                :on-remove="onRemove"
                :on-success="onUploadOk"
                accept="image/jpeg, image/png, image/jpg"
                class="queryItem"
                list-type="text"
                >
            <el-button size="large" type="primary">选择图片</el-button>
            </el-upload>
            <!-- <el-button size="large" type="success" @click="submitUpload">{{ autoText }}</el-button> -->
            <!-- <el-button style="width: 100px; height: 40px;" type="success" @click="submitUpload">{{ autoText }}</el-button> -->
            <!-- 定义上传图片按钮 -->
            <el-button
            :disabled="isButtonDisabled"
            class="queryItem"
            style="height: 40px;min-width: 8%;max-width: 50%;width: auto"
            type="primary"
            @click="submitUpload"
            v-html="autoText"
            />
            

        </div>
    </div>
</template>
  
<script>
import JsonEditor from '@/components/JsonEditor'

import { getImageDataSet, getUploadImageUrls, uploadImageToDataSet } from '../../api/api-aiep'

import { getToken } from '@/utils/auth'
import { Col } from 'element-ui'
import { file } from 'jszip'

const baseUrl = process.env.VUE_APP_BASE_API

export default {
    components: { JsonEditor },
    data() {
        return {
        uploadBaseUrl: '',
        fileList: [],
        datasets:[],
        selecteDataset: '',
        totalNumber :0,
        sucessNumber : 0,
        // form: {
        //     name: '',
        //     type: 1,
        //     env: 'test'
        // },
        result: {
            label: '-',
            description: '-',
            baby: false,
            duration: 0,
            result: {}
        },
        myHeaders: { Authorization: getToken() },

        timer: [],
        timerFileIdList: [],
        timerCount: [],

        autoText: '上传图片',

        }
    },
    computed: {},
    created() {
    },
    mounted() {
        this.firstSearch()

    },
    computed: {
    isButtonDisabled() {
        return this.selecteDataset === '' ;
    },
    },
    methods: {
        firstSearch() {
            this.currentPageNum = 1
            this.searchData(1)
        },

        // 从服务端获取数据集
        searchData(currentPage,type) {
            this.islistDataLoading = true
            const param = {}
            param.current = currentPage
            param.size = this.currentPageSize
            param.typr = type
        
        getImageDataSet(param).then(response => {
            // endLoading()
            console.log(response)
            if (response.code === 0) {

                for (const r of response.data.records) {
                    // this.tableData.push(r)
                    this.datasets.push({ id: r.id, name: r.name });
                }
            }
            }).catch(error => {
                endLoading()
                console.log(error)
            })
        },
        // 上传图片
        submitUpload() {
            this.$refs.upload.submit()
        },

        resetData() {
            this.result.result = {}
            this.result.description = ''
            this.result.duration = 0
            this.result.evaluation = 0
            this.resultText = ''
        },
        handleAvatarSuccess(res, file) {
            this.uploadImageUrl = URL.createObjectURL(file.raw)
            this.oneclassform.pic = res.data
        },
        // 自定义上传行为
        async uploadToS3(request) {
            this.autoText = '上传图片中。。。'
            var uploadBaseUrl = ''
            try {
            // 获取上传的url，输入上传数量
            const param = {"num": 1}
            const response = await getUploadImageUrls(param)
            console.log('获取上传地址', response)
    
            if (response.code === 0) {
                // 更新action属性（S3地址）和图片路径
                uploadBaseUrl = response.data[0].uploadUrl
    
                // 返回true以继续上传流程
            } else {
                // 处理错误情况
                this.$message.error('上传图片失败')
                console.error('获取S3地址失败:', response)
            }
            
            } catch (error) {
            this.$message.error('上传图片失败')
            console.error('获取S3地址失败:', error)
            // 返回false以停止上传流程
            }
    
            const { file } = request
            console.log("文件。。。。。。。。。", file)

            // console.log(file)
            try {
            const response = await fetch(uploadBaseUrl, {
                method: 'PUT',
                headers: {
                'Content-Type': file.type // 或者 'application/octet-stream'
                },
                body: file
            })
            console.log("response", response)
            if (response.ok) {
                const param = { 's3Key':  uploadBaseUrl}
                const res2 = await uploadImageToDataSet(this.selecteDataset, param)
                this.sucessNumber += 1

                if (this.sucessNumber === this.totalNumber){
                    this.autoText = "上传成功"
                    console.log("上传结果----》", res2)
                    this.resetData()
                    alert("图片上传完成");
                    // 使用 window.location.reload() 方法重新加载页面
                    window.location.reload();
                }

            } else {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            } catch (error) {
            this.onUploadFail(error) // 处理上传失败
            }
        },
        beforeAvatarUpload(file) {
            console.log('beforeAvatarUpload')
            this.loading = true
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
            const isLt2M = file.size / 1024 < 5000
            if (!isJPG && !isLt2M) {
            this.$message.error('上传图片只能是jpg ,png ,jpeg格式且不能超过5M!')
            this.isFileValid = false
            return false
            } else {
            if (!isJPG) {
                this.$message.error('上传图片只能是jpg ,png ,jpeg格式!')
                this.isFileValid = false
                return false
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过5M!')
                this.isFileValid = false
                return false
            }
            this.totalNumber += 1
            }
            this.isFileValid = true
    
            return isJPG && isLt2M
        },
        onUploadOk(response, file, fileList) {
            console.log('onUploadOk')
            // this.imagePath = response.data
            this.loading = false
            this.autoText = '生成'
            // this.getDataList()
        }, 
        onUploadFail(er, file, fileList) {
            fileList.splice(0, fileList.length)
            console.log('onUploadFail')
            this.autoText = '上传失败'
            this.result.result = {}
            this.loading = true
            this.resetData()
        }, 
        onRemove() {
            console.log('onRemove')
            this.loading = true
            this.onRemove()
    
            this.resetData()
        },

        queryAction() {
            if (this.loading) {
                return
            }
            this.resetData()
            this.loading = true
            this.autoText = '正在上传。。。'
            
            console.log("上传图片数量", file.length)  
        }
    }
}

</script>

<style scoped>
.custom-dropdown-item {
font-size: 12px; /* 设置字体大小为12 */
white-space: nowrap; /* 禁止换行 */
overflow: hidden; /* 溢出隐藏 */
text-overflow: ellipsis; /* 超出部分以省略号表示 */
}

.dropdown-container {
position: relative;
display: inline-block;
}

.dropdown-menu {
position: absolute;
top: 100%;
left: 0;
z-index: 1000;
min-width: 100%;
}

.dropdown-content {
max-height: 200px; /* 固定下拉框高度，根据需要调整 */
overflow-y: auto; /* 内容超过高度时可滚动 */
background-color: white;
border: 1px solid #ccc;
border-radius: 4px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
padding: 5px;
}

.add-icon-button {
background-color: transparent;
border: none;
padding: 0;
width: auto;
height: auto;
text-align: left; /* 将文本左对齐 */
}

.queryItem {
margin-top: 1%;
margin-left: 1%;
width: 22%
}

.imageCard {
display: flex;
flex-direction: column;
margin: 20px;
width: 15%;
}

.content {
font-size: 14px;
font-weight: 400;
margin-top: 10px;
}

.label-box {
background-color: white;
color: black;
font-size: 14px;
padding: 5px;
margin: 5px;
border: 2px solid black;
border-radius: 5px;
}
</style>
