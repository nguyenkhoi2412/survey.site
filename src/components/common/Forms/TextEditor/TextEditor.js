// import "react-quill/dist/quill.snow.css";
import "./TextEditor.less";
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import { modules, formats } from "./configs";
import axios from "axios";

const Block = Quill.import("blots/block");
Block.tagName = "DIV";
Quill.register(Block, true);

const TextEditor = (props) => {
  const { autoFocus, value, onChange, placeholder } = props;
  const quillRef = React.useRef();
  const [focus, setFocus] = React.useState(false);

  React.useEffect(() => {
    if (autoFocus) setFocus(autoFocus);
    if (focus) quillRef.current.focus();
  }, [focus]);

  const imageHandler = async () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();

      formData.append("image", file);

      // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
      const response = await axios({
        method: "post",
        url: process.env.API_IMAGE_UPLOAD,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Save current cursor state
      const range = quillRef.current.getEditorSelection();

      // Insert uploaded image
      quillRef.current
        .getEditor()
        .insertEmbed(range.index, "image", response.data.data.url);
    };
  };

  const mods = React.useMemo(
    () => ({
      ...modules,
      toolbar: {
        ...modules.toolbar,
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <>
      <ReactQuill
        theme="snow"
        ref={quillRef}
        value={value || ""}
        modules={mods}
        // formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextEditor;
