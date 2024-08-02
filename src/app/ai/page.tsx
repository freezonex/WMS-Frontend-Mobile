"use client";
import React, { useState } from "react";
import { Form, Input, Card } from "antd-mobile";

import { getAIAnswers } from "@/actions/ai";

export default function Material() {
  const [qustionList, setQustionList] = useState<any[]>([]);
  const [question, setQuestion] = useState("");
  const askQustion = () => {
    getAIAnswers({
      question: question,
    }).then((res: any) => {
      let answer = res.answer;
      if (res.error) {
        answer = "The system is busy";
      }
      setQustionList([
        ...qustionList,
        {
          question: question,
          answer: answer,
        },
      ]);
    });
  };
  return (
    <>
      <div className="ai">
        {qustionList.map((item, index) => (
          <div className="content" key={index}>
            <Card
              headerStyle={{
                color: "gray",
              }}
              title={`Q: ${item.question}`}
            >
              {item.answer}
            </Card>
          </div>
        ))}
        <div className="footer">
          <Form layout="horizontal">
            <Form.Item
              extra={
                <div>
                  <a onClick={askQustion}>Send</a>
                </div>
              }
            >
              <Input
                placeholder="Ask me a question"
                value={question}
                onChange={(val) => {
                  setQuestion(val);
                }}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
