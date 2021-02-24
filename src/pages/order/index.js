import React from 'react';
import { Card, Button, Form, Modal, message} from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm'
import ETable from './../../components/ETable'
const FormItem = Form.Item;
// const Option = Select.Option;
export default class Order extends React.Component{
    state  = {
        orderInfo:{},
        orderConfirmVisble:false
    }
    params = {
        page: 1
    }
    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field:'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]
    componentDidMount(){
        this.requestList()
    }

    handleFilter = (params)=>{
        this.params = params;
        this.requestList();
    }
    requestList = ()=>{
        // let _this = this;
        axios.requestList(this,'/order/list',this.params,true)
    }
    // 订单结束确认
    handleConfirm = ()=>{
        /*let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId: item.id
                }
            }
        }).then((res)=>{
            if(res.code ===0 ){
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisble: true
                })
            }
        })*/
        console.log('log item.', this.state.selectedItem[0][0])
        this.setState({
            orderInfo: {
                bike_sn: this.state.selectedItem[0][0].bike_sn,
                battery: this.state.selectedItem[0][0].battery,
                start_time: this.state.selectedItem[0][0].start_time,
                location: this.state.selectedItem[0][0].location
            },
            orderConfirmVisble: true
        })
    }

    // 结束订单
    handleFinishOrder = ()=>{
        let item = this.state.selectedItem;
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                message.success('订单结束成功')
                this.setState({
                    orderConfirmVisble: false
                })
                this.requestList();
            }
        })
    }

    openOrderDetail = ()=>{
        let item = this.state.selectedItem;
        console.log('log ids.', this.state.selectedIds)
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }
    render(){
        console.log('is change.', this.state.selectedRowKeys)
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        const data = [
            {
                order_sn: 1,
                key: 1,
                bike_sn: 'bike_001',
                user_name: '张三',
                mobile: '13250***3885',
                distance: '1233',
                total_time: '10086h',
                status: 'success',
                start_time: '2021-02-01 17:16:18',
                end_time: '2021-02-21 20:11:37',
                total_fee: 2000,
                user_pay: 1800,
                battery: 83,
                location: '天津市开发新区'
            },
            {
                order_sn: 2,
                key: 2,
                bike_sn: 'bike_002',
                user_name: '李四',
                mobile: '13250***3885',
                distance: '1222',
                total_time: '10086h',
                status: 'success',
                start_time: '2021-02-01 17:16:18',
                end_time: '2021-02-21 20:11:37',
                total_fee: 2001,
                user_pay: 1900,
                battery: 77,
                location: '北京海淀区奥林匹克公园'
            },
        ]
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={data}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedIds={this.state.selectedIds}
                        selectedItem={this.state.selectedItem}
                        pagination={this.state.pagination}
                        _this={this}
                        rowSelection="checkbox"
                    />
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisble:false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
