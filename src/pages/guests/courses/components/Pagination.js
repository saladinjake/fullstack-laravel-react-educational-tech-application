import React from "react";
import { Styles } from "../styles/pagination.js";

const Pagination = ({ coursePerPage, totalCourses, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCourses.length / coursePerPage); i++) {
    pageNumbers.push(i);
  }

  const execPaginate = (i, num) => {
    paginate(num);
  };
  return (
    <Styles>
      {/* Pagination */}
      <ul className="pagination-box list-unstyled list-inline">
        {pageNumbers.map((number, index) => {
          return (
            <li
              className={
                index + 1 === currentPage
                  ? "list-inline-item active"
                  : "list-inline-item"
              }
              key={number}
              onClick={() => execPaginate(index + 1, number)}
            >
              {number}
            </li>
          );
        })}
      </ul>
    </Styles>
  );
};

export default Pagination;
