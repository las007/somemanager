/*
*   Reducer 数据处理
*/
import { type } from './../action'
const initialValue = {
    menuName: '首页',
}

export default (state=initialValue, action) => {
    switch (action.type) {
        case type.SWITCH_MENU_CONFIG:
            return {
                ...state,
                menuName: action.menuName
            }
        default:
            return {
                ...state
            };
    }
}
