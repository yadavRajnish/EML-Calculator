import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { PieChart } from "@mui/x-charts/PieChart";

const Home = () => {
  const [principleAmount, setPrincipleAmount] = useState(500000);
  const [interest, setInterest] = useState(6.5);
  const [loanTenure, setLoanTenure] = useState(36);

  const InterestRate = interest / 100 / 12;

  const EMI = loanTenure
    ? Math.ceil(
        (principleAmount * InterestRate) /
          (1 - Math.pow(1 / (1 + InterestRate), loanTenure))
      )
    : 0;

  const totalAmount = loanTenure * EMI;

  let TotalAmountOfCredit = Math.ceil(
    (EMI / InterestRate) * (1 - Math.pow(1 + InterestRate, -loanTenure))
  );

  const TotalAmountOfInterest = Math.round(totalAmount - TotalAmountOfCredit);

  const totalAmountOfPay = TotalAmountOfInterest + principleAmount;

  function formatIndianRupees(amount) {
    return amount.toLocaleString("en-IN");
  }

  const data = [
    {
      value: principleAmount,
      key: 1,
      color: "#4888c7",
      name: "Principal Amount",
    },
    {
      value: TotalAmountOfInterest,
      key: 2,
      color: "#c4e0fa",
      name: "Total Interest",
    },
  ];

  const calculatePercentage = (value) => (value / totalAmountOfPay) * 100;

  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <div className="px-4 md:px-16 pt-6 ">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 underline">
        EMI Calculator
      </h1>
      <div className="flex flex-col md:flex-row gap-8 w-full">
        <div className="w-full md:w-1/2 pt-10 px-4">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h1 className="mb-2 text-start">Loan amount</h1>
              <div className="flex items-center justify-end">
                <span className="bg-[#c4e0fa] p-1 text-[#1976d2] pr-1 rounded-l text-xl">
                  ₹
                </span>
                <input
                  type="number"
                  value={principleAmount || ""}
                  onChange={(e) => setPrincipleAmount(e.target.value)}
                  className="bg-[#c4e0fa] text-right w-[40%] md:w-[40%] p-1 font-bold text-[#1976d2] rounded-r text-xl border-none outline-none"
                />
              </div>
            </div>
            <Slider
              value={principleAmount || ""}
              onChange={(e) => setPrincipleAmount(e.target.value)}
              aria-label="Temperature"
              defaultValue={500000}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={10}
              min={100000}
              max={10000000}
            />
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h1 className="mb-2 text-start">
                Rate of Interest &nbsp; [ p.a ]
              </h1>
              <div className="flex items-center justify-end">
                <input
                  value={interest || ""}
                  onChange={(e) => setInterest(e.target.value)}
                  type="number"
                  className="bg-[#c4e0fa] rounded-l text-right w-[45%] md:w-[40%] p-1 font-bold text-[#1976d2] text-xl border-none outline-none"
                />
                <span className="bg-[#c4e0fa] rounded-r p-1 text-[#1976d2] pr-1 text-xl">
                  %
                </span>
              </div>
            </div>
            <Slider
              aria-label="Temperature"
              defaultValue={6.5}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              value={interest || ""}
              onChange={(e) => setInterest(e.target.value)}
              step={1}
              min={1}
              max={30}
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h1 className="mb-2 text-start">Loan tenure</h1>
              <div className="flex items-center justify-end">
                <input
                  type="number"
                  value={loanTenure || ""}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  className="bg-[#c4e0fa] rounded-l text-right w-[32%] p-1 font-bold text-[#1976d2] text-xl border-none outline-none"
                />
                <span className="bg-[#c4e0fa] rounded-r p-1 text-[#1976d2] pr-1 text-xl">
                  mo.
                </span>
              </div>
            </div>
            <Slider
              aria-label="Temperature"
              defaultValue={5}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              value={loanTenure || ""}
              onChange={(e) => setLoanTenure(e.target.value)}
              step={1}
              min={1}
              max={360}
            />
          </div>

          <table className="w-full md:w-[50%] mt-10 md:mt-16">
            <tbody className="text-center">
              <tr>
                <td className="font-bold" colSpan={2}>
                  Monthly EMI
                </td>
                <td>₹{formatIndianRupees(EMI)}</td>
              </tr>
              <tr>
                <td className="font-bold" colSpan={2}>
                  Principal amount
                </td>

                <td>₹{formatIndianRupees(principleAmount)}</td>
              </tr>
              <tr>
                <td className="font-bold" colSpan={2}>
                  Total interest
                </td>
                <td>₹{formatIndianRupees(TotalAmountOfInterest)}</td>
              </tr>
              <tr>
                <td className="font-bold" colSpan={2}>
                  Total amount
                </td>
                <td>₹{formatIndianRupees(totalAmountOfPay)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
          <div className="p-4" style={{ width: "100%" }}>
            <div className="flex justify-center items-center sm:ps-1 ps-16">
              <PieChart
                series={[
                  {
                    data: data.map((item) => ({
                      ...item,
                      percentage: calculatePercentage(item.value),
                    })),
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={300}
                cornerRadius={10}
                innerRadius={30}
                outerRadius={80}
              />
            </div>
          </div>
          <div className="mt-4">
            {data.map((item, index) => (
              <div key={item.key} className="flex items-center mt-2">
                <div
                  className="w-4 h-4 mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <p className="text-sm">{`${index + 1}. ${item.name}`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
