import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Welcome from '../../components/Sections/Welcome';
import Calculator from '../../components/Sections/Calculator';
import Special from '../../components/Sections/Special';
import Carousel from '../../components/Sections/Carousel';
import About from '../../components/Sections/About';
import AuthCreateAccountModal from '../../components/AuthCreateAccountModal';
import useModal  from '../../hooks/useModal';
import { UserContext } from '../../context/userContext';

const MainPage = () => {

  const history = useHistory();
  const user = useContext(UserContext);
  const [ isShowing, toggle ] = useModal();

  const handleAction = () => {
    history.push('/profile')
  }
  
  useEffect(() => {
   })

  return (
  <>
    <AuthCreateAccountModal isShowing={isShowing} toggle={user.isAuth ? handleAction : toggle} />
    <Welcome toggleCreateAccountModal={user.isAuth ? handleAction : toggle} />
    <Calculator toggleCreateAccountModal={user.isAuth ? handleAction : toggle} />
    <Special toggleCreateAccountModal={user.isAuth ? handleAction : toggle} />
    <Carousel />
    <About toggleCreateAccountModal={user.isAuth ? handleAction : toggle} />
  </>
  )
}

export default MainPage;