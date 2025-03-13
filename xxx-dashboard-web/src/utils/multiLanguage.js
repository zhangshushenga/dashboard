import { getMultiLanguage } from '@/api/multiLanguage'
import { EventBus } from '@/utils/event-bus';

const MULTI_LANGUAGE = 'ATOM_MULTI_LANGUAGE'

export const MUITLANGUAGE_NOTIFICATION = "ATOM_MUITLANGUAGE_NOTIFICATION"

export function setLocalMultiLanguage() {

    console.log('setLocalMultiLanguage')

    getMultiLanguage().then((response) => {
        console.log(response)

        if (response.code === 0 && response.data !== undefined) {
            localStorage.setItem(MULTI_LANGUAGE + process.env.NODE_ENV, JSON.stringify(response.data))
            EventBus.$emit(MUITLANGUAGE_NOTIFICATION, {});
        }
    }).catch((error) => {

    })

}

export function getLocalMultiLanguage() {
    return JSON.parse(localStorage.getItem(MULTI_LANGUAGE + process.env.NODE_ENV))
}

export function getLanguageContentFromCode() {
    const languageCodeList = getLocalMultiLanguage().multiLanguageList

    const languageMap = {
        'en': '英语',
        'ja': '日语',
        'es': '西班牙语'
    };

    const languageObjects = languageCodeList.map(code => {
        const languageName = languageMap[code];
        return { [code]: languageName };
    });

    return languageObjects
}