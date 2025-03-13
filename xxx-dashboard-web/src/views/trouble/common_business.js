import i18n from '@/lang'

/**
 *
 * @param {*} status 反馈状态
 * @param {*} remainingProcessingTime 剩余时长
 * @returns 剩余时长状态字符串
 */
export function handleRemainTime(status, remainingProcessingTime) {
  if (status === 4) {
    return i18n.t('label57')
  }
  if (remainingProcessingTime === undefined || remainingProcessingTime == null || remainingProcessingTime === '') {
    return ''
  }
  const remainMin = parseInt(remainingProcessingTime / 1000 / 60)
  if (remainMin < 48 * 60) {
    if ((48 * 60 - remainMin) < 60) {
      return i18n.t('label54', [(48 * 60 - remainMin)])
    } else {
      return i18n.t('label53', [(parseInt((48 * 60 - remainMin) / 60))])
    }
  } else {
    // 超时了
    if ((remainMin - 48 * 60) < 60) {
      return i18n.t('label56', [(remainMin - 48 * 60)])
    } else {
      return i18n.t('label55', [(parseInt((remainMin - 48 * 60) / 60))])
    }
  }
}
