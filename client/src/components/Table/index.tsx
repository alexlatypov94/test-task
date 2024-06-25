import { UserResponse } from '../../interfaces/UserInterface';
import { Pagination } from '../Pagination';
import { TableRow } from '../TableRow';
import styles from './style.module.css';

type TableProps = {
  userData: UserResponse;
  onRemoveUser: (idNumber: number) => void;
  handleChangePage: (pageNumber: number) => void;
};

export const Table = ({
  userData,
  onRemoveUser,
  handleChangePage,
}: TableProps) => {
  if (!userData.users.length) return <div>No users yet</div>;

  const pageCount = Math.ceil(userData.totalUsers / 10);

  return (
    <>
      <table className={styles.tableWrapper}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>ID</th>
            <th>Phone</th>
            <th>IP</th>
            <th>Country</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.users.map((user) => {
            return (
              <TableRow
                user={user}
                key={user.idNumber}
                onRemoveUser={() => onRemoveUser(user.idNumber)}
              />
            );
          })}
        </tbody>
      </table>
      <Pagination
        handlePageClick={({ selected }) => handleChangePage(selected + 1)}
        pageCount={pageCount}
      />
    </>
  );
};
