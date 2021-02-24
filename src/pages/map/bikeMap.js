import React from 'react';
import {Card,Form} from 'antd'
import BaseForm from '../../components/BaseForm'
import axios from './../../axios'

export default class BikeMap extends React.Component{

    state = {}
    // map = '';

    formList = [
        {
            type:'城市'
        },{
            type:'时间查询'
        },{
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            initialValue:'0',
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '行程结束' }]
        }
    ]

    requestList = ()=>{
        axios.ajax({
            url:'/map/bike_list',
            data:{
                params:this.params,
                isShowLoading: false
            },
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    total_count:res.result.total_count
                })
                // this.renderMap(res);
            }
        })
    }

    componentWillMount(){
        // this.requestList();
    }
    componentDidMount() {
        this.renderMap()
    }

    // 查询表单
    handelFilterSubmit = (filterParams)=>{
        this.params = filterParams;
        this.requestList();
    }

    // 渲染地图数据
    renderMap = (res)=>{
        // let list = res.result.route_list;
        this.map = new window.BMapGL.Map('container');
        this.map.centerAndZoom('北京',11);

/*         let gps1 = list[0].split(',');
         let startPoint = new window.BMapGL.Point(gps1[0], gps1[1]);
         let gps2 = list[list.length-1].split(',');
         let endPoint = new window.BMapGL.Point(gps2[0], gps2[1]);
         this.map.centerAndZoom(endPoint,11);

         let startPointIcon = new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{
             imageSize:new window.BMapGL.Size(36,42),
             anchor: new window.BMapGL.Size(18, 42)
         })
         let bikeMarkerStart = new window.BMapGL.Marker(startPoint, { icon: startPointIcon})
         this.map.addOverlay(bikeMarkerStart);
         let endPointIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42), {
             imageSize: new window.BMapGL.Size(36, 42),
             anchor: new window.BMapGL.Size(18,42)
         })
         let bikeMarkerEnd = new window.BMapGL.Marker(endPoint, { icon: endPointIcon })
         this.map.addOverlay(bikeMarkerEnd);*/

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

         //绘制车辆行驶路线
/*         let routeList = [];
         list.forEach((item)=>{
             let p = item.split(',');
             routeList.push(new window.BMapGL.Point(p[0],p[1]))
         })*/

         let polyLine = new window.BMapGL.Polyline([
             new window.BMapGL.Point(116.373, 39.915),
             new window.BMapGL.Point(116.399, 39.910),
             new window.BMapGL.Point(116.405, 39.920),
             new window.BMapGL.Point(116.425, 39.900)
         ],{
             strokeColor:'#ef4136',
             strokeWeight:2,
             strokeOpacity:1
         })
         this.map.addOverlay(polyLine);

         //绘制服务区
         /*let servicePointList = [];
         let serviceList = res.result.service_list;
         serviceList.forEach((item)=>{
             servicePointList.push(new window.BMapGL.Point(item.lon,item.lat))
         })*/
         let polyServiceLine = new window.BMapGL.Polyline([
             new window.BMapGL.Point(116.339112,39.920977),
             new window.BMapGL.Point(116.415243,39.863063),
             new window.BMapGL.Point(116.513226,39.867988),
             new window.BMapGL.Point(116.501772,39.921364),
             new window.BMapGL.Point(116.51248,39.92893),
             new window.BMapGL.Point(116.397112,39.935977),
             new window.BMapGL.Point(116.339112,39.920977),
         ], {
             strokeColor: 'blue',
             strokeWeight: 2,
             strokeOpacity: 0.5
         })
         this.map.addOverlay(polyServiceLine);

         // 添加地图中的自行车图标
         // let bikeList = res.result.bike_list;
         let bikeIcon = new window.BMapGL.Icon('/assets/bike.jpg',new window.BMapGL.Size(36,42),{
             imageSize: new window.BMapGL.Size(36, 42),
             anchor: new window.BMapGL.Size(18, 42)
         })

        const arr = [
            '116.359112, 39.910977',
            '116.415243, 39.873063',
            '116.501226, 39.877988',
            '116.501772, 39.891364',
            '116.47248, 39.90893',
            '116.398112, 39.925977',
        ]
         arr.forEach((item)=>{
             let p = item.split(',');
             let point = new window.BMapGL.Point(p[0],p[1]);
             let bikeMarker = new window.BMapGL.Marker(point, { icon: bikeIcon})
             this.map.addOverlay(bikeMarker);
         })

        let bikeMarker = new window.BMapGL.Marker(point, { icon: bikeIcon})
        this.map.addOverlay(bikeMarker);


        // 添加地图控件
        this.addMapControl();
    }

    // 添加地图控件
    addMapControl = ()=>{
        let map = this.map;
        map.addControl(new window.BMapGL.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
        map.addControl(new window.BMapGL.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }



    render(){
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handelFilterSubmit}/>
                </Card>
                <Card style={{marginTop:10}}>
                    {/*<div>共{this.state.total_count}辆车</div>*/}
                    <div>共{100}辆车</div>
                    <div id="container" style={{height:500}}></div>
                </Card>
            </div>
        );
    }
}
