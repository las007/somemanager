import React from 'react';
import { Card } from 'antd'
import axios from '../../axios'
import './detail.less'
export default class Order extends React.Component {

    state = {}

    componentDidMount(){
        let orderId = this.props.match.params.orderId;
        if(orderId){
            this.getDetailInfo(orderId);
        }
        this.renderMap();
    }

    getDetailInfo = (orderId)=>{
        axios.ajax({
            url:'/order/detail',
            data:{
                params:{
                    orderId: orderId
                },
                isShowLoading: false
            }
        }).then((res)=>{
            if(res.code ===0){
                this.setState({
                    orderInfo:res.result
                })
                this.renderMap(res.result);
            }
        })
    }

    renderMap = (result)=>{
        this.map = new window.BMapGL.Map('orderDetailMap');
        console.log('is map2', this.map)

        this.map.centerAndZoom('北京',11);
        // 添加地图控件
        this.addMapControl();
        // 调用路线图绘制方法
        // this.drawBikeRoute(result.position_list);
        this.drawBikeRoute();
        // 调用服务区绘制方法
        // this.drwaServiceArea(result.area);
    }

    // 添加地图控件
    addMapControl = ()=>{
        let map = this.map;
        map.addControl(new window.BMapGL.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
        map.addControl(new window.BMapGL.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }

    // 绘制用户的行驶路线
    drawBikeRoute = (positionList)=>{

        // let map = this.map;
        let startPoint = '';
        let endPoint = '';

        startPoint = new window.BMapGL.Point(316.361223,40.043776);
        let startIcon = new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{
            imageSize:new window.BMapGL.Size(36,42),
            anchor: new window.BMapGL.Size(18, 42)
        })

        let startMarker = new window.BMapGL.Marker(startPoint, { icon: startIcon});
        this.map.addOverlay(startMarker);

        var point = new window.BMapGL.Point(116.425, 39.900);
        // var marker = new window.BMapGL.Marker(point);        // 创建标注
        // map.addOverlay(marker);                     // 将标注添加到地图中
        var myIcon = new window.BMapGL.Icon('/assets/start_point.png', new window.BMapGL.Size(36, 42), {
            imageSize:new window.BMapGL.Size(36,42),
            // 指定定位位置。
            // 当标注显示在地图上时，其所指向的地理位置距离图标左上
            // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
            // 图标中央下端的尖角位置。
            anchor: new window.BMapGL.Size(10,25),
            // 设置图片偏移。
            // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
            // 需要指定大图的偏移位置，此做法与css sprites技术类似。
            // imageOffset: new window.BMapGL.Size(0, 0 - 25)   // 设置图片偏移
        });
        // 创建标注对象并添加到地图
        var marker = new window.BMapGL.Marker(point, {icon: myIcon});
        this.map.addOverlay(marker);

        var point2 = new window.BMapGL.Point(116.373, 39.915);
        // var marker = new window.BMapGL.Marker(point);        // 创建标注
        // map.addOverlay(marker);                     // 将标注添加到地图中
        var myIcon2 = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42), {
            imageSize:new window.BMapGL.Size(36,42),
            anchor: new window.BMapGL.Size(10,25),
        });
        // 创建标注对象并添加到地图
        var marker2 = new window.BMapGL.Marker(point2, {icon: myIcon2});
        this.map.addOverlay(marker2);

        var polyline = new window.BMapGL.Polyline([
            new window.BMapGL.Point(116.373, 39.915),
            new window.BMapGL.Point(116.399, 39.910),
            new window.BMapGL.Point(116.405, 39.920),
            new window.BMapGL.Point(116.425, 39.900)
        ], {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5});
        this.map.addOverlay(polyline);

        var polygon = new window.BMapGL.Polygon([
            new window.BMapGL.Point(116.339112,39.920977),
            new window.BMapGL.Point(116.415243,39.863063),
            new window.BMapGL.Point(116.513226,39.867988),
            new window.BMapGL.Point(116.501772,39.921364),
            new window.BMapGL.Point(116.51248,39.92893),
            new window.BMapGL.Point(116.397112,39.935977),
        ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});
        this.map.addOverlay(polygon);
        /*if (positionList.length>0){
            let first = positionList[0];
            let last = positionList[positionList.length-1];
            // startPoint = new window.BMapGL.Point(first.lon,first.lat);
            startPoint = new window.BMapGL.Point(316.361223,40.043776);
            let startIcon = new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{
                imageSize:new window.BMapGL.Size(36,42),
                anchor: new window.BMapGL.Size(18, 42)
            })

            let startMarker = new window.BMapGL.Marker(startPoint, { icon: startIcon});
            this.map.addOverlay(startMarker);

            endPoint = new window.BMapGL.Point(last.lon, last.lat);
            let endIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42), {
                imageSize: new window.BMapGL.Size(36, 42),
                anchor: new window.BMapGL.Size(18, 42)
            })
            let endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon });
            this.map.addOverlay(endMarker);

            // 连接路线图
            let trackPoint = [];
            for(let i=0;i<positionList.length;i++){
                let point = positionList[i];
                trackPoint.push(new window.BMapGL.Point(point.lon, point.lat));
            }

            let polyline = new window.BMapGL.Polyline(trackPoint,{
                strokeColor:'#1869AD',
                strokeWeight:3,
                strokeOpacity:1
            })
            this.map.addOverlay(polyline);
            this.map.centerAndZoom(endPoint, 11);
        }*/

    }

    // 绘制服务区
    drwaServiceArea = (positionList)=>{
        // 连接路线图
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMapGL.Point(point.lon, point.lat));
        }
        // 绘制服务区
        let polygon = new window.BMapGL.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity:0.4
        })
        this.map.addOverlay(polygon);
    }

    render(){
        const info = this.state.orderInfo || {};
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <img src='/assets/start_point.png' alt="alt."/>

                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode === 1 ?'服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance/1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}
