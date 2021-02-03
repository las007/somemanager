import React from 'react'

export default class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        console.log('will mount.');
    }
    componentDidMount() {
        console.log('did mount.')
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('receiver mount.' + nextProps.name)
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('should mount.');
        //默认return true
        return true         //如果设置为return false，导致不会往下走，会报错
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('will update.')
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('did update.')
    }

    render() {
        return (
            <div>
                <p>这里是子组件接收到的数据：</p>
                <p>{this.props.name}</p>
            </div>
        )
    }
}
