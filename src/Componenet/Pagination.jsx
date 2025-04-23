import React from 'react';

function Pagination({ count, totalPages, onPrev, onNext, onPageSelect }) {
  // Determine the range of pages to show
  const pageNumbers = [];

  const startPage = Math.max(1, count - 1);
  const endPage = Math.min(totalPages, startPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${count === 1 ? 'disabled' : ''}`} onClick={onPrev}>
          <a className="page-link bg-dark text-light" href="#">Previous</a>
        </li>

        {pageNumbers.map((pageNum) => (
          <li className="page-item" key={pageNum} onClick={() => onPageSelect(pageNum)}>
            <a className={`page-link ${count === pageNum ? 'bg-warning text-dark' : 'bg-dark text-light'}`} href="#">
              {pageNum}
            </a>
          </li>
        ))}

        <li className={`page-item ${count === totalPages ? 'disabled' : ''}`} onClick={onNext}>
          <a className="page-link bg-dark text-light" href="#">Next</a>
        </li>

        <li className="page-item disabled">
          <a className="page-link bg-secondary text-light" href="#">
            Page: {count} / {totalPages}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
