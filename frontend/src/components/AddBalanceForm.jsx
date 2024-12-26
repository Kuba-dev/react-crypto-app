import React from "react";
import { useState } from "react";
import {
  Checkbox,
  Form,
  AutoComplete,
  Button,
  Cascader,
  Space,
  Input,
  InputNumber,
  Row,
  Select,
  Col,
} from "antd";

export default function AddBalanceForm({ onClose }) {
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      form={form}
      name="Add Balance"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 12,
      }}
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input
          style={{
            width: "100%",
          }}
        ></Input>
      </Form.Item>

      <Form.Item
        name="donation"
        label="Donation"
        rules={[
          {
            required: true,
            message: "Please input donation amount!",
          },
          {
            type: "number",
            min: 1,
            message: "You cannot top up your balance with less than $1",
          },
        ]}
      >
        <InputNumber
          addonAfter={suffixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        label="Card Number"
        name="cardNumber"
        rules={[
          {
            required: true,
            message: "Please input your card!",
          },
          {
            type: "cardNumber",
            message: "The input is not valid card number!",
          },
          () => ({
            validator(_, value = "") {
              if (/^\d{16}$/.test(value.replaceAll(" ", "")) || !value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Invalid card number!"));
            },
          }),
        ]}
      >
        <Input placeholder="1234 5678 9012 3456" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Until"
        name="until"
        style={{
          marginBottom: 0,
        }}
        required="true"
      >
        <Form.Item
          name="untilDay"
          rules={[
            {
              required: true,
              message: "Please input your expiration date!",
            },
            () => ({
              validator(_, value) {
                if ((+value >= 1 && +value <= 31) || !value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Invalid card expiration date!")
                );
              },
            }),
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 4px)",
          }}
        >
          <Input placeholder="Day" />
        </Form.Item>

        <Form.Item
          name="untilMonth"
          rules={[
            {
              required: true,
              message: "Please input your expiration date!",
            },
            () => ({
              validator(_, value) {
                if ((+value >= 1 && +value <= 12) || !value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Invalid card expiration date!")
                );
              },
            }),
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 4px)",
            marginLeft: "8px",
          }}
        >
          <Input placeholder="Month" />
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="CVC"
        name="cvc"
        rules={[
          {
            type: "cvc",
            message: "The input is not valid CVC",
          },
          {
            required: true,
            message: "Please input your CVC!",
          },
          () => ({
            validator(_, value) {
              if (/^\d{3}$/.test(+value) || !value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("CVC code consists of 3 digits!")
              );
            },
          }),
        ]}
      >
        <Input placeholder="123" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Balance
        </Button>
      </Form.Item>
    </Form>
  );
}
