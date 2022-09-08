import React, { useState, useEffect } from "react";
import "./Rewards.css";

const Rewards = () => {
  // let byCustomer = {};
  // let totalPointsByCustomer = {};
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("data.json")
        .then((result) => result.json())
        .then((res) => {
          setData(res);
          setKeys(Object.keys(data.eligibleCustomers[0]));
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  });

  const calculatePoints = (amount) => {
    let points = 0;
    if (amount <= 100) {
      if (amount < 50) {
        points = 0;
      } else {
        points = (amount - 50) * 1;
      }
    } else {
      points = (amount - 100) * 2 + 50;
    }
    return points;
  };
  const tableHeader = () => {
    let headers = ["Users", "Date", "Amount", "Points"];
    return headers.map((data, idx) => {
      return <td key={idx + 1}>{data}</td>;
    });
  };

  return (
    <div>
      <h3 className="h3">
        Rewards earned between 07/08/2022 and 09/08/2022 per Customer
      </h3>
      <table className="table-center">
        <thead>
          <tr className="th-color">{tableHeader()}</tr>
        </thead>
        <tbody>
          {keys.map((y, index) => {
            return data["eligibleCustomers"][0][y].map((val, indx) => {
              return (
                <tr key={index}>
                  <td>{y}</td>
                  {/* <td key={index}>{val.id}</td> */}
                  <td key={index + 1}>{val.purchasedDate}</td>
                  <td key={index + 1}>{val.amount}</td>
                  <td key={index + 1}>{calculatePoints(val.amount)}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Rewards;
