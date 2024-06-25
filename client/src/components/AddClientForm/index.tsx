import { useEffect, useState } from 'react';
import Api from '../../services/api';
import styles from './style.module.css';

type AddClientFormProps = {
  handleCloseForm: () => void;
};

export const AddClientForm = ({ handleCloseForm }: AddClientFormProps) => {
  const [ip, setIp] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
  });

  useEffect(() => {
    const getIp = async () => {
      const { data } = await Api.getIPAdress();
      setIp(data.ip);
    };
    getIp();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, idNumber, phone } = userInfo;
    const res = await Api.createUser({
      name,
      email,
      idNumber: parseInt(idNumber),
      phone,
      ip,
    }).catch(function (error) {
      if (error.response) {
        alert(error.response.data.error);
      }
    });
    if (!!res) {
      handleCloseForm();
      alert('The user was successfully added');
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.formWrapper}>
      <div className={styles.inputsWrapper}>
        <div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              pattern="^(\w\w+)$"
              required
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              placeholder="Phone"
              pattern="^\+[0-9]{6,}$"
              required
              value={userInfo.phone}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="phone">ID</label>
            <input
              type="number"
              id="ID"
              placeholder="ID"
              required
              value={userInfo.idNumber}
              onChange={(e) =>
                setUserInfo({ ...userInfo, idNumber: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        Create user
      </button>
    </form>
  );
};
