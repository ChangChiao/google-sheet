import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import poweredBy from "./powered-by-vitawind-dark.png";

function App() {
  const [count, setCount] = useState(0);
  const getGoogleForm = async () => {};
  const handForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target;
    const formData = document.querySelector("#form") as HTMLFormElement;

    const form = Object.fromEntries(new FormData(formData).entries());
    const { name, phone, date } = form;
    const obj = {
      name,
      phone,
      date,
    };
    console.log("form", obj);
  };
  useEffect(() => {
    getGoogleForm();
  });
  return (
    <div className="m-auto w-[500px] bg-gray-400 text-center">
      <form id="form" onSubmit={handForm} className="p-2">
        <div className="flex">
          <div>
            <label htmlFor="name">姓名</label>
            <input id="name" name="name" type="text" />
          </div>
          <div>
            <label htmlFor="phone">電話</label>
            <input id="phone" name="phone" type="number" />
          </div>
        </div>
        <div>
          <input className="w-full" name="date" type="date" />
        </div>
        <div>
          人數
          <select name="people" id="">
            {Array.from({ length: 10 }).map((k, i) => {
              return <option>{i + 1}</option>;
            })}
          </select>
        </div>
        <div>
          <p>其他項目</p>
          <label htmlFor="child">需要兒童座椅</label>
          <input type="checkbox" id="child" />
          <label htmlFor="vegetarian">素食餐點</label>
          <input type="checkbox" id="vegetarian" />
          <label htmlFor="smoke">吸菸區</label>
          <input type="checkbox" id="smoke" />
        </div>
        <button type="submit" className="w-full bg-gray-900 text-white">
          送出
        </button>
      </form>
    </div>
  );
}

export default App;
