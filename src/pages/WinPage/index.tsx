import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./styles.css";

const WinPage: React.FC = () => {
  let navigate = useNavigate();

  setTimeout(() => {
    // // // console.log(premios);
    navigate("/?back");
  }, 10000);

  const urlImg = window.location.search.replace("?", "");
  console.log(urlImg);
  const DivMaster = styled.div`
    background-image: url("${urlImg}");
    background-repeat: no-repeat;
    height: 100vh;
  `;

  return <DivMaster></DivMaster>;
};

export default WinPage;
