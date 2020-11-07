
import './App.css';
import Header from './components/Header';
import React, { useEffect } from 'react';
import { login } from './store';
import { useDispatch } from 'react-redux';
import Main from './components/Main';
import Footer from './components/Footer';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout, Menu} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Rside from './components/Rside';

/* 건들지 마시오!
**************************
***************************
**************************
*******건들지 마시오***********
*************************
*************************
**************************
***********************
************************
*/

const MainListStyle = styled.div`
  display : grid;
  grid-template-columns: 90% 10%;
`;

const AppStyle = styled.div`
	display: grid;
  background-color: #FFF8E8;
  display:grid;
  grid-template-columns: auto;
  padding: 50px 50px;
  font-family: "RIDIBatang";
`;

function App() {
  //로그인 상태관리
  const dispatch = useDispatch();

  useEffect(() => {
    let jwtToken = localStorage.getItem("Authorization");
    if (jwtToken !== null) {
      dispatch(login());
    }
    console.log(jwtToken);
  });

  return (
    <AppStyle>
      <h1>PETPETPET</h1>
      <Header/>
        <MainListStyle>
          <Main/>
          <Rside/>
        </MainListStyle>
      <Footer/>
    </AppStyle>
  );
}
export default App;
