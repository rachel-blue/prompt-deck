import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../../../../firebase/firebase';

function UserAuthBtn() {
  const [userLogin, setUserLogin] = useState('');
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const updateLoginBtn = useCallback(
    () => {
      if (user) {
        setUserLogin(<span data-test="text-logout">logout</span>);
      } else {
        setUserLogin(<span data-test="text-signin">signin</span>);
      }
    },
    [user],
  );

  const handleClick = () => {
    if (user) {
      history.push('/');
      return firebase.logout();
    }

    return updateLoginBtn();
  };

  useEffect(() => {
    updateLoginBtn();
  }, [user, updateLoginBtn]);

  return (
    <a
      href="/signin"
      className="btn btn-outline-primary p-4 px-5 m-3"
    >
      {userLogin}
    </a>
  );
}

export default UserAuthBtn;
