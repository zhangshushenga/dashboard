export function culOnlineRatio(onlineNum, offLineNum) {
    const ratio1 = onlineNum / (onlineNum + offLineNum) * 100
    const ratio = ratio1.toFixed(1)
    return ratio
}

export function culStartPosition(allNum, limitNum) {
    if (allNum <= limitNum) {
        return 0
    }
    return parseInt((allNum - limitNum) / allNum * 100)
}
