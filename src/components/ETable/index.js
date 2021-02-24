import React from 'react';
// import Utils from './../../utils/utils'
import { Table } from 'antd';

export default class ETable extends React.Component{

    onRowClick = (index,record)=>{
        let rowSelection = this.props.rowSelection;
        if (rowSelection==='checkbox'){
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectedItem = this.props.selectedItem;
            let selectedIds = this.props.selectedIds;

            console.log('ids.', index, record, selectedIds)
            console.log('is key.', record.map(dd => dd.key))

            /*if (selectedIds){
                const i = selectedIds.indexOf(index);
                if(i === -1){
                    console.log('log plus.', i)

                    selectedIds.push(index);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                }else{
                    console.log('delete.')
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i, 1);
                    selectedItem.splice(i, 1);
                }
            }else{
                console.log('temp.', record, index, record[0].key)
                selectedIds = index;
                selectedRowKeys = index;
                selectedItem = [record];
            }*/


            selectedIds = record.map(dd => dd.key);
            selectedRowKeys = index;
            selectedItem = [record];
            this.props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds)
        }else{
            let selectedRowKeys = index;
            let selectedItem = record;
            this.props.updateSelectedItem(selectedRowKeys, selectedItem)
        }
    }

    tableInit = ()=>{
        let row_selection = this.props.rowSelection;

        let selectedRowKeys = this.props.selectedRowKeys;
        console.log('init.', row_selection, selectedRowKeys)
        const rowSelection = {
            type:'radio',
            selectedRowKeys,

            /*onChange:(selectedRowKeys,selectedRows)=>{
                // console.log('is row.', selectedRowKeys, selectedRows)
                // this.onRowClick(selectedRowKeys, selectedRows)

                if (!row_selection){
                    return;
                }
                console.log('is click.')
                this.onRowClick(selectedRowKeys, selectedRows);
            }*/
            onChange:(selectedRowKeys,selectedRows)=>{
                this.onRowClick(selectedRowKeys, selectedRows);
                console.log('some msg.', selectedRowKeys, selectedRows)

                /*this.props._this.setState({
                    selectedRowKeys,
                    selectedRows
                })*/
            }
        }
        if (row_selection === false || row_selection === null){
            row_selection = false;
        } else if (row_selection === 'checkbox'){
            rowSelection.type = 'checkbox';
            rowSelection.onChange = (selectedRowKeys,selectedRows)=>{
                this.onRowClick(selectedRowKeys, selectedRows);

                /*this.props._this.setState({
                    selectedRowKeys,
                    selectedRows
                })*/
            }
        } else {
            row_selection = 'radio';
        }
        return <Table
            bordered
            {...this.props}
            rowSelection={row_selection ? rowSelection:null}
            /*onRow={(record, index) => {
                return {
                    onClick: () => {
                        console.log('is some.')
                        if (!row_selection){
                            console.log('return.')
                            return;
                        }
                        console.log('is click.')
                        this.onRowClick(record, index);
                    }
                };
            }}*/
        />
    }

    render(){
        return (<div>
            { this.tableInit()}
        </div>);
    }
}
