import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import poweredBy from "./powered-by-vitawind-dark.png";

function App() {
  const sendFormData = async (form: sendParam) => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyBrrtAe44anJZ5NmmQ7lwRC42veFd8dH4UMKd6Vr2Er3iq6bLSgV8BJWIQ2fFCyJb8Gw/exec",
        {
          mode: "no-cors",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: setFormBody(form),
        }
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
    child?: string | undefined;
    vegetarian?: string | undefined;
    smoke?: string | undefined;
  };

  const setFormBody = (obj: sendParam) => {
    let formBody = [];
    for (const [key, value] of Object.entries(obj)) {
      //     strArr.push(`${key}=${value}`);
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      if (encodedValue) formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
  };

  // const combineStr = (obj: sendParam) => {
  //   let strArr = [];
  //   for (const [key, value] of Object.entries(obj)) {
  //     strArr.push(`${key}=${value}`);
  //   }
  //   // console.log(`str`, strArr.join("&"));
  //   return strArr.join("&");
  // };
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
    <div className="m-auto w-[100%] py-2 text-primary-500 sm:max-w-[834px]">
      <h1 className="text-center text-[32px] font-bold">六角西餐廳</h1>
      <form id="form" onSubmit={handForm} className="p-2">
        <div className="block sm:flex">
          <div className="w-full pb-2">
            <label className="block py-2" htmlFor="name">
              姓名
            </label>
            <input
              className="w-full"
              id="name"
              name="name"
              required
              type="text"
            />
          </div>
          <div className="w-full pb-2 sm:pl-2">
            <label className="block py-2" htmlFor="phone">
              電話
            </label>
            <input
              className="w-full"
              id="phone"
              name="phone"
              required
              type="tel"
            />
          </div>
        </div>
        <div className="pb-2">
          <label className="block py-2" htmlFor="date">
            日期
          </label>
          <input
            className="w-full"
            id="date"
            name="date"
            required
            type="date"
          />
        </div>
        <div className="pb-2">
          <label className="block py-2" htmlFor="people">
            人數
          </label>
          <select
            className="w-full text-gray-800"
            name="people"
            id="people"
            required
          >
            <option value="">請選擇人數</option>
            {Array.from({ length: 10 }).map((k, i) => {
              return (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
        </div>
        <div className="pb-2">
          <p className="py-2">其他項目</p>
          <ul className="pb-6">
            <li className="flex items-center">
              <input
                className=""
                type="checkbox"
                id="child"
                name="child"
                value="1"
              />
              <label className="pl-2" htmlFor="child">
                需要兒童座椅
              </label>
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                id="vegetarian"
                name="vegetarian"
                value="1"
              />
              <label className="pl-2" htmlFor="vegetarian">
                素食餐點
              </label>
            </li>
            <li className="flex items-center">
              <input type="checkbox" id="smoke" name="smoke" value="1" />
              <label className="pl-2" htmlFor="smoke">
                吸菸區
              </label>
            </li>
          </ul>
        </div>
        <button
          type="submit"
          className="h-[38px] w-full bg-gray-900 text-white"
        >
          送出
        </button>
      </form>
    </div>
  );
}

export default App;
