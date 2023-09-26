import React, { useState } from "react";
import "./SkeletonLoader.css";
const ScanResults = () => {
  return (
    <div class="skeleton">
      <div class="skeleton-left">
        <div class="line h17 w40 m10"></div>
        <div class="line m10"></div>
        <div class="line h17 w50 m10"></div>
        <div class="line  w75"></div>
        <div class="line h17 w40 m10"></div>
        <div class="line m10"></div>
        <div class="line h8 w50 m10"></div>
        <div class="line  w75 "></div>
      </div>
    </div>
  );
};

export default ScanResults;
