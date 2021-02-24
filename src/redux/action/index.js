/*
*   Action 类型
*/

export const type = {
    SWITCH_MENU_CONFIG: "SWITCH_MENU_CONFIG"
}

export function switchMenu(menuName) {
    return {
        type: type.SWITCH_MENU_CONFIG,
        menuName
    }
}
