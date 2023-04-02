import React from "react";
import "./css/errorComponent.css";

type propsTypes = {
  message: string;
  isNotError: boolean;
};

export default function ErrorComponent({
  message,
  isNotError = true,
}: propsTypes) {
  return (
    <div className={`errorSection ${isNotError && "isNotError"}`}>
      <p>{message}</p>
    </div>
  );
}
