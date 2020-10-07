import React from 'react';
// import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({loading}) => {
  return (
    <div className="sweet-loading">
      <ClipLoader
        size={25}
        color={"#facd1a"}
        loading={loading}
      />
    </div>
  )
}

export default Spinner;