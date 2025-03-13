<template>
    <el-dialog :title="'上传图片/文件--> '+ dataSetName" :visible.sync="dialogVisible" :before-close="handleDialogClose">
        <el-form ref="dataForm" :model="promptData" :rules="formRules" fullscreen></el-form>
        <template v-if="dataSetType === 1">
            <el-upload
                ref="uploadImage"
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
            <span slot="footer" class="footer-flex">
                <el-button type="primary" @click="submitUploadImage">上传图片</el-button>
            </span>
        </template>
        <template  v-else-if="dataSetType === 3">
            <el-upload
                ref="uploadFile"
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
                accept="text/csv"
                class="queryItem"
                list-type="text"
                >
                <el-button size="large" type="primary">选择文件</el-button>
            </el-upload>
            <span slot="footer" class="footer-flex">
                <el-button type="primary" @click="submitUploadFile">上传文件</el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script>
import JsonEditor from '@/components/JsonEditor'

import { getUploadImageUrls, uploadImageToDataSet, getUploadTextUrls, uploadTextToDataSet } from '../../api/api-aiep'

import { getToken } from '@/utils/auth'
import { Col } from 'element-ui'
import { file } from 'jszip'

const baseUrl = process.env.VUE_APP_BASE_API

export default {
    components: { JsonEditor },
    props: {
        dialogVisible: {
            type: Boolean,
            required: true
        },
        dataSetId: {
            type: Number,
        },
        dataSetType: {
            type: Number,
        },
        dataSetName:{
            type: String
        }
    },
    data() {
        return {
            uploadBaseUrl: '',
            fileList: [],
            myHeaders: { Authorization: getToken() },
            autoText: '上传图片',
            totalNumber :0,
            sucessNumber : 0,
            updateList: 0,

            dataSetId: this.dataSetId,
            dataSetType: this.dataSetType,
            dataSetName: this.dataSetName
        }
    },
    computed: {},
        created() {
    },
    mounted() {
        console.log("数据集id", this.dataSetType)
    },
    computed: {
        isButtonDisabled() {
            return this.selecteDataset === '' ;
        },
    },
    methods: {
        // 上传图片
        submitUploadImage() {
            this.$refs.uploadImage.submit()
        },
        // 上传文件
        submitUploadFile() {
            this.$refs.uploadFile.submit()
        },

        handleAvatarSuccess(res, file) {
            this.uploadImageUrl = URL.createObjectURL(file.raw)
            this.oneclassform.pic = res.data
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
                console.log('那应该到这了吧',param)
                
                const response = await (this.dataSetType == 1 ? getUploadImageUrls : getUploadTextUrls)(param);

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

            console.log("uploadBaseUrl", uploadBaseUrl)
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
                console.log("addIamgeTodataSet----->", param)
                const res2 = await (this.dataSetType == 1 ? uploadImageToDataSet : uploadTextToDataSet)(this.dataSetId,param);
                this.sucessNumber += 1

                if (this.sucessNumber === this.totalNumber){
                    this.autoText = "上传成功"
                    alert("上传完成");
                    this.submitData()
                    // this.$refs.uploadImage.clearFiles();
                    this.$refs.uploadFile.clearFiles();
                }
            }
            else {
                throw new Error(`HTTP error! status: ${response.status}`)
            } 
        },
        beforeAvatarUpload(file) {
            console.log('beforeAvatarUpload')
            console.log("csv_file------->",file)
            this.loading = true
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
            const isLt2M = file.size / 1024 < 5000
            const isText = file.type == "text/csv"

            if (this.dataSetType == 1) {
                if (!isJPG && !isLt2M) {
                    this.$message.error('上传图片只能是jpg ,png ,jpeg格式且不能超过5M!')
                    this.isFileValid = false
                    return false
                } 
                else {
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
            }
            else{
                if (!isText) {
                    this.$message.error('上传文件只能是CSV格式!')
                    this.isFileValid = false
                    return false
                } else{
                    this.totalNumber += 1
                    this.isFileValid = true
                    return isText
                }
            }
        },
        onUploadOk(response, file, fileList) {
            console.log('onUploadOk')
            // this.imagePath = response.data
            this.loading = false
            // this.getDataList()
        }, 
        onUploadFail(er, file, fileList) {
            // fileList.splice(0, fileList.length)
            console.log('onUploadFail', er)
            this.autoText = '上传失败'
            this.loading = true
        }, 
        onRemove() {
            console.log('onRemove')
            this.loading = true
            this.onRemove()
        },

        // 关闭对话框操作
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
            // 这里执行请求操作
            this.$emit('close');
            this.closeDialog();
        },
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
