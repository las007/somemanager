
// import axios from 'axios'
import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
import Utils from './../utils/utils'

export default class Axios {

    static requestList(_this,url,params,isMock){
        var data = {
            params: params,
            isMock,
            isShowLoading: false,
        }
        this.ajax({
            url,
            data
        }).then((data)=>{
            if (data && data.result){
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        });
    }

    static jsonp(opts) {
        return new Promise((resolve, reject) => {
            JsonP(opts.url, {
                params: 'callback'
            }, function (err, response) {
                //to do
                // debugger;
                if (response) {
                    resolve(response)
                } else {
                    reject(response.message)
                }
            })
        })
    }

    static ajax(options){
        let loading;
        if (options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            console.log('log ele.', loading);
            loading.style.display = 'block';
            // loading.style.display = 'none';
        }
        let baseApi = '';
        if(options.isMock){
            baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        }else{
            baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status === 200){
                    let res = response.data;
                    if (res.code === '0'){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }
}
