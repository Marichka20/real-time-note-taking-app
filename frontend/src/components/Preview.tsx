import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Preview: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="preview-container">
      <h1>Preview</h1>
      <ReactQuill
        value={content}
        readOnly={true}
        className="quill-editor"
        modules={{ toolbar: false }} // Disable toolbar
      />
    </div>
  );
};

export default Preview;
