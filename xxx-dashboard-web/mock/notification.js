module.exports = [
  {
    url: '/api/notification/count_unread',
    type: 'get',
    response: config => {
      return { 'code': 0, 'message': 'success', 'data': 7 }
    }
  },
  {
    url: '/api/notification/search',
    type: 'get',
    response: config => {
      return {
        'code': 0, 'message': 'success', 'data': {
          'pages': 2,
          'total': 12,
          'size': 6,
          'current': 1,
          'records': [{
            'id': 194,
            'issueId': 122,
            'serviceTypeText': 'RVI 问题',
            'categoryText': '绑定问题',
            'subCategoryText': '绑定时提示失败',
            'content': '擦擦擦 来来 想的',
            'type': 4,
            'userRead': 0,
            'showType': 1,
            'targetUserId': 1642139904001,
            'createUserType': 0,
            'createTime': '2023-02-06 09:41:55',
            'createUserId': 999,
            'createUserName': 'test',
            'createTimeString': '今天 17:41'
          }, {
            'id': 191,
            'issueId': 123,
            'serviceTypeText': 'RVI 问题',
            'categoryText': '其他',
            'subCategoryText': '',
            'content': '你的么么么么木木 来来的',
            'type': 4,
            'userRead': 0,
            'showType': 1,
            'targetUserId': 1642139904001,
            'createUserType': 0,
            'createTime': '2023-02-06 09:40:20',
            'createUserId': 999,
            'createUserName': 'test',
            'createTimeString': '今天 17:40'
          }, {
            'id': 185,
            'issueId': 123,
            'serviceTypeText': 'RVI 问题',
            'categoryText': '其他',
            'subCategoryText': '',
            'content': '超产成品这是一个简单的品类22222',
            'type': 4,
            'userRead': 0,
            'showType': 1,
            'targetUserId': 1642139904001,
            'createUserType': 0,
            'createTime': '2023-02-06 09:37:32',
            'createUserId': 999,
            'createUserName': 'test',
            'createTimeString': '今天 17:37'
          }, {
            'id': 188,
            'issueId': 123,
            'serviceTypeText': 'RVI 问题',
            'categoryText': '其他',
            'subCategoryText': '',
            'content': '超产成品这是一个简单的品类22222',
            'type': 4,
            'userRead': 0,
            'showType': 1,
            'targetUserId': 1642139904001,
            'createUserType': 0,
            'createTime': '2023-02-06 09:37:32',
            'createUserId': 999,
            'createUserName': 'test',
            'createTimeString': '今天 17:37'
          }, {
            'id': 1,
            'issueId': 122,
            'serviceTypeText': 'RVI 问题',
            'categoryText': '绑定问题',
            'subCategoryText': '绑定时提示失败',
            'content': '34234356565435',
            'type': 4,
            'userRead': 1,
            'showType': 1,
            'targetUserId': 1642139904001,
            'createUserType': 0,
            'createTime': '2023-02-03 09:36:55',
            'createUserId': 999,
            'createUserName': 'test',
            'createTimeString': '2023-02-03'
          }, {
            'id': 5,
            'issueId': 122,
            'serviceTypeText': 'RVI 问题',
            'categoryText': '绑定问题',
            'subCategoryText': '绑定时提示失败',
            'content': '34234356565435',
            'type': 4,
            'userRead': 1,
            'showType': 1,
            'targetUserId': 1642139904001,
            'createUserType': 0,
            'createTime': '2023-02-03 09:36:55',
            'createUserId': 999,
            'createUserName': 'test',
            'createTimeString': '2023-02-03'
          }]
        }
      }
    }
  },
  {
    url: '/api/notification/mark_read',
    type: 'post',
    response: config => {
      return { 'code': 0, 'message': 'success' }
    }
  }
]

