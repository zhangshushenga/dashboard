module.exports = [
  {
    // http://localhost:9527/dev-api/api/iot/upload_log/JA_RO2_CRL20SWYZEDJ2090037/list
    url: '/api/action/aggs_by_15m',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'message': 'Success',
        'data': {
          'series': [
            {
              'subKey': 'success',
              'seriesType': 'bar',
              'recordCount': [
                72,
                3735,
                3939,
                3248,
                3824,
                3417,
                3505,
                3048,
                3543,
                3107,
                3113,
                3333,
                3587,
                3092,
                3282,
                3219,
                3434,
                3066,
                2343
              ],
              'deviceCount': [
                66,
                2798,
                2964,
                2408,
                2783,
                2679,
                2660,
                2303,
                2795,
                2528,
                2505,
                2635,
                2959,
                2461,
                2638,
                2631,
                2806,
                2618,
                1974
              ],
              'yaxisIndex': 0
            },
            {
              'subKey': 'unknown',
              'seriesType': 'bar',
              'recordCount': [
                1,
                41,
                42,
                35,
                45,
                51,
                44,
                33,
                44,
                24,
                29,
                25,
                26,
                69,
                62,
                37,
                36,
                22,
                31
              ],
              'deviceCount': [
                1,
                26,
                24,
                21,
                28,
                20,
                19,
                19,
                21,
                14,
                13,
                13,
                16,
                19,
                15,
                19,
                19,
                13,
                22
              ],
              'yaxisIndex': 0
            },
            {
              'subKey': 'success action rate',
              'seriesType': 'line',
              'rate': [
                0.9863,
                0.9891,
                0.9894,
                0.9893,
                0.9883,
                0.9852,
                0.9876,
                0.9892,
                0.9877,
                0.9923,
                0.9907,
                0.9925,
                0.9928,
                0.9781,
                0.9814,
                0.9886,
                0.9896,
                0.9928,
                0.9869
              ],
              'yaxisIndex': 1
            },
            {
              'subKey': 'success device rate',
              'seriesType': 'line',
              'rate': [
                0.985,
                0.9907,
                0.9919,
                0.9913,
                0.99,
                0.9925,
                0.9929,
                0.9918,
                0.9925,
                0.9944,
                0.9948,
                0.995,
                0.9946,
                0.9923,
                0.9943,
                0.9928,
                0.9932,
                0.995,
                0.9889
              ],
              'yaxisIndex': 1
            }
          ],
          'legendData': [
            'success',
            'unknown',
            'success action rate',
            'success device rate'
          ],
          'statList': [
            {
              'key': '2021-12-08 18:00',
              'totalRecordCount': 73
            },
            {
              'key': '2021-12-08 18:15',
              'totalRecordCount': 3776
            },
            {
              'key': '2021-12-08 18:30',
              'totalRecordCount': 3981
            },
            {
              'key': '2021-12-08 18:45',
              'totalRecordCount': 3283
            },
            {
              'key': '2021-12-08 19:00',
              'totalRecordCount': 3869
            },
            {
              'key': '2021-12-08 19:15',
              'totalRecordCount': 3468
            },
            {
              'key': '2021-12-08 19:30',
              'totalRecordCount': 3549
            },
            {
              'key': '2021-12-08 19:45',
              'totalRecordCount': 3081
            },
            {
              'key': '2021-12-08 20:00',
              'totalRecordCount': 3587
            },
            {
              'key': '2021-12-08 20:15',
              'totalRecordCount': 3131
            },
            {
              'key': '2021-12-08 20:30',
              'totalRecordCount': 3142
            },
            {
              'key': '2021-12-08 20:45',
              'totalRecordCount': 3358
            },
            {
              'key': '2021-12-08 21:00',
              'totalRecordCount': 3613
            },
            {
              'key': '2021-12-08 21:15',
              'totalRecordCount': 3161
            },
            {
              'key': '2021-12-08 21:30',
              'totalRecordCount': 3344
            },
            {
              'key': '2021-12-08 21:45',
              'totalRecordCount': 3256
            },
            {
              'key': '2021-12-08 22:00',
              'totalRecordCount': 3470
            },
            {
              'key': '2021-12-08 22:15',
              'totalRecordCount': 3088
            },
            {
              'key': '2021-12-08 22:30',
              'totalRecordCount': 2374
            }
          ],
          'xaxis': [
            '2021-12-08 18:00',
            '2021-12-08 18:15',
            '2021-12-08 18:30',
            '2021-12-08 18:45',
            '2021-12-08 19:00',
            '2021-12-08 19:15',
            '2021-12-08 19:30',
            '2021-12-08 19:45',
            '2021-12-08 20:00',
            '2021-12-08 20:15',
            '2021-12-08 20:30',
            '2021-12-08 20:45',
            '2021-12-08 21:00',
            '2021-12-08 21:15',
            '2021-12-08 21:30',
            '2021-12-08 21:45',
            '2021-12-08 22:00',
            '2021-12-08 22:15',
            '2021-12-08 22:30'
          ]
        },
        'total': 1,
        'current': 1,
        'hash': '1',
        'version': 1
      }
    }
  },
  {
    // http://localhost:9527/dev-api/api/iot/upload_log/JA_RO2_CRL20SWYZEDJ2090037/list
    url: '/api/sweep_record/schedule_change',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'message': 'Success',
        'data': {
          'series': [
            {
              'subKey': '当前有启用定时的设备',
              'recordCount': [
                17343,
                17480,
                17548,
                17607,
                17685,
                17798,
                17876,
                17979,
                18035,
                18082,
                18082,
                18102,
                18163,
                18199,
                18304,
                18353,
                18345,
                18380,
                18372,
                18450,
                18487,
                18553,
                18567,
                18547,
                18503,
                18523,
                18559,
                18580,
                18605,
                18591,
                18581,
                18529,
                18544,
                18622,
                18668,
                18727,
                18747,
                18788,
                18754,
                18798,
                18860,
                18896,
                18942,
                18963,
                18935,
                18878,
                18910,
                18973,
                19065,
                19148,
                19186,
                19235,
                19225,
                19243,
                19323
              ],
              'deviceCount': [
                3018,
                3032,
                3034,
                3035,
                3040,
                3054,
                3060,
                3073,
                3077,
                3081,
                3076,
                3074,
                3079,
                3081,
                3094,
                3100,
                3095,
                3097,
                3091,
                3102,
                3106,
                3115,
                3115,
                3110,
                3099,
                3100,
                3105,
                3108,
                3111,
                3107,
                3105,
                3092,
                3091,
                3103,
                3108,
                3115,
                3115,
                3117,
                3104,
                3108,
                3115,
                3117,
                3122,
                3122,
                3113,
                3095,
                3093,
                3098,
                3108,
                3116,
                3117,
                3120,
                3114,
                3110,
                3118
              ]
            },
            {
              'subKey': '从来没有过定时的设备',
              'recordCount': [
                31421,
                31488,
                31580,
                31653,
                31749,
                31860,
                31872,
                31912,
                31954,
                31994,
                32011,
                32085,
                32125,
                32137,
                32152,
                32148,
                32166,
                32171,
                32204,
                32258,
                32228,
                32238,
                32231,
                32272,
                32345,
                32378,
                32397,
                32457,
                32512,
                32527,
                32542,
                32546,
                32589,
                32621,
                32616,
                32637,
                32646,
                32672,
                32715,
                32827,
                32873,
                32860,
                32888,
                32919,
                32926,
                32971,
                33111,
                33201,
                33233,
                33284,
                33336,
                33371,
                33407,
                33480,
                33559
              ],
              'deviceCount': [
                5468,
                5462,
                5460,
                5457,
                5459,
                5467,
                5457,
                5455,
                5452,
                5452,
                5445,
                5449,
                5447,
                5441,
                5436,
                5430,
                5426,
                5421,
                5419,
                5424,
                5414,
                5413,
                5408,
                5411,
                5418,
                5419,
                5421,
                5430,
                5437,
                5437,
                5438,
                5432,
                5433,
                5435,
                5431,
                5430,
                5424,
                5421,
                5415,
                5428,
                5430,
                5421,
                5420,
                5420,
                5414,
                5406,
                5416,
                5421,
                5417,
                5416,
                5417,
                5414,
                5411,
                5411,
                5416
              ]
            },
            {
              'subKey': '曾经有过定时但是此刻没有',
              'recordCount': [
                11276,
                11245,
                11268,
                11310,
                11324,
                11318,
                11301,
                11292,
                11312,
                11333,
                11386,
                11442,
                11446,
                11464,
                11416,
                11437,
                11480,
                11500,
                11543,
                11535,
                11543,
                11523,
                11552,
                11598,
                11679,
                11713,
                11708,
                11721,
                11716,
                11748,
                11785,
                11854,
                11874,
                11843,
                11833,
                11808,
                11839,
                11842,
                11920,
                11937,
                11932,
                11945,
                11948,
                11981,
                12049,
                12151,
                12194,
                12202,
                12175,
                12163,
                12188,
                12200,
                12263,
                12294,
                12274
              ],
              'deviceCount': [
                1962,
                1950,
                1948,
                1950,
                1947,
                1942,
                1935,
                1930,
                1930,
                1931,
                1937,
                1943,
                1940,
                1941,
                1930,
                1931,
                1936,
                1938,
                1942,
                1939,
                1939,
                1935,
                1938,
                1944,
                1956,
                1960,
                1959,
                1961,
                1959,
                1963,
                1969,
                1978,
                1979,
                1973,
                1970,
                1964,
                1967,
                1965,
                1973,
                1973,
                1971,
                1970,
                1969,
                1972,
                1981,
                1992,
                1994,
                1992,
                1984,
                1979,
                1980,
                1979,
                1986,
                1987,
                1981
              ]
            }
          ],
          'legendData': [
            '当前有启用定时的设备',
            '从来没有过定时的设备',
            '曾经有过定时但是此刻没有'
          ],
          'statList': [
            {
              'key': '2022-01-05',
              'totalRecordCount': 1,
              'totalDeviceCount': 57460
            },
            {
              'key': '2022-01-06',
              'totalRecordCount': 1,
              'totalDeviceCount': 57645
            },
            {
              'key': '2022-01-07',
              'totalRecordCount': 1,
              'totalDeviceCount': 57833
            },
            {
              'key': '2022-01-08',
              'totalRecordCount': 1,
              'totalDeviceCount': 57996
            },
            {
              'key': '2022-01-09',
              'totalRecordCount': 1,
              'totalDeviceCount': 58159
            },
            {
              'key': '2022-01-10',
              'totalRecordCount': 1,
              'totalDeviceCount': 58270
            },
            {
              'key': '2022-01-11',
              'totalRecordCount': 1,
              'totalDeviceCount': 58400
            },
            {
              'key': '2022-01-12',
              'totalRecordCount': 1,
              'totalDeviceCount': 58496
            },
            {
              'key': '2022-01-13',
              'totalRecordCount': 1,
              'totalDeviceCount': 58600
            },
            {
              'key': '2022-01-14',
              'totalRecordCount': 1,
              'totalDeviceCount': 58674
            },
            {
              'key': '2022-01-15',
              'totalRecordCount': 1,
              'totalDeviceCount': 58781
            },
            {
              'key': '2022-01-16',
              'totalRecordCount': 1,
              'totalDeviceCount': 58876
            },
            {
              'key': '2022-01-17',
              'totalRecordCount': 1,
              'totalDeviceCount': 58974
            },
            {
              'key': '2022-01-18',
              'totalRecordCount': 1,
              'totalDeviceCount': 59054
            },
            {
              'key': '2022-01-19',
              'totalRecordCount': 1,
              'totalDeviceCount': 59142
            },
            {
              'key': '2022-01-20',
              'totalRecordCount': 1,
              'totalDeviceCount': 59203
            },
            {
              'key': '2022-01-21',
              'totalRecordCount': 1,
              'totalDeviceCount': 59273
            },
            {
              'key': '2022-01-22',
              'totalRecordCount': 1,
              'totalDeviceCount': 59336
            },
            {
              'key': '2022-01-23',
              'totalRecordCount': 1,
              'totalDeviceCount': 59422
            },
            {
              'key': '2022-01-24',
              'totalRecordCount': 1,
              'totalDeviceCount': 59465
            },
            {
              'key': '2022-01-25',
              'totalRecordCount': 1,
              'totalDeviceCount': 59519
            },
            {
              'key': '2022-01-26',
              'totalRecordCount': 1,
              'totalDeviceCount': 59550
            },
            {
              'key': '2022-01-27',
              'totalRecordCount': 1,
              'totalDeviceCount': 59594
            },
            {
              'key': '2022-01-28',
              'totalRecordCount': 1,
              'totalDeviceCount': 59634
            },
            {
              'key': '2022-01-29',
              'totalRecordCount': 1,
              'totalDeviceCount': 59693
            },
            {
              'key': '2022-01-30',
              'totalRecordCount': 1,
              'totalDeviceCount': 59742
            },
            {
              'key': '2022-01-31',
              'totalRecordCount': 1,
              'totalDeviceCount': 59761
            },
            {
              'key': '2022-02-01',
              'totalRecordCount': 1,
              'totalDeviceCount': 59763
            },
            {
              'key': '2022-02-02',
              'totalRecordCount': 1,
              'totalDeviceCount': 59793
            },
            {
              'key': '2022-02-03',
              'totalRecordCount': 1,
              'totalDeviceCount': 59817
            },
            {
              'key': '2022-02-04',
              'totalRecordCount': 1,
              'totalDeviceCount': 59840
            },
            {
              'key': '2022-02-05',
              'totalRecordCount': 1,
              'totalDeviceCount': 59911
            },
            {
              'key': '2022-02-06',
              'totalRecordCount': 1,
              'totalDeviceCount': 59979
            },
            {
              'key': '2022-02-07',
              'totalRecordCount': 1,
              'totalDeviceCount': 60012
            },
            {
              'key': '2022-02-08',
              'totalRecordCount': 1,
              'totalDeviceCount': 60055
            },
            {
              'key': '2022-02-09',
              'totalRecordCount': 1,
              'totalDeviceCount': 60101
            },
            {
              'key': '2022-02-10',
              'totalRecordCount': 1,
              'totalDeviceCount': 60181
            },
            {
              'key': '2022-02-11',
              'totalRecordCount': 1,
              'totalDeviceCount': 60264
            },
            {
              'key': '2022-02-12',
              'totalRecordCount': 1,
              'totalDeviceCount': 60410
            },
            {
              'key': '2022-02-13',
              'totalRecordCount': 1,
              'totalDeviceCount': 60476
            },
            {
              'key': '2022-02-14',
              'totalRecordCount': 1,
              'totalDeviceCount': 60533
            },
            {
              'key': '2022-02-15',
              'totalRecordCount': 1,
              'totalDeviceCount': 60613
            },
            {
              'key': '2022-02-16',
              'totalRecordCount': 1,
              'totalDeviceCount': 60672
            },
            {
              'key': '2022-02-17',
              'totalRecordCount': 1,
              'totalDeviceCount': 60725
            },
            {
              'key': '2022-02-18',
              'totalRecordCount': 1,
              'totalDeviceCount': 60812
            },
            {
              'key': '2022-02-19',
              'totalRecordCount': 1,
              'totalDeviceCount': 60987
            },
            {
              'key': '2022-02-20',
              'totalRecordCount': 1,
              'totalDeviceCount': 61131
            },
            {
              'key': '2022-02-21',
              'totalRecordCount': 1,
              'totalDeviceCount': 61236
            },
            {
              'key': '2022-02-22',
              'totalRecordCount': 1,
              'totalDeviceCount': 61341
            },
            {
              'key': '2022-02-23',
              'totalRecordCount': 1,
              'totalDeviceCount': 61447
            },
            {
              'key': '2022-02-24',
              'totalRecordCount': 1,
              'totalDeviceCount': 61536
            },
            {
              'key': '2022-02-25',
              'totalRecordCount': 1,
              'totalDeviceCount': 61632
            },
            {
              'key': '2022-02-26',
              'totalRecordCount': 1,
              'totalDeviceCount': 61734
            },
            {
              'key': '2022-02-27',
              'totalRecordCount': 1,
              'totalDeviceCount': 61872
            },
            {
              'key': '2022-02-28',
              'totalRecordCount': 1,
              'totalDeviceCount': 61953
            }
          ],
          'xaxis': [
            '2022-01-05',
            '2022-01-06',
            '2022-01-07',
            '2022-01-08',
            '2022-01-09',
            '2022-01-10',
            '2022-01-11',
            '2022-01-12',
            '2022-01-13',
            '2022-01-14',
            '2022-01-15',
            '2022-01-16',
            '2022-01-17',
            '2022-01-18',
            '2022-01-19',
            '2022-01-20',
            '2022-01-21',
            '2022-01-22',
            '2022-01-23',
            '2022-01-24',
            '2022-01-25',
            '2022-01-26',
            '2022-01-27',
            '2022-01-28',
            '2022-01-29',
            '2022-01-30',
            '2022-01-31',
            '2022-02-01',
            '2022-02-02',
            '2022-02-03',
            '2022-02-04',
            '2022-02-05',
            '2022-02-06',
            '2022-02-07',
            '2022-02-08',
            '2022-02-09',
            '2022-02-10',
            '2022-02-11',
            '2022-02-12',
            '2022-02-13',
            '2022-02-14',
            '2022-02-15',
            '2022-02-16',
            '2022-02-17',
            '2022-02-18',
            '2022-02-19',
            '2022-02-20',
            '2022-02-21',
            '2022-02-22',
            '2022-02-23',
            '2022-02-24',
            '2022-02-25',
            '2022-02-26',
            '2022-02-27',
            '2022-02-28'
          ]
        },
        'total': 1,
        'current': 1,
        'hash': '1',
        'version': 1
      }
    }
  },
  {
    // http://localhost:9527/dev-api/api/iot/upload_log/JA_RO2_CRL20SWYZEDJ2090037/list
    url: '/api/metrics/user-label-change',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'message': 'Success',
        'data': {
          'series': [
            {
              'key': 'unbindNum',
              'value': [
                3971,
                3964,
                3962,
                3963
              ]
            },
            {
              'key': 'lost14dNum',
              'value': [
                19153,
                18914,
                18842,
                18912
              ]
            },
            {
              'key': 'lost15dNum',
              'value': [
                18365,
                18399,
                18394,
                18407
              ]
            },
            {
              'key': 'lost30dNum',
              'value': [
                12912,
                12987,
                13105,
                13128
              ]
            },
            {
              'key': 'lost45dNum',
              'value': [
                10440,
                10446,
                10517,
                10628
              ]
            },
            {
              'key': 'highActiveNum',
              'value': [
                11907,
                11920,
                11888,
                11882
              ]
            },
            {
              'key': 'midActiveNum',
              'value': [
                17496,
                17486,
                17501,
                17463
              ]
            },
            {
              'key': 'lowActiveNum',
              'value': [
                17496,
                17486,
                17501,
                17463
              ]
            }
          ],
          'xaxis': [
            '2022-03-12',
            '2022-03-13',
            '2022-03-14',
            '2022-03-15'
          ]
        },
        'total': 1,
        'current': 1,
        'hash': '1',
        'version': 1
      }
    }
  }
]

