import React from 'react';
import { Form, Input } from 'antd';
import './form.css';

const MyForm = ({ invoiceFormData }) => {
  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  console.log('child get invoiceFormData = ', invoiceFormData);

  var newInvoiceFormData= {}

  for (var key in invoiceFormData[0]) {
    var newKey = key.charAt(0).toUpperCase() + key.slice(1);
    var parts = newKey.split("_");
    if (parts.length > 1) {
      newKey = parts.map((part) => {
        return part.charAt(0).toUpperCase() + part.slice(1);
      }).join(" ");
    }
    newInvoiceFormData[newKey] = invoiceFormData[0][key];
  }

  const invoiceFormArr = [];
  for(var key in newInvoiceFormData){
    invoiceFormArr.push(
    <Form.Item key={key} label={key} name={key}>
          <Input defaultValue={newInvoiceFormData[key]} disabled />
    </Form.Item>)
  }

  return (
    <Form onFinish={onFinish}>
      {invoiceFormArr}
    </Form>
  );
};

export default MyForm;