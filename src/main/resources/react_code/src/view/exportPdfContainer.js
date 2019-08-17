import React, {Component} from 'react';
import ExportTableDetails from './exportTableDetails';
import ExportChartDetails from './exportChartDetails';

class App extends Component{

   render(){
        const { tabIndex, tableDataSource, chartDataSource } = this.props;
        const pdfWidth = window.innerWidth;

        //size:A4
        let cssStyle = '@page{margin:40px 20px 40px 20px;} *{padding:0;margin:0;font-size:10px;} body{font-family:simhei;} ';
        cssStyle = cssStyle + '.pdf-table{border-width:0 0 1px 1px;border-style:solid;border-color:#ccc;} ';
        cssStyle = cssStyle + '.pdf-th,.pdf-td{display:inline-block;padding:2px;border-width: 1px 1px 0 0;border-style:solid;border-color:#ccc;border-collapse:collapse;width:5%;height:20px;text-align:center;vertical-align:middle;} ';
        cssStyle = cssStyle + '.useType{width:7%} .rukuNumber,.chukuNumber,.rukuDate,.chukuDate{width:6%} .name,.rukuDate,.chukuDate,.checkoutDate{width:8%} .rownum{width:4%}';
        return (
            <div id="pdf-container-parent" style={{width: pdfWidth, display: "none"}}>
                <form action="/export/pdf" target="_blank" method="POST" encType="multipart/form-data" ref="form_pdf">
                    <input className="pdf-html" name="renderedHtml" value="" type="hidden"/>
                    <input className="pdf-css" name="cssStyle" value={cssStyle} type="hidden"/>
                    <input className="pdf-filename" name="fileName" value="file" type="hidden"/>
                </form>

                <div id='pdf-container' ref='pdf_container'>
                    <div className="">
                        <ExportTableDetails tabIndex={tabIndex} dataSource={tableDataSource}/>
                    </div>
                    <div>
                        <ExportChartDetails dataSource={chartDataSource}/>
                    </div>
                </div>
            </div>
        )
   }

}

export default App;