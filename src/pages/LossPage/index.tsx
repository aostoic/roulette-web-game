import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const LossPage: React.FC = () => {
  let navigate = useNavigate();

  setTimeout(() => {
    // // // console.log(premios);
    // var item: any = premios[Math.floor(Math.random() * premios.length)];
    // console.log(item);
    // const cityRef = doc(this.db, "premios", item.uid);
    // setDoc(cityRef, { cantidad: item.cantidad - 1 }, { merge: true });
    // navigate("/?back");
    navigate("/tablet?back");
  }, 4000);
  return (
    <div className="home-body-loss">
      <nav></nav>
    </div>
  );
};

export default LossPage;
