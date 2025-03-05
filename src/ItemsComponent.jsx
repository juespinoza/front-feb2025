import React, { useState } from "react";

function ItemsComponent({ items }) {
  console.log(items);
  const [list, setList] = useState(items);
  // list.push({ monto: 1000, tipo: "ingreso" });
  // console.log(list);
  const esIngreso = (tipo) => tipo === "ingreso";

  return (
    <div>
      <h3>
        Saldo:{" "}
        {list.reduce(
          (saldo, item) =>
            item.tipo === "ingreso" ? saldo + item.monto : saldo - item.monto,
          0
        )}
      </h3>
      <ul>
        {list
          // .filter((item) => item.tipo !== "ingreso" && item.monto > 2000)
          .map((item) => {
            return (
              <li className={`${esIngreso(item.tipo) ? "ingreso" : "egreso"}`}>
                {`${esIngreso(item.tipo) ? "+" : "-"}` + item.monto}
              </li>
            );
          })}
        {/* <li className={`${esIngreso(items[0].tipo) ? "ingreso" : "egreso"}`}>
          {`${esIngreso(items[0].tipo) ? "+" : "-"}` + items[0].monto}
        </li>
        <li className={`${esIngreso(items[1].tipo) ? "ingreso" : "egreso"}`}>
          {`${esIngreso(items[1].tipo) ? "+" : "-"}` + items[1].monto}
        </li>
        <li className={`${esIngreso(items[2].tipo) ? "ingreso" : "egreso"}`}>
          {`${esIngreso(items[2].tipo) ? "+" : "-"}` + items[2].monto}
        </li> */}
      </ul>
    </div>
  );
}

export default ItemsComponent;
