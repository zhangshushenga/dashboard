
module.exports = [
    // send code
    {
        url: '/api/role/list',
        type: 'get',
        response: config => {
            return {
                "code": 1,
                "message": "Success",
                "data": [
                    {
                        "id": "VubQvHoB5OAqUmbfRVFq",
                        "createTime": "2021-07-19 11:30:03",
                        "updateTime": "2021-07-19 11:30:03",
                        "createPin": "陈彦瑾",
                        "updatePin": "陈彦瑾",
                        "name": "超级管理员",
                        "menuIdList":[
                    "cbe9eb45-eab0-4dde-ab03-4481244b29a7",
                    "1e0e2044-dbe6-4623-abef-1d291facbe53",
                    "37ea4889-f24d-46bc-8345-c19b1a48c916",
                    "7f78e3fa-1101-45fb-8f86-293a0c04bb2b"]
                    },
                    {
                        "id": "W-bUvHoB5OAqUmbfX1Fy",
                        "createTime": "2021-07-19 11:34:32",
                        "updateTime": "2021-07-19 11:34:32",
                        "createPin": "陈彦瑾",
                        "updatePin": "陈彦瑾",
                        "name": "开发工程师",
                        "menuIdList":[
                    "cbe9eb45-eab0-4dde-ab03-4481244b29a7",
                    "1e0e2044-dbe6-4623-abef-1d291facbe53",
                    "37ea4889-f24d-46bc-8345-c19b1a48c916",
                    "7f78e3fa-1101-45fb-8f86-293a0c04bb2b"]
                    },
                    {
                        "id": "W-bUvHoB5OAqU",
                        "createTime": "2021-07-19 11:34:32",
                        "updateTime": "2021-07-19 11:34:32",
                        "createPin": "陈彦瑾",
                        "updatePin": "陈彦瑾",
                        "name": "开发工程师A",
                        "menuIdList":[
                    "cbe9eb45-eab0-4dde-ab03-4481244b29a7",
                    "1e0e2044-dbe6-4623-abef-1d291facbe53",
                    "37ea4889-f24d-46bc-8345-c19b1a48c916",
                    "7f78e3fa-1101-45fb-8f86-293a0c04bb2b",
                    "4db16a9b-7477-4c1e-9c3f-321c956db1df",
                    "a5ae6791-ec39-4661-8b3a-4a48099409c2"]
                    }
                ],
                "total": 1,
                "current": 1,
                "hash": "1",
                "version": 1
            }
            
            
            


            Î
        }
    },
    {
        url: '/api/role',
        type: 'post',
        response: config => {
            return {
                "code": 1,
                "message": "Success",
                "total": 0,
                "current": 0,
                "hash": "1",
                "version": 1
            }
            Î
        }
    }, 
    {
        url: '/api/role/',
        type: 'delete',
        response: config => {
            return{
                "code": 1,
                "message": "Success",
                "total": 0,
                "current": 0,
                "hash": "1",
                "version": 1
            }
 Î
        }
    },
    {
        url: '/api/role/',
        type: 'put',
        response: config => {
            return{
                "code": 1,
                "message": "Success",
                "total": 0,
                "current": 0,
                "hash": "1",
                "version": 1
            }
            
 Î
        }
    },
    {
        url: '/api/menu/list',
        type: 'get',
        response: config => {
            return {
                "code": 1,
                "message": "Success",
                "data": [
                    {
                        "id": "cbe9eb45-eab0-4dde-ab03-4481244b29a7",
                        "sort": 1,
                        "name": "Device",
                        "title": "Device",
                        "icon": "chart",
                        "path": "device",
                        "subMenuList": [
                            {
                                "id": "1e0e2044-dbe6-4623-abef-1d291facbe53",
                                "sort": 2,
                                "name": "DeviceGrowChart",
                                "title": "设备增长",
                                "path": "device-grow"
                            },
                            {
                                "id": "37ea4889-f24d-46bc-8345-c19b1a48c916",
                                "sort": 3,
                                "name": "DeviceNewChart",
                                "title": "设备激活",
                                "path": "device-new"
                            },
                            {
                                "id": "7f78e3fa-1101-45fb-8f86-293a0c04bb2b",
                                "sort": 4,
                                "name": "DeviceNumChart",
                                "title": "设备总量",
                                "path": "device-num"
                            },
                            {
                                "id": "3c8bc848-fbc3-49cf-b0f3-3c5556b3d3fb",
                                "sort": 5,
                                "name": "LineChartActive",
                                "title": "设备日活",
                                "path": "lineActive"
                            },
                            {
                                "id": "e21bc88f-9abf-41f6-aec2-216314d7cd37",
                                "sort": 6,
                                "name": "LineChartActiveWeek",
                                "title": "设备周活",
                                "path": "lineActiveWeek"
                            },
                            {
                                "id": "cb676c80-f2ba-4943-9f99-d52dd32c7b50",
                                "sort": 7,
                                "name": "LineChartActiveMonth",
                                "title": "设备月活",
                                "path": "lineActiveMonth"
                            },
                            {
                                "id": "1dd9c178-d01b-4798-84e2-7b67cd0fb401",
                                "sort": 8,
                                "name": "AccessoryChart",
                                "title": "耗材使用时长分布",
                                "path": "accessory"
                            }
                        ]
                    },
                    {
                        "id": "4db16a9b-7477-4c1e-9c3f-321c956db1df",
                        "sort": 9,
                        "name": "Data",
                        "title": "Data",
                        "icon": "table",
                        "path": "data",
                        "subMenuList": [
                            {
                                "id": "a5ae6791-ec39-4661-8b3a-4a48099409c2",
                                "sort": 10,
                                "name": "Days30Chart",
                                "title": "清扫次数按每天分布",
                                "path": "days30"
                            },
                            {
                                "id": "9baf649c-4eaa-49a8-9fd4-148c7d7c7081",
                                "sort": 11,
                                "name": "Days30NumRateChart",
                                "title": "清扫类型的次数和比率",
                                "path": "days30-num-rate"
                            },
                            {
                                "id": "f06a76ac-360d-4f94-9afd-b4bb0709fcf3",
                                "sort": 12,
                                "name": "Week7Chart",
                                "title": "清扫次数按周几分布",
                                "path": "week7"
                            },
                            {
                                "id": "1348f567-f01e-43fd-a94c-2371b7d2d100",
                                "sort": 13,
                                "name": "Hours24Chart",
                                "title": "清扫次数按小时分布",
                                "path": "hours24"
                            },
                            {
                                "id": "dc104d72-c347-4335-a6f1-1ec724a57001",
                                "sort": 14,
                                "name": "Days30TimeSizeChart",
                                "title": "清扫时间面积按天分布",
                                "path": "days30-time-size"
                            }
                        ]
                    },
                    {
                        "id": "0367aaa5-577a-4e44-b275-b55189581060",
                        "sort": 15,
                        "name": "Metrics",
                        "title": "Metrics",
                        "icon": "el-icon-warning",
                        "path": "metrics",
                        "subMenuList": [
                            {
                                "id": "83ffea8a-ccf3-4b38-a14b-27d8557274c9",
                                "sort": 16,
                                "name": "MixChart",
                                "title": "整点在线率",
                                "path": "mix-chart"
                            },
                            {
                                "id": "5bb39bb3-f46d-4a41-aae0-12d70c51ec2e",
                                "sort": 17,
                                "name": "OfflineReasonChart",
                                "title": "离线数据和原因",
                                "path": "offline-reason"
                            },
                            {
                                "id": "1ce18886-5beb-48e5-bcd0-100240bf0499",
                                "sort": 18,
                                "name": "OfflineQueryChart",
                                "title": "离线数据查询",
                                "path": "offline-query"
                            },
                            {
                                "id": "f928fde1-25bb-4187-acf4-ae17922c2327",
                                "sort": 19,
                                "name": "DeviceFaultChart",
                                "title": "每天故障情况",
                                "path": "device-fault"
                            }
                        ]
                    },
                    {
                        "id": "2ea7e69f-242b-44ff-9627-c0789c331a47",
                        "sort": 20,
                        "name": "Data2",
                        "title": "lab",
                        "icon": "el-icon-s-platform",
                        "path": "data2",
                        "subMenuList": [
                            {
                                "id": "3a13c3e0-9fc5-4377-a18d-f89ad0d31c23",
                                "sort": 21,
                                "name": "lineOmtmChart",
                                "title": "清扫完成率",
                                "path": "omtm"
                            },
                            {
                                "id": "85991c44-93b1-4fc1-9cf3-cbe14c8962a0",
                                "sort": 22,
                                "name": "Days31Chart",
                                "title": "不同入网时间设备清扫分布",
                                "path": "days31"
                            }
                        ]
                    },
                    {
                        "id": "695ce9e7-7b79-48ab-bb2e-bc08b85c008c",
                        "sort": 23,
                        "name": "Table",
                        "title": "Permission",
                        "icon": "el-icon-video-camera-solid",
                        "path": "table",
                        "subMenuList": [
                            {
                                "id": "e7a1bf5d-26d0-4e2b-83ee-1f41e670ba7e",
                                "sort": 24,
                                "name": "DynamicTable",
                                "title": "data log",
                                "path": "dynamic-table"
                            },
                            {
                                "id": "f36aa6a9-7a81-4e1e-9b89-106b0c1f6c08",
                                "sort": 25,
                                "name": "UnfixedThread",
                                "title": "map log",
                                "path": "UnfixedThread-table"
                            }
                        ]
                    }
                ],
                "total": 1,
                "current": 1,
                "hash": "1",
                "version": 1
            }


            Î
        }
    },
]