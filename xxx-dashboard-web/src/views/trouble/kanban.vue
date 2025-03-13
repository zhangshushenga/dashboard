<template>
  <div>
    <kanban-board :stages="stages" :blocks="blocks">
      <div v-for="stage in stages" :slot="stage" :key="stage">
        <h2>{{ stage }}</h2>
      </div>
      <div v-for="block in blocks" :slot="block.id" :key="block.id">
        <div>
          <strong>id:</strong> {{ block.id }}
        </div>
        <div>
          {{ block.title }}
        </div>
      </div>
    </kanban-board>
  </div>
</template>

<script>

import { getTSList } from '@/api/trouble'
export default {
  name: 'ChartKanban',
  data() {
    return {
      stages: ['已分配', '处理中', '已解决待验证', '已验证待发布', '已发布', '不需要处理'],
      blocks: [],
      typeStages: [1, 2, 4, 5, 6, 3]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      for (const statu of this.typeStages) {
        const param = {
          'status': statu,
          'size': 9
        }
        getTSList(param).then(response => {
          if (response.code === 0) {
            const st = this.stages[this.typeStages.indexOf(statu)] + '    :   ' + response.data.total
            this.stages[this.typeStages.indexOf(statu)] = st
            for (const r of response.data.records) {
              this.blocks.push({
                id: r.id,
                status: st,
                title: this.handleContent(r.content)
              })
            }
          }
        })
      }
    },
    handleContent(content) {
      if (content.length > 60) {
        return content.substring(0, 60) + '...'
      }
      return content
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/kanban2.css';
</style>
