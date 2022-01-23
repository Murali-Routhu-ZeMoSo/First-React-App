import React from "react";

export default function Ingredient({ amount, name }) {
  return (
    <>
      <span style={{ paddingRight: "10px" }}>{name}</span>
      <span>{amount}</span>
    </>
  );
}
