import React from "react";
import ItemsComponent from "./ItemsComponent";

function Content() {
  const elementos = [
    { id: 1, monto: 20000, tipo: "ingreso" },
    { id: 2, monto: 5000, tipo: "egreso" },
    { id: 3, monto: 2000, tipo: "egreso" },
    { id: 4, monto: 2000, tipo: "ingreso" },
  ];
  const obj1 = { monto: 20000, tipo: "ingreso" };
  // const monto = obj1.monto
  const { monto } = obj1; //destructuring
  // console.log(monto);

  const [ingreso1, ingreso2] = elementos;
  // console.log(ingreso2);

  return (
    <div className="content">
      <ItemsComponent items={elementos} />
    </div>
  );
}

export default Content;
