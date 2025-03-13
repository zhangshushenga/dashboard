module.exports = [
  {
    url: '/api/recommend/data/list',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'message': 'Success',
        'data': [
          {
            'key': 'recommend_data/icon/Group 4054587.png',
            'type': 1
          },
          {
            'key': 'recommend_data/icon/Venus_animation_locating.json',
            'type': 1
          },
          {
            'key': 'recommend_data/icon/icon1.png',
            'type': 1
          },
          {
            'key': 'recommend_data/activity_data/activity_data1.json',
            'type': 2
          },
          {
            'key': 'recommend_data/setting_data/settingData.json',
            'type': 3
          }
        ],
        'total': 1,
        'current': 1,
        'hash': '1',
        'version': 1
      }
    }
  },
  {
    url: '/api/activity/list',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'message': 'Success',
        'data': [
          {
            'id': 1,
            'name': 'test',
            'push': 0,
            'recommend': 0,
            'recommendType': 0,
            'expireTime': 1965955563000,
            'recommendOpenUi': 0,
            'webviewUrl': ''
          }
        ],
        'total': 1,
        'current': 1,
        'hash': '1',
        'version': 1
      }
    }
  },
  {
    url: '/api/activity/plan/list',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'message': 'Success',
        'data': {
          'records': [
            {
              'id': 1,
              'tagList': [
                '1',
                '4'
              ],
              'fwList': [
                '1.6.202'
              ],
              'activityId': 1,
              'activityName': 'test',
              'name': '',
              'push': 0,
              'recommend': 0,
              'recommendType': 0,
              'expireTime': 1965955563000,
              'recommendOpenUi': 0,
              'webviewUrl': '',
              'userNum': 477,
              'deviceNum': 495,
              'userAlgorithm': 0,
              'userModuloStart': 1,
              'userModuloEnd': 30,
              'status': 0,
              'updateTime': '2022-04-19 06:37:18',
              'createTime': '2022-04-19 06:37:18',
              'createUserId': 1,
              'createUserName': 'sys',
              'updateUserId': 1,
              'updateUserName': 'sys'
            }
          ],
          'total': 1,
          'size': 20,
          'current': 1,
          'orders': [
            {
              'column': 'id',
              'asc': false
            }
          ],
          'optimizeCountSql': true,
          'searchCount': true,
          'pages': 1
        },
        'total': 1,
        'current': 1,
        'hash': '1',
        'version': 1
      }
    }
  },
  {
    url: '/api/activity/plan/select_list',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'message': 'Success',
        'data': [
          {
            'id': 1,
            'tagList': [
              '1',
              '4'
            ],
            'fwList': [
              '1.6.202'
            ],
            'activityId': 1,
            'activityName': 'test',
            'name': 'test plan',
            'push': 0,
            'recommend': 0,
            'recommendType': 0,
            'expireTime': 1965955563000,
            'recommendOpenUi': 0,
            'webviewUrl': '',
            'userNum': 477,
            'deviceNum': 495,
            'userAlgorithm': 0,
            'userModuloStart': 1,
            'userModuloEnd': 30,
            'status': 0,
            'updateTime': '2022-04-20 02:28:29',
            'createTime': '2022-04-19 06:37:18',
            'createUserId': 1,
            'createUserName': 'sys',
            'updateUserId': 1,
            'updateUserName': 'sys'
          }
        ],
        'total': 1,
        'current': 1,
        'hash': '1',
        'version': 1
      }
    }
  }
]

