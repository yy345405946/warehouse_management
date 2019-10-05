import React, { Component } from 'react';
import reqwest from 'reqwest';
import Filter from './Filter';
import YearAnalysis from './YearAnalysis';
import MonthAnalysis from './MonthAnalysis';
import MonthDetailsAnalysis from './MonthDetailsAnalysis';
import '../../css/exportPdf.css';

export default class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            tableDataSource: [],
            chartDataSource: []
        }
    }

    handleSearch = (params) => {
        const { useType, startDate, endDate } = params;
        if(this.props.isSummary === 'year'){
            reqwest({
                url: '/export/year?useType='+useType+"&startDate="+startDate+"&endDate="+endDate,
                method: 'get',
                type: 'json'
            }).then(dataSource => {
                this.setState({
                    tableDataSource: dataSource
                });
            });
        }else if(this.props.isSummary === 'month'){
            reqwest({
                url: '/export/month?useType='+useType+"&startDate="+startDate+"&endDate="+endDate,
                method: 'get',
                type: 'json'
            }).then(dataSource => {
                this.setState({
                    tableDataSource: dataSource
                });
            });
        }else{
            reqwest({
                url: '/export/details?useType='+useType+"&startDate="+startDate+"&endDate="+endDate,
                method: 'get',
                type: 'json'
            }).then(dataSource => {
                this.setState({
                    tableDataSource: dataSource
                });
            });
        }
    }

    render(){
        const { tableDataSource, chartDataSource } = this.state;
        const { isSummary } = this.props;

        const pdfWidth = window.innerWidth;

        //size:A4
        let cssStyle = '@page{size:A4;margin:40px 20px 40px 20px;} *{padding:0;margin:0;font-size:10px;} body{font-family:simhei;} ';
        cssStyle = cssStyle + '.pdf-table-title{text-align:center;font-weight:200;font-size:20px;margin-bottom:10px;} ';
        cssStyle = cssStyle + '.pdf-table{border-width:0 0 1px 1px;border-style:solid;border-color:#ccc;} ';
        cssStyle = cssStyle + '.pdf-th,.pdf-td{display:inline-block;padding:2px;border-width: 1px 1px 0 0;border-style:solid;border-color:#ccc;border-collapse:collapse;width:5%;height:20px;text-align:center;vertical-align:middle;} ';
        cssStyle = cssStyle + '.useType{width:7%} .rukuNumber,.chukuNumber,.rukuDate,.chukuDate{width:6%} .name,.rukuDate,.chukuDate,.checkoutDate{width:8%} .rownum{width:4%} ';

        return (
            <span>
                <Filter onSearch={this.handleSearch} isSummary={isSummary} />
                <div id="pdf_container" ref='pdf_container'>
                    {
                        isSummary === 'year'? (
                            <YearAnalysis tableDataSource={this.state.tableDataSource} chartDataSource={this.state.chartDataSource} />
                        ) : isSummary === 'month'? (
                            <MonthAnalysis tableDataSource={this.state.tableDataSource} chartDataSource={this.state.chartDataSource} />
                        ) : (
                            <MonthDetailsAnalysis tableDataSource={this.state.tableDataSource} chartDataSource={this.state.chartDataSource} />
                        )
                    }
                </div>
                <div id="export-container">
                    <form action="/export/pdf" target="_blank" method="POST" encType="multipart/form-data" ref="form_pdf">
                        <input className="pdf-html" name="renderedHtml" value="" type="hidden"/>
                        <input className="pdf-css" name="cssStyle" value={cssStyle} type="hidden"/>
                        <input className="pdf-filename" name="fileName" value="file" type="hidden"/>
                    </form>
                </div>
            </span>
        );
    }
}