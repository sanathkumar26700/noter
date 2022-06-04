import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const formats = ["bold", "italic", "underline", "strike", "image", "list"];

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [],
    [{ list: "ordered" }, { list: "bullet" }],
    [],
    ["image"],
  ],
};

const RichTextEditor = ({ note, setNote }) => {
  return (
    <ReactQuill
      theme="snow"
      formats={formats}
      modules={modules}
      placeholder="Add notes here..."
      className={`rich-text-editor ${note.color}`}
      id="content"
      value={note.content}
      onChange={(value) => setNote((prev) => ({ ...prev, content: value }))}
    />
  );
};

export { RichTextEditor };