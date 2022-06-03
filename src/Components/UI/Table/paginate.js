import _ from "lodash";
const paginate = (data, currentPage, rowsPerPage) => {
  const startIndex = currentPage * rowsPerPage;
  return _(data).slice(startIndex).take(rowsPerPage).value();
};

export default paginate;
