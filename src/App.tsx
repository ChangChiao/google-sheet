import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import poweredBy from "./powered-by-vitawind-dark.png";

function App() {
  const sendFormData = async (form: sendParam) => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwJrU0MmuJChHNy3U0wMzsXaU0j7ZhOZmikZQTqQ5v2paMR1YkF-Nv3pgBO56bcSyVGtQ/exec?" +
          combineStr(form),
        { mode: "no-cors" }
      )
        .then((res) => res.json())
        .catch((error) => console.log("error", error));
      // alert(data)
      console.log("data", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  type sendParam = {
    name: string;
    phone: string;
    date: string;
    people: string;
    child: string | undefined;
    vegetarian: string | undefined;
    smoke: string | undefined;
  };

  const combineStr = (obj: sendParam) => {
    const { name, phone, date, people, child, vegetarian, smoke } = obj;
    let strArr = [];
    for (const [key, value] of Object.entries(obj)) {
      console.log("key, value", key, value);
      strArr.push(`${key}=${value}`);
    }
    console.log(`str`, strArr.join("&"));
    return strArr.join("&");
  };
  const handForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formData = document.querySelector("#form") as HTMLFormElement;

    const form = Object.fromEntries(
      new FormData(formData).entries()
    ) as sendParam;
    const { name, phone, date, people, child, vegetarian, smoke } = form;
    const obj = {
      name,
      phone,
      date,
      people,
      child,
      vegetarian,
      smoke,
    };
    sendFormData(form);
    console.log("form", obj);
  };

  return (
    <div className="m-auto w-[500px] bg-gray-400 text-center">
      <form id="form" onSubmit={handForm} className="p-2">
        <div className="flex">
          <div>
            <label htmlFor="name">姓名</label>
            <input id="name" name="name" required type="text" />
          </div>
          <div>
            <label htmlFor="phone">電話</label>
            <input id="phone" name="phone" required type="number" />
          </div>
        </div>
        <div>
          <input className="w-full" name="date" required type="date" />
        </div>
        <div>
          人數
          <select name="people" id="" required>
            <option value="">請選擇人數</option>
            {Array.from({ length: 10 }).map((k, i) => {
              return <option value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
        <div>
          <p>其他項目</p>
          <label htmlFor="child">需要兒童座椅</label>
          <input type="checkbox" id="child" name="child" value="1" />
          <label htmlFor="vegetarian">素食餐點</label>
          <input type="checkbox" id="vegetarian" name="vegetarian" value="1" />
          <label htmlFor="smoke">吸菸區</label>
          <input type="checkbox" id="smoke" name="smoke" value="1" />
        </div>
        <button type="submit" className="w-full bg-gray-900 text-white">
          送出
        </button>
      </form>
    </div>
  );
}

export default App;
