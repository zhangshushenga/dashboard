<template>
    <div style="width: 100%; min-height: 100dvh;">
      <div style="font-size: 35px; font-weight: 600; margin: 20px">验证测试text</div>
      <div style="display: flex; flex-direction: row; font-weight: 300; font-size: 30px; margin-bottom: 20px;">
       
        <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="选择验证集:">
            <el-select v-model="selectedData" placeholder="请选择验证集">
                <el-option
                v-for="item in datasets"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        </el-form>

        <div style="padding-right: 30px;"></div>
        <!-- 选择agent类型 -->
        <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="选择任务类型:">
            <el-select v-model="selectedType" placeholder="请选择任务类型">
                <el-option
                v-for="item in types"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        </el-form>
      </div>
      <!-- 换行，定义下一个父类 -->
      <div style="display: flex; flex-direction: row; font-weight: 500; font-size: 50px; margin-bottom: 50px;"> 
        <div style="padding-right: 5px;"></div>
        <!-- 定义开始测试按钮 -->
        <el-button
          :disabled="isButtonDisabled"
          class="queryItem"
          style="height: 40px;min-width: 8%;max-width: 50%;width: auto"
          type="primary"
          @click="queryAction"
          v-html="autoText"
        />
    </div>
  </div>
</template>
  
<script>
import { Pass } from 'codemirror';
import axios from 'axios';
import Papa from 'papaparse';
import { getImageDataSet, textSendData, getDataSetImageList, getDataSetTextUrl } from '../../api/api-aiep'

export default {
    data() {
        return {
            selectedData: '',
            selectedType: '',
            autoText: '请选择',
            datasets: [],
            dataSetName:'',
            textLabel: [],
            textLabelKey: [],
            types:[
            {id: 1, name: '意图识别'},
            {id: 2, name: '日语翻译'},
            ],
        }
    },

    computed: {
        isShow(){
            if (this.selectedType === 2){
                return true
            }else{
                return false
            }
        },
        isButtonDisabled() {
            return this.selectedData === '' || this.selectedType === '' ;
        },
    },
    watch: {
    },
    created(){
    },
    mounted() {
        this.firstSearch()
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
                    if (r.type === 3){
                        this.datasets.push({ id: r.id, name: r.name });
                    }
                }
                this.autoText = "开始验证"
            }
            }).catch(error => {
                endLoading()
                console.log(error)
            })
        },
        
        queryAction() {
            // 实现开始测试按钮点击事件的逻辑
            for (var i = 0; i < this.datasets.length; i++ ) {
                if (this.datasets[i].id === this.selectedData){
                    this.dataSetName = this.datasets[i].name
                    break;
                }
            }
            const data = { current: 1, }
            getDataSetImageList(this.selectedData, data).then(response => {
                if (response.code === 0) {
                    const url = response.data.records[0].s3Url
                    console.log("文件url", url)
                    var pathStart = url.indexOf("data_set_text/");
                    var pathEnd = url.indexOf("?");
                    var path = url.substring(pathStart, pathEnd);

                    const send_data = {"dataSetId": this.selectedData,"dataSetName":this.dataSetName, "taskType": this.selectedType, "textLabel": path, "textTotalCount": 0}
                    console.log("param---->",send_data)
                    
                    textSendData(send_data).then(response => {
                        if (response.code === 0) {
                            alert('验证已开始，请到"验证测试Text结果"页查看');
                            this.selectedData = ''
                            this.selectedType = ''
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching or parsing CSV:', error);
                    });
                }
            })
        }
    }
}
</script>


<style scoped>
.custom-dropdown-item {
  font-size: 30px; /* 设置字体大小为12 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 超出部分以省略号表示 */
}

.custom-textarea textarea {
  font-size: 30px; /* 设置文本框的字体大小为 16 像素 */
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
  padding: 10px;
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
 
