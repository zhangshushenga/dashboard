<template>
    <div id="stackBar" style="width: 100%; height: 300px;"></div>
</template>
  
<script>
import * as echarts from 'echarts';

export default {
    props: {
        legend: {
            type: Array,
            required: false,
            default: () => []
        },
        xData: {
            type: Array,
            required: true,
            default: () => []
        },
        yData: {
            type: Array,
            required: true,
            default: () => []
        },
    },
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.renderChart();
    },
    watch: {
        yData: {
            immediate: false, // 在初始加载时也执行一次
            handler() {
                this.updateData();
            },
        },
    },
    methods: {
        renderChart() {
            if (this.chart === null) {
                const chartContainer = document.getElementById('stackBar');
                this.chart = echarts.init(chartContainer)
                this.chart.resize({
                    width: document.documentElement.clientWidth * 0.8 - 100,
                    height: 300
                })
            }

            console.log(this.chartOption())
            // 渲染图表
            this.chart.setOption(this.chartOption());
        },

        updateData() {
            console.log(this.chartOption())
            this.chart.setOption(this.chartOption());
        },

        chartOption() {
            const options = {
                legend: {
                    data: this.legend
                },
                xAxis: {
                    type: 'category',
                    data: this.xData
                },
                yAxis: {
                    type: 'value'
                },
                series: this.yData.map(item => {
                    return {
                        name: item.name,
                        type: 'bar',
                        stack: 'result',
                        data: item.data
                    }
                })
            }

            return options
        }
    },
};
</script>
  
<style scoped>
/* 添加必要的样式，例如设置图表容器的高度等 */
</style>
  