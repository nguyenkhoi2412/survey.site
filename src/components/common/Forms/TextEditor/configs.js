// https://quilljs.com/docs/modules/toolbar/
const toolbar = {
  container: [
    // [{ 'font': [] }],
    // [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline"], // toggled buttons
    [{ color: [] }, { background: [] }, { align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "code"],
    ["image"],
    ["clean"], // remove formatting button
  ],
};

// https://quilljs.com/docs/modules/clipboard/
const clipboard = {
  matchVisual: false,
};

// https://quilljs.com/docs/modules/history/
const history = {
  delay: 2000,
  maxStack: 500,
  userOnly: true,
};

// https://quilljs.com/docs/formats/
export const formats = [
  "bold",
  "italic",
  "underline",
  "left",
  "center",
  "right",
  "justify",
  "color",
  "background",
  "image",
  "video",
  "link",
  "code",
  "list",
  "bullet",
  "indent",
  "clean",
  "imageBlot", // Optinal if using custom formats use for image upload
];

export const modules = {
  toolbar,
  clipboard,
  history,
};
