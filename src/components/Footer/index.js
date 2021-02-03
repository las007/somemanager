import React from 'react'
import './index.less'

export default class Footer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="footer">
                版权所有：这是底部组件开发，this is a footer component.
            </div>
        )
    }

}
