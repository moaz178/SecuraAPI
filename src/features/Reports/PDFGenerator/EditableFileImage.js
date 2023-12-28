import React, { FC, useRef, useState } from "react";
import { Image } from "@react-pdf/renderer";
import compose from "../styles/compose";

const EditableFileImage = ({
  className,
  placeholder,
  value,
  width,
  pdfMode,
}) => {
  if (pdfMode) {
    if (value) {
      return (
        <Image
          style={{
            ...compose(`image ${className ? className : ""}`),
            maxWidth: width,
          }}
          src={value}
        />
      );
    } else {
      return <></>;
    }
  }

  return (
    <div
      className={`image ${value ? "mb-5" : ""} ${className ? className : ""}`}
    >
      {/* {!value ? (
        <button type="button" className="image__upload" onClick={handleUpload}>
          {placeholder}
        </button>
      ) : (
        <>
          <img
            src={value}
            className="image__img"
            alt={placeholder}
            style={{ maxWidth: width || 100 }}
          />
        </>
      )} */}
      <img
        src={value}
        className="image__img"
        alt={placeholder}
        style={{ maxWidth: width || 100 }}
      />

      {/* <button type="button" className="image__change" onClick={handleUpload}>
        Change Image
      </button>

      <input
        ref={fileInput}
        tabIndex={-1}
        type="file"
        accept="image/*"
        className="image__file"
        onChange={handleChangeImage}
      /> */}
    </div>
  );
};

export default EditableFileImage;
