import React from "react";
import AppRouter from "./router";

const App: React.FC = () => {
  return <AppRouter />;
};

export default App;

// import React, { useEffect } from "react";
// import Roulette from "./components/roulette";
// import styled from "styled-components";
// import { IRouletteItem } from "./models";
// import ahumada from "./assets/transparent/AHUMADA.png";
// import esika from "./assets/transparent/ESIKA.png";
// import giftcard from "./assets/transparent/GIFTCARD.png";
// import palumbo from "./assets/transparent/PALUMBO.png";
// import tottus from "./assets/transparent/TOTTUS.png";
// import viajes from "./assets/transparent/VIAJES.png";

// import { initializeApp } from "firebase/app";

// import {
//   getFirestore,
//   collection,
//   getDocs,
//   Firestore,
//   doc,
//   setDoc,
// } from "firebase/firestore/lite";

// const firebaseConfig = {
//   apiKey: "AIzaSyDMj4MmY-dwZL8rb5tRuF7T06Lnb4KJtJ8",
//   authDomain: "falabella-game-web.firebaseapp.com",
//   projectId: "falabella-game-web",
//   storageBucket: "falabella-game-web.appspot.com",
//   messagingSenderId: "168837460981",
//   appId: "1:168837460981:web:51988aef18e37dbdfea6bc",
//   measurementId: "G-WWJ6R1E47L",
// };

// const ContentWrapper = styled.div`
//   margin-top: 378px;
//   margin-left: 410px;
//   width: 790px;
//   // height: 50vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 10px;
//   // background: black;
// `;

// const Button = styled.div`
//   position: absolute;
//   margin-top: 170px;
//   margin-left: 1110px;
//   // border: 1px solid #2ecc71;
//   border-radius: 70px;
//   width: 150px;
//   height: 150px;
// `;

// const RouletteHeight = 316;
// const itemHeight = 160;

// const items: IRouletteItem[] = [
//   { id: 0, title: "", subtitle: "", image: ahumada },
//   { id: 1, title: "", subtitle: "", image: esika },
//   { id: 2, title: "", subtitle: "", image: giftcard },
//   { id: 3, title: "", subtitle: "", image: palumbo },
//   { id: 4, title: "", subtitle: "", image: tottus },
//   { id: 5, title: "", subtitle: "", image: viajes },
//   { id: 6, title: "", subtitle: "", image: ahumada },
//   { id: 7, title: "", subtitle: "", image: esika },
//   { id: 8, title: "", subtitle: "", image: giftcard },
//   { id: 9, title: "", subtitle: "", image: palumbo },
//   { id: 10, title: "", subtitle: "", image: tottus },
//   { id: 11, title: "", subtitle: "", image: viajes },
//   { id: 12, title: "", subtitle: "", image: ahumada },
//   { id: 13, title: "", subtitle: "", image: esika },
//   { id: 14, title: "", subtitle: "", image: giftcard },
//   { id: 15, title: "", subtitle: "", image: palumbo },
//   { id: 16, title: "", subtitle: "", image: tottus },
//   { id: 17, title: "", subtitle: "", image: viajes },
// ];
// // const prizes: IRouletteItem[] = [];

// export default class App extends React.Component {
//   app = initializeApp(firebaseConfig);
//   db = getFirestore(this.app);

//   random = Math.floor(Math.random() * 6);
//   random2 = Math.floor(Math.random() * 6);
//   random3 = Math.floor(Math.random() * 6);

//   randomAnimation = Math.floor(Math.random() * (9000 - 3000)) + 3000;
//   randomAnimation2 = Math.floor(Math.random() * (9000 - 3000)) + 3000;
//   randomAnimation3 = Math.floor(Math.random() * (9000 - 3000)) + 3000;

//   state = {
//     random: this.random,
//     random2: this.random2,
//     random3: this.random3,
//     randomAnimation: this.randomAnimation,
//     randomAnimation2: this.randomAnimation2,
//     randomAnimation3: this.randomAnimation3,
//     premios: [],
//     loading: true,
//   };

//   async componentDidMount() {
//     const premiosCol = collection(this.db, "premios");
//     const premiosSnapshot = await getDocs(premiosCol);
//     const premios = await premiosSnapshot.docs.map((doc) => doc.data());
//     this.setState({ premios, loading: false });
//   }

//   playAgain() {
//     window.location.reload();
//   }
//   // Usage

//   render() {
//     const x = this.state as any;

//     if (x.loading) {
//       return null;
//     }

//     if (x.random === x.random2 && x.random === x.random3) {
//       const mayorNumber =
//         x.randomAnimation > x.randomAnimation2 &&
//         // eslint-disable-next-line no-self-compare
//         x.randomAnimation > x.randomAnimation
//           ? x.randomAnimation
//           : x.randomAnimation2 > x.randomAnimation3
//           ? x.randomAnimation2
//           : x.randomAnimation3;

//       setTimeout(() => {
//         // console.log(x.premios);
//         var item: any = x.premios[Math.floor(Math.random() * x.premios.length)];
//         console.log(item);

//         const cityRef = doc(this.db, "premios", item.uid);
//         setDoc(cityRef, { cantidad: item.cantidad - 1 }, { merge: true });

//         alert("Ganaste un premio");
//       }, mayorNumber + 500);
//     } else {
//     }

//     return (
//       <ContentWrapper>
//         <Roulette
//           data={items}
//           prize={items[x["random"]]}
//           itemHeight={itemHeight}
//           rouletteHeight={RouletteHeight}
//           picked={false}
//           canPick={false}
//           animationDuration={x.randomAnimation}
//         />
//         <Roulette
//           data={items}
//           prize={items[x["random2"]]}
//           itemHeight={itemHeight}
//           rouletteHeight={RouletteHeight}
//           picked={false}
//           canPick={false}
//           animationDuration={x.randomAnimation2}
//         />
//         <Roulette
//           data={items}
//           prize={items[x["random3"]]}
//           itemHeight={itemHeight}
//           rouletteHeight={RouletteHeight}
//           picked={false}
//           canPick={false}
//           animationDuration={x.randomAnimation3}
//         />

//         <Button onClick={this.playAgain}></Button>
//       </ContentWrapper>
//     );
//   }
// }
