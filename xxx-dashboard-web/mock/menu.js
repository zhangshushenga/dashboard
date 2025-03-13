
module.exports = [
    {
      url: '/api/menu',
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
        
      }
    },
    {
      url: '/api/menu',
      type: 'delete',
      response: config => {
        return {
          "code": 1,
          "message": "Success",
          "total": 0,
          "current": 0,
          "hash": "1",
          "version": 2
        }
      }
    },
    {
      url: '/api/menu',
      type: 'put',
      response: config => {
        return {
          "code": 1,
          "message": "Success",
          "total": 0,
          "current": 0,
          "hash": "1",
          "version": 3
        }
      }
    },
    {
      url: '/api/menu/batch',
      type: 'put',
      response: config => {
        return {
          "code": 1,
          "message": "Success",
          "total": 0,
          "current": 0,
          "hash": "1",
          "version": 3
        }
      }
    },
  ]
  