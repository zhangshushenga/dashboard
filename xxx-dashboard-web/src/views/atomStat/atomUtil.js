export const atomProduction = {
    Cam: 'Cam',
    Cam2: 'Cam 2',
    CamSwing: 'Cam Swing'
}

const deviceModelMap = {
    'Cam': 'AC1',
    'Cam 2': 'ATOM_CamV3C',
    'Cam Swing': 'ATOM_CAKP1JZJP'
}

export function getAtomDeviceModel(production) {
    return deviceModelMap[production]
}