import React, {Component} from 'react';
import ExportTableDetail from './exportTableDetails';

class App extends Component{

    componentDidMount(){
        document.querySelector("input.pdf-html").value=this.refs.pdf_container.outerHTML;
    }

   render(){
        const { tabIndex, tableDataSource } = this.props;
        const pdfWidth = window.innerWidth;

        const cssStyle = '*{padding:0; margin:0} body {font-family:simhei} .pdf-th,.pdf-td{display: inline-block; padding:5px; border: 1px solid #ccc; width: 7%; height:100%}';
        return (
            <div id="pdf-container-parent" style={{width: pdfWidth, display: "none"}}>
                <form action="/export/pdf" target="_blank" method="POST" encType="multipart/form-data" ref="form_pdf">
                    <input className="pdf-html" name="renderedHtml" value="" type="hidden"/>
                    <input className="pdf-css" name="cssStyle" value={cssStyle} type="hidden"/>
                    <input className="pdf-filename" name="fileName" value="file" type="hidden"/>
                </form>

                <div id='pdf-container' ref='pdf_container'>
                    <ExportTableDetail tabIndex={tabIndex} dataSource={tableDataSource}/>
                </div>
            </div>
        )
   }

}

export default App;