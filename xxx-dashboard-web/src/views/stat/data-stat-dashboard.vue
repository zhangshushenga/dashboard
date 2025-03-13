<template>
    <div class="container" style="display: flex; flex-direction: column;">
        <div style="display: flex; flex: 1; flex-direction: row; justify-content: space-between;"
            class="background-image_nav">
            <div class="title">Psync up Cam 3 Dashboard</div>
            <div class="currentTime">{{ currentDateTime }}</div>
        </div>
        <div style="display: flex; flex-direction: row; flex: 12.5;">
            <div style="display: flex; flex-direction: column; width: 20%; margin: 1% 1% 1% 1%;">
                <div style="display: flex; flex-direction: column; flex: 4;" class="background-image_base">
                    <div
                        style="display: flex; flex-direction: column; flex:2; justify-content: space-around; margin-bottom: 1%;">
                        <div class="baseDataTitle">基础数据</div>
                        <div style="display: flex; flex-direction: row;">
                            <div style="margin-left: 5%; flex: 1;">
                                <div class="dataTitle">总用户量</div>
                                <div class="dataContent">{{ totalUsers }}</div>
                            </div>
                            <div style="margin-left: 5%; flex: 1;">
                                <div class="dataTitle">总激活设备</div>
                                <div class="dataContent">{{ totalDevices }}</div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;">
                            <div style="margin-left: 5%; flex: 1;">
                                <div class="dataTitle">当日新增用户</div>
                                <div class="dataContent">{{ newUsers }}</div>
                            </div>
                            <div style="margin-left: 5%; flex: 1;">
                                <div class="dataTitle">当日活跃用户</div>
                                <div class="dataContent">{{ activeUsers }}</div>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; flex: 3; margin-left: 5%;">
                        <div class="dataTitle">近30日用户量</div>
                        <div style=" flex: 1;">
                            <div id="userLine" class="userLine"></div>
                        </div>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-around; flex: 1; margin: 5% 0 5% 0;"
                    class="background-image_spec">
                    <div class="baseDataTitle">关键行为</div>
                    <div style="display: flex; flex-direction: row;">
                        <div style="margin-left: 5%; flex: 1;">
                            <div class="dataTitle">当日人均打开APP次数</div>
                            <div class="dataContent">{{ useAppCount }}</div>
                        </div>
                        <div style="margin-left: 5%; flex: 1;">
                            <div class="dataTitle">当日人均使用时长</div>
                            <div class="dataContent">{{ changeSecond(useAppTime) }}</div>
                        </div>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-around; flex: 2;"
                    class="background-image_performance">
                    <div style="display: flex; flex-direction: row;">
                        <div class="baseDataTitle" style="column; margin: 5% 2% 0 5%;">性能指标</div>
                        <div class="dataTitle" style="margin-top: 7%;">(近7日数据平均值)</div>
                    </div>
                    <div style="display: flex; flex-direction: row; margin-top: 3%; flex: 3;">
                        <div style="display: flex; flex-direction: column; flex: 1;">
                            <div class="subDataTitle" style="margin-left: 10%;">iOS</div>
                            <div ref="connectIosRateRing" class="userLine">
                            </div>
                            <div
                                style="display: flex; flex-direction: row; justify-content: space-around; align-items: center; margin: 10%;">
                                <div class="dataTitle">平均连接时长</div>
                                <div class="dataContent" style="margin-bottom: 5%;">{{ avgIosTimeSuccess.toString() + 's' }}
                                </div>
                            </div>
                        </div>
                        <div style="background-color: #202C36; width: 1px; height: 100%;"></div>
                        <div style="display: flex; flex-direction: column; flex: 1;">
                            <div class="subDataTitle" style="margin-left: 10%;">Android</div>
                            <div ref="connectAndroidRateRing" style="flex: 1;" class="userLine"></div>
                            <div
                                style="display: flex; flex-direction: row; justify-content: space-around; align-items: center; margin: 10%;">
                                <div class="dataTitle">平均连接时长</div>
                                <div class="dataContent" style="margin-bottom: 5%;">{{ avgAndroidTimeSuccess.toString() +
                                    's' }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style=" position: relative;  margin: 0 1% 1% 0; width: 80%;" class="background-image_map">
                <div id="mapChart" style="width: 100%; height: 100%; margin-top: 2.5%;" class="userLine"></div>
                <div style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;">
                    <div class="flexCenter" style="position: absolute; left: 15%; top:40%">
                        <div class="zoneTitle">PST</div>
                        <div class="zoneVaule">{{ timeZoneData['PST']['iotOnLine'] }}</div>
                    </div>
                    <div class="flexCenter" style="position: absolute; left: 30%; top:40%">
                        <div class="zoneTitle">MST</div>
                        <div class="zoneVaule">{{ timeZoneData['MST']['iotOnLine'] }}</div>
                    </div>
                    <div class="flexCenter" style="position: absolute; left: 47%; top:40%">
                        <div class="zoneTitle">CST</div>
                        <div class="zoneVaule">{{ timeZoneData['CST']['iotOnLine'] }}</div>
                    </div>
                    <div class="flexCenter" style="position: absolute; left: 70%; top:40%">
                        <div class="zoneTitle">EST</div>
                        <div class="zoneVaule">{{ timeZoneData['EST']['iotOnLine'] }}</div>
                    </div>
                    <div class="flexCenter" style="position: absolute; left: 20%; top:73%">
                        <div class="zoneTitle">AKST</div>
                        <div class="zoneVaule">{{ timeZoneData['AKST']['iotOnLine'] }}</div>
                    </div>
                    <div class="flexCenter" style="position: absolute; left: 35%; top:75%">
                        <div class="zoneTitle">HST</div>
                        <div class="zoneVaule">{{ timeZoneData['HST']['iotOnLine'] }}</div>
                    </div>
                </div>
                <div style="position: absolute; left: 3%; top: 3%; width: 20%; height: 7%; padding: 1%; display: flex; flex-direction: row;"
                    class="background-image_online">
                    <div style="flex: 1; display: flex; align-items: center;">
                        <div class="background-image_online_icon" style="width: 10%; height: 50%; margin-right: 2%;"></div>
                        <div class="currentTime">在线设备</div>
                    </div>
                    <div style="display: flex; flex-direction: row; align-items: center;" class="dataContent">
                        {{ onlineDevices }}</div>
                </div>
                <div style="position: absolute; right: 3%; bottom: 5%; width: 16%; height: 27%; padding: 1%; display: flex; flex-direction: column;"
                    class="background-image_top">
                    <div class="baseDataTitle">设备数</div>
                    <div style="margin-top: 7%; flex: 1; display: flex; flex-direction: column;">
                        <div v-for="(item, index) in topData"
                            style="display: flex; flex-direction: row; justify-content: center; flex: 1; margin: 4%;">
                            <div style="flex: 3; display: flex; align-items: center; margin: 0%;" class="dataTitle">
                                <div style="width: 13%; height: 100%; margin-right: 2%; color: #fff; border-radius: 50%; display: flex; justify-content: center; align-items: center;"
                                    :class="topColor(index)">
                                    {{ index + 1 }}
                                </div>
                                <div style="font-weight: 300;">{{ item.name }}</div>
                            </div>
                            <div style="flex: 1; text-align: right;" class="topData">{{ item.num }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import usaMapData from '../../assets/USA.json' // 替换为实际的地图数据文件路径
import { city_data } from './dashboard_data'
import { getDataBoardBase, getDataBoardUseApp, getDataBoardCount, getDataBoardMapCount } from '../../api/api-stat'
import { changetime } from '../../utils/util-date'

let userLineChart;
let connectIosRateRing;
let connectAndroidRateRing;
let connectTimeRing;
let mapChart;

export default {

    data() {
        return {
            totalUsers: 0,
            totalDevices: 0,
            newUsers: 0,
            activeUsers: 0,
            useAppCount: 0,
            useAppTime: 0,
            onlineDevices: 0,
            avgIosSuccessRate: 0,
            avgIosTimeSuccess: 0,
            avgAndroidSuccessRate: 0,
            avgAndroidTimeSuccess: 0,
            usersWithLast30Days: null,
            minuteIntervalId: null,
            dayIntervalId: null,
            currentDateTime: '',
            //各时区数据
            timeZoneData: {
                "AKST": { "iotOnLine": 0, "p2pOnLine": 0 },
                "PST": { "iotOnLine": 0, "p2pOnLine": 0 },
                "MST": { "iotOnLine": 0, "p2pOnLine": 0 },
                "CST": { "iotOnLine": 0, "p2pOnLine": 0 },
                "EST": { "iotOnLine": 0, "p2pOnLine": 0 },
                "HST": { "iotOnLine": 0, "p2pOnLine": 0 },
            }
        }
    },
    created() {
        this.minuteIntervalId = setInterval(this.minuteAction, 60000); // 每分钟执行一次
        this.dayIntervalId = setTimeout(this.dayAction, this.getTimeUntil4PM()); // 在下一个北京时间下午4点执行一次
    },
    beforeDestroy() {
        // 清除计时器
        clearTimeout(this.minuteIntervalId);
        clearTimeout(this.dayIntervalId);
    },
    mounted() {
        this.getCurrentDateTime(); // 初始化时获取当前时间
        setInterval(this.getCurrentDateTime, 1000); // 每秒钟更新一次时间
        this.drawLUserLine()
        this.drawIosConnectRateRing()
        this.drawAndroidConnectRateRing()
        // this.drawConnectTimeRing()
        this.drawMap()
        this.minuteAction()
        this.dayAction()
        // 监听窗口大小变化，动态更新图表大小
        window.addEventListener('resize', () => {
            userLineChart.resize();
            connectIosRateRing.resize();
            connectAndroidRateRing.resize();
            // connectTimeRing.resize();
            mapChart.resize();
        });
    },
    computed: {
        topData() {
            var top = []
            // 将字典转换为可排序的数组
            const sortedArray = Object.entries(this.timeZoneData)
                .map(([timezone, values]) => ({ timezone, iotOnLine: values.iotOnLine }))
                .sort((a, b) => b.iotOnLine - a.iotOnLine);

            // 生成最终结果数组
            top = sortedArray.map(({ timezone, iotOnLine }) => ({
                name: this.getTimezoneName(timezone),
                num: iotOnLine,
            }));

            return top
        }
    },
    methods: {
        minuteAction() {
            getDataBoardBase().then((response) => {
                if (response.code === 0) {
                    console.log(response)
                    this.totalUsers = response.data.countUser
                    this.totalDevices = response.data.countActiveDevice
                    this.newUsers = response.data.dayNewUser
                    this.activeUsers = response.data.dayActiveUser
                    this.onlineDevices = response.data.onLineDevice
                }
            }).catch((error) => {

            })

            getDataBoardUseApp().then((response) => {
                if (response.code === 0) {
                    this.useAppCount = response.data.dayOpenTimes.toFixed(1)
                    this.useAppTime = response.data.dayUseDuration
                }
            }).catch((error) => {

            })

            getDataBoardMapCount().then((response) => {
                console.log(response.data)
                if (response.code === 0) {
                    this.timeZoneData = {
                        "AKST": { "iotOnLine": 0, "p2pOnLine": 0 },
                        "PST": { "iotOnLine": 0, "p2pOnLine": 0 },
                        "MST": { "iotOnLine": 0, "p2pOnLine": 0 },
                        "CST": { "iotOnLine": 0, "p2pOnLine": 0 },
                        "EST": { "iotOnLine": 0, "p2pOnLine": 0 },
                        "HST": { "iotOnLine": 0, "p2pOnLine": 0 },
                    },
                        response.data.forEach((item) => {
                            console.log(item)
                            let city = item.timeZone
                            let cityData = city_data[city]
                            //有对应时区
                            if (cityData != undefined && cityData != null) {
                                let timeZone = cityData['timezone']
                                //并且是在美国的6个时区中
                                if (['AKST','PST','MST','CST','EST','HST'].indexOf(timeZone) != -1) {
                                    this.timeZoneData[timeZone]['iotOnLine'] = this.timeZoneData[timeZone]['iotOnLine'] + item.iotOnLine
                                    this.timeZoneData[timeZone]['p2pOnLine'] = this.timeZoneData[timeZone]['p2pOnLine'] + item.p2pOnLine
                                }
                            }
                        })
                    console.log(this.timeZoneData)
                    this.upDateMap()
                }

            }).catch((error) => {

            })
        },
        dayAction() {
            getDataBoardCount().then((response) => {
                console.log(response)
                if (response.code === 0) {
                    this.avgIosSuccessRate = response.data.avgIosSuccessRate
                    this.avgIosTimeSuccess = (response.data.avgIosTimeSuccess / 1000).toFixed(1)
                    this.avgAndroidSuccessRate = response.data.avgAndroidSuccessRate
                    this.avgAndroidTimeSuccess = (response.data.avgAndroidTimeSuccess / 1000).toFixed(1)
                    this.usersWithLast30Days = response.data.dayActiveUser
                    this.updateIosConnectRate()
                    this.updateAndroidConnectRate()
                    // this.updateConnectTime()
                    this.updateUsers()
                }

            }).catch((error) => {

            })

            this.dayIntervalId = setTimeout(this.dayAction, this.getTimeUntil4PM()); // 在下一个北京时间下午4点执行一次myFunction
        },
        //获取当前时间距离下午4点的时间间隔
        getTimeUntil4PM() {
            // 获取当前时间的日期对象
            const now = new Date();

            // 获取当前时间的年、月、日
            const year = now.getFullYear();
            const month = now.getMonth();
            const day = now.getDate();

            // 创建下一个北京时间的下午4点的日期对象
            var nextBeijing4PM = new Date(year, month, day, 16, 0, 0);

            // 计算当前时间到下一个北京时间下午4点的时间间隔
            var timeUntil4PM = nextBeijing4PM.getTime() - now.getTime();

            // 如果当前时间已经超过了下一个北京时间下午4点，则等待到明天的下午4点执行任务
            if (timeUntil4PM < 0) {
                nextBeijing4PM.setDate(day + 1);
                timeUntil4PM = nextBeijing4PM.getTime() - now.getTime();
            }

            return timeUntil4PM
        },
        getCurrentDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            this.currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        drawLUserLine() {
            const chartContainer = document.getElementById('userLine');
            userLineChart = echarts.init(chartContainer);

            const options = {
                grid: {
                    left: '3%',
                    right: '5%',
                    top: '0%',
                    bottom: '15%',
                }
            };

            userLineChart.setOption(options);

        },
        updateUsers() {
            const xData = this.usersWithLast30Days.map((item, index, self) => {
                return item.exactdate.substring(5, item.exactdate.length)
            });
            const yData = this.usersWithLast30Days.map((item, index, self) => {
                return item.totalusers
            });
            const minValueIndex = yData.indexOf(Math.min(...yData));
            const maxValueIndex = yData.indexOf(Math.max(...yData));
            //开始绘画曲线的Y值
            const drawMinValue = Math.min(...yData) - ((Math.max(...yData) - Math.min(...yData)) / 2)
            const options = {
                xAxis: {
                    type: 'category',
                    data: xData,
                    axisTick: {
                        show: false // 去除 x 轴的刻度标记
                    },
                    axisLabel: {
                        formatter: (value, index) => {
                            // 只标记起始和终点的数据
                            if (index === 0 || index === options.xAxis.data.length - 1) {
                                return value;
                            } else {
                                return '';
                            }
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    min: drawMinValue > 0 ? drawMinValue : 0, // 设置y轴的最小值
                    show: false
                },
                series: [
                    {
                        type: 'line',
                        smooth: true, // 设置为平滑曲线
                        symbol: 'none', // 去掉曲线上的点标记
                        lineStyle: {
                            color: 'rgba(126, 193, 255, 1)' // 自定义曲线颜色
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(126, 193, 255, 1)' // 渐变起始颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(126, 193, 255, 0)' // 渐变结束颜色
                                    }
                                ]
                            }
                        },
                        data: yData
                    },
                    {
                        type: 'line',
                        symbol: 'none',
                        lineStyle: {
                            color: 'rgba(126, 193, 255, 1)',
                            type: 'dashed'
                        },
                        markLine: {
                            silent: true,
                            data: [
                                { yAxis: yData[minValueIndex] },
                                { yAxis: yData[maxValueIndex] }
                            ]
                        }
                    }
                ],
                markLine: {
                    symbol: 'none',
                    label: {
                        show: true,
                        position: 'start',
                        offset: [Math.max(...yData).toString().length * 9, -10], // 水平和垂直方向的偏移量
                        color: 'rgba(116, 127, 128, 1)',  // 展示内容颜色
                        formatter: function (params) {
                            if (params.dataIndex === 0) {
                                return Math.min(...yData);
                            } else if (params.dataIndex === 1) {
                                return Math.max(...yData);
                            }
                            else {
                                return '';
                            }
                        }
                    },
                    lineStyle: {
                        color: 'rgba(126, 193, 255, 1)'
                    },
                    data: [
                        {
                            type: 'min',
                            name: '最低点'
                        },
                        {
                            type: 'max',
                            name: '最高点'
                        }
                    ]
                }
            };
            userLineChart.setOption(options);
        },
        drawIosConnectRateRing() {
            //connectIosRateRing
            // 获取 DOM 元素
            const chartContainer = this.$refs.connectIosRateRing;
            // 创建 ECharts 实例
            connectIosRateRing = echarts.init(chartContainer);
            // 设置图表配置项
            const option = {
                angleAxis: {
                    max: 100, // 满分
                    clockwise: true, // 逆时针
                    // 隐藏刻度线
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                radiusAxis: {
                    type: "category",
                    // 隐藏刻度线
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                polar: {
                    radius: "170%", //图形大小
                    center: ['50%', '50%'], // 调整圆环的位置
                }
            };

            // 应用配置项
            connectIosRateRing.setOption(option);
        },
        updateIosConnectRate() {
            const option = {
                series: [
                    {
                        type: "bar",
                        data: [
                            {
                                value: this.avgIosSuccessRate * 100,
                                itemStyle: {
                                    normal: {
                                        color: "rgba(126, 193, 255, 1)" //有颜色的环的颜色
                                    }
                                }
                            }
                        ],
                        coordinateSystem: "polar",
                        roundCap: true,
                        barWidth: 5, //环的宽度
                        barGap: "-100%", // 两环重叠
                        z: 2
                    },
                    {
                        // 灰色环
                        type: "bar",
                        data: [
                            {
                                value: 100,
                                itemStyle: {
                                    color: "rgba(255, 255, 255, 0.1)",
                                    shadowColor: "rgba(0, 0, 0, 0.1)",
                                    shadowBlur: 2,
                                    shadowOffsetY: 2
                                }
                            }
                        ],
                        coordinateSystem: "polar",
                        roundCap: true,
                        barWidth: 5,
                        barGap: "-100%", // 两环重叠
                        z: 1
                    },
                ],
                graphic: [
                    {
                        type: "text",
                        left: "40%", // 文本水平居中
                        top: "42%", // 文本垂直居中
                        style: {
                            text: (this.avgIosSuccessRate * 100).toString() + '%',
                            fill: "rgba(112, 219, 225, 1)",
                            fontSize: '20px',
                            fontWeight: "bold"
                        }
                    },
                    {
                        type: "text",
                        left: "38%", // 文本水平居中
                        top: "60%", // 文本垂直居中
                        style: {
                            text: "连接成功率",
                            fill: "#fff",
                            fontSize: 10,
                            fontWeight: "normal"
                        }
                    }
                ]
            }

            connectIosRateRing.setOption(option);
        },
        drawAndroidConnectRateRing() {
            // 获取 DOM 元素
            const chartContainer = this.$refs.connectAndroidRateRing;
            // 创建 ECharts 实例
            connectAndroidRateRing = echarts.init(chartContainer);
            // 设置图表配置项
            const option = {
                angleAxis: {
                    max: 100, // 满分
                    clockwise: true, // 逆时针
                    // 隐藏刻度线
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                radiusAxis: {
                    type: "category",
                    // 隐藏刻度线
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                polar: {
                    radius: "170%", //图形大小
                    center: ['50%', '50%'], // 调整圆环的位置
                }
            };

            // 应用配置项
            connectAndroidRateRing.setOption(option);
        },
        updateAndroidConnectRate() {
            const option = {
                series: [
                    {
                        type: "bar",
                        data: [
                            {
                                value: this.avgAndroidSuccessRate * 100,
                                itemStyle: {
                                    normal: {
                                        color: "rgba(126, 193, 255, 1)" //有颜色的环的颜色
                                    }
                                }
                            }
                        ],
                        coordinateSystem: "polar",
                        roundCap: true,
                        barWidth: 5, //环的宽度
                        barGap: "-100%", // 两环重叠
                        z: 2
                    },
                    {
                        // 灰色环
                        type: "bar",
                        data: [
                            {
                                value: 100,
                                itemStyle: {
                                    color: "rgba(255, 255, 255, 0.1)",
                                    shadowColor: "rgba(0, 0, 0, 0.1)",
                                    shadowBlur: 2,
                                    shadowOffsetY: 2
                                }
                            }
                        ],
                        coordinateSystem: "polar",
                        roundCap: true,
                        barWidth: 5,
                        barGap: "-100%", // 两环重叠
                        z: 1
                    },
                ],
                graphic: [
                    {
                        type: "text",
                        left: "40%", // 文本水平居中
                        top: "42%", // 文本垂直居中
                        style: {
                            text: (this.avgAndroidSuccessRate * 100).toString() + '%',
                            fill: "rgba(112, 219, 225, 1)",
                            fontSize: '20px',
                            fontWeight: "bold"
                        }
                    },
                    {
                        type: "text",
                        left: "38%", // 文本水平居中
                        top: "60%", // 文本垂直居中
                        style: {
                            text: "连接成功率",
                            fill: "#fff",
                            fontSize: 10,
                            fontWeight: "normal"
                        }
                    }
                ]
            }

            connectAndroidRateRing.setOption(option);
        },
        drawConnectTimeRing() {
            // 获取 DOM 元素
            const chartContainer = this.$refs.connectTimeRing;
            // 创建 ECharts 实例
            connectTimeRing = echarts.init(chartContainer);
            // 设置图表配置项
            const option = {
                angleAxis: {
                    max: 100, // 满分
                    clockwise: true, // 逆时针
                    // 隐藏刻度线
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                radiusAxis: {
                    type: "category",
                    // 隐藏刻度线
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                polar: {
                    radius: "130%", //图形大小
                    center: ['40%', '50%'], // 调整圆环的位置
                }
            };

            // 应用配置项
            connectTimeRing.setOption(option);
        },
        updateConnectTime() {
            var colorTime = ''
            if (this.avgTimeSuccess < 3) {
                colorTime = 'rgba(112, 225, 172, 1)'
            } else if (this.avgTimeSuccess >= 3 && this.avgTimeSuccess < 6) {
                colorTime = 'rgba(255, 216, 77, 1)'
            } else {
                colorTime = 'rgba(255, 57, 57, 1)'
            }


            const option = {
                series: [
                    {
                        type: "bar",
                        data: [
                            {
                                value: 100,
                                itemStyle: {
                                    normal: {
                                        color: colorTime//有颜色的环的颜色
                                    }
                                }
                            }
                        ],
                        coordinateSystem: "polar",
                        roundCap: true,
                        barWidth: 10, //环的宽度
                        barGap: "-100%", // 两环重叠
                        z: 2
                    }
                ],
                graphic: [
                    {
                        type: "text",
                        left: "30%", // 文本水平居中
                        top: "42%", // 文本垂直居中
                        style: {
                            text: this.avgTimeSuccess.toString() + 's',
                            fill: colorTime,
                            fontSize: '20px',
                            fontWeight: "bold"
                        }
                    },
                    {
                        type: "text",
                        left: "30%", // 文本水平居中
                        top: "54%", // 文本垂直居中
                        style: {
                            text: "连接时长",
                            fill: "#fff",
                            fontSize: 10,
                            fontWeight: "normal"
                        }
                    }
                ]
            }

            connectTimeRing.setOption(option);
        },
        drawMap() {
            // 创建地图实例
            mapChart = echarts.init(document.getElementById('mapChart'))

            // 注册地图数据
            echarts.registerMap('USA', usaMapData, {
                Alaska: {              // 把阿拉斯加移到美国主大陆左下方
                    left: -124,
                    top: 24.9,
                    width: 15
                },
                Hawaii: {
                    left: -109.2,        // 夏威夷
                    top: 24.8,
                    width: 5
                }
            })

            // 配置地图选项
            const option = {
                visualMap: {
                    type: 'piecewise',
                    show: false,
                    min: 1,
                    max: 70,
                    splitNumber: 7, // 分段数
                    inRange: {
                        color: [
                            '#003566',
                            '#004280',
                            '#005099',
                            '#005DB2',
                            '#006ACC',
                            '#0077E5',
                            '#0085FF'
                        ]
                    },
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                    }
                }
            }

            // 使用刚指定的配置项和数据显示图表
            mapChart.setOption(option)
        },
        upDateMap() {
            const options = {
                series: [{
                    name: '数据',
                    type: 'map',
                    map: 'USA',
                    center: [-95.783333, 36.833333],
                    silent: true, // 禁用地图的鼠标事件
                    roam: false,
                    zoom: 1.07, // 调整缩放比例
                    coordinateSystem: 'geo',
                    itemStyle: {
                        areaColor: '#001A32',
                        borderColor: '#005DB2',
                        borderWidth: 1,

                    },
                    label: {
                        show: false,
                        fontSize: 10,
                        position: 'right',
                        offset: [45, -20], // 文案水平和垂直方向的偏移量，可以根据需要调整
                        color: 'rgba(255, 255, 255, 0.5)',
                        formatter: (params) => {
                            if (params.name === 'California') {
                                let text = 'PST';
                                let value = this.timeZoneData['PST']['iotOnLine']
                                return [
                                    '{a|' + text + '}\n', // a 是样式名称，用于定义文案样式
                                    '{b|' + value + '}', // b 是样式名称，用于定义数值样式
                                ].join('');
                            } else if (params.name === 'Utah') {
                                let text = 'MST';
                                let value = this.timeZoneData['MST']['iotOnLine']
                                return [
                                    '{a|' + text + '}\n', // a 是样式名称，用于定义文案样式
                                    '{b|' + value + '}', // b 是样式名称，用于定义数值样式
                                ].join('');
                            } else if (params.name === 'Kansas') {
                                let text = 'CST';
                                let value = this.timeZoneData['CST']['iotOnLine']
                                return [
                                    '{a|' + text + '}\n', // a 是样式名称，用于定义文案样式
                                    '{b|' + value + '}', // b 是样式名称，用于定义数值样式
                                ].join('');
                            } else if (params.name === 'Kentucky') {
                                let text = 'EST';
                                let value = this.timeZoneData['EST']['iotOnLine']
                                return [
                                    '{a|' + text + '}\n', // a 是样式名称，用于定义文案样式
                                    '{b|' + value + '}', // b 是样式名称，用于定义数值样式
                                ].join('');
                            } else if (params.name === 'Alaska') {
                                let text = 'AKST';
                                let value = this.timeZoneData['AKST']['iotOnLine']
                                return [
                                    '{a|' + text + '}\n', // a 是样式名称，用于定义文案样式
                                    '{b|' + value + '}', // b 是样式名称，用于定义数值样式
                                ].join('');
                            } else if (params.name === 'Hawaii') {
                                let text = 'HST';
                                let value = this.timeZoneData['HST']['iotOnLine']
                                return [
                                    '{a|' + text + '}\n', // a 是样式名称，用于定义文案样式
                                    '{b|' + value + '}', // b 是样式名称，用于定义数值样式
                                ].join('');
                            }
                            else {
                                return '';
                            }
                        },
                        rich: {
                            a: {
                                fontSize: 16, // 第一行字体大小
                                fontWeight: 'bold', // 第一行字体加粗
                                color: '#fff', // 第一行字体颜色
                            },
                            b: {
                                fontSize: 40, // 第二行字体大小
                                fontWeight: 'bold', // 第二行字体加粗
                                color: '#fff', // 第二行字体颜色
                            },
                        },
                        textStyle: {
                            color: '#fff', // 文案颜色
                            fontSize: 42, // 文案字号
                        },
                    },
                    data: [
                        { name: 'Alabama', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'Alaska', value: this.timeZoneData['AKST']['iotOnLine'] },
                        { name: 'Arizona', value: this.timeZoneData['MST']['iotOnLine'] },
                        { name: 'Arkansas', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'California', value: this.timeZoneData['PST']['iotOnLine'] },
                        { name: 'Colorado', value: this.timeZoneData['MST']['iotOnLine'] },
                        { name: 'Connecticut', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Delaware', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'District of Columbia', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Florida', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Georgia', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Hawaii', value: this.timeZoneData['HST']['iotOnLine'] },
                        { name: 'Idaho', value: this.timeZoneData['MST']['iotOnLine'] },
                        { name: 'Illinois', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'Indiana', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Iowa', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'Kansas', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'Kentucky', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Louisiana', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'Maine', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Maryland', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Massachusetts', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Michigan', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Minnesota', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'Mississippi', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'Missouri', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'Montana', value: this.timeZoneData['MST']['iotOnLine'] },
                        { name: 'Nebraska', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'Nevada', value: this.timeZoneData['PST']['iotOnLine'] },
                        { name: 'New Hampshire', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'New Jersey', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'New Mexico', value: this.timeZoneData['MST']['iotOnLine'] },
                        { name: 'New York', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'North Carolina', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'North Dakota', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'Ohio', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Oklahoma', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'Oregon', value: this.timeZoneData['PST']['iotOnLine'] },
                        { name: 'Pennsylvania', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Rhode Island', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'South Carolina', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'South Dakota', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'Tennessee', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Texas', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'Utah', value: this.timeZoneData['MST']['iotOnLine'] },
                        { name: 'Vermont', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Virginia', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Washington', value: this.timeZoneData['PST']['iotOnLine'] },
                        { name: 'West Virginia', value: this.timeZoneData['EST']['iotOnLine'] },
                        { name: 'Wisconsin', value: this.timeZoneData['CST']['iotOnLine'] },
                        { name: 'Wyoming', value: this.timeZoneData['MST']['iotOnLine'] },
                    ],
                    // markPoint: {
                    //     symbol: 'circle', // 使用 pin 标记类型
                    //     symbolSize: 5, // 标记大小
                    //     animation: true,
                    //     effect: {
                    //         show: true,
                    //         shadowBlur: 0,
                    //     },
                    //     itemStyle: {
                    //         color: '#70DCE1', // 标记点颜色
                    //         shadowColor: '#70DCE1', // 阴影颜色
                    //     },
                    //     data: pointData.map(item => ({
                    //         coord: item.value
                    //     })),
                    // }
                },
                ]
            }
            mapChart.setOption(options)
        },
        topColor(index) {
            if (index + 1 <= 3) {
                return 'blue-background'
            } else {
                return 'gray-background'
            }
        },
        changeSecond(second) {
            return changetime(second) === "" ? "--" : changetime(second)
        },
        getTimezoneName(timezone) {
            // 根据具体需求定义时区的名称映射关系
            switch (timezone) {
                case "AKST":
                    return "阿拉斯加地区";
                case "PST":
                    return "太平洋地区";
                case "MST":
                    return "山区地区";
                case "CST":
                    return "中部地区";
                case "EST":
                    return "东部地区";
                case "HST":
                    return "夏威夷地区";
                default:
                    return "";
            }
        },
    }
}
</script>

<style scoped>
.flexCenter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container {
    width: 100%;
    height: 100dvh;
    background-color: #000;
}

.title {
    color: #fff;
    font-size: calc(29 * 1rem / 14);
    font-weight: 500;
    font-family: 'Outfit';
    font-style: normal;
    margin-left: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.currentTime {
    color: #fff;
    font-size: calc(18 * 1rem / 14);
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 300;
    margin-right: 1%;
    margin-top: 0.2%;
}

.baseDataTitle {
    color: #0184FF;
    font-size: calc(19 * 1rem / 14);
    font-weight: 600;
    margin-left: 5%;
}

.dataTitle {
    color: #fff;
    font-weight: 400;
    font-size: calc(8 * 1rem / 14);
    margin-bottom: 3%;
}

.subDataTitle {
    color: #0184FF;
    font-weight: 600;
    font-size: calc(12 * 1rem / 14);
    margin-left: 5%;
}

.dataContent {
    color: #7EC1FF;
    font-weight: 500;
    font-size: calc(24 * 1rem / 14);
}

.topData {
    color: #7EC1FF;
    font-weight: 500;
    font-size: calc(17 * 1rem / 14);
}

.zoneTitle {
    font-size: 16px;
    font-weight: 500;
    font-weight: 'bold';
    color: #fff
}

.zoneVaule {
    font-size: 40px;
    font-weight: 600;
    font-weight: 'bold';
    color: #fff
}

.userLine {
    width: 100%;
    height: 100%;
}

.blue-background {
    background-color: #0183FD;
}

.gray-background {
    background-color: #014280;
}

.background-image_nav {
    background-image: url('../../assets/dashboard/dashboard_nav.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.background-image_base {
    background-image: url('../../assets/dashboard/dashboard_base.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.background-image_spec {
    background-image: url('../../assets/dashboard/dashboard_spec.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.background-image_performance {
    background-image: url('../../assets/dashboard/dashboard_performance.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.background-image_map {
    background-image: url('../../assets/dashboard/dashboard_map.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.background-image_mapName {
    background-image: url('../../assets/dashboard/dashboard_map_name.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.background-image_online {
    background-image: url('../../assets/dashboard/dashboard_online.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.background-image_online_icon {
    background-image: url('../../assets/dashboard/dashboard_online_icon.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.background-image_top {
    background-image: url('../../assets/dashboard/dashboard_top.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>