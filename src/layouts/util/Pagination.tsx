import React from "react";

interface PaginationInterface {
  currentPage: number;
  totalPage: number;
  pagination: any;
}

const Pagination: React.FC<PaginationInterface> = (props) => {
  const listPage = [];
  // xu ly neu trang hien tai = 1
  if (props.currentPage === 1) {
    listPage.push(props.currentPage);
    if (props.totalPage >= props.currentPage + 1) {
      listPage.push(props.currentPage + 1);
    }
    if (props.totalPage >= props.currentPage + 2) {
      listPage.push(props.currentPage + 2);
    }
  }

  // xu ly neu trang hien tai lon hon 1
  if (props.currentPage > 1) {
    // Trang -2
    if (props.currentPage >= 3) {
      listPage.push(props.currentPage - 2);
    }
    //Trang -1
    if (props.currentPage >= 2) {
      listPage.push(props.currentPage - 1);
    }

    //ad them trang hien tai
    listPage.push(props.currentPage);

    //Trang +1
    if (props.totalPage >= props.currentPage + 1) {
      listPage.push(props.currentPage + 1);
    }

    //Trang +2
    if (props.totalPage >= props.currentPage + 2) {
      listPage.push(props.currentPage + 2);
    }
  }
  console.log(props.currentPage);
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item" onClick={() => props.pagination(1)}>
            <button className="page-link">first page</button>
          </li>
          {listPage.map((page) => (
            <li className="page-item" onClick={() => props.pagination(page)}>
              <button
                className={
                  "page-link" + (props.currentPage === page ? "active" : "")
                }
              >
                {page}
              </button>
            </li>
          ))}
          <li
            className="page-item"
            onClick={() => props.pagination(props.totalPage)}
          >
            <button className="page-link">last page</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
