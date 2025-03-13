module.exports = [
    {
        url: '/api/screen/clean_count',
        type: 'get',
        response: config => {
            return {
                "code": 1,
                "message": "Success",
                "data": {
                    "devicesCleanToday": 9543,
                    "recordsCleanToday": 14260,
                    "areaCleanToday": 414516,
                    "timeCleanToday": 8710
                },
                "total": 1,
                "current": 1,
                "hash": "1",
                "version": 1
            }
        }
    },
    {
        url: '/api/screen/clean_rate',
        type: 'get',
        response: config => {
            return {
                "code": 1,
                "message": "Success",
                "data": {
                    "rateRecoverToday": 8034.236842105263,
                    "rateEfficiencyToday": 6034.236842105263,
                    "rateRechargerOkToday": 7034.236842105263,
                    "rateNoFaultDeviceToday": 8634.236842105263
                },
                "total": 1,
                "current": 1,
                "hash": "1",
                "version": 1
            }
        }
    },
    {
        url: '/api/screen/clean_type',
        type: 'get',
        response: config => {
            return {
                "code": 1,
                "message": "Success",
                "data": {
                    "manualWholeFloorToday": {
                        "count": 1218436,
                        "percent": 29.0
                    },
                    "autoWholeFloorToday": {
                        "count": 885476,
                        "percent": 21.0
                    },
                    "manualRoomsToday": {
                        "count": 982368,
                        "percent": 23.0
                    },
                    "autoRoomsToday": {
                        "count": 939824,
                        "percent": 22.0
                    },
                    "areaCleanToday": {
                        "count": 3925,
                        "percent": 0.0
                    },
                    "mappingToday": {
                        "count": 77768,
                        "percent": 1.0
                    },
                    "otherToday": {
                        "count": 320,
                        "percent": 0.0
                    }
                },
                "total": 1,
                "current": 1,
                "hash": "1",
                "version": 1
            }
        }
    },
    {
        url: '/api/screen/device_location',
        type: 'get',
        response: config => {
            return {
                "code": 1,
                "message": "Success",
                "data": [
                    {
                        "deviceId": "JA_RO2_7C78B20A8E96",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A285E",
                        "location": {
                            "lat": 21.4254,
                            "lon": -157.8138
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B24001AE",
                        "location": {
                            "lat": 34.0762,
                            "lon": -118.3029
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA883",
                        "location": {
                            "lat": 39.8235,
                            "lon": -75.7672
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6E43",
                        "location": {
                            "lat": 34.011,
                            "lon": -118.1145
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3E6B",
                        "location": {
                            "lat": 33.5472,
                            "lon": -117.6238
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A848D",
                        "location": {
                            "lat": 34.9016,
                            "lon": -87.5082
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A326B",
                        "location": {
                            "lat": 33.4319,
                            "lon": -111.6428
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2409389",
                        "location": {
                            "lat": 40.7428,
                            "lon": -73.9712
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7E00",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA241",
                        "location": {
                            "lat": 37.751,
                            "lon": -97.822
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9F57",
                        "location": {
                            "lat": 39.1361,
                            "lon": -77.2824
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A233D",
                        "location": {
                            "lat": 27.9032,
                            "lon": -82.2911
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ADABB",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7B89",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA25B",
                        "location": {
                            "lat": 38.9488,
                            "lon": -104.7677
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B0A7",
                        "location": {
                            "lat": 42.5029,
                            "lon": -83.1021
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0E5D",
                        "location": {
                            "lat": 26.1374,
                            "lon": -80.1684
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3639",
                        "location": {
                            "lat": 47.6784,
                            "lon": -122.1857
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAE8A",
                        "location": {
                            "lat": 34.1526,
                            "lon": -118.267
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA021",
                        "location": {
                            "lat": 42.9958,
                            "lon": -89.5499
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A17AA",
                        "location": {
                            "lat": 37.7698,
                            "lon": -97.4329
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA5EC",
                        "location": {
                            "lat": 42.4188,
                            "lon": -71.1557
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AC063",
                        "location": {
                            "lat": 37.5625,
                            "lon": -122.0004
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD518",
                        "location": {
                            "lat": 44.9006,
                            "lon": -92.9275
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A469A",
                        "location": {
                            "lat": 47.6463,
                            "lon": -122.5331
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A642C",
                        "location": {
                            "lat": 33.6459,
                            "lon": -117.8427
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3A62",
                        "location": {
                            "lat": 39.7628,
                            "lon": -86.5343
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5A84",
                        "location": {
                            "lat": 47.6034,
                            "lon": -122.3414
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9AC7",
                        "location": {
                            "lat": 35.7163,
                            "lon": -86.9093
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4EA2",
                        "location": {
                            "lat": 39.4025,
                            "lon": -84.522
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0B9A",
                        "location": {
                            "lat": 18.4425,
                            "lon": -66.3904
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A79D2",
                        "location": {
                            "lat": 33.7153,
                            "lon": -84.3312
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A49C2",
                        "location": {
                            "lat": 41.0511,
                            "lon": -73.5456
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A13D2",
                        "location": {
                            "lat": 36.9689,
                            "lon": -121.9903
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A01A4",
                        "location": {
                            "lat": 32.7638,
                            "lon": -117.07
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8C54",
                        "location": {
                            "lat": 33.8874,
                            "lon": -111.9508
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ACBD0",
                        "location": {
                            "lat": 30.5762,
                            "lon": -87.0676
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD05B",
                        "location": {
                            "lat": 39.7697,
                            "lon": -89.6886
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6DB7",
                        "location": {
                            "lat": 39.1918,
                            "lon": -96.5818
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A714B",
                        "location": {
                            "lat": 40.5447,
                            "lon": -105.1069
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1CDA",
                        "location": {
                            "lat": 38.7381,
                            "lon": -104.6414
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A921C",
                        "location": {
                            "lat": 38.4321,
                            "lon": -90.3896
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4AD0",
                        "location": {
                            "lat": 40.4953,
                            "lon": -111.9439
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A822F",
                        "location": {
                            "lat": 32.7003,
                            "lon": -97.6086
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8D79",
                        "location": {
                            "lat": 42.1988,
                            "lon": -83.0231
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B24093E7",
                        "location": {
                            "lat": 40.0146,
                            "lon": -75.7136
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6F90",
                        "location": {
                            "lat": 33.8665,
                            "lon": -118.0668
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7C67",
                        "location": {
                            "lat": 43.5784,
                            "lon": -116.2179
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5FCA",
                        "location": {
                            "lat": 37.2599,
                            "lon": -121.9171
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5405",
                        "location": {
                            "lat": 40.7609,
                            "lon": -73.9115
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5C20",
                        "location": {
                            "lat": 39.5272,
                            "lon": -119.9129
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1F4C",
                        "location": {
                            "lat": 35.1212,
                            "lon": -85.3034
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8277",
                        "location": {
                            "lat": 37.6261,
                            "lon": -122.4304
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2311",
                        "location": {
                            "lat": 42.3155,
                            "lon": -85.5128
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240AF14",
                        "location": {
                            "lat": 38.4998,
                            "lon": -90.465
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2406A05",
                        "location": {
                            "lat": 39.336,
                            "lon": -84.3126
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A952A",
                        "location": {
                            "lat": 37.5659,
                            "lon": -122.3661
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA4FC",
                        "location": {
                            "lat": 33.6564,
                            "lon": -117.8245
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0CB4",
                        "location": {
                            "lat": 40.1262,
                            "lon": -75.5268
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7F13",
                        "location": {
                            "lat": 38.8121,
                            "lon": -94.534
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1490",
                        "location": {
                            "lat": 31.7899,
                            "lon": -106.3658
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1054",
                        "location": {
                            "lat": 41.0537,
                            "lon": -85.2513
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2053",
                        "location": {
                            "lat": 42.2967,
                            "lon": -85.2066
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A47EA",
                        "location": {
                            "lat": 18.3224,
                            "lon": -66.4091
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B11A",
                        "location": {
                            "lat": 40.8471,
                            "lon": -81.3877
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0DDB",
                        "location": {
                            "lat": 37.8994,
                            "lon": -122.1144
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3753",
                        "location": {
                            "lat": 39.5372,
                            "lon": -76.3605
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A593F",
                        "location": {
                            "lat": 44.4965,
                            "lon": -87.9266
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A11EB",
                        "location": {
                            "lat": 37.8994,
                            "lon": -122.1144
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5469",
                        "location": {
                            "lat": 42.6692,
                            "lon": -83.5895
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A27CC",
                        "location": {
                            "lat": 39.9714,
                            "lon": -86.1295
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A57E9",
                        "location": {
                            "lat": 39.7272,
                            "lon": -121.8129
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2409EB6",
                        "location": {
                            "lat": 33.7855,
                            "lon": -84.3612
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A45AF",
                        "location": {
                            "lat": 38.6438,
                            "lon": -77.3451
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5D64",
                        "location": {
                            "lat": 40.0538,
                            "lon": -86.1433
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAFBA",
                        "location": {
                            "lat": 33.6139,
                            "lon": -84.0657
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1BC1",
                        "location": {
                            "lat": 30.5089,
                            "lon": -97.6796
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B24093AB",
                        "location": {
                            "lat": 28.9108,
                            "lon": -81.5248
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240ADB6",
                        "location": {
                            "lat": 39.6128,
                            "lon": -77.3991
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A92FA",
                        "location": {
                            "lat": 32.972,
                            "lon": -96.7914
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0FC0",
                        "location": {
                            "lat": 34.2745,
                            "lon": -88.3793
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA44F",
                        "location": {
                            "lat": 36.1085,
                            "lon": -86.7738
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B24075AD",
                        "location": {
                            "lat": 34.066,
                            "lon": -117.8928
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4D23",
                        "location": {
                            "lat": 29.7229,
                            "lon": -98.0742
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB1C8",
                        "location": {
                            "lat": 33.1177,
                            "lon": -96.6791
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A60C0",
                        "location": {
                            "lat": 38.635,
                            "lon": -76.882
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0DFB",
                        "location": {
                            "lat": 41.8764,
                            "lon": -87.6133
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240AF0B",
                        "location": {
                            "lat": 41.136,
                            "lon": -73.406
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A36D3",
                        "location": {
                            "lat": 39.4895,
                            "lon": -104.8447
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3D3C",
                        "location": {
                            "lat": 44.9048,
                            "lon": -97.1243
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7EC6",
                        "location": {
                            "lat": 41.4425,
                            "lon": -82.7011
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7EF7",
                        "location": {
                            "lat": 42.216,
                            "lon": -88.0771
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A25E5",
                        "location": {
                            "lat": 33.3124,
                            "lon": -111.9195
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A19C6",
                        "location": {
                            "lat": 44.6707,
                            "lon": -93.2588
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1876",
                        "location": {
                            "lat": 30.6293,
                            "lon": -97.6687
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6BD5",
                        "location": {
                            "lat": 41.8764,
                            "lon": -87.6133
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2818",
                        "location": {
                            "lat": 38.9523,
                            "lon": -94.7395
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7F9D",
                        "location": {
                            "lat": 33.2752,
                            "lon": -111.7082
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2DE1",
                        "location": {
                            "lat": 36.3834,
                            "lon": -86.4512
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6A47",
                        "location": {
                            "lat": 41.7088,
                            "lon": -83.6053
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6A5F",
                        "location": {
                            "lat": 39.9122,
                            "lon": -80.7295
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB054",
                        "location": {
                            "lat": 36.6434,
                            "lon": -76.242
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1E24",
                        "location": {
                            "lat": 42.2789,
                            "lon": -85.6904
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A91E6",
                        "location": {
                            "lat": 41.6435,
                            "lon": -91.5685
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6A87",
                        "location": {
                            "lat": 45.5496,
                            "lon": -122.8293
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6233",
                        "location": {
                            "lat": 43.014,
                            "lon": -88.2783
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0B34",
                        "location": {
                            "lat": 43.0026,
                            "lon": -87.9417
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA867",
                        "location": {
                            "lat": 33.3963,
                            "lon": -84.5689
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB71B",
                        "location": {
                            "lat": 34.7095,
                            "lon": -86.7361
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A687F",
                        "location": {
                            "lat": 40.3496,
                            "lon": -74.2849
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8E3B",
                        "location": {
                            "lat": 41.85,
                            "lon": -87.7165
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6F27",
                        "location": {
                            "lat": 34.6174,
                            "lon": -86.5538
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6AA9",
                        "location": {
                            "lat": 48.0589,
                            "lon": -122.1579
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A307B",
                        "location": {
                            "lat": 39.3773,
                            "lon": -74.6123
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD59A",
                        "location": {
                            "lat": 40.0142,
                            "lon": -105.2853
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9F30",
                        "location": {
                            "lat": 43.5196,
                            "lon": -94.0995
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD347",
                        "location": {
                            "lat": 35.7965,
                            "lon": -78.7981
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3F1C",
                        "location": {
                            "lat": 35.141,
                            "lon": -106.711
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A40DC",
                        "location": {
                            "lat": 41.1389,
                            "lon": -81.8629
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA52F",
                        "location": {
                            "lat": 39.5992,
                            "lon": -86.13
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ABB33",
                        "location": {
                            "lat": 49.0745,
                            "lon": -121.9826
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7C8C",
                        "location": {
                            "lat": 28.3907,
                            "lon": -80.7851
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B515",
                        "location": {
                            "lat": 35.4875,
                            "lon": -80.9876
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240A38C",
                        "location": {
                            "lat": 28.5274,
                            "lon": -81.6012
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4C8F",
                        "location": {
                            "lat": 42.3816,
                            "lon": -88.0026
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3417",
                        "location": {
                            "lat": 45.7168,
                            "lon": -122.6899
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A139C",
                        "location": {
                            "lat": 35.3991,
                            "lon": -80.5584
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B24098F2",
                        "location": {
                            "lat": 42.6734,
                            "lon": -82.7736
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7F8E",
                        "location": {
                            "lat": 14.1479,
                            "lon": 121.4975
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6CFA",
                        "location": {
                            "lat": 43.0801,
                            "lon": -77.6342
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A441F",
                        "location": {
                            "lat": 40.0797,
                            "lon": -104.9307
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ADAAA",
                        "location": {
                            "lat": 36.7323,
                            "lon": -76.0363
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A63AF",
                        "location": {
                            "lat": 44.3456,
                            "lon": -88.4343
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA73C",
                        "location": {
                            "lat": 40.6368,
                            "lon": -74.3727
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B033",
                        "location": {
                            "lat": 28.5531,
                            "lon": -81.7597
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6085",
                        "location": {
                            "lat": 33.8621,
                            "lon": -84.4198
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A73D3",
                        "location": {
                            "lat": 42.4337,
                            "lon": -71.4568
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3C97",
                        "location": {
                            "lat": 34.7518,
                            "lon": -82.2556
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2CE8",
                        "location": {
                            "lat": 42.8003,
                            "lon": -85.7093
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A43DA",
                        "location": {
                            "lat": 39.2514,
                            "lon": -76.7979
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A812F",
                        "location": {
                            "lat": 45.0196,
                            "lon": -93.2402
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2B59",
                        "location": {
                            "lat": 40.0359,
                            "lon": -75.145
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB13E",
                        "location": {
                            "lat": 41.6538,
                            "lon": -86.1631
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A43BA",
                        "location": {
                            "lat": 28.1389,
                            "lon": -82.7498
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6B03",
                        "location": {
                            "lat": 40.1533,
                            "lon": -74.9937
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A42F5",
                        "location": {
                            "lat": 34.3975,
                            "lon": -118.5568
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A68A8",
                        "location": {
                            "lat": 26.7165,
                            "lon": -80.0679
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A79C9",
                        "location": {
                            "lat": 36.7539,
                            "lon": -119.7085
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5C0F",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2C64",
                        "location": {
                            "lat": 43.0034,
                            "lon": -73.842
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A20A3",
                        "location": {
                            "lat": 39.7668,
                            "lon": -86.4013
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0CE9",
                        "location": {
                            "lat": 47.6131,
                            "lon": -122.2053
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A81B4",
                        "location": {
                            "lat": 40.2459,
                            "lon": -74.2813
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6C08",
                        "location": {
                            "lat": 35.1712,
                            "lon": -80.7939
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AC130",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A79A7",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A98CB",
                        "location": {
                            "lat": 42.5278,
                            "lon": -71.104
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5626",
                        "location": {
                            "lat": 40.3969,
                            "lon": -111.7919
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1380",
                        "location": {
                            "lat": 47.5579,
                            "lon": -122.1633
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A71A9",
                        "location": {
                            "lat": 44.5563,
                            "lon": -72.4871
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5B0D",
                        "location": {
                            "lat": 38.7048,
                            "lon": -90.4617
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240997B",
                        "location": {
                            "lat": 41.9778,
                            "lon": -88.2018
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA537",
                        "location": {
                            "lat": 41.7448,
                            "lon": -87.9819
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4358",
                        "location": {
                            "lat": 39.1963,
                            "lon": -86.5776
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A768E",
                        "location": {
                            "lat": 33.5385,
                            "lon": -82.1408
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A76C9",
                        "location": {
                            "lat": 36.2709,
                            "lon": -115.28
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAA32",
                        "location": {
                            "lat": 40.8501,
                            "lon": -81.2583
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4FBB",
                        "location": {
                            "lat": 27.543,
                            "lon": -82.5602
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6C4F",
                        "location": {
                            "lat": 42.8596,
                            "lon": -71.6147
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2D27",
                        "location": {
                            "lat": 37.7558,
                            "lon": -121.9527
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4BA1",
                        "location": {
                            "lat": 32.8466,
                            "lon": -116.977
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1809",
                        "location": {
                            "lat": 27.6776,
                            "lon": -97.3651
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA455",
                        "location": {
                            "lat": 38.9258,
                            "lon": -77.3939
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240670A",
                        "location": {
                            "lat": 29.5542,
                            "lon": -95.7325
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8467",
                        "location": {
                            "lat": 42.2831,
                            "lon": -71.7237
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A48A1",
                        "location": {
                            "lat": 38.8574,
                            "lon": -77.1
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2400200",
                        "location": {
                            "lat": 43.2207,
                            "lon": -77.5992
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A33E3",
                        "location": {
                            "lat": 39.0518,
                            "lon": -94.4046
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B975",
                        "location": {
                            "lat": 42.9896,
                            "lon": -88.0876
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4D43",
                        "location": {
                            "lat": 42.4638,
                            "lon": -123.3464
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1B46",
                        "location": {
                            "lat": 36.0344,
                            "lon": -114.9705
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ABB28",
                        "location": {
                            "lat": 33.8358,
                            "lon": -117.9063
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A443F",
                        "location": {
                            "lat": 49.1049,
                            "lon": -122.824
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A71E4",
                        "location": {
                            "lat": 42.2325,
                            "lon": -83.6336
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7AE5",
                        "location": {
                            "lat": 33.4666,
                            "lon": -84.4763
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAB74",
                        "location": {
                            "lat": 40.2584,
                            "lon": -111.6591
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A95E5",
                        "location": {
                            "lat": 38.1308,
                            "lon": -121.3345
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AC5AD",
                        "location": {
                            "lat": 30.6551,
                            "lon": -91.1366
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A82F7",
                        "location": {
                            "lat": 32.5484,
                            "lon": -85.4682
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A63CD",
                        "location": {
                            "lat": 29.8097,
                            "lon": -82.4675
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0713",
                        "location": {
                            "lat": 43.2343,
                            "lon": -88.2311
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3A19",
                        "location": {
                            "lat": 40.9666,
                            "lon": -81.4185
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4314",
                        "location": {
                            "lat": 40.4444,
                            "lon": -86.9256
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240011C",
                        "location": {
                            "lat": 35.7178,
                            "lon": -78.8428
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A58E1",
                        "location": {
                            "lat": 47.6276,
                            "lon": -122.6431
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9701",
                        "location": {
                            "lat": 33.933,
                            "lon": -84.604
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD241",
                        "location": {
                            "lat": 35.7965,
                            "lon": -78.7981
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A576C",
                        "location": {
                            "lat": 33.2487,
                            "lon": -111.6343
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7AA4",
                        "location": {
                            "lat": 18.3861,
                            "lon": -66.0434
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2325",
                        "location": {
                            "lat": 37.1538,
                            "lon": -76.539
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A17B1",
                        "location": {
                            "lat": 41.0854,
                            "lon": -111.9682
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A10A4",
                        "location": {
                            "lat": 25.8532,
                            "lon": -80.1797
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A013D",
                        "location": {
                            "lat": 32.7003,
                            "lon": -97.6086
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5CF9",
                        "location": {
                            "lat": 29.9641,
                            "lon": -95.4968
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A193C",
                        "location": {
                            "lat": 34.0014,
                            "lon": -84.0144
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB0E9",
                        "location": {
                            "lat": 37.8994,
                            "lon": -122.1144
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A33F2",
                        "location": {
                            "lat": 33.9955,
                            "lon": -84.6581
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0F65",
                        "location": {
                            "lat": 33.8351,
                            "lon": -117.8652
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9670",
                        "location": {
                            "lat": 35.6598,
                            "lon": -83.9867
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAF1D",
                        "location": {
                            "lat": 41.7527,
                            "lon": -71.5659
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2B2A",
                        "location": {
                            "lat": 35.1796,
                            "lon": -80.8459
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0A62",
                        "location": {
                            "lat": 37.2995,
                            "lon": -121.7578
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ABA1E",
                        "location": {
                            "lat": 47.1112,
                            "lon": -122.5897
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A80CF",
                        "location": {
                            "lat": 35.6828,
                            "lon": -78.5977
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9121",
                        "location": {
                            "lat": 30.0529,
                            "lon": -95.1783
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5BE3",
                        "location": {
                            "lat": 40.8859,
                            "lon": -81.5734
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240A9EF",
                        "location": {
                            "lat": 34.1078,
                            "lon": -84.5026
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2220",
                        "location": {
                            "lat": 29.9762,
                            "lon": -95.6401
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B24075A6",
                        "location": {
                            "lat": 40.3869,
                            "lon": -74.5558
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3DAF",
                        "location": {
                            "lat": 36.8272,
                            "lon": -119.6805
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA202",
                        "location": {
                            "lat": 45.5563,
                            "lon": -93.2836
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A48D6",
                        "location": {
                            "lat": 30.4548,
                            "lon": -97.7664
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6754",
                        "location": {
                            "lat": 38.6101,
                            "lon": -90.56
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9C8C",
                        "location": {
                            "lat": 34.1211,
                            "lon": -117.4362
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6739",
                        "location": {
                            "lat": 40.8088,
                            "lon": -73.9195
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2B1D",
                        "location": {
                            "lat": 43.093,
                            "lon": -78.9635
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7C60",
                        "location": {
                            "lat": 28.7935,
                            "lon": -81.2868
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7458",
                        "location": {
                            "lat": 42.6734,
                            "lon": -82.7736
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A648A",
                        "location": {
                            "lat": 30.0106,
                            "lon": -95.4498
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A41F4",
                        "location": {
                            "lat": 43.0334,
                            "lon": -89.4512
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB0D4",
                        "location": {
                            "lat": 40.3495,
                            "lon": -111.8998
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8D7A",
                        "location": {
                            "lat": 33.1955,
                            "lon": -117.2862
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A37F8",
                        "location": {
                            "lat": 36.0432,
                            "lon": -95.8072
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3822",
                        "location": {
                            "lat": 34.2037,
                            "lon": -84.1031
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD6B1",
                        "location": {
                            "lat": 39.9206,
                            "lon": -75.1826
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B577",
                        "location": {
                            "lat": 29.6285,
                            "lon": -98.437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A08F5",
                        "location": {
                            "lat": 33.8744,
                            "lon": -117.8565
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9D7B",
                        "location": {
                            "lat": 42.0508,
                            "lon": -72.5672
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240AA6A",
                        "location": {
                            "lat": 29.9284,
                            "lon": -90.3685
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3BED",
                        "location": {
                            "lat": 42.1845,
                            "lon": -88.3266
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD06B",
                        "location": {
                            "lat": 47.1037,
                            "lon": -122.3235
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B7FA",
                        "location": {
                            "lat": 26.0703,
                            "lon": -80.2248
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A12D5",
                        "location": {
                            "lat": 33.8775,
                            "lon": -84.5017
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A39BC",
                        "location": {
                            "lat": 29.572,
                            "lon": -95.54
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9374",
                        "location": {
                            "lat": 33.4294,
                            "lon": -112.3896
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8869",
                        "location": {
                            "lat": 29.8203,
                            "lon": -95.4256
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5A90",
                        "location": {
                            "lat": 36.7539,
                            "lon": -119.7085
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAB5B",
                        "location": {
                            "lat": 40.1306,
                            "lon": -104.9504
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A117F",
                        "location": {
                            "lat": 33.0036,
                            "lon": -96.8834
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A522C",
                        "location": {
                            "lat": 39.2454,
                            "lon": -84.2537
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9BAE",
                        "location": {
                            "lat": 33.0225,
                            "lon": -96.729
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A351E",
                        "location": {
                            "lat": 36.6434,
                            "lon": -76.242
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240ACD8",
                        "location": {
                            "lat": 33.9955,
                            "lon": -84.6581
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7862",
                        "location": {
                            "lat": 42.3667,
                            "lon": -88.0925
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2388",
                        "location": {
                            "lat": 35.2137,
                            "lon": -81.122
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A67D1",
                        "location": {
                            "lat": 29.3491,
                            "lon": -98.1147
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3B8D",
                        "location": {
                            "lat": 38.763,
                            "lon": -90.5474
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A09E2",
                        "location": {
                            "lat": 40.1636,
                            "lon": -111.5998
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7536",
                        "location": {
                            "lat": 25.2633,
                            "lon": 55.3087
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB001",
                        "location": {
                            "lat": 48.0589,
                            "lon": -122.1579
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA5F2",
                        "location": {
                            "lat": 38.9683,
                            "lon": -95.2695
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A32DA",
                        "location": {
                            "lat": 33.338,
                            "lon": -111.7435
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5525",
                        "location": {
                            "lat": 34.1416,
                            "lon": -80.8886
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAC08",
                        "location": {
                            "lat": 40.65,
                            "lon": -112.0061
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA222",
                        "location": {
                            "lat": 33.9794,
                            "lon": -84.3459
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A443B",
                        "location": {
                            "lat": 39.8401,
                            "lon": -105.0027
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A90CE",
                        "location": {
                            "lat": 33.1909,
                            "lon": -96.6198
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4E91",
                        "location": {
                            "lat": 33.9733,
                            "lon": -84.2231
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9574",
                        "location": {
                            "lat": 28.2238,
                            "lon": -82.4549
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A38A6",
                        "location": {
                            "lat": 33.1494,
                            "lon": -96.828
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2B71",
                        "location": {
                            "lat": 34.0624,
                            "lon": -117.1676
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ACC6B",
                        "location": {
                            "lat": 34.9274,
                            "lon": -82.3186
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAF35",
                        "location": {
                            "lat": 45.0027,
                            "lon": -93.4881
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A226A",
                        "location": {
                            "lat": 42.5655,
                            "lon": -83.3783
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9B73",
                        "location": {
                            "lat": 36.1876,
                            "lon": -86.6119
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA1B7",
                        "location": {
                            "lat": 38.9201,
                            "lon": -94.3999
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAAD2",
                        "location": {
                            "lat": 42.518,
                            "lon": -83.1576
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8A88",
                        "location": {
                            "lat": 37.3698,
                            "lon": -121.816
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A692A",
                        "location": {
                            "lat": 43.5951,
                            "lon": -116.5312
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB166",
                        "location": {
                            "lat": 41.46,
                            "lon": -82.1748
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA9E0",
                        "location": {
                            "lat": 33.3322,
                            "lon": -111.9942
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0F5B",
                        "location": {
                            "lat": 38.329,
                            "lon": -76.4701
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A531F",
                        "location": {
                            "lat": 58.3628,
                            "lon": -134.5294
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD920",
                        "location": {
                            "lat": 38.4687,
                            "lon": -107.88
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5D4D",
                        "location": {
                            "lat": 33.9075,
                            "lon": -117.7866
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A064F",
                        "location": {
                            "lat": 32.2603,
                            "lon": -95.5417
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA9F6",
                        "location": {
                            "lat": 40.595,
                            "lon": -75.5289
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A91D0",
                        "location": {
                            "lat": 29.7229,
                            "lon": -98.0742
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ACF41",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ADB49",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD252",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8BC6",
                        "location": {
                            "lat": 45.3788,
                            "lon": -122.2215
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5D89",
                        "location": {
                            "lat": 30.6623,
                            "lon": -96.3349
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A65CF",
                        "location": {
                            "lat": 45.7636,
                            "lon": -122.8975
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2205",
                        "location": {
                            "lat": 38.8184,
                            "lon": -77.6202
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7C72",
                        "location": {
                            "lat": 36.5037,
                            "lon": -87.2729
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD4C5",
                        "location": {
                            "lat": 35.115,
                            "lon": -80.7061
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA35E",
                        "location": {
                            "lat": 47.6722,
                            "lon": -122.1257
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAC73",
                        "location": {
                            "lat": 33.5629,
                            "lon": -112.0519
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A294D",
                        "location": {
                            "lat": 39.1585,
                            "lon": -77.0837
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A89E7",
                        "location": {
                            "lat": 38.719,
                            "lon": -77.7416
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1F63",
                        "location": {
                            "lat": 29.6138,
                            "lon": -82.386
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB25E",
                        "location": {
                            "lat": 28.3774,
                            "lon": -81.1888
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ABE0B",
                        "location": {
                            "lat": 34.0121,
                            "lon": -117.6883
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8AC3",
                        "location": {
                            "lat": 30.5201,
                            "lon": -83.897
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9A43",
                        "location": {
                            "lat": 47.6109,
                            "lon": -122.3303
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3A72",
                        "location": {
                            "lat": 33.6268,
                            "lon": -117.8718
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6FB4",
                        "location": {
                            "lat": 43.0301,
                            "lon": -86.1865
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A246C",
                        "location": {
                            "lat": 37.4025,
                            "lon": -121.866
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A234C",
                        "location": {
                            "lat": 40.8123,
                            "lon": -73.9682
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A779D",
                        "location": {
                            "lat": 32.9628,
                            "lon": -96.3648
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A41DE",
                        "location": {
                            "lat": 41.151,
                            "lon": -85.125
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A537C",
                        "location": {
                            "lat": 42.5258,
                            "lon": -94.5262
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3E8C",
                        "location": {
                            "lat": 42.9656,
                            "lon": -85.65
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A479B",
                        "location": {
                            "lat": 27.7731,
                            "lon": -82.4088
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5DC1",
                        "location": {
                            "lat": 29.572,
                            "lon": -95.54
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240CB4D",
                        "location": {
                            "lat": 35.2436,
                            "lon": -91.7313
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A20FD",
                        "location": {
                            "lat": 43.4375,
                            "lon": -85.1433
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4436",
                        "location": {
                            "lat": 39.8704,
                            "lon": -86.2166
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3E99",
                        "location": {
                            "lat": 30.3122,
                            "lon": -81.7243
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3666",
                        "location": {
                            "lat": 30.0822,
                            "lon": -81.5498
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A62B7",
                        "location": {
                            "lat": 41.946,
                            "lon": -87.7033
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B24097AF",
                        "location": {
                            "lat": 29.7388,
                            "lon": -95.8309
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA583",
                        "location": {
                            "lat": 28.5274,
                            "lon": -81.6012
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA069",
                        "location": {
                            "lat": 47.6459,
                            "lon": -122.3995
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8AF2",
                        "location": {
                            "lat": 33.6748,
                            "lon": -117.9089
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2407F63",
                        "location": {
                            "lat": 28.1412,
                            "lon": -82.5931
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8B49",
                        "location": {
                            "lat": 39.4895,
                            "lon": -104.8447
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6F15",
                        "location": {
                            "lat": 40.3869,
                            "lon": -82.4901
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8AFC",
                        "location": {
                            "lat": 37.7642,
                            "lon": -122.3993
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6A60",
                        "location": {
                            "lat": 36.5037,
                            "lon": -87.2729
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240A741",
                        "location": {
                            "lat": 34.0782,
                            "lon": -84.2281
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2D8B",
                        "location": {
                            "lat": 47.5364,
                            "lon": -122.278
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7271",
                        "location": {
                            "lat": 41.9661,
                            "lon": -72.2899
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4BDC",
                        "location": {
                            "lat": 46.3521,
                            "lon": -94.1046
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3EB4",
                        "location": {
                            "lat": 29.7026,
                            "lon": -98.4759
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1C6E",
                        "location": {
                            "lat": 35.2916,
                            "lon": -80.8201
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9A8A",
                        "location": {
                            "lat": 40.7143,
                            "lon": -111.8894
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A31E3",
                        "location": {
                            "lat": 35.8677,
                            "lon": -86.4174
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7D50",
                        "location": {
                            "lat": 27.7207,
                            "lon": -97.4127
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ABEDC",
                        "location": {
                            "lat": 40.0345,
                            "lon": -75.1193
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAC8E",
                        "location": {
                            "lat": 27.7045,
                            "lon": -82.4338
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A313E",
                        "location": {
                            "lat": 45.0139,
                            "lon": -93.1545
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8BC8",
                        "location": {
                            "lat": 33.7485,
                            "lon": -84.3871
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2400486",
                        "location": {
                            "lat": 40.175,
                            "lon": -76.1817
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240A6DD",
                        "location": {
                            "lat": 37.353,
                            "lon": -79.1557
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240ADED",
                        "location": {
                            "lat": 39.7923,
                            "lon": -85.9781
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2401428",
                        "location": {
                            "lat": 41.0799,
                            "lon": -112.0481
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7710",
                        "location": {
                            "lat": 42.3315,
                            "lon": -83.3425
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240A676",
                        "location": {
                            "lat": 42.8984,
                            "lon": -85.7223
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA87D",
                        "location": {
                            "lat": 41.864,
                            "lon": -88.0671
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8ECE",
                        "location": {
                            "lat": 35.0125,
                            "lon": -80.9309
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240A559",
                        "location": {
                            "lat": 33.1909,
                            "lon": -96.6198
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A05D6",
                        "location": {
                            "lat": 36.2337,
                            "lon": -83.8451
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0E3E",
                        "location": {
                            "lat": 40.3172,
                            "lon": -74.4304
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1CF2",
                        "location": {
                            "lat": 33.1452,
                            "lon": -97.0699
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB563",
                        "location": {
                            "lat": 34.2319,
                            "lon": -84.1627
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A67E6",
                        "location": {
                            "lat": -27.4679,
                            "lon": 153.0325
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1382",
                        "location": {
                            "lat": 36.8902,
                            "lon": -89.5826
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5614",
                        "location": {
                            "lat": 38.8976,
                            "lon": -77.5109
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7011",
                        "location": {
                            "lat": 33.8654,
                            "lon": -84.3385
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AC438",
                        "location": {
                            "lat": 38.7893,
                            "lon": -104.8221
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5B28",
                        "location": {
                            "lat": 37.0142,
                            "lon": -93.1986
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB19F",
                        "location": {
                            "lat": 34.1413,
                            "lon": -118.6599
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6F57",
                        "location": {
                            "lat": 41.3054,
                            "lon": -73.1217
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1FC8",
                        "location": {
                            "lat": 28.2365,
                            "lon": -82.3289
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1C60",
                        "location": {
                            "lat": 41.0129,
                            "lon": -73.7559
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3007",
                        "location": {
                            "lat": 33.9721,
                            "lon": -84.4406
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4FA3",
                        "location": {
                            "lat": 41.3092,
                            "lon": -111.9659
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2616",
                        "location": {
                            "lat": 42.5138,
                            "lon": -82.9396
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9EF3",
                        "location": {
                            "lat": 41.8209,
                            "lon": -87.8515
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7EA3",
                        "location": {
                            "lat": 42.4248,
                            "lon": -83.1951
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AADF9",
                        "location": {
                            "lat": 27.9091,
                            "lon": -82.8028
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0C1E",
                        "location": {
                            "lat": 34.0014,
                            "lon": -84.0144
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B14D",
                        "location": {
                            "lat": 34.6923,
                            "lon": -82.2919
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4512",
                        "location": {
                            "lat": 40.2584,
                            "lon": -111.6591
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB9D9",
                        "location": {
                            "lat": 45.3102,
                            "lon": -122.967
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5D1C",
                        "location": {
                            "lat": 33.8608,
                            "lon": -98.489
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A595F",
                        "location": {
                            "lat": 38.8939,
                            "lon": -94.7067
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240C108",
                        "location": {
                            "lat": 28.0303,
                            "lon": -82.7816
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A877A",
                        "location": {
                            "lat": 44.9174,
                            "lon": -92.9478
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4E77",
                        "location": {
                            "lat": 29.9762,
                            "lon": -95.6401
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAE28",
                        "location": {
                            "lat": 35.0562,
                            "lon": -80.8194
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0402",
                        "location": {
                            "lat": 42.2789,
                            "lon": -85.6904
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B36F",
                        "location": {
                            "lat": 39.5992,
                            "lon": -86.13
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2AB5",
                        "location": {
                            "lat": 33.9449,
                            "lon": -117.3834
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8D22",
                        "location": {
                            "lat": 27.4055,
                            "lon": -82.3881
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6356",
                        "location": {
                            "lat": 35.1559,
                            "lon": -111.6825
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD08C",
                        "location": {
                            "lat": 34.1794,
                            "lon": -83.9016
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD099",
                        "location": {
                            "lat": 34.1211,
                            "lon": -117.4362
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2400AFD",
                        "location": {
                            "lat": 30.5875,
                            "lon": -97.8535
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3E61",
                        "location": {
                            "lat": 35.961,
                            "lon": -78.9291
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A65CE",
                        "location": {
                            "lat": 35.4145,
                            "lon": -119.0403
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8A73",
                        "location": {
                            "lat": 37.751,
                            "lon": -97.822
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B24065EB",
                        "location": {
                            "lat": 38.0389,
                            "lon": -122.5871
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5C64",
                        "location": {
                            "lat": 39.1256,
                            "lon": -84.5127
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1320",
                        "location": {
                            "lat": 37.9164,
                            "lon": -122.0668
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A709C",
                        "location": {
                            "lat": 32.9275,
                            "lon": -97.2512
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2399",
                        "location": {
                            "lat": 33.672,
                            "lon": -117.7402
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD0A4",
                        "location": {
                            "lat": 39.8294,
                            "lon": -104.9095
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7697",
                        "location": {
                            "lat": 41.3197,
                            "lon": -81.7538
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9614",
                        "location": {
                            "lat": 40.5084,
                            "lon": -111.8838
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0A39",
                        "location": {
                            "lat": 41.2846,
                            "lon": -73.8904
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2407732",
                        "location": {
                            "lat": 36.0908,
                            "lon": -76.6224
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A73BF",
                        "location": {
                            "lat": 36.0048,
                            "lon": -86.7886
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A475C",
                        "location": {
                            "lat": 41.4901,
                            "lon": -75.5334
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B24021AF",
                        "location": {
                            "lat": 43.7046,
                            "lon": -116.3583
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6815",
                        "location": {
                            "lat": 47.6722,
                            "lon": -122.1257
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2D56",
                        "location": {
                            "lat": 39.2909,
                            "lon": -76.6096
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0C3C",
                        "location": {
                            "lat": 26.3011,
                            "lon": -98.3601
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6BBA",
                        "location": {
                            "lat": 47.4758,
                            "lon": -122.6422
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ACCA0",
                        "location": {
                            "lat": 42.7893,
                            "lon": -83.7135
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A096A",
                        "location": {
                            "lat": 35.8964,
                            "lon": -78.7115
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A80B7",
                        "location": {
                            "lat": 38.5759,
                            "lon": -90.5167
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A48FC",
                        "location": {
                            "lat": 18.3861,
                            "lon": -66.0434
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4DF2",
                        "location": {
                            "lat": 41.8829,
                            "lon": -88.4587
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9A93",
                        "location": {
                            "lat": 34.6993,
                            "lon": -77.2079
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3F6B",
                        "location": {
                            "lat": 30.0529,
                            "lon": -95.1783
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A12F8",
                        "location": {
                            "lat": 38.6704,
                            "lon": -77.0117
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A37E5",
                        "location": {
                            "lat": 42.3649,
                            "lon": -71.0987
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240AE7E",
                        "location": {
                            "lat": 29.643,
                            "lon": -95.6443
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5BC6",
                        "location": {
                            "lat": 34.0861,
                            "lon": -83.784
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8E29",
                        "location": {
                            "lat": 33.9075,
                            "lon": -117.7866
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B4CA",
                        "location": {
                            "lat": 42.7686,
                            "lon": -86.117
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2406C50",
                        "location": {
                            "lat": 47.6276,
                            "lon": -122.6431
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3842",
                        "location": {
                            "lat": 35.2612,
                            "lon": -120.655
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB587",
                        "location": {
                            "lat": 33.5157,
                            "lon": -117.7109
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A86B9",
                        "location": {
                            "lat": 28.0823,
                            "lon": -82.7297
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A485D",
                        "location": {
                            "lat": 28.2733,
                            "lon": -81.1999
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7FCF",
                        "location": {
                            "lat": 41.7139,
                            "lon": -71.3895
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B24073FA",
                        "location": {
                            "lat": 29.7805,
                            "lon": -95.5129
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240C10A",
                        "location": {
                            "lat": 40.7279,
                            "lon": -105.035
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4051",
                        "location": {
                            "lat": 41.5696,
                            "lon": -81.2096
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A38A7",
                        "location": {
                            "lat": 40.0459,
                            "lon": -75.5307
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA864",
                        "location": {
                            "lat": 32.9103,
                            "lon": -96.7283
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4596",
                        "location": {
                            "lat": 25.8196,
                            "lon": -80.1378
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAFA8",
                        "location": {
                            "lat": 35.0644,
                            "lon": -89.6759
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB48F",
                        "location": {
                            "lat": 47.6298,
                            "lon": -117.3989
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5CC9",
                        "location": {
                            "lat": 34.11,
                            "lon": -117.2955
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2925",
                        "location": {
                            "lat": 39.0715,
                            "lon": -76.6963
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9068",
                        "location": {
                            "lat": 39.7318,
                            "lon": -104.9669
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9BF3",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9DA6",
                        "location": {
                            "lat": 41.8006,
                            "lon": -72.2466
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3337",
                        "location": {
                            "lat": 40.1922,
                            "lon": -75.4339
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8C25",
                        "location": {
                            "lat": 40.7898,
                            "lon": -74.1308
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ACF96",
                        "location": {
                            "lat": 33.0032,
                            "lon": -96.5434
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8B6E",
                        "location": {
                            "lat": 33.2109,
                            "lon": -117.2232
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7D09",
                        "location": {
                            "lat": 47.8388,
                            "lon": -122.1985
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA584",
                        "location": {
                            "lat": 34.9251,
                            "lon": -80.7278
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB55B",
                        "location": {
                            "lat": 29.1254,
                            "lon": -82.0076
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6B59",
                        "location": {
                            "lat": 40.4837,
                            "lon": -104.8994
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5E1D",
                        "location": {
                            "lat": 43.7831,
                            "lon": -123.0507
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A57B4",
                        "location": {
                            "lat": 34.4955,
                            "lon": -77.5546
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6DC3",
                        "location": {
                            "lat": 40.4252,
                            "lon": -79.6091
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A82D3",
                        "location": {
                            "lat": 37.7688,
                            "lon": -122.262
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0AE1",
                        "location": {
                            "lat": 40.5833,
                            "lon": -74.277
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3E89",
                        "location": {
                            "lat": 40.4725,
                            "lon": -79.9109
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B489",
                        "location": {
                            "lat": 41.8502,
                            "lon": -87.6736
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A526A",
                        "location": {
                            "lat": 29.9475,
                            "lon": -81.5264
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8D93",
                        "location": {
                            "lat": 26.2681,
                            "lon": -80.2092
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A18A3",
                        "location": {
                            "lat": 33.0809,
                            "lon": -96.7241
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2401E16",
                        "location": {
                            "lat": 32.9969,
                            "lon": -111.3612
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3780",
                        "location": {
                            "lat": 39.3385,
                            "lon": -120.1729
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A34D9",
                        "location": {
                            "lat": 40.0794,
                            "lon": -76.3141
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3796",
                        "location": {
                            "lat": 33.806,
                            "lon": -116.4624
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2401E63",
                        "location": {
                            "lat": 39.8726,
                            "lon": -86.2717
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ADA26",
                        "location": {
                            "lat": 37.7201,
                            "lon": -121.919
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A732A",
                        "location": {
                            "lat": 42.6563,
                            "lon": -83.1231
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5242",
                        "location": {
                            "lat": 40.2783,
                            "lon": -111.7198
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAE63",
                        "location": {
                            "lat": 32.9636,
                            "lon": -96.7468
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAD90",
                        "location": {
                            "lat": 36.033,
                            "lon": -80.3916
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A47D2",
                        "location": {
                            "lat": 35.8762,
                            "lon": -84.1746
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9231",
                        "location": {
                            "lat": 37.6652,
                            "lon": -121.8734
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3D4D",
                        "location": {
                            "lat": 40.6941,
                            "lon": -75.2904
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2409DD3",
                        "location": {
                            "lat": 39.1642,
                            "lon": -84.2356
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240AF2D",
                        "location": {
                            "lat": 34.9334,
                            "lon": -81.9689
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ABDE2",
                        "location": {
                            "lat": 35.5175,
                            "lon": -81.4578
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B125",
                        "location": {
                            "lat": 42.3455,
                            "lon": -83.0535
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA732",
                        "location": {
                            "lat": 34.8664,
                            "lon": -118.3409
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A444F",
                        "location": {
                            "lat": 40.3914,
                            "lon": -75.4842
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4A21",
                        "location": {
                            "lat": 37.0313,
                            "lon": -122.1198
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6713",
                        "location": {
                            "lat": 26.7165,
                            "lon": -80.0679
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A13F5",
                        "location": {
                            "lat": 40.0459,
                            "lon": -75.5307
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5585",
                        "location": {
                            "lat": 47.626,
                            "lon": -122.0404
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0C5C",
                        "location": {
                            "lat": 34.6054,
                            "lon": -92.6255
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5262",
                        "location": {
                            "lat": 40.0364,
                            "lon": -75.2219
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9D52",
                        "location": {
                            "lat": 42.518,
                            "lon": -83.1576
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2408FBC",
                        "location": {
                            "lat": 41.039,
                            "lon": -81.7381
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5E69",
                        "location": {
                            "lat": 38.3145,
                            "lon": -120.2648
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0098",
                        "location": {
                            "lat": 33.5157,
                            "lon": -117.7109
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2409C8C",
                        "location": {
                            "lat": 30.4522,
                            "lon": -95.71
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6422",
                        "location": {
                            "lat": 47.1435,
                            "lon": -122.1678
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8449",
                        "location": {
                            "lat": 33.893,
                            "lon": -83.9649
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B2FF",
                        "location": {
                            "lat": 34.8068,
                            "lon": -90.0096
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A461D",
                        "location": {
                            "lat": 40.9477,
                            "lon": -74.0672
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240BA2F",
                        "location": {
                            "lat": 30.0409,
                            "lon": -95.5302
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ABC91",
                        "location": {
                            "lat": 36.0557,
                            "lon": -90.52
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A83DC",
                        "location": {
                            "lat": 38.0082,
                            "lon": -122.2682
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5F9F",
                        "location": {
                            "lat": 31.2294,
                            "lon": -81.349
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9ECD",
                        "location": {
                            "lat": 47.7506,
                            "lon": -122.21
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8052",
                        "location": {
                            "lat": 33.9349,
                            "lon": -84.3922
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9CE4",
                        "location": {
                            "lat": 39.7067,
                            "lon": -104.9694
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2409BE1",
                        "location": {
                            "lat": 35.5831,
                            "lon": -78.7881
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7167",
                        "location": {
                            "lat": 29.7229,
                            "lon": -98.0742
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5B76",
                        "location": {
                            "lat": 40.2162,
                            "lon": -76.8664
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A172B",
                        "location": {
                            "lat": 44.8696,
                            "lon": -93.3266
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A224D",
                        "location": {
                            "lat": 25.6958,
                            "lon": -80.3626
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6A8B",
                        "location": {
                            "lat": 42.4945,
                            "lon": -71.0715
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7A43",
                        "location": {
                            "lat": 34.0544,
                            "lon": -118.244
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A40EC",
                        "location": {
                            "lat": 29.9475,
                            "lon": -81.5264
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A001A",
                        "location": {
                            "lat": 33.0032,
                            "lon": -96.5434
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A57F9",
                        "location": {
                            "lat": 40.9348,
                            "lon": -73.01
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAE06",
                        "location": {
                            "lat": 34.2644,
                            "lon": -78.0591
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240555B",
                        "location": {
                            "lat": 37.7562,
                            "lon": -121.77
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA8FD",
                        "location": {
                            "lat": 37.589,
                            "lon": -122.0461
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAFC1",
                        "location": {
                            "lat": 44.5542,
                            "lon": -69.6179
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A710F",
                        "location": {
                            "lat": 33.781,
                            "lon": -118.2622
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A555E",
                        "location": {
                            "lat": 33.7908,
                            "lon": -116.9801
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A223B",
                        "location": {
                            "lat": 39.4776,
                            "lon": -86.4668
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A43CF",
                        "location": {
                            "lat": 28.5464,
                            "lon": -81.2585
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2401C8F",
                        "location": {
                            "lat": 30.2133,
                            "lon": -97.8533
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2401537",
                        "location": {
                            "lat": 34.0114,
                            "lon": -85.2471
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5815",
                        "location": {
                            "lat": -26.1833,
                            "lon": 28.3167
                        }
                    },
                    {
                        "deviceId": "JA_RO2_CRL20SWYZEDJ2090023",
                        "location": {
                            "lat": 38.867,
                            "lon": -94.7094
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2905",
                        "location": {
                            "lat": 37.751,
                            "lon": -97.822
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2DCC",
                        "location": {
                            "lat": 38.881,
                            "lon": -77.1362
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A902B",
                        "location": {
                            "lat": 39.0015,
                            "lon": -77.0961
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5975",
                        "location": {
                            "lat": -26.3811,
                            "lon": 27.8376
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A05BE",
                        "location": {
                            "lat": 42.6821,
                            "lon": -71.1116
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9F46",
                        "location": {
                            "lat": 39.7424,
                            "lon": -84.3931
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A270B",
                        "location": {
                            "lat": 42.2578,
                            "lon": -89.0261
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A551E",
                        "location": {
                            "lat": 41.2854,
                            "lon": -96.1494
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A76D1",
                        "location": {
                            "lat": 45.2929,
                            "lon": -122.7746
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB068",
                        "location": {
                            "lat": 34.1632,
                            "lon": -77.8723
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A83FA",
                        "location": {
                            "lat": 47.8388,
                            "lon": -122.1985
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240A3AA",
                        "location": {
                            "lat": 35.0848,
                            "lon": -89.8014
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A724B",
                        "location": {
                            "lat": 40.0337,
                            "lon": -83.1319
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A26C3",
                        "location": {
                            "lat": 30.0931,
                            "lon": -97.8565
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A16FB",
                        "location": {
                            "lat": 41.0551,
                            "lon": -72.4289
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A966E",
                        "location": {
                            "lat": 44.5458,
                            "lon": -88.1019
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD389",
                        "location": {
                            "lat": 29.6865,
                            "lon": -95.4337
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A11CC",
                        "location": {
                            "lat": 53.6334,
                            "lon": -113.5239
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9823",
                        "location": {
                            "lat": 33.0199,
                            "lon": -97.213
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A14B8",
                        "location": {
                            "lat": 45.5288,
                            "lon": -122.6821
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2400193",
                        "location": {
                            "lat": 45.5173,
                            "lon": -122.6398
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA0A8",
                        "location": {
                            "lat": 40.8486,
                            "lon": -73.9929
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A92BB",
                        "location": {
                            "lat": 35.8846,
                            "lon": -78.6385
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B253",
                        "location": {
                            "lat": 35.3965,
                            "lon": -119.1268
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3380",
                        "location": {
                            "lat": 41.591,
                            "lon": -88.0484
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A938B",
                        "location": {
                            "lat": 32.8954,
                            "lon": -105.948
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6725",
                        "location": {
                            "lat": 29.5551,
                            "lon": -98.7442
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240ACE1",
                        "location": {
                            "lat": 41.7088,
                            "lon": -83.6053
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6467",
                        "location": {
                            "lat": 28.7935,
                            "lon": -81.2868
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AC2CF",
                        "location": {
                            "lat": 38.8585,
                            "lon": -104.7162
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3F42",
                        "location": {
                            "lat": -31.9474,
                            "lon": 115.8648
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6D74",
                        "location": {
                            "lat": 42.1124,
                            "lon": -87.979
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AABBD",
                        "location": {
                            "lat": 40.0746,
                            "lon": -88.1691
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240ADA0",
                        "location": {
                            "lat": 41.5194,
                            "lon": -71.277
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1FDE",
                        "location": {
                            "lat": 38.0704,
                            "lon": -78.9067
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5D8C",
                        "location": {
                            "lat": 45.5397,
                            "lon": -122.9638
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7038",
                        "location": {
                            "lat": 45.2377,
                            "lon": -93.2765
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240BF9D",
                        "location": {
                            "lat": 33.8229,
                            "lon": -84.3535
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5451",
                        "location": {
                            "lat": 40.5334,
                            "lon": -74.2099
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6E7E",
                        "location": {
                            "lat": 39.4436,
                            "lon": -104.8536
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A85B5",
                        "location": {
                            "lat": 32.9758,
                            "lon": -80.1869
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A65D8",
                        "location": {
                            "lat": 33.9243,
                            "lon": -117.6105
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A561B",
                        "location": {
                            "lat": 33.3054,
                            "lon": -111.7401
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7524",
                        "location": {
                            "lat": 40.986,
                            "lon": -75.2436
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA939",
                        "location": {
                            "lat": 36.803,
                            "lon": -76.2744
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9D01",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ABBBB",
                        "location": {
                            "lat": 33.4474,
                            "lon": -88.8205
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B514",
                        "location": {
                            "lat": 38.6624,
                            "lon": -86.916
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA585",
                        "location": {
                            "lat": 40.8449,
                            "lon": -81.7736
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0B3D",
                        "location": {
                            "lat": 34.1483,
                            "lon": -118.0016
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA92B",
                        "location": {
                            "lat": 33.8681,
                            "lon": -118.1831
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD428",
                        "location": {
                            "lat": 33.5768,
                            "lon": -112.2348
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B24095C4",
                        "location": {
                            "lat": 44.7603,
                            "lon": -85.618
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB3DD",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB57D",
                        "location": {
                            "lat": 34.1413,
                            "lon": -118.6599
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1D43",
                        "location": {
                            "lat": 39.8983,
                            "lon": -86.0115
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8F68",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2987",
                        "location": {
                            "lat": 33.2516,
                            "lon": -111.7006
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB984",
                        "location": {
                            "lat": 42.176,
                            "lon": -87.809
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A47DD",
                        "location": {
                            "lat": 33.9075,
                            "lon": -117.7866
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B01E",
                        "location": {
                            "lat": 47.4514,
                            "lon": -122.3437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5921",
                        "location": {
                            "lat": 35.1494,
                            "lon": -85.3384
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5E89",
                        "location": {
                            "lat": 36.1168,
                            "lon": -80.0837
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9BD0",
                        "location": {
                            "lat": 33.933,
                            "lon": -84.604
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2696",
                        "location": {
                            "lat": 34.2319,
                            "lon": -84.1627
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4B14",
                        "location": {
                            "lat": 37.751,
                            "lon": -97.822
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA2F6",
                        "location": {
                            "lat": 36.3519,
                            "lon": -94.2197
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240A543",
                        "location": {
                            "lat": 39.264,
                            "lon": -81.5332
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A96FC",
                        "location": {
                            "lat": 44.9174,
                            "lon": -92.9478
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A77AA",
                        "location": {
                            "lat": 38.4549,
                            "lon": -122.2564
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A122E",
                        "location": {
                            "lat": 38.9301,
                            "lon": -78.1887
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A41C3",
                        "location": {
                            "lat": 43.6502,
                            "lon": -116.4343
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3B71",
                        "location": {
                            "lat": 37.3698,
                            "lon": -121.816
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B24069E9",
                        "location": {
                            "lat": 27.8044,
                            "lon": -82.2759
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A98C9",
                        "location": {
                            "lat": 42.7273,
                            "lon": -73.6696
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A833F",
                        "location": {
                            "lat": 38.3456,
                            "lon": -122.6919
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A281E",
                        "location": {
                            "lat": 40.7064,
                            "lon": -73.9473
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A538F",
                        "location": {
                            "lat": 33.8137,
                            "lon": -117.2228
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD3AC",
                        "location": {
                            "lat": 61.1663,
                            "lon": -149.9575
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7991",
                        "location": {
                            "lat": 38.8868,
                            "lon": -94.8223
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0E13",
                        "location": {
                            "lat": 38.1774,
                            "lon": -85.5209
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4986",
                        "location": {
                            "lat": 46.8964,
                            "lon": -97.2156
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A90A8",
                        "location": {
                            "lat": 37.1658,
                            "lon": -93.4149
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A778C",
                        "location": {
                            "lat": 34.7569,
                            "lon": -84.7935
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A67EF",
                        "location": {
                            "lat": 39.9072,
                            "lon": -77.636
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A45CC",
                        "location": {
                            "lat": 40.8103,
                            "lon": -77.888
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB5BD",
                        "location": {
                            "lat": 30.4908,
                            "lon": -84.3158
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A696E",
                        "location": {
                            "lat": 43.0747,
                            "lon": -77.5181
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B5CF",
                        "location": {
                            "lat": 39.1503,
                            "lon": -89.4868
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3101",
                        "location": {
                            "lat": 42.4597,
                            "lon": -71.0638
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6C38",
                        "location": {
                            "lat": 34.1648,
                            "lon": -118.1515
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6695",
                        "location": {
                            "lat": 32.9475,
                            "lon": -96.4407
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7A5B",
                        "location": {
                            "lat": 33.1062,
                            "lon": -117.2947
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4DF3",
                        "location": {
                            "lat": 37.6624,
                            "lon": -97.3156
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A678C",
                        "location": {
                            "lat": 40.8514,
                            "lon": -96.7139
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2401FB2",
                        "location": {
                            "lat": 35.6598,
                            "lon": -83.9867
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA133",
                        "location": {
                            "lat": 41.2535,
                            "lon": -87.8474
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2401B60",
                        "location": {
                            "lat": 28.0791,
                            "lon": -82.5245
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A74EB",
                        "location": {
                            "lat": 36.5686,
                            "lon": -82.1819
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3264",
                        "location": {
                            "lat": 39.7932,
                            "lon": -86.2132
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A78A6",
                        "location": {
                            "lat": 45.4407,
                            "lon": -122.7792
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB353",
                        "location": {
                            "lat": 38.783,
                            "lon": -90.6351
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ABFE1",
                        "location": {
                            "lat": 33.4306,
                            "lon": -111.9256
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A402E",
                        "location": {
                            "lat": 48.0132,
                            "lon": -122.0679
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A41CF",
                        "location": {
                            "lat": 25.7807,
                            "lon": -80.2952
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9B6A",
                        "location": {
                            "lat": 38.5648,
                            "lon": -77.2876
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1B0B",
                        "location": {
                            "lat": 38.8715,
                            "lon": -94.7713
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A342B",
                        "location": {
                            "lat": 39.2413,
                            "lon": -84.5455
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB0EA",
                        "location": {
                            "lat": 43.7282,
                            "lon": -111.9889
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1EA9",
                        "location": {
                            "lat": 40.2329,
                            "lon": -111.6688
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0ADB",
                        "location": {
                            "lat": 44.6552,
                            "lon": -68.8862
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4C55",
                        "location": {
                            "lat": 41.5852,
                            "lon": -87.8059
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAD32",
                        "location": {
                            "lat": 38.0052,
                            "lon": -84.423
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A6075",
                        "location": {
                            "lat": 34.0032,
                            "lon": -117.9617
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ADB12",
                        "location": {
                            "lat": 32.3904,
                            "lon": -93.7117
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2409EC5",
                        "location": {
                            "lat": 30.9459,
                            "lon": -83.2496
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4668",
                        "location": {
                            "lat": 42.2316,
                            "lon": -83.2659
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A61DB",
                        "location": {
                            "lat": 25.6666,
                            "lon": -80.4036
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4809",
                        "location": {
                            "lat": 38.4555,
                            "lon": -77.4326
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4BC0",
                        "location": {
                            "lat": 43.9946,
                            "lon": -88.526
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0D12",
                        "location": {
                            "lat": 29.7388,
                            "lon": -95.8309
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A722D",
                        "location": {
                            "lat": 39.7318,
                            "lon": -104.9669
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5701",
                        "location": {
                            "lat": 37.9043,
                            "lon": -122.0584
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240A79C",
                        "location": {
                            "lat": 42.0753,
                            "lon": -80.0671
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B1BF",
                        "location": {
                            "lat": 41.6133,
                            "lon": -87.0446
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7D03",
                        "location": {
                            "lat": 39.8845,
                            "lon": -74.9067
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7FF1",
                        "location": {
                            "lat": 30.1223,
                            "lon": -81.3627
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240A804",
                        "location": {
                            "lat": 38.9523,
                            "lon": -94.7395
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A92C0",
                        "location": {
                            "lat": 30.2183,
                            "lon": -81.5621
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ADB2C",
                        "location": {
                            "lat": 39.0828,
                            "lon": -77.1674
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7657",
                        "location": {
                            "lat": 40.4551,
                            "lon": -74.4871
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A789D",
                        "location": {
                            "lat": 30.449,
                            "lon": -97.9669
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2407522",
                        "location": {
                            "lat": 30.3478,
                            "lon": -81.6493
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240A865",
                        "location": {
                            "lat": 38.867,
                            "lon": -94.7094
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2982",
                        "location": {
                            "lat": 39.8068,
                            "lon": -121.867
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A17BD",
                        "location": {
                            "lat": 42.4649,
                            "lon": -83.3684
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240778B",
                        "location": {
                            "lat": 33.7387,
                            "lon": -78.9762
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A535F",
                        "location": {
                            "lat": 33.9243,
                            "lon": -117.6105
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AB608",
                        "location": {
                            "lat": 34.2648,
                            "lon": -86.9073
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0B4D",
                        "location": {
                            "lat": 40.3119,
                            "lon": -111.6959
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7215",
                        "location": {
                            "lat": 32.7097,
                            "lon": -117.1228
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8C0C",
                        "location": {
                            "lat": 21.4254,
                            "lon": -157.8138
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A66CC",
                        "location": {
                            "lat": 38.0709,
                            "lon": -92.4747
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A36A8",
                        "location": {
                            "lat": 35.2703,
                            "lon": -101.943
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3C68",
                        "location": {
                            "lat": 30.5478,
                            "lon": -96.2715
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8833",
                        "location": {
                            "lat": 37.7506,
                            "lon": -122.4121
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8445",
                        "location": {
                            "lat": 41.6558,
                            "lon": -88.2203
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240A5F9",
                        "location": {
                            "lat": 44.8999,
                            "lon": -93.8818
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7D31",
                        "location": {
                            "lat": 47.1016,
                            "lon": -123.0591
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A11D0",
                        "location": {
                            "lat": 40.3308,
                            "lon": -88.9816
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A82B4",
                        "location": {
                            "lat": 29.6654,
                            "lon": -95.7245
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A9A0F",
                        "location": {
                            "lat": 42.88,
                            "lon": -73.9913
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A77EF",
                        "location": {
                            "lat": 40.1094,
                            "lon": -76.5131
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A279C",
                        "location": {
                            "lat": 33.9553,
                            "lon": -117.2457
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1065",
                        "location": {
                            "lat": 36.2337,
                            "lon": -83.8451
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A12CD",
                        "location": {
                            "lat": 28.1822,
                            "lon": -80.6117
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240A79D",
                        "location": {
                            "lat": 33.014,
                            "lon": -80.1722
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240996E",
                        "location": {
                            "lat": 32.9522,
                            "lon": -96.6654
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA9AC",
                        "location": {
                            "lat": 41.4939,
                            "lon": -73.0517
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A0F47",
                        "location": {
                            "lat": 45.5722,
                            "lon": -94.2042
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B24023C6",
                        "location": {
                            "lat": 35.3352,
                            "lon": -97.4789
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B506",
                        "location": {
                            "lat": 28.7935,
                            "lon": -81.2868
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A699C",
                        "location": {
                            "lat": 28.4986,
                            "lon": -81.5353
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8217",
                        "location": {
                            "lat": 34.2664,
                            "lon": -77.8614
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3188",
                        "location": {
                            "lat": 40.3942,
                            "lon": -111.8483
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AD2F9",
                        "location": {
                            "lat": 32.3736,
                            "lon": -86.1833
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAC15",
                        "location": {
                            "lat": 36.1472,
                            "lon": -115.1175
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A764E",
                        "location": {
                            "lat": 39.8996,
                            "lon": -86.1692
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A1CF1",
                        "location": {
                            "lat": 49.8882,
                            "lon": -97.1794
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B24068E5",
                        "location": {
                            "lat": 41.9511,
                            "lon": -71.413
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5203",
                        "location": {
                            "lat": 39.7697,
                            "lon": -89.6886
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A5C9B",
                        "location": {
                            "lat": 47.8388,
                            "lon": -122.1985
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ABDA0",
                        "location": {
                            "lat": 35.324,
                            "lon": -106.7099
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B2405952",
                        "location": {
                            "lat": 42.6689,
                            "lon": -71.5934
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7AD7",
                        "location": {
                            "lat": 36.0014,
                            "lon": -83.9125
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ADA1C",
                        "location": {
                            "lat": 39.5884,
                            "lon": -105.0776
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7B56",
                        "location": {
                            "lat": 41.0631,
                            "lon": -74.1437
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAD39",
                        "location": {
                            "lat": 40.6673,
                            "lon": -73.4593
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240AAE0",
                        "location": {
                            "lat": 34.5392,
                            "lon": -93.0653
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8AF0",
                        "location": {
                            "lat": 33.8206,
                            "lon": -84.0229
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2CC0",
                        "location": {
                            "lat": 44.7126,
                            "lon": -92.859
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AA6C8",
                        "location": {
                            "lat": 39.2368,
                            "lon": -77.2775
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B240B79F",
                        "location": {
                            "lat": 36.3066,
                            "lon": -86.6101
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A424F",
                        "location": {
                            "lat": 38.9411,
                            "lon": -84.7185
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A002B",
                        "location": {
                            "lat": 34.2319,
                            "lon": -84.1627
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3E3F",
                        "location": {
                            "lat": 40.0574,
                            "lon": -75.4017
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7632",
                        "location": {
                            "lat": 47.8978,
                            "lon": -122.0693
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4B95",
                        "location": {
                            "lat": 41.0139,
                            "lon": -74.3353
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A996C",
                        "location": {
                            "lat": 37.5115,
                            "lon": -77.5662
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20AAE47",
                        "location": {
                            "lat": 36.6022,
                            "lon": -119.4378
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ABFC0",
                        "location": {
                            "lat": 33.3981,
                            "lon": -111.785
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A13A0",
                        "location": {
                            "lat": 34.111,
                            "lon": -84.3025
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A8E71",
                        "location": {
                            "lat": 35.8536,
                            "lon": -78.6262
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A785A",
                        "location": {
                            "lat": 37.0009,
                            "lon": 127.0859
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A7012",
                        "location": {
                            "lat": 32.8242,
                            "lon": -96.7507
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4012",
                        "location": {
                            "lat": 41.4481,
                            "lon": -82.0177
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20ABA7A",
                        "location": {
                            "lat": 31.5791,
                            "lon": -84.2138
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A4D34",
                        "location": {
                            "lat": 42.4337,
                            "lon": -71.4568
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2B23",
                        "location": {
                            "lat": 28.1951,
                            "lon": -81.6062
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A2C3D",
                        "location": {
                            "lat": 41.9972,
                            "lon": -70.7408
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A36AB",
                        "location": {
                            "lat": 40.6832,
                            "lon": -76.2113
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A15C7",
                        "location": {
                            "lat": 47.6034,
                            "lon": -122.3414
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A3152",
                        "location": {
                            "lat": 43.238,
                            "lon": -87.9894
                        }
                    },
                    {
                        "deviceId": "JA_RO2_7C78B20A64EA",
                        "location": {
                            "lat": 39.4527,
                            "lon": -78.8926
                        }
                    }
                ],
                "total": 1,
                "current": 1,
                "hash": "1",
                "version": 1
            }
        }
    }
]