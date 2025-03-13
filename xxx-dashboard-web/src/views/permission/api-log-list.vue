<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="5">
        <el-col :span="12"><div class="block">

          <DateRange v-model="query.queryDate" />
        </div></el-col>
        <el-col :span="6">
          <user-select v-model="query.emailList" :placeholder="'操作人'" :show-all="true" :value-type="2" />
        </el-col>
        <el-col :span="6">
          <el-button
            type="primary"
            icon="el-icon-search"
            style="width: 100%"
            @click="getList()"
          >搜索</el-button>
        </el-col>
      </el-row>
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
      <el-table-column label="createTime" min-width="300px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createDateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="name" prop="id" align="center" min-width="80">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="email" min-width="300px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="urlName" min-width="300px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.urlName }}</span><br>
          <span>{{ row.method +' ' + row.url }}</span>

        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="query.page" :size.sync="query.size" @pagination="getList" />

  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import { getApiLogList } from '@/api/api-log'
import { dateTransToString } from '@/utils/util-date'
import DateRange from '@/components/Trouble/DateRange'

const defaultStartDate = new Date(new Date(new Date()).getTime() - 24 * 60 * 60 * 1000 * 30 * 1)
const defaultEndDate = new Date()

export default {
  name: 'ComplexTable',
  components: { Pagination, DateRange },
  directives: { waves },
  filters: {
  },
  data() {
    return {
      query: {
        queryDate: [new Date(defaultStartDate.getFullYear(), defaultStartDate.getMonth(), defaultStartDate.getDate()),
          new Date(new Date(defaultEndDate.getFullYear(), defaultEndDate.getMonth(), defaultEndDate.getDate()).getTime() + 24 * 60 * 60 * 1000 - 1)
        ],
        // queryDate: [],
        createTimeStart: '',
        createTimeEnd: '',
        emailList: [],
        page: 1,
        size: 20,
        sort: '+id'
      },

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.query.createTimeStart = dateTransToString(this.query.queryDate[0])
      this.query.createTimeEnd = dateTransToString(this.query.queryDate[1])

      const queryParam = Object.assign({}, this.query)

      getApiLogList(queryParam).then(response => {
        this.list = []
        for (const r of response.data.records) {
          this.list.push(r)
        }
        this.total = response.data.total
        this.listLoading = false
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
    }
  }
}
</script>
