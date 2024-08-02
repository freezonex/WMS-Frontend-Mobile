"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Card
} from "antd-mobile";

import { fetchAIAnswer } from "@/actions/supos";

export default function Material() {
  const [qustionList, setQustionList] = useState([{ 'qustion': 'q1111', 'answer': 'a1111' }]);
  const [qustion, setQustion] = useState('');

  useEffect(() => {
    console.warn(qustion);
  });
  const askQustion = () => {
    qustionList.push({ 'qustion': qustion, 'answer': qustion + 'aaaaa' });
    // fetchAIAnswer(qustion)
    //   .then((res: any) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     Toast.show({
    //       icon: "fail",
    //       content: e,
    //     });
    //   });
  };
  return (
    <>
      <div className="ai">
        {qustionList.map((item, index) => (
          <div className="content" key={index}>
            <Card
              headerStyle={{
                color: "gray"
              }}
              title={item.qustion}
            >
              {item.answer}
            </Card>

          </div>
        ))}
        <div className="footer">
          <Form layout='horizontal'>
            <Form.Item
              extra={
                <div>
                  <a onClick={askQustion} >Send</a>
                </div>
              }
            >
              <Input placeholder='Ask me a question' value={qustion}
                onChange={val => {
                  setQustion(val)
                }} />
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
