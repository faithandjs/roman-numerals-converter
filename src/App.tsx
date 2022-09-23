import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [roman, setRoman] = useState("-");

  const numerals = (n: number) => {
    switch (n) {
      case 1:
        return "I";
      case 5:
        return "V";
      case 10:
        return "X";
      case 50:
        return "L";
      case 100:
        return "C";
      case 500:
        return "D";
      case 1000:
        return "M";
      default:
        return "-";
    }
  };
  const convert = (num: number) => {
    let finalNumerals = "";
    const numStr = num.toString();
    const charOne = +numStr.charAt(0);
    const length = numStr.length;

    let senior: number = 0;
    let half: number = 0;
    let junior: number = 0;
    let base = "";
    switch (length) {
      case 1:
        junior = 1;
        half = 5;
        senior = 10;
        break;
      case 2:
        junior = 10;
        half = 50;
        senior = 100;
        break;
      case 3:
        junior = 100;
        half = 500;
        senior = 1000;
        break;
      case 4:
        junior = 1000;
        break;
      default:
        break;
    }
    if (charOne === 1 || charOne === 5) finalNumerals = numerals(num);
    if (charOne === 4) finalNumerals = numerals(junior) + numerals(half);
    if (charOne === 9) finalNumerals = numerals(junior) + numerals(senior);
    if (charOne > 5 && charOne < 9) base = numerals(half);
    if ((charOne > 5 && charOne < 9) || (charOne > 1 && charOne < 4)) {
      const count = charOne > 5 && charOne < 9 ? charOne - 5 : charOne;
      // console.log(count);
      for (let i = 0; i < count; i++) {
        base += numerals(junior);
      }
      finalNumerals = base
    }

    console.log(finalNumerals);
    return finalNumerals;
  };
  const toNumerals = (num: number) => {
    const numStr = num.toString();
    let rom: any = "";
    if (numStr.length > 1) {
      for (let i = 0; i < numStr.length; i++) {
        const iChar = numStr.charAt(i);
        if (+iChar === 0) continue;
        const noOfZeros = numStr.length - i - 1;
        let placeValue = iChar;
        for (let j = 0; j < noOfZeros; j++) {
          placeValue = placeValue + "0";
        }
        console.log(placeValue);
        rom += convert(+placeValue);
      }
      console.log (rom)
    } else {
      rom = convert(num);
    }
    setRoman(rom)
  };
  return (
    <div className="App">
      <div className="body">
        <div className="card">
          <h5>Roman</h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toNumerals(+value);
            }}
          >
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit">go</button>
          </form>
          <div className="card__display">{roman}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
