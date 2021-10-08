export default {
  //* use for dashboard page
  stripedHtml: /(<([^>]+)>)/gi,
  //* use for frontend site
  defaultDateFormat: "YYYY-MM-DD",
  locale: {
    default: {
      lang: "vi",
      code: "vi-VN",
      language_name: "Tiếng Việt",
      date_format: "DD-MM-YYYY",
      time_format: "HH:mm",
    },
    lang: "en",
    code: "en-US",
    language_name: "English",
    date_format: "YYYY-MM-DD",
    time_format: "HH:mm",
  },
  pageSize: 50,
  GET: "get",
  INSERT: "insert",
  DELETE: "delete",
  UPDATE: "update",
};
