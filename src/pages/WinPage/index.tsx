import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./styles.css";

const WinPage: React.FC = () => {
  let navigate = useNavigate();
  const urlImg = window.location.search.replace("?", "");
  setTimeout(() => {
    // // // console.log(premios);
    navigate("/tablet?back");
  }, 10000);

  const DivMaster = styled.div`
    background-image: url("${urlImg}");
    background-repeat: no-repeat;
    height: 100vh;
    background-size: 100% auto;
  `;

  return <DivMaster></DivMaster>;
};

export default WinPage;
