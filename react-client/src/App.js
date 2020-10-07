import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import './App.scss';
import MainPage from './pages/MainPage';
import Nav from './components/Nav';
import Footer from './components/Footer';

// Pages
import ProfilePage from './pages/ProfilePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import PaymentInfoPage from './pages/PaymentInfoPage';
import RegisterPage from './pages/RegisterPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailPage from './pages/PaymentFailPage';
import PaymentStatusPage from './pages/PaymentStatusPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage';

import ScrollToTop from 'react-router-scroll-top'

// Cookie Policy
import CookiePolicy from './components/CookiePolicy';

// Content wrapper
import Content from './components/Content';

// ScrollTopArrow
import ScrollTopArrow from './components/ScrollTopArrow';

// PrivateRoute
import PrivateRoute from './PrivateRoute';

// UserProvider
import UserProvider from './context/userContext';

function App() {

  let history = useHistory();

  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {    
   if (!showScroll && window.pageYOffset > 400){
    setShowScroll(true)    
   } else if (showScroll && window.pageYOffset <= 400){
    setShowScroll(false)    
   }  
  };

  window.addEventListener('scroll', checkScrollTop)

  return (
    <UserProvider>
      <Router> 
        <ScrollToTop>
          <div className="app">
            <Nav />
              <Content>
                <Switch>
                  <Route exact path="/" component={MainPage} />
                  <PrivateRoute exact path="/profile" component={ProfilePage} />
                  <Route exact path="/privacy" component={PrivacyPage} />
                  <Route exact path="/terms" component={TermsPage} />
                  <Route exact path="/register" component={RegisterPage} />
                  <Route exact path="/payment-info" component={PaymentInfoPage} />
                  <Route exact path="/payment-success" component={PaymentSuccessPage} />
                  <Route exact path="/payment-fail" component={PaymentFailPage} />
                  <Route exact path="/payment-status" component={PaymentStatusPage} />
                  <Route exact path="/forgot-password" component={ForgotPasswordPage} />
                  <Route exact path="/reset-password" component={ResetPasswordPage} />
                  <Route path="" component={NotFoundPage} />
                </Switch>
              </Content>
            <Footer />
            <ScrollTopArrow />
            <CookiePolicy />
          </div>
        </ScrollToTop>
      </Router>
    </UserProvider>
  );
}

export default App;
