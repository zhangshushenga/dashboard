<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
          class="filter-item"
          icon="el-icon-edit"
          style="margin-left: 10px;"
          type="primary"
          @click="handleCreate"
      >
        Add
      </el-button>
      <el-button
          class="filter-item"
          icon="el-icon-plus"
          style="margin-left: 10px;"
          type="primary"
          @click="handleCreateDifyAgent"
      >
        Add Dify Agent
      </el-button>
    </div>

    <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
    >
      <!--      <el-table-column-->
      <!--        align="center"-->
      <!--        label="ID"-->
      <!--        prop="id"-->
      <!--        width="80"-->
      <!--      >-->
      <!--        &lt;!&ndash;        <template slot-scope="{row}">&ndash;&gt;-->
      <!--        &lt;!&ndash;          <span>{{ row.id }}</span>&ndash;&gt;-->
      <!--        &lt;!&ndash;        </template>&ndash;&gt;-->
      <!--      </el-table-column>-->
      <el-table-column align="center" label="Name" width="200px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Setting" width="200px">
        <template slot-scope="{row}">
          <span>AgentType: {{ row.agentType }}</span> <br>

          <span>Version: {{ row.lambdaVersion + '.' + row.agentVersion }}</span><br>

          <span>
            业务类型:  {{ row.triggerType | triggerTypeFilter }}
          </span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="AgentType" min-width="50px">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <span>{{ row.agentType }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="业务类型" min-width="100px">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <span>-->
      <!--            {{ row.triggerType | triggerTypeFilter }}-->
      <!--          </span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="data" min-width="150px">
        <template slot-scope="{row}">
          <span>sqsName:<br> {{ row.sqsName }}</span><br>
          <span>s3Path:<br>{{ row.s3Path }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="version" min-width="150px">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <span>{{ row.lambdaVersion + '.' +row.agentVersion }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="Remark" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="更新时间" min-width="150px">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <span>{{ row.updateTime }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="时间" min-width="150px">
        <template slot-scope="{row}">
          <span>创建时间: <br>{{ row.createTime }}</span> <br>

          <span>更新时间: <br>{{ row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" class-name="small-padding fixed-width" label="Actions" width="230">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.agentCategory === 1" size="mini" type="primary" @click="handleUpdate(row,$index)">
            Edit
          </el-button>
          <el-button v-if="row.agentCategory === 2" size="mini" type="primary" @click="handleUpdateDify(row,$index)">
            Edit Dify
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total>0"
        :limit.sync="listQuery.limit"
        :page.sync="listQuery.current"
        :total="total"
        @pagination="getList"
    />

    <el-dialog
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
        width="80%"
    >
      <el-form
          ref="dataForm"
          :model="temp"
          :rules="rules"
          label-position="left"
          label-width="120px"
          style="min-width: 400px; margin-left:50px;"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="temp.name" placeholder="后台显示的名称"/>
        </el-form-item>
        <el-form-item label="模型枚举" prop="agentType">
          <el-input v-model.number="temp.agentType" placeholder="全局唯一的标识"/>
        </el-form-item>
        <el-form-item label="业务类型" prop="triggerType">
          <el-select v-model="temp.triggerType" class="filter-item" placeholder="Please select">
            <el-option
                v-for="item in triggerTypeOptions"
                :key="item.key"
                :label="item.display_name"
                :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-show="dialogStatus === 'update'" label="Agent监听队列" prop="sqsName">
          <el-input v-model="temp.sqsName" placeholder="模型算法监听入参的队列" style="width: 400px"/>
        </el-form-item>
        <el-form-item v-show="dialogStatus === 'update'" label="图片存储路径" prop="s3Path">
          <el-input
              v-model="temp.s3Path"
              placeholder="s3图片路径 如 agent/wearwisdom/input/{0}/{1}.jpg"
              style="width: 400px"
          />
        </el-form-item>

        <el-form-item
            v-for="(param, index) in temp.param"
            :key="param.key"
            :label="'入参' + (index +1 )"
            :prop="'param.' + index + '.field'"
        >

          <el-form
              :model="param"
              :rules="rules"
              label-position="left"
              label-width="120px"
              style="width: 400px; margin-left:50px;"
          >
            <el-form-item :prop="fieldType" label="字段类型">
              <el-select
                  v-model="param.fieldType"
                  class="filter-item"
                  placeholder="Please select"
                  style="width: 200px;"
                  @change="filedTypeChange(param)"
              >
                <el-option
                    v-for="item in fieldTypeOptions"
                    :key="item.key"
                    :label="item.display_name"
                    :value="item.key"
                />
              </el-select>

            </el-form-item>
            <el-form-item :prop="field" label="字段" style="width: 400px">
              <el-input v-model="param.field" placeholder="字段 如 imageUrl" style="width: 200px"/>
            </el-form-item>
            <el-form-item :prop="fieldName" label="字段说明">
              <el-input v-model="param.fieldName" placeholder="字段名称 如 图片地址" style="width: 200px;"/>
            </el-form-item>

            <el-form-item v-if="param.fieldType === 2" label="检测敏感词">
              <el-switch v-model="param.checkText"/>
            </el-form-item>
            <el-form-item label="是否必填">
              <el-switch v-model="param.required"/>
            </el-form-item>
            <el-button v-if="index >0" @click.prevent="removeParam(param)">删除</el-button>
            <el-button @click.prevent="addParam(param)">add</el-button>
          </el-form>

        </el-form-item>

        <el-form-item
            v-for="(param, index) in temp.result"
            :key="param.key"
            :label="'返回' + (index +1 )"
            :prop="'param.' + index + '.field'"
        >

          <el-form
              :model="param"
              :rules="rules"
              label-position="left"
              label-width="120px"
              style="width: 400px; margin-left:50px;"
          >
            <el-form-item :prop="fieldType" label="字段类型">
              <el-select
                  v-model="param.fieldType"
                  class="filter-item"
                  placeholder="Please select"
                  style="width: 200px;"
                  @change="filedTypeChange(param)"
              >
                <el-option
                    v-for="item in fieldTypeOptions"
                    :key="item.key"
                    :label="item.display_name"
                    :value="item.key"
                />
              </el-select>

            </el-form-item>
            <el-form-item :prop="field" label="字段" style="width: 400px">
              <el-input v-model="param.field" placeholder="字段 如 imageUrl" style="width: 200px"/>
            </el-form-item>
            <el-form-item :prop="fieldName" label="字段名称">
              <el-input v-model="param.fieldName" placeholder="字段名称 如 图片地址" style="width: 200px;"/>
            </el-form-item>

            <el-form-item v-if="param.fieldType === 2 || param.fieldType === 4" label="检测敏感词">
              <el-switch v-model="param.checkText"/>
            </el-form-item>
            <el-form-item label="是否为校验字段">
              <el-switch v-model="param.condition"/>
            </el-form-item>
            <el-form-item v-if="param.condition" :prop="conditionValue" label="校验值">
              <el-input v-model="param.conditionValue" placeholder="" style="width: 200px;"/>
            </el-form-item>
            <el-button v-if="index >0" @click.prevent="removeResult(param)">删除</el-button>
            <el-button @click.prevent="addResult(param)">add</el-button>
          </el-form>

        </el-form-item>

        <pre><code>
          字段说明 key 为提示语唯一key
          字段说明 prompt 提示语内容
          字段说明 desc 这个提示语的功能说明
          字段说明 type 这个提示语的对应的模型
          模型枚举 1=vqa、2=llava-1.5、3=gemma-7b、4=osprey、5=claude3-haiku、6=gpt4、7=llava-1.6、8=claude3-sonnet、9=v15nx、10=minicpm_cn、13=claude3-sonnet3.5、14=gpt4-mini、15=llama3.2-11b、16=llama3.2-90b、17=bedrock_nova_lite、18=bedrock_nova_pro

        </code></pre>

        <!--        <el-form-item-->
        <!--          v-for="(param, index) in temp.promptList"-->
        <!--          :key="param.key1"-->
        <!--          :label="'提示语' + (index +1 )"-->
        <!--          :prop="'param.' + index + '.field'"-->
        <!--        >-->

        <!--          <el-form-->
        <!--            :model="param"-->
        <!--            label-position="left"-->
        <!--            label-width="120px"-->
        <!--            style="width: 400px; margin-left:50px;"-->
        <!--          >-->
        <!--            <el-form-item :prop="key" label="提示语key" style="width: 400px">-->
        <!--              <el-input v-model="param.key" placeholder="字段 如 llava" style="width: 200px" />-->
        <!--            </el-form-item>-->
        <!--            <el-form-item :prop="desc" label="提示语作用">-->
        <!--              <el-input v-model="param.desc" placeholder="描述提示语作用" style="width: 250px;" />-->
        <!--            </el-form-item>-->
        <!--            <el-form-item :prop="type" label="模型类型">-->
        <!--              <el-select-->
        <!--                v-model="param.type"-->
        <!--                class="filter-item"-->
        <!--                placeholder="Please select"-->
        <!--                style="width: 200px;"-->
        <!--              >-->
        <!--                <el-option-->
        <!--                  v-for="item in modelOptions"-->
        <!--                  :key="item.key"-->
        <!--                  :label="item.display_name"-->
        <!--                  :value="item.key"-->
        <!--                />-->
        <!--              </el-select>-->

        <!--            </el-form-item>-->
        <!--            <el-form-item :prop="prompt" label="提示语">-->
        <!--              <el-input-->
        <!--                v-model="param.prompt"-->
        <!--                type="textarea"-->
        <!--                autosize-->
        <!--                placeholder="balabalabala"-->
        <!--                style="width: 250px;"-->
        <!--              />-->
        <!--            </el-form-item>-->
        <!--            <el-button v-if="index >0" @click.prevent="removePromptList(param)">删除</el-button>-->
        <!--            <el-button @click.prevent="addPromptList(param)">add</el-button>-->
        <!--          </el-form>-->

        <!--        </el-form-item>-->
        <el-form-item label="提示语">
          <json-editor
              ref="jsonEditor"
              v-model="temp.prompt"
              style="min-width: 600px; max-width: 800px"
          />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input
              v-model="temp.remark"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="Please input"
              type="textarea"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column label="Channel" prop="key"/>
        <el-table-column label="Pv" prop="pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="Add Dify Agent"
        :visible.sync="dialogDifyAgentVisible"
        width="80%"
        :before-close="this.closeAndClearWindow"
    >
      <el-form
          ref="difyAgentForm"
          :model="difyAgent"
          :rules="difyAgentRules"
          label-position="left"
          label-width="220px"
          style="min-width: 400px; margin-left:50px;"
      >
        <el-form-item label="Agent名称" prop="name">
          <el-input v-model="difyAgent.name" placeholder="Enter Agent Name"/>
        </el-form-item>
        <el-form-item label="Agent监听队列" prop="sqsName">
          <el-input v-model="difyAgent.sqsName" disabled/>
        </el-form-item>
        <el-form-item label="Agent Type" prop="agentType">
          <el-input v-model.number="difyAgent.agentType" placeholder="Enter Agent Type"/>
        </el-form-item>
        <el-form-item label="业务类型 (Trigger ID)" prop="triggerType">
          <el-select v-model="difyAgent.triggerType" class="filter-item" placeholder="Please select" style="width: 220px">
            <el-option
                v-for="item in difyTriggerTypeOptions"
                :key="item.key"
                :label="item.display_name"
                :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Dify API Key" prop="difyApiKey">
          <el-input v-model="difyAgent.difyApiKey" placeholder="Enter Dify API Key"/>
        </el-form-item>
        <el-form-item label="Dify Version" prop="difyVersion">
          <el-input v-model="difyAgent.difyVersion" placeholder="Enter Dify Version"/>
        </el-form-item>
        <el-form-item label="Dify File Upload" prop="difyDslFile">
          <el-upload
              class="upload-dsl"
              :file-list="fileList"
              :action="uploadBaseUrl"
              :auto-upload="true"
              :before-upload="beforeAvatarUpload"
              :headers="myHeaders"
              :limit="1"
              :on-remove="handleFileRemove"
              :on-success="uploadDsl"
          >
            <el-button slot="trigger" size="small" type="primary" >Select File
            </el-button>
            <div slot="tip" class="el-upload__tip">Only files with a size less than 2MB are allowed.</div>
          </el-upload>
        </el-form-item>

        <!-- Input Parameters -->
        <el-form-item label="入参">
          <div v-for="(p, index) in difyAgent.param" :key="index">
            <span>{{ '--- 第' + (index + 1) + '入参 ---' }}</span>
            <el-form-item :label="p.fieldName">
              <span>{{ p.field }}</span>
            </el-form-item>
            <el-form-item label="字段类型">
              <el-select
                  v-model="p.fieldType"
                  class="filter-item"
                  placeholder="Please select"
                  style="width: 200px;"
                  disabled
              >
                <el-option
                    v-for="item in fieldTypeOptions"
                    :key="item.key"
                    :label="item.display_name"
                    :value="item.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="是否必填">
              <el-switch v-model="p.required" disabled/>
            </el-form-item>
            <el-form-item label="检测敏感词">
              <el-switch v-model="p.checkText"/>
            </el-form-item>
          </div>
        </el-form-item>

        <!-- Output Parameters -->
        <el-form-item label="出参">
          <div v-for="(result, index) in difyAgent.result" :key="index">
            <span>{{ '--- 第' + (index + 1) + '出参 ---' }}</span>
            <el-form-item label="字段">
              <span>{{ result.field }}</span>
            </el-form-item>
            <el-form-item label="字段名称">
              <span>{{ result.fieldName }}</span>
            </el-form-item>
            <el-form-item label="字段类型">
              <el-select
                  v-model="result.fieldType"
                  class="filter-item"
                  placeholder="Please select"
                  style="width: 200px;"
              >
                <el-option
                    v-for="item in fieldTypeOptions"
                    :key="item.key"
                    :label="item.display_name"
                    :value="item.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="检测敏感词">
              <el-switch v-model="result.checkText"/>
            </el-form-item>
            <el-form-item label="是否为校验字段">
              <el-switch v-model="result.condition" @change="handleSwitchChange($event, result)"/>
            </el-form-item>
            <el-form-item v-if="result.condition" label="校验值">
              <el-input v-model="result.conditionValue" placeholder="" style="width: 200px;"/>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="Remark" prop="remark">
          <el-input
              v-model="difyAgent.remark"
              type="textarea"
              placeholder="Enter Remark"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAndClearWindow">
          Cancel
        </el-button>
        <el-button type="primary" @click="chooseMethod()">
          Save
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import JsonEditor from '@/components/JsonEditor'

import { fetchPv } from '@/api/article'
import { createAgentConfig, getAgentList, updateAgentConfig } from '@/api/agent-config'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { getToken } from '@/utils/auth'
// 触发类型 1=主动拍照获取结果、2=设备上报标记icon、3=设备上报生成文案
const triggerTypeOptions = [
  { key: 1, display_name: '主动拍照获取结果' },
  { key: 2, display_name: '设备上报-生成文案(事件描述)' },
  { key: 3, display_name: '设备上报-标记事件 icon' },
  { key: 4, display_name: '设备上报-生成标题(时光精选)' },
  { key: 6, display_name: '设备上报-生成结果(时光精选)' },
  { key: 5, display_name: '设备上报-生成推送文案' },
  { key: 7, display_name: 'demo event 描述' },
  { key: 8, display_name: '设备上报-智能告警' },
  { key: 9, display_name: '设备上报-生成短语（猜你想要）' },
  { key: 10, display_name: '设备上报-万物识别（主动触发也是）' },
  { key: 11, display_name: '设备每周最新图' },
  { key: 12, display_name: '设备上报-生成推送文案（单独推送单独显示）' },
  { key: 13, display_name: '设备上报-陪餐小美描述' },
  { key: 14, display_name: '设备上报-陪餐小美总结' },
  { key: 15, display_name: '设备上报-atom-长描述&检测文案推送' },
  { key: 16, display_name: 'atom-晚上发总结' },
  { key: 17, display_name: '过滤相似通知' },
  { key: 18, display_name: '文字转语音' },
  { key: 101, display_name: '大屏演示-摘要' },
  { key: 102, display_name: '大屏演示-新闻稿' },
  { key: 103, display_name: '设备状态分析' },
  { key: 104, display_name: 'toB 生成描述' },
  { key: 105, display_name: 'toB 生成摘要' },
  { key: 106, display_name: 'toB 生成新闻稿' }
]
// dify agent 触发类型
const difyTriggerTypeOptions = [
  { key: 201, display_name: '需要推送业务方' },
  { key: 202, display_name: '不需推送业务方' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const triggerTypeKeyValue = triggerTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

// 1=int、2=string、3=boolean、4=json、5=s3 path
const fieldTypeOptions = [
  { key: 1, display_name: 'int' },
  { key: 2, display_name: 'string' },
  { key: 3, display_name: 'boolean' },
  { key: 4, display_name: 'json' },
  { key: 5, display_name: 's3 path' }
]

const fieldTypeKeyValue = fieldTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

// 1=vqa、2=llava-1.5、3=gemma-7b、4=osprey
const modelOptions = [
  { key: 1, display_name: 'vqa' },
  { key: 2, display_name: 'llava-1.5' },
  { key: 3, display_name: 'gemma-7b' },
  { key: 4, display_name: 'osprey' },
  { key: 5, display_name: 'claude3-haiku' },
  { key: 6, display_name: 'gpt4v' },
  { key: 7, display_name: 'llava-1.6' },
  { key: 8, display_name: 'claude3-sonnet' },
  { key: 9, display_name: 'v15nx' },
  { key: 10, display_name: 'minicpm_cn' },
  // { key: 11, display_name: '' },
  // { key: 12, display_name: '' },
  { key: 13, display_name: 'claude3-sonnet3.5' },
  { key: 14, display_name: 'gpt4-mini' },
  { key: 15, display_name: 'llama3.2-11b' },
  { key: 16, display_name: 'llama3.2-90b' }
]

const modelKeyValue = modelOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

const tempRaw = {
  name: '',
  agentCategory: 1,
  agentType: null,
  param: [{
    field: '',
    fieldName: '',
    fieldType: '',
    checkText: false,
    required: false
  }],
  result: [{
    field: '',
    fieldName: '',
    fieldType: '',
    checkText: false,
    condition: false,
    conditionValue: null
  }],
  promptList: [{
    prompt: '',
    key: '',
    key1: '',
    type: null,
    desc: ''
  }],
  triggerType: 1,
  prompt: {
    'en': [
      {
        'key': 'key',
        'prompt': 'prompt',
        'desc': 'prompt说明',
        'type': 2
      }
    ],
    'jp': [
      {
        'key': 'key',
        'prompt': 'prompt',
        'desc': 'prompt说明',
        'type': 2
      }
    ]
  },
  sqsName: '',
  s3Path: '',
  remark: ''
}

const baseUrl = process.env.VUE_APP_BASE_API

export default {
  name: 'ComplexTable',
  components: { Pagination, JsonEditor },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    },
    triggerTypeFilter(type) {
      return triggerTypeKeyValue[type]
    },
    fieldTypeFilter(type) {
      return fieldTypeKeyValue[type]
    },
    modelFilter(type) {
      return modelKeyValue[type]
    }
  },
  data() {
    return {
      myHeaders: { Authorization: getToken() },
      uploadBaseUrl: baseUrl + '/api/agent_config/dify/upload',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        current: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      triggerTypeOptions,
      fieldTypeOptions,
      modelOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: Object.assign({}, tempRaw),
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'change' }],
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // sqsName: [{ required: true, message: 'sqsName is required', trigger: 'change' }],
        // s3Path: [{ required: true, message: 's3Path is required', trigger: 'change' }],
        agentType: [
          { required: true, message: '不能为空' },
          { type: 'number', message: '必须为数字值' }],
        triggerType: [{ required: true, message: 'triggerType is required', trigger: 'blur' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],

        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      // dify param
      difyTriggerTypeOptions,
      dialogDifyAgentVisible: false,
      editDifyAgent: false,
      oldDifyVersion: '',
      difyAgent: {
        name: '',
        agentCategory: 2,
        sqsName: 'business_agent_dify_queue',
        agentType: null,
        triggerType: null,
        difyApiKey: '',
        difyVersion: '',
        difyDslFile: '',
        param: [],
        result: [],
        remark: ''
      },
      fileList: [],
      difyAgentRules: {
        name: [{ required: true, message: 'Agent名称 is required', trigger: 'change' }],
        agentType: [{ required: true, message: 'Agent Type is required', trigger: 'change' }, {
          type: 'number',
          message: '必须为数字值'
        }],
        triggerType: [{ required: true, message: 'Trigger ID is required', trigger: 'change' }, {
          type: 'number',
          message: '必须为数字值'
        }],
        difyApiKey: [{ required: true, message: 'Dify API Key is required', trigger: 'change' }],
        difyVersion: [{ required: true, message: 'Dify Version is required', trigger: 'change' }],
        remark: [{ required: false }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSwitchChange(value, result) {
      if (value && result.fieldType == null) {
        this.$set(result, 'fieldType', 2)
      }
    },
    uploadDsl(response, file, fileList) {
      if (response.code === 0) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.difyAgent.difyDslFile = e.target.result.split(',')[1]
        }
        reader.readAsDataURL(file.raw)
        this.difyAgent.param = response.data.paramList
        this.difyAgent.result = response.data.resultList
      } else {
        this.$alert(response.message, 'Error', {
          confirmButtonText: 'OK',
          type: 'error'
        })
      }
    },
    chooseMethod() {
      if (this.editDifyAgent) {
        this.updateDifyAgent()
      } else {
        if (this.difyAgent.difyDslFile === '') {
          this.$message.warning('请上传Dify DSL文件')
        } else {
          this.createDifyData()
        }
      }
    },
    handleCreateDifyAgent() {
      this.dialogDifyAgentVisible = true
    },
    beforeAvatarUpload(file) {
      const isYml = file.type === 'application/x-yaml'
      if (!isYml) {
        this.$message.error('上传文件只能是yml')
      }
      const isLt2M = file.size / 1024 < 2000
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过2M!')
      }
      return isYml && isLt2M
    },
    handleFileRemove() {
      this.difyAgent.difyDslFile = ''
      this.difyAgent.param = []
      this.difyAgent.result = []
      this.fileList = []
    },
    closeAndClearWindow() {
      this.dialogDifyAgentVisible = false
      this.editDifyAgent = false
      this.handleFileRemove()
      this.$nextTick(() => {
        this.resetDifyAgentForm()
        this.$refs['difyAgentForm'].resetFields()
      })
    },
    createDifyData() {
      this.$refs['difyAgentForm'].validate((valid) => {
        if (valid) {
          const difyAgentData = Object.assign({}, this.difyAgent)
          createAgentConfig(difyAgentData).then((res) => {
            this.closeAndClearWindow()
            this.getList()
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateDifyAgent() {
      this.$refs['difyAgentForm'].validate((valid) => {
        if (this.difyAgent.difyDslFile !== '' && this.difyAgent.difyDslFile !== undefined &&
            this.oldDifyVersion === this.difyAgent.difyVersion) {
          this.$message.warning('变更DSL文件后请修改Dify version')
          return
        }
        if ((this.difyAgent.difyDslFile === '' || this.difyAgent.difyDslFile === undefined) &&
            this.oldDifyVersion !== this.difyAgent.difyVersion) {
          this.$message.warning('Dify version变更后,请上传DSL文件')
          return
        }
        if (Array.isArray(this.difyAgent.result) && this.difyAgent.result.length === 0) {
          this.$message.warning('出参不能为空，请校验DSL文件')
          return
        }
        if (valid) {
          const tempData = Object.assign({}, this.difyAgent)
          updateAgentConfig(tempData.id, tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.difyAgent.id)
            this.list.splice(index, 1, tempData)
            this.closeAndClearWindow()
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          }).finally(() => {
            // this.getList()
          })
        }
      })
    },
    resetDifyAgentForm() {
      this.difyAgent = {
        name: '',
        agentCategory: 2,
        sqsName: 'business_agent_dify_queue',
        agentType: null,
        triggerType: null,
        difyApiKey: '',
        difyVersion: '',
        difyDslFile: '',
        param: [],
        result: [],
        remark: ''
      }
      this.editDifyAgent = false
      this.oldDifyVersion = ''
      this.fileList = []
    },
    handleUpdateDify(row) {
      this.difyAgent = row
      this.oldDifyVersion = row.difyVersion
      this.dialogDifyAgentVisible = true
      this.editDifyAgent = true
    },
    getList() {
      this.listLoading = true
      getAgentList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
      }).finally(
        () => {
          this.listLoading = false
        }
      )
    },
    addParam() {
      this.temp.param.push({
        value: '',
        key: Date.now()
      })
    },
    removeParam(item) {
      var index = this.temp.param.indexOf(item)
      if (index !== -1) {
        this.temp.param.splice(index, 1)
      }
    },
    filedTypeChange(param) {
      if (param.fieldType === 5) {
        // 只有在 fieldType 为 5 并且 field 为空时才赋值
        param.field = 'imageUrl'
      }
      // if (param.fieldType === 5) {
      //   param.field = 'imageUrl'
      // } else {
      //   param.field = ''
      // }
    },
    addResult() {
      this.temp.result.push({
        value: '',
        key: Date.now()
      })
    },
    removeResult(item) {
      var index = this.temp.result.indexOf(item)
      if (index !== -1) {
        this.temp.result.splice(index, 1)
      }
    },

    addPromptList() {
      this.temp.promptList.push({
        value: '',
        key1: Date.now()
      })
    },
    removePromptList(item) {
      var index = this.temp.promptList.indexOf(item)
      if (index !== -1) {
        this.temp.promptList.splice(index, 1)
      }
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = JSON.parse(JSON.stringify(tempRaw))
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      console.log(this.temp)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)

          const jsonEditorInstance = this.$refs[`jsonEditor`]
          if (jsonEditorInstance) {
            const value = jsonEditorInstance.getValue()
            if (value) {
              tempData.prompt = JSON.parse(value)
            }
          }
          createAgentConfig(tempData).then((res) => {
            // this.temp.id = res.data.id
            // this.list.unshift(this.temp)
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.resetTemp()
      // this.temp = Object.assign({}, row) // copy obj
      // 深拷贝
      this.temp = JSON.parse(JSON.stringify(row))
      this.temp.timestamp = new Date(this.temp.timestamp)
      if (this.temp.result === undefined || this.temp.result.length === 0) {
        this.temp.result = JSON.parse(JSON.stringify(tempRaw.result))
      }
      if (this.temp.param === undefined || this.temp.param.length === 0) {
        this.temp.param = JSON.parse(JSON.stringify(tempRaw.param))
      }
      if (this.temp.promptList === undefined || this.temp.promptList.length === 0) {
        this.temp.promptList = JSON.parse(JSON.stringify(tempRaw.promptList))
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)

          const jsonEditorInstance = this.$refs[`jsonEditor`]
          if (jsonEditorInstance) {
            const value = jsonEditorInstance.getValue()
            if (value) {
              tempData.prompt = JSON.parse(value)
            }
          }
          updateAgentConfig(tempData.id, tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          }).finally(() => {
            // this.getList()
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
