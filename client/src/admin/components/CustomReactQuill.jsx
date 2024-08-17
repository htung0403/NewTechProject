import React, { useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CustomReactQuill = React.forwardRef((props, ref) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (ref) {
      ref.current = quillRef.current;
    }
  }, [ref]);

  return <ReactQuill ref={quillRef} {...props} />;
});

export default CustomReactQuill;