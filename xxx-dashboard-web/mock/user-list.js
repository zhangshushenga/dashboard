

module.exports = [
  // send code
  {
    url: '/api/user/list',
    type: 'get',
    response: config => {
      return {
        "code": 0,
        "message": "Success",
        "data": [
          {
            "id": "c1haop2eng.chen@wy2ze.cn3",
            "createTime": "2021-07-16 17:55:05",
            "updateTime": "2021-07-16 17:55:05",
            "createPin": "陈彦瑾",
            "updatePin": "陈彦瑾",
            "email": "c1haop2eng.chen@wy2ze.cn3",
            "name": "陈超22鹏333",
            "roleIdList": [
              "VubQvHoB5OAqUmbfRVFq",
              "W-bUvHoB5OAqUmbfX1Fy"
            ]
          },
          {
            "id": "2222333.chen@wy2ze.cn3",
            "createTime": "2021-07-16 18:30:46",
            "updateTime": "2021-07-16 18:30:46",
            "createPin": "陈彦瑾",
            "updatePin": "陈彦瑾",
            "email": "2222333.chen@wy2ze.cn3",
            "name": "陈超22鹏333",
            "roleIdList": [
              "VubQvHoB5OAqUmbfRVFq"
            ]
          },
          {
            "id": "c1haopeng.chen@wy2ze.cn3",
            "createTime": "2021-07-16 17:50:45",
            "updateTime": "2021-07-16 17:50:45",
            "createPin": "陈彦瑾",
            "updatePin": "陈彦瑾",
            "email": "c1haopeng.chen@wy2ze.cn3",
            "name": "陈超22鹏",
            "roleIdList": [
              "W-bUvHoB5OAqUmbfX1Fy"
            ]
          },
          {
            "id": "DFe2rnoBuQTYo3MK4oL_",
            "createTime": "2021-07-16 17:47:39",
            "updateTime": "2021-07-16 17:47:39",
            "createPin": "陈彦瑾",
            "updatePin": "陈彦瑾",
            "email": "c1haopeng.chen@wy2ze.cn3",
            "name": "陈超22鹏",
            "roleIdList": []
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
    url: '/api/user',
    type: 'post',
    response: config => {
      return {
        "code": 0,
        "message": "Success",
        "data": {
          "email": "c1haopeng.chen@wy2ze.cn3",
          "name": "陈超鹏",
          "createTime": "2021-07-16 15:30:28",
          "updateTime": "2021-07-16 15:30:28"
        },
        "total": 1,
        "current": 1,
        "hash": "1",
        "version": 1
      }
    }
  },
  {
    url: '/api/user',
    type: 'delete',
    response: config => {
      return {
        "code": 0,
        "message": "Success",
        "total": 0,
        "current": 0,
        "hash": "1",
        "version": 1
      }
    }
  },
  {
    url: '/api/user',
    type: 'put',
    response: config => {
      return {
        "code": 0,
        "message": "Success",
        "total": 0,
        "current": 0,
        "hash": "1",
        "version": 1
      }
    }
  },

]
