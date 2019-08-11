import React, {Component} from 'react';
import { Upload, message, Button, Icon } from 'antd';

class App extends Component{

    render() {
        const { url, templateUrl, onFetch } = this.props;

        const options = {
            name: "file",
            action: url,
            onChange(info){
                if(info.file.status !== "uploading"){
                    console.log(info.file, info.fileList);
                }
                if(info.file.status === "done"){
                    if(onFetch){
                        onFetch();
                    }
                    message.success(info.file.name + " file uploaded successfully");
                }else if(info.file.status === "error"){
                    message.error(info.file.name + " file upload failed");
                }
            }
        }

        return (
            <div style={{textAlign: "center"}}>
                <Upload {...options}>
                    <Button>
                        <Icon type="upload" />文件上传
                    </Button>
                </Upload>
                <div style={{padding: "5px"}}>
                    请下载<a href={templateUrl} target="_blank">模板</a>
                </div>
            </div>
        )
    }

}

export default App;