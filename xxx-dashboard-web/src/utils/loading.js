
import { Loading } from 'element-ui';

let loading

export function startLoading() {
    loading = Loading.service({
        lock: true,
        text: 'loading……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
export function endLoading() {
    loading.close()
}