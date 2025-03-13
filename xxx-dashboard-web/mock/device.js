module.exports = [
  {
    url: '/api/device/aggs_device_clean_level',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'message': 'Success',
        'data': [
          {
            'key': '1',
            'docCount': 17660
          },
          {
            'key': '2',
            'docCount': 13725
          },
          {
            'key': '3',
            'docCount': 16330
          },
          {
            'key': '258',
            'docCount': 3
          },
          {
            'key': '266',
            'docCount': 1
          },
          {
            'key': '330',
            'docCount': 2
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
    url: '/api/device/aggs_device_mute',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'message': 'Success',
        'data': [
          {
            'key': '1',
            'docCount': 253,
            'subList': [
              {
                'key': '1',
                'docCount': 182
              },
              {
                'key': '0',
                'docCount': 71
              }
            ]
          },
          {
            'key': '0',
            'docCount': 104,
            'subList': [
              {
                'key': '1',
                'docCount': 94
              },
              {
                'key': '0',
                'docCount': 10
              }
            ]
          },
          {
            'key': '-1',
            'docCount': 40377
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
    url: '/api/device/aggs_device_schedule',
    type: 'get',
    response: config => {
      console.log(config.query.query_value)
      if (config.query.query_value === 'device_id') {
        return {
          'code': 1,
          'message': 'Success',
          'data': [
            {
              'key': 'JA_RO2_7C78B20A4511',
              'docCount': 10
            },
            {
              'key': 'JA_RO2_7C78B20A5644',
              'docCount': 10
            },
            {
              'key': 'JA_RO2_7C78B20A537C',
              'docCount': 9
            },
            {
              'key': 'JA_RO2_7C78B20A864B',
              'docCount': 9
            },
            {
              'key': 'JA_RO2_7C78B20A87A6',
              'docCount': 9
            },
            {
              'key': 'JA_RO2_7C78B20A09F7',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20A0C96',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20A32A9',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20A4601',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20A4619',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20A4D80',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20A4FB8',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20A5363',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20A61FA',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20A65C1',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20A6C28',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20A7F35',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20A95F5',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20A9D99',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20AAA6D',
              'docCount': 8
            },
            {
              'key': 'JA_RO2_7C78B20A022D',
              'docCount': 7
            },
            {
              'key': 'JA_RO2_7C78B20A043B',
              'docCount': 7
            },
            {
              'key': 'JA_RO2_7C78B20A094A',
              'docCount': 7
            },
            {
              'key': 'JA_RO2_7C78B20A0F47',
              'docCount': 7
            },
            {
              'key': 'JA_RO2_7C78B20A116F',
              'docCount': 7
            },
            {
              'key': 'JA_RO2_7C78B20A1670',
              'docCount': 7
            },
            {
              'key': 'JA_RO2_7C78B20A25E6',
              'docCount': 7
            },
            {
              'key': 'JA_RO2_7C78B20A2C2B',
              'docCount': 7
            },
            {
              'key': 'JA_RO2_7C78B20A3193',
              'docCount': 7
            },
            {
              'key': 'JA_RO2_7C78B20A31DC',
              'docCount': 7
            },
            {
              'key': 'JA_RO2_7C78B20A31E8',
              'docCount': 7
            },
            {
              'key': 'JA_RO2_7C78B20A3618',
              'docCount': 7
            },
            {
              'key': 'JA_RO2_7C78B20A3D06',
              'docCount': 7
            },
            {
              'key': 'JA_RO2_7C78B20A3E00',
              'docCount': 7
            },
            {
              'key': 'JA_RO2_7C78B20A57F2',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A6167',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A6216',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A6272',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A6806',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A6918',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A6D0F',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A7350',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A73DA',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A75E6',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A75F6',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A7D0F',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A7DBF',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A8036',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A8043',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A8142',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A81EE',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A8422',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A8527',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A8B89',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A9059',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A91B3',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A921E',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A9482',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A9595',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A95B7',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A9A85',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A9F59',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20AA3F1',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20AA464',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20AA4E0',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20AA578',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20AA64B',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20AA6E3',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20AAE5E',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20AB0F2',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20AB2FA',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20AB761',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20ABA93',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20ABBD1',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20AC16D',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20AC298',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20AD830',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20ADA83',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B2400037',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B2400253',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B2400B52',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B240AF3F',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B240B3FD',
              'docCount': 6
            },
            {
              'key': 'JA_RO2_7C78B20A0081',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20A036A',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20A059E',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20A05F6',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AA860',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AA8AE',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AA915',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AAA39',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AAACE',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AAC61',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AAC9B',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AACF7',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AAD46',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AAFFD',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AB292',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AB2E6',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AB431',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AB8A4',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20ABC8A',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AC2C3',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AC562',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AD299',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AD3AB',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AD44C',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AD455',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20AD811',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20ADAD5',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20ADB22',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B24004D1',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B2407265',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B2409AA1',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B2409B4F',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B240A31C',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B240A38D',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B240AC93',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B240AE25',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B240AF94',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B240B032',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B240B3EA',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B240B44F',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B240BB33',
              'docCount': 5
            },
            {
              'key': 'JA_RO2_7C78B20A005D',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0104',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0520',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0529',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0589',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0754',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A095D',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0969',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A09C8',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A09E9',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0A7E',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0A94',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0B6E',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0C9A',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0CBB',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0CDB',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0D9D',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0DCC',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0E01',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0E13',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0F5D',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A0F8F',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A11B2',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A11EB',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A1272',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A12CD',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A12D1',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A138C',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A139C',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A14BC',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A14DF',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A14F3',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A15BC',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A16B7',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A1709',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A1807',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A1857',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A191C',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A1921',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A1A3C',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A1ADD',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A1B67',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A1C70',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A1D02',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A1E71',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A1F40',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A1FDA',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A1FF5',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2283',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A234E',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A23C2',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2448',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A24C3',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A252D',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2551',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2552',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A25A3',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A25AD',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2666',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2675',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A26C4',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A26DA',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2718',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2753',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A277C',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A27BE',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A27C6',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2A92',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2B07',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2B50',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2BD9',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2C79',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2C91',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2CE1',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2CED',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2D27',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2D50',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2E25',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2E31',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2F11',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A2FDC',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A305A',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A3083',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A30E0',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A311C',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A311F',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A313E',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A810E',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8179',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A823E',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A82D9',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8301',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8338',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A837D',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A837E',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8387',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A83B0',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8425',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8458',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A84E1',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A850A',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A851E',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8541',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8578',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A858C',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A85AD',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A85CE',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A85DE',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A85EC',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A86CD',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A86F5',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A873E',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A880E',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8854',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A88A8',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A88C2',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A88D7',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8978',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A89C4',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8AA1',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8AF0',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8B49',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8B69',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8CD2',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8E34',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8E85',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A8EC6',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A90F8',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A914B',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A91B5',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A91DE',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A925A',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A9269',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A9279',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A92A5',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A9358',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A9398',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20A93AA',
              'docCount': 4
            },
            {
              'key': 'JA_RO2_7C78B20AB15B',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB18E',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB19E',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB1DF',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB1E4',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB23C',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB2A6',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB2C0',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB2C6',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB36E',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB37E',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB426',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB466',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB468',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB46D',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB475',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB48D',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB48F',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB4B3',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB4C1',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB4E9',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB52C',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB549',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB562',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB5AB',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB5E1',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB5EE',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB602',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB603',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB61D',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB628',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB804',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB8EF',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB936',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB977',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB97B',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AB9D1',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ABA50',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ABAC5',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ABBD2',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ABBFA',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ABC53',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ABCBD',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ABDC7',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ABEDE',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ABEE6',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ABF20',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AC16F',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AC38C',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AC3DC',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AC411',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AC434',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AC5AD',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AC5F1',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AC657',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AC692',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AC7BB',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AC828',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ACAB6',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ACAB7',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ACB4A',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ACC45',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ACCB5',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ACCFC',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ACCFF',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ACF06',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AD044',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AD0A6',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AD18B',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AD19B',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AD28F',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AD2E0',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AD3A3',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AD4C1',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AD4CF',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AD5DA',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AD839',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AD8E5',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20AD9CF',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ADA64',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ADA72',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ADAA8',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ADACD',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B20ADB3A',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B240000C',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B240005C',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2400082',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B240009D',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B24000B5',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B24000B8',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B24001C1',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B24001C4',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B240028E',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B24002BD',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B240031C',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2400695',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B24008C8',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B24008D5',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2400960',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2400970',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B24009BE',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2400BE8',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2400C9D',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2400EDD',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B240150A',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B240158F',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2401CA2',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2401FCF',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B24024F0',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2402AC1',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2403BE1',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2404E41',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2404E8B',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2405BE7',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2406C25',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2406D0C',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B24070EF',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B24071FC',
              'docCount': 3
            },
            {
              'key': 'JA_RO2_7C78B2402D01',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2402D3B',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2402F0A',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2403BEF',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2404EC4',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2404F39',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2404F4B',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B240508F',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B240512F',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B24051CB',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B240521B',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2405283',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2405A93',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2406618',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B240670A',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B240696B',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2406997',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B24069B7',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2406A3A',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2406C1E',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2406CA8',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2406CED',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B24072AC',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B24073B4',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2407402',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2407408',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B24075AD',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2407814',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2408A8D',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B240903C',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B24091D1',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409368',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B240941D',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409435',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B240944C',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409494',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B240959D',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B240976A',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B240981D',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409828',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B240982D',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B240996E',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409976',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409A8B',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409A8D',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409A96',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409AA5',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409B98',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409BE1',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409C26',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409C7C',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409D11',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409D48',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409D51',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409DC4',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409DD0',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409DEE',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409EE6',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B2409F5E',
              'docCount': 2
            },
            {
              'key': 'JA_RO2_7C78B240A740',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A743',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A754',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A770',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A787',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A78A',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A790',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A796',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A797',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A79D',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A79F',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A7A3',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A7AA',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A7B5',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A7B8',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A7C6',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A811',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240A915',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AAA4',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AAB8',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AAD3',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AAEB',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AAEE',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB1B',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB2C',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB38',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB54',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB58',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB59',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB5C',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB5D',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB6E',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB6F',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB72',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB73',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB79',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB8C',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240AB9D',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240ABA4',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240ABB3',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240ABB5',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240ABCB',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240ABCF',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240ABD0',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240ABD9',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240ABE3',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240ABE7',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240ABEB',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240BC04',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240BC3A',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240BD34',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240BD8B',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240BD96',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240BF9D',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C0EA',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C115',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C119',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C1C6',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C1C7',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C1D6',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C344',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C347',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C348',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C367',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C369',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C370',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C454',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C527',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C530',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_7C78B240C7E7',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZE00018',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZE00026',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZEDJ2090025',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZEDJ2090036',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZEDJ2090038',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZEDJ2090039',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZEDJ2090056',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZEDJ2090073',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZEDJ2090078',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZEDJ2090081',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZEDJ2090103',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZEDJ2090204',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZEDJ2090233',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZEDJ2090236',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZEDJ2090268',
              'docCount': 1
            },
            {
              'key': 'JA_RO2_CRL20SWYZEDJ2090276',
              'docCount': 1
            }
          ],
          'total': 1,
          'current': 1,
          'hash': '1',
          'version': 1
        }
      }
      if (config.query.query_value === 'schedule_time') {
        return {
          'code': 1,
          'message': 'Success',
          'data': [
            {
              'key': '10:00',
              'docCount': 1647
            },
            {
              'key': '09:00',
              'docCount': 1523
            },
            {
              'key': '08:00',
              'docCount': 904
            },
            {
              'key': '11:00',
              'docCount': 788
            },
            {
              'key': '12:00',
              'docCount': 707
            },
            {
              'key': '13:00',
              'docCount': 684
            },
            {
              'key': '14:00',
              'docCount': 586
            },
            {
              'key': '15:00',
              'docCount': 451
            },
            {
              'key': '07:00',
              'docCount': 434
            },
            {
              'key': '09:30',
              'docCount': 424
            },
            {
              'key': '02:00',
              'docCount': 418
            },
            {
              'key': '08:30',
              'docCount': 418
            },
            {
              'key': '10:30',
              'docCount': 415
            },
            {
              'key': '01:00',
              'docCount': 369
            },
            {
              'key': '06:00',
              'docCount': 334
            },
            {
              'key': '03:00',
              'docCount': 320
            },
            {
              'key': '17:00',
              'docCount': 313
            },
            {
              'key': '16:00',
              'docCount': 310
            },
            {
              'key': '23:00',
              'docCount': 299
            },
            {
              'key': '22:00',
              'docCount': 287
            },
            {
              'key': '07:30',
              'docCount': 283
            },
            {
              'key': '18:00',
              'docCount': 264
            },
            {
              'key': '21:00',
              'docCount': 264
            },
            {
              'key': '20:00',
              'docCount': 240
            },
            {
              'key': '19:00',
              'docCount': 229
            },
            {
              'key': '05:00',
              'docCount': 203
            },
            {
              'key': '11:30',
              'docCount': 199
            },
            {
              'key': '00:00',
              'docCount': 194
            },
            {
              'key': '04:00',
              'docCount': 189
            },
            {
              'key': '13:30',
              'docCount': 174
            },
            {
              'key': '06:30',
              'docCount': 158
            },
            {
              'key': '23:30',
              'docCount': 135
            },
            {
              'key': '16:30',
              'docCount': 133
            },
            {
              'key': '12:30',
              'docCount': 132
            },
            {
              'key': '17:30',
              'docCount': 129
            },
            {
              'key': '14:30',
              'docCount': 120
            },
            {
              'key': '15:30',
              'docCount': 120
            },
            {
              'key': '21:30',
              'docCount': 115
            },
            {
              'key': '20:30',
              'docCount': 114
            },
            {
              'key': '22:30',
              'docCount': 109
            },
            {
              'key': '08:15',
              'docCount': 105
            },
            {
              'key': '05:30',
              'docCount': 101
            },
            {
              'key': '18:30',
              'docCount': 97
            },
            {
              'key': '09:15',
              'docCount': 95
            },
            {
              'key': '01:30',
              'docCount': 89
            },
            {
              'key': '19:30',
              'docCount': 86
            },
            {
              'key': '02:30',
              'docCount': 82
            },
            {
              'key': '00:30',
              'docCount': 71
            },
            {
              'key': '07:15',
              'docCount': 71
            },
            {
              'key': '03:30',
              'docCount': 70
            },
            {
              'key': '10:15',
              'docCount': 63
            },
            {
              'key': '04:30',
              'docCount': 58
            },
            {
              'key': '08:45',
              'docCount': 55
            },
            {
              'key': '09:45',
              'docCount': 52
            },
            {
              'key': '07:45',
              'docCount': 49
            },
            {
              'key': '11:45',
              'docCount': 44
            },
            {
              'key': '12:15',
              'docCount': 44
            },
            {
              'key': '12:01',
              'docCount': 43
            },
            {
              'key': '11:15',
              'docCount': 40
            },
            {
              'key': '10:45',
              'docCount': 39
            },
            {
              'key': '13:15',
              'docCount': 38
            },
            {
              'key': '00:01',
              'docCount': 36
            },
            {
              'key': '23:45',
              'docCount': 36
            },
            {
              'key': '14:15',
              'docCount': 35
            },
            {
              'key': '10:10',
              'docCount': 33
            },
            {
              'key': '23:59',
              'docCount': 33
            },
            {
              'key': '06:45',
              'docCount': 31
            },
            {
              'key': '22:15',
              'docCount': 31
            },
            {
              'key': '09:05',
              'docCount': 30
            },
            {
              'key': '15:15',
              'docCount': 29
            },
            {
              'key': '12:05',
              'docCount': 27
            },
            {
              'key': '17:15',
              'docCount': 27
            },
            {
              'key': '06:15',
              'docCount': 26
            },
            {
              'key': '09:10',
              'docCount': 26
            },
            {
              'key': '10:05',
              'docCount': 25
            },
            {
              'key': '13:45',
              'docCount': 24
            },
            {
              'key': '16:15',
              'docCount': 24
            },
            {
              'key': '17:45',
              'docCount': 24
            },
            {
              'key': '20:45',
              'docCount': 24
            },
            {
              'key': '21:15',
              'docCount': 24
            },
            {
              'key': '08:05',
              'docCount': 22
            },
            {
              'key': '08:40',
              'docCount': 22
            },
            {
              'key': '10:01',
              'docCount': 22
            },
            {
              'key': '12:45',
              'docCount': 21
            },
            {
              'key': '21:45',
              'docCount': 21
            },
            {
              'key': '23:15',
              'docCount': 21
            },
            {
              'key': '08:50',
              'docCount': 20
            },
            {
              'key': '09:01',
              'docCount': 20
            },
            {
              'key': '09:35',
              'docCount': 19
            },
            {
              'key': '16:45',
              'docCount': 19
            },
            {
              'key': '18:15',
              'docCount': 19
            },
            {
              'key': '02:15',
              'docCount': 18
            },
            {
              'key': '09:40',
              'docCount': 18
            },
            {
              'key': '15:45',
              'docCount': 18
            },
            {
              'key': '18:45',
              'docCount': 18
            },
            {
              'key': '20:15',
              'docCount': 18
            },
            {
              'key': '22:45',
              'docCount': 18
            },
            {
              'key': '05:45',
              'docCount': 17
            },
            {
              'key': '07:05',
              'docCount': 17
            },
            {
              'key': '07:20',
              'docCount': 17
            },
            {
              'key': '08:10',
              'docCount': 17
            },
            {
              'key': '08:20',
              'docCount': 17
            },
            {
              'key': '01:15',
              'docCount': 16
            },
            {
              'key': '07:40',
              'docCount': 16
            },
            {
              'key': '08:55',
              'docCount': 16
            },
            {
              'key': '10:20',
              'docCount': 16
            },
            {
              'key': '14:45',
              'docCount': 16
            },
            {
              'key': '03:15',
              'docCount': 15
            },
            {
              'key': '23:55',
              'docCount': 15
            },
            {
              'key': '00:15',
              'docCount': 14
            },
            {
              'key': '06:50',
              'docCount': 14
            },
            {
              'key': '08:35',
              'docCount': 14
            },
            {
              'key': '09:25',
              'docCount': 14
            },
            {
              'key': '10:35',
              'docCount': 14
            },
            {
              'key': '11:10',
              'docCount': 14
            },
            {
              'key': '16:05',
              'docCount': 14
            },
            {
              'key': '16:20',
              'docCount': 14
            },
            {
              'key': '12:10',
              'docCount': 13
            },
            {
              'key': '13:01',
              'docCount': 13
            },
            {
              'key': '19:15',
              'docCount': 13
            },
            {
              'key': '05:15',
              'docCount': 12
            },
            {
              'key': '08:01',
              'docCount': 12
            },
            {
              'key': '09:20',
              'docCount': 12
            },
            {
              'key': '10:25',
              'docCount': 12
            },
            {
              'key': '17:05',
              'docCount': 12
            },
            {
              'key': '19:45',
              'docCount': 12
            },
            {
              'key': '05:01',
              'docCount': 11
            },
            {
              'key': '07:25',
              'docCount': 11
            },
            {
              'key': '08:25',
              'docCount': 11
            },
            {
              'key': '10:02',
              'docCount': 11
            },
            {
              'key': '10:40',
              'docCount': 11
            },
            {
              'key': '11:01',
              'docCount': 11
            },
            {
              'key': '11:20',
              'docCount': 11
            },
            {
              'key': '13:05',
              'docCount': 11
            },
            {
              'key': '17:10',
              'docCount': 11
            },
            {
              'key': '22:10',
              'docCount': 11
            },
            {
              'key': '03:45',
              'docCount': 10
            },
            {
              'key': '07:50',
              'docCount': 10
            },
            {
              'key': '09:50',
              'docCount': 10
            },
            {
              'key': '10:50',
              'docCount': 10
            },
            {
              'key': '11:40',
              'docCount': 10
            },
            {
              'key': '11:59',
              'docCount': 10
            },
            {
              'key': '13:10',
              'docCount': 10
            },
            {
              'key': '18:05',
              'docCount': 10
            },
            {
              'key': '23:10',
              'docCount': 10
            },
            {
              'key': '00:10',
              'docCount': 9
            },
            {
              'key': '07:10',
              'docCount': 9
            },
            {
              'key': '07:55',
              'docCount': 9
            },
            {
              'key': '09:31',
              'docCount': 9
            },
            {
              'key': '11:11',
              'docCount': 9
            },
            {
              'key': '11:55',
              'docCount': 9
            },
            {
              'key': '12:20',
              'docCount': 9
            },
            {
              'key': '16:10',
              'docCount': 9
            },
            {
              'key': '05:20',
              'docCount': 8
            },
            {
              'key': '09:02',
              'docCount': 8
            },
            {
              'key': '09:59',
              'docCount': 8
            },
            {
              'key': '14:20',
              'docCount': 8
            },
            {
              'key': '15:20',
              'docCount': 8
            },
            {
              'key': '19:20',
              'docCount': 8
            },
            {
              'key': '23:20',
              'docCount': 8
            },
            {
              'key': '23:58',
              'docCount': 8
            },
            {
              'key': '01:05',
              'docCount': 7
            },
            {
              'key': '04:45',
              'docCount': 7
            },
            {
              'key': '06:20',
              'docCount': 7
            },
            {
              'key': '07:01',
              'docCount': 7
            },
            {
              'key': '08:02',
              'docCount': 7
            },
            {
              'key': '09:06',
              'docCount': 7
            },
            {
              'key': '09:32',
              'docCount': 7
            },
            {
              'key': '10:03',
              'docCount': 7
            },
            {
              'key': '10:33',
              'docCount': 7
            },
            {
              'key': '10:59',
              'docCount': 7
            },
            {
              'key': '11:05',
              'docCount': 7
            },
            {
              'key': '12:25',
              'docCount': 7
            },
            {
              'key': '12:59',
              'docCount': 7
            },
            {
              'key': '14:10',
              'docCount': 7
            },
            {
              'key': '15:05',
              'docCount': 7
            },
            {
              'key': '16:35',
              'docCount': 7
            },
            {
              'key': '17:20',
              'docCount': 7
            },
            {
              'key': '18:40',
              'docCount': 7
            },
            {
              'key': '19:25',
              'docCount': 7
            },
            {
              'key': '19:50',
              'docCount': 7
            },
            {
              'key': '20:10',
              'docCount': 7
            },
            {
              'key': '20:40',
              'docCount': 7
            },
            {
              'key': '21:10',
              'docCount': 7
            },
            {
              'key': '22:05',
              'docCount': 7
            },
            {
              'key': '23:05',
              'docCount': 7
            },
            {
              'key': '00:05',
              'docCount': 6
            },
            {
              'key': '00:45',
              'docCount': 6
            },
            {
              'key': '01:01',
              'docCount': 6
            },
            {
              'key': '01:50',
              'docCount': 6
            },
            {
              'key': '02:10',
              'docCount': 6
            },
            {
              'key': '03:01',
              'docCount': 6
            },
            {
              'key': '04:15',
              'docCount': 6
            },
            {
              'key': '05:50',
              'docCount': 6
            },
            {
              'key': '08:03',
              'docCount': 6
            },
            {
              'key': '09:08',
              'docCount': 6
            },
            {
              'key': '09:43',
              'docCount': 6
            },
            {
              'key': '10:04',
              'docCount': 6
            },
            {
              'key': '11:35',
              'docCount': 6
            },
            {
              'key': '12:50',
              'docCount': 6
            },
            {
              'key': '13:11',
              'docCount': 6
            },
            {
              'key': '13:20',
              'docCount': 6
            },
            {
              'key': '13:29',
              'docCount': 6
            },
            {
              'key': '14:01',
              'docCount': 6
            },
            {
              'key': '15:01',
              'docCount': 6
            },
            {
              'key': '19:10',
              'docCount': 6
            },
            {
              'key': '20:05',
              'docCount': 6
            },
            {
              'key': '20:50',
              'docCount': 6
            },
            {
              'key': '22:20',
              'docCount': 6
            },
            {
              'key': '22:35',
              'docCount': 6
            },
            {
              'key': '01:40',
              'docCount': 5
            },
            {
              'key': '06:35',
              'docCount': 5
            },
            {
              'key': '07:35',
              'docCount': 5
            },
            {
              'key': '08:13',
              'docCount': 5
            },
            {
              'key': '08:34',
              'docCount': 5
            },
            {
              'key': '08:36',
              'docCount': 5
            },
            {
              'key': '08:37',
              'docCount': 5
            },
            {
              'key': '08:56',
              'docCount': 5
            },
            {
              'key': '02:45',
              'docCount': 4
            },
            {
              'key': '04:42',
              'docCount': 4
            },
            {
              'key': '06:05',
              'docCount': 4
            },
            {
              'key': '06:10',
              'docCount': 4
            },
            {
              'key': '11:25',
              'docCount': 4
            },
            {
              'key': '12:08',
              'docCount': 4
            },
            {
              'key': '12:35',
              'docCount': 4
            },
            {
              'key': '13:22',
              'docCount': 4
            },
            {
              'key': '14:06',
              'docCount': 4
            },
            {
              'key': '14:07',
              'docCount': 4
            },
            {
              'key': '14:25',
              'docCount': 4
            },
            {
              'key': '14:28',
              'docCount': 4
            },
            {
              'key': '14:34',
              'docCount': 4
            },
            {
              'key': '08:23',
              'docCount': 3
            },
            {
              'key': '08:27',
              'docCount': 3
            },
            {
              'key': '08:44',
              'docCount': 3
            },
            {
              'key': '11:06',
              'docCount': 3
            },
            {
              'key': '11:28',
              'docCount': 3
            },
            {
              'key': '11:33',
              'docCount': 3
            },
            {
              'key': '11:37',
              'docCount': 3
            },
            {
              'key': '12:18',
              'docCount': 3
            },
            {
              'key': '12:19',
              'docCount': 3
            },
            {
              'key': '12:28',
              'docCount': 3
            },
            {
              'key': '12:42',
              'docCount': 3
            },
            {
              'key': '12:52',
              'docCount': 3
            },
            {
              'key': '12:53',
              'docCount': 3
            },
            {
              'key': '12:56',
              'docCount': 3
            },
            {
              'key': '13:12',
              'docCount': 3
            },
            {
              'key': '13:13',
              'docCount': 3
            },
            {
              'key': '13:14',
              'docCount': 3
            },
            {
              'key': '13:17',
              'docCount': 3
            },
            {
              'key': '08:43',
              'docCount': 2
            },
            {
              'key': '08:46',
              'docCount': 2
            },
            {
              'key': '08:54',
              'docCount': 2
            },
            {
              'key': '15:42',
              'docCount': 2
            },
            {
              'key': '15:56',
              'docCount': 2
            },
            {
              'key': '15:57',
              'docCount': 2
            },
            {
              'key': '16:07',
              'docCount': 2
            },
            {
              'key': '16:12',
              'docCount': 2
            },
            {
              'key': '16:14',
              'docCount': 2
            },
            {
              'key': '16:16',
              'docCount': 2
            },
            {
              'key': '16:17',
              'docCount': 2
            },
            {
              'key': '16:18',
              'docCount': 2
            },
            {
              'key': '16:31',
              'docCount': 2
            },
            {
              'key': '16:39',
              'docCount': 2
            },
            {
              'key': '16:40',
              'docCount': 2
            },
            {
              'key': '16:46',
              'docCount': 2
            },
            {
              'key': '16:51',
              'docCount': 2
            },
            {
              'key': '16:52',
              'docCount': 2
            },
            {
              'key': '16:55',
              'docCount': 2
            },
            {
              'key': '17:08',
              'docCount': 2
            },
            {
              'key': '19:01',
              'docCount': 2
            }
          ],
          'total': 1,
          'current': 1,
          'hash': '1',
          'version': 1
        }
      }
      if (config.query.query_value === 'repeat') {
        return {
          'code': 1,
          'message': 'Success',
          'data': [
            {
              'key': '1',
              'docCount': 19844
            },
            {
              'key': '2',
              'docCount': 128
            }
          ],
          'total': 1,
          'current': 1,
          'hash': '1',
          'version': 1
        }
      }
      if (config.query.query_value === 'wind_power') {
        return {
          'code': 1,
          'message': 'Success',
          'data': [
            {
              'key': '2',
              'docCount': 12202
            },
            {
              'key': '3',
              'docCount': 5778
            },
            {
              'key': '1',
              'docCount': 1992
            }
          ],
          'total': 1,
          'current': 1,
          'hash': '1',
          'version': 1
        }
      }
      if (config.query.query_value === 'is_rooms_clean') {
        return {
          'code': 1,
          'message': 'Success',
          'data': [
            {
              'key': '0',
              'docCount': 8623
            },
            {
              'key': '1',
              'docCount': 4418
            },
            {
              'key': '2',
              'docCount': 2800
            },
            {
              'key': '3',
              'docCount': 1883
            },
            {
              'key': '4',
              'docCount': 1071
            },
            {
              'key': '5',
              'docCount': 582
            },
            {
              'key': '6',
              'docCount': 322
            },
            {
              'key': '7',
              'docCount': 142
            },
            {
              'key': '8',
              'docCount': 62
            },
            {
              'key': '9',
              'docCount': 33
            }
          ],
          'total': 1,
          'current': 1,
          'hash': '1',
          'version': 1
        }
      }
    }
  },
  {
    url: '/api/data/count_device_version',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'message': 'Success',
        'data': {
          'data': [
            {
              'name': '1.6.55',
              'value': 5170
            },
            {
              'name': '1.6.75',
              'value': 155
            },
            {
              'name': '1.6.97',
              'value': 13318
            },
            {
              'name': '1.6.113',
              'value': 39791
            },
            {
              'name': '1.6.114',
              'value': 147
            },
            {
              'name': '1.6.126',
              'value': 2072
            },
            {
              'name': '1.6.127',
              'value': 236
            },
            {
              'name': '1.6.130',
              'value': 1117
            },
            {
              'name': '1.6.173',
              'value': 737
            }
          ],
          'links': [
            {
              'source': '1.6.55',
              'target': '1.6.75',
              'value': 1
            },
            {
              'source': '1.6.55',
              'target': '1.6.97',
              'value': 1
            },
            {
              'source': '1.6.55',
              'target': '1.6.113',
              'value': 5048
            },
            {
              'source': '1.6.55',
              'target': '1.6.126',
              'value': 27
            },
            {
              'source': '1.6.55',
              'target': '1.6.130',
              'value': 2
            },
            {
              'source': '1.6.75',
              'target': '1.6.97',
              'value': 1
            },
            {
              'source': '1.6.75',
              'target': '1.6.113',
              'value': 42
            },
            {
              'source': '1.6.75',
              'target': '1.6.130',
              'value': 1
            },
            {
              'source': '1.6.97',
              'target': '1.6.113',
              'value': 11411
            },
            {
              'source': '1.6.97',
              'target': '1.6.126',
              'value': 60
            },
            {
              'source': '1.6.97',
              'target': '1.6.130',
              'value': 5
            },
            {
              'source': '1.6.97',
              'target': '1.6.173',
              'value': 3
            },
            {
              'source': '1.6.113',
              'target': '1.6.126',
              'value': 1949
            },
            {
              'source': '1.6.113',
              'target': '1.6.130',
              'value': 107
            },
            {
              'source': '1.6.113',
              'target': '1.6.173',
              'value': 269
            },
            {
              'source': '1.6.114',
              'target': '1.6.126',
              'value': 2
            },
            {
              'source': '1.6.126',
              'target': '1.6.127',
              'value': 236
            },
            {
              'source': '1.6.126',
              'target': '1.6.130',
              'value': 848
            },
            {
              'source': '1.6.126',
              'target': '1.6.173',
              'value': 112
            },
            {
              'source': '1.6.127',
              'target': '1.6.130',
              'value': 151
            },
            {
              'source': '1.6.127',
              'target': '1.6.173',
              'value': 11
            },
            {
              'source': '1.6.130',
              'target': '1.6.173',
              'value': 342
            }
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
    url: '/api/data/count_clean_data_by_device',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'message': 'Success',
        'data': [
          {
            'key': '2021-05-26',
            'docCount': 8
          },
          {
            'key': '2021-05-27',
            'docCount': 12
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
    url: '/api/data/get_device_profile',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'message': 'Success',
        'data': {
          'deviceId': 'JA_RO2_7C78B20AA0F5',
          'deviceModel': 'JA_RO2',
          'timeZone': 'America/Chicago',
          'createTime': 1610309613319,
          'startTimeStr': '2021-01-11',
          'updateTime': 1610309613319,
          'mcuSysVersion': '1.6.75',
          'mac': '7c78b20aa0f5',
          'userId': 'ac2c4cced729faf0e42972caaad4f76c',
          'ipaddr': '192.168.1.170',
          'firmwareVer': '1.6.55',
          'bind': true
        },
        'total': 1,
        'current': 1,
        'hash': '1',
        'version': 1
      }
    }
  },
  {
    url: '/api/device/aggs_night_device_mute',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'message': 'Success',
        'data': [
          {
            'key': '凌晨清扫(0-6点)',
            'docCount': 317
          },
          {
            'key': '其他',
            'docCount': 240
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
