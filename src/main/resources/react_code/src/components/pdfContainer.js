import React, {Component} from 'react';

class App extends Component{

    componentDidMount(){
        document.querySelector("input.pdf-html").value=this.refs.pdf_container.outerHTML;
    }

   render(){
        const { pdfData } = this.props;
        const pdfWidth = window.innerWidth;

        const cssStyle = '.pdf-table{width: 100%}';
        return (
            <div id="pdf-container-parent" style={{width: pdfWidth, display: "none"}}>
                <form action="/export/pdf" target="_blank" method="POST" encType="multipart/form-data" ref="form_pdf">
                    <input className="pdf-html" name="renderedHtml" value="" type="hidden"/>
                    <input className="pdf-css" name="cssStyle" value={cssStyle} type="hidden"/>
                    <input className="pdf-filename" name="fileName" value="file" type="hidden"/>
                </form>

                <div id='pdf-container' ref='pdf_container'>
                    <div className='pdf-table'>
                        aaaa
                    </div>
                </div>
            </div>
        )
   }

}

export default App;