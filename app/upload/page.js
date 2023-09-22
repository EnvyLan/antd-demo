'use client'

import { useState } from 'react';
import { Upload, message, Button, Icon, Input } from 'antd';
import MyForm from './form';
import './page.css'

const UploadFile = () => {
    const [fileContent, setFileContent] = useState('');
    const [userInputValue, setUserInputValue] = useState('');
    const [filePathArr, setFilePathArr] = useState([]);
    const [invoiceFormData, setInvoiceFormData] = useState([]);
    const [isShowForm, setIsShowForm] = useState(false);

    const handleFileUpload = (event) => {
        const data = {
            words: userInputValue,
            file_list: filePathArr
        }
        console.log('data', JSON.stringify(data));

        fetch('http://20.167.42.140:3000/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(info => {
                console.log('data2', info);
                if (info.data) {
                    setIsShowForm(true);
                    setFileContent('Total amount is '+info.data.total_amount);
                    setInvoiceFormData(info.data.invoices);
                    console.log('info.data.invoices',info.data.invoices);
                }else{
                    message.error(data.msg);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleInputChange = (event) => {
        setUserInputValue(event.target.value);
    }

    const props = {
        // multiple:true,
        name: 'file',
        action: 'http://20.167.42.140:3000/upload',
        method: 'post',
        onChange(data) {
            // res data => {
            //     file: {
            //     uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
            //     name: 'xx.png'   // 文件名
            //     status: 'done', // 状态有：uploading done error removed
            //     response: '{"status": "success"}', // 服务端响应内容
            //     linkProps: '{"download": "image"}', // 下载链接额外的 HTML 属性
            // },
            //     fileList: [ /* ... */ ],
            //     event: { /* ... */ },
            //   }

            console.log('data1', data);
            //单个文件
            if (data.file.status == 'done') {
                const newArr = [...filePathArr, data.file.response.file_path]
                setFilePathArr(newArr);
            } else if (data.file.status == 'error') {
                message.error(`${data.file.name} file upload failed.`);
            }
        },
    };

    return (
        <>
            <div className="container">
                <h1> Upload File</h1>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Click to upload
                    </Button>
                </Upload>
                <Input className='user-input' value={userInputValue} placeholder='input something...' onChange={handleInputChange} />
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" onClick={handleFileUpload}>Execute</Button>
                </div>
                <div className="result">{fileContent}</div>
            </div >

            {isShowForm && <div className='invoiceInfoList'>
                <div className="container">
                    <MyForm invoiceFormData={invoiceFormData} />
                </div >
            </div>}
        </>
    );
}

export default UploadFile;