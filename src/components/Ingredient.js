import React from "react";

export default function Ingredient({ amount, name }) {
  return (
    <>
      <span>{name}</span>
      <span>{amount}</span>
    </>
  );
}
