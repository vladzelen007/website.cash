import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import { STRAPI_API_URL } from '../api/api';

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {

  const [user, setUser] = useState({
    username: null,
    email: null,
    payToken: null,
    isAuth: false
  }) 

  const saveUser = (username, email, payToken, isAuth) => {
    setUser({username: username, email: email, payToken: payToken, isAuth: isAuth})
  }

  useEffect(() => {

    const token = Cookie.get('token');
      if (token) {
        fetch(`${STRAPI_API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then( async (res) => {
          if (!res.ok) {
            Cookie.remove('token');
            setUser({
              username: null,
              email: null,
              payToken: null,
              isAuth: false,
            })
            return null
          }
          const user = await res.json();
          setUser({
            username: user.username,
            email: user.email,
            payToken: user.payToken,
            isAuth: true
          })
        })
      }

  }, []);

  return (
    <UserContext.Provider value={{...user, saveUser}}>
      { children }
    </UserContext.Provider>
  )

}

export default UserProvider; 