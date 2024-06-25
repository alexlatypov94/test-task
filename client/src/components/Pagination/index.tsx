import ReactPaginate from 'react-paginate';
import styles from './style.module.css';

type PaginationProps = {
  handlePageClick: (event: { selected: number }) => void;
  pageCount: number;
};

export const Pagination = ({ handlePageClick, pageCount }: PaginationProps) => {
  return (
    <ReactPaginate
      activeClassName={`${styles.item} ${styles.active} `}
      breakClassName={`${styles.item} ${styles.breakMe} `}
      containerClassName={`${styles.pagination}`}
      disabledClassName={`${styles.disabledPage}`}
      nextClassName={`${styles.item} ${styles.next} `}
      pageClassName={`${styles.item} ${styles.paginationPage} `}
      previousClassName={`${styles.item} ${styles.previous} `}
      nextLabel='>'
      onPageChange={handlePageClick}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
};
