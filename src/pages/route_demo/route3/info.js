import React from 'react';

export default class Info extends React.Component {
    render() {
        return (
            <div>
                嵌套页面获取动态路由。
                获取到的动态路由的值是：{ this.props.match.params.id }
            </div>
        )
    }
}
