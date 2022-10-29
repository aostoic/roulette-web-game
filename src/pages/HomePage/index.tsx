import React, { useEffect, useReducer, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

import rosato from "../../assets/premios/rosato.png";
import sparkling from "../../assets/premios/sparkling.png";
import spritz from "../../assets/premios/spritz.png";

import Roulette from "../../components/roulette";

import styled from "styled-components";

import { IRouletteItem } from "../../models";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, child, get, set } from "firebase/database";

import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDMj4MmY-dwZL8rb5tRuF7T06Lnb4KJtJ8",
  authDomain: "falabella-game-web.firebaseapp.com",
  projectId: "falabella-game-web",
  storageBucket: "falabella-game-web.appspot.com",
  messagingSenderId: "168837460981",
  appId: "1:168837460981:web:51988aef18e37dbdfea6bc",
  measurementId: "G-WWJ6R1E47L",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const db = getFirestore(app);

// import { initializeApp } from "firebase/app";

// import {
//   getFirestore,
//   collection,
//   getDocs,
//   Firestore,
//   doc,
//   setDoc,
// } from "firebase/firestore/lite";

// import { getDatabase, ref, onValue } from "firebase/database";

// const database = getDatabase();

// const starCountRef = ref(database, "posts/");
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

const ContentWrapper = styled.div`
  // margin-top: 0px;
  margin-left: 494px;
  width: 736px;
  // height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  // background: black;
`;

const Button = styled.div`
  position: absolute;
  margin-top: 650px;
  margin-left: 1050px;
  border: 0px solid #08be27;
  border-radius: 70px;
  width: 135px;
  height: 135px;
`;

const RouletteHeight = 297;
const itemHeight = 160;

let items: IRouletteItem[] = [
  // { id: 0, title: "", subtitle: "", image: sparkling },
  // { id: 1, title: "", subtitle: "", image: spritz },
  // { id: 2, title: "", subtitle: "", image: tagmaleta },
  // { id: 3, title: "", subtitle: "", image: toalla },
  //{ id: 4, title: "", subtitle: "", image: tottus },
  // { id: 5, title: "", subtitle: "", image: rosato },
  { id: 6, title: "", subtitle: "", image: rosato },
  { id: 7, title: "", subtitle: "", image: sparkling },
  { id: 8, title: "", subtitle: "", image: spritz },
  { id: 11, title: "", subtitle: "", image: rosato },
  { id: 12, title: "", subtitle: "", image: sparkling },
  { id: 13, title: "", subtitle: "", image: spritz },
  { id: 16, title: "", subtitle: "", image: rosato },
  { id: 12, title: "", subtitle: "", image: sparkling },
  { id: 13, title: "", subtitle: "", image: spritz },
  { id: 16, title: "", subtitle: "", image: rosato },
  { id: 12, title: "", subtitle: "", image: sparkling },
  { id: 13, title: "", subtitle: "", image: spritz },
  { id: 16, title: "", subtitle: "", image: rosato },
  { id: 12, title: "", subtitle: "", image: sparkling },
  { id: 13, title: "", subtitle: "", image: spritz },
  { id: 16, title: "", subtitle: "", image: rosato },
  { id: 12, title: "", subtitle: "", image: sparkling },
  { id: 13, title: "", subtitle: "", image: spritz },
  { id: 16, title: "", subtitle: "", image: rosato },
];

const HomePage: React.FC = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [randomAnimation, setrandomAnimation] = useState<number>(
    Math.floor(Math.random() * (9000 - 3000)) + 3000
  );
  const [randomAnimation2, setrandomAnimation2] = useState<number>(
    Math.floor(Math.random() * (9000 - 3000)) + 3000
  );
  const [randomAnimation3, setrandomAnimation3] = useState<number>(
    Math.floor(Math.random() * (9000 - 3000)) + 3000
  );

  let cantidadPremios = 0;

  const [random, setRandom] = useState<number>(
    Math.floor(Math.random() * cantidadPremios)
  );
  const [random2, setRandom2] = useState<number>(
    Math.floor(Math.random() * cantidadPremios)
  );
  const [random3, setRandom3] = useState<number>(
    Math.floor(Math.random() * cantidadPremios)
  );

  let premios: any;

  useEffect(() => {
    const fetchPremios = async () => {
      try {
        if (!db) return;

        const premiosCol = collection(db, "premios");
        const premiosSnapshot = await getDocs(premiosCol);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        premios = premiosSnapshot.docs.map((doc) => doc.data());
        console.log(premios);

        // const participantsc = collection(db, "participants");
        // const participants = await getDocs(participantsc);
        // // eslint-disable-next-line react-hooks/exhaustive-deps
        // const participantsx = participants.docs.map((doc) => doc.data());
        // const salida: any = [];
        // participantsx.forEach((x) => {
        //   salida.push({ name: x.name, rut: x.rut, mail: x.mail });
        // });
        // console.log(salida);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchPorcentWin = async () => {
      try {
        if (!db) return;

        const docRef = doc(db, "params", "porcentWin");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());

          const premiosAux: any = [];

          await premios.forEach(async (element: any) => {
            let premiosElement = 0;

            const premioAux: any = [];
            await element.premios.forEach((premio: any) => {
              premiosElement = premio.cantidad + premiosElement;
              if (premio.cantidad > 0) {
                premioAux.push(premio);
              }
            });
            if (premiosElement > 0) {
              console.log("entrePrimero222");

              await premiosAux.push({
                id: element.uid,
                title: "",
                subtitle: "",
                image: element.img,
                premios: premioAux,
                realPremios: element.premios,
              });
            }
          });

          // eslint-disable-next-line react-hooks/exhaustive-deps
          cantidadPremios = premiosAux.length;
          console.log(cantidadPremios);

          items = [...premiosAux, ...items];
          console.log(items);

          if (cantidadPremios !== 0) {
            if (docSnap.data().number === -1) {
              console.log("hola");
              setRandom(Math.floor(Math.random() * cantidadPremios));
              setRandom2(Math.floor(Math.random() * cantidadPremios));
              setRandom3(Math.floor(Math.random() * cantidadPremios));
            }
            if (docSnap.data().number === 0) {
              setRandom(Math.floor(Math.random() * (2 - 0)) + 0);
              setRandom2(Math.floor(Math.random() * (4 - 2)) + 2);
              setRandom3(Math.floor(Math.random() * (6 - 4)) + 4);
            }

            if (docSnap.data().number === 30) {
              let numberWin = Math.floor(Math.random() * cantidadPremios);

              const maxNumber =
                numberWin === cantidadPremios ? numberWin + 1 : numberWin + 2;
              const minNumber = numberWin === 0 ? numberWin : numberWin - 1;

              setRandom(numberWin);
              setRandom2(
                Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber
              );
              setRandom3(
                Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber
              );
            }

            if (docSnap.data().number === 50) {
              let Numberrandom = Math.floor(Math.random() * 3);
              let numberWin = Math.floor(Math.random() * cantidadPremios);

              if (Numberrandom === 0) {
                setRandom(numberWin);
                setRandom2(numberWin);
                setRandom3(Math.floor(Math.random() * cantidadPremios));
              }
              if (Numberrandom === 1) {
                setRandom(numberWin);
                setRandom2(Math.floor(Math.random() * cantidadPremios));
                setRandom3(numberWin);
              }
              if (Numberrandom === 2) {
                setRandom(Math.floor(Math.random() * cantidadPremios));
                setRandom2(numberWin);
                setRandom3(numberWin);
              }
            }

            if (docSnap.data().number === 100) {
              let numberWin = Math.floor(Math.random() * cantidadPremios);

              setRandom(numberWin);
              setRandom2(numberWin);
              setRandom3(numberWin);
            }
          } else {
            let Numberrandom = Math.floor(Math.random() * 4);
            if (Numberrandom === 0) {
              setRandom(Math.floor(Math.random() * (2 - 0)) + 0);
              setRandom2(Math.floor(Math.random() * (4 - 2)) + 2);
              setRandom3(Math.floor(Math.random() * (6 - 4)) + 4);
            }
            if (Numberrandom === 1) {
              setRandom2(Math.floor(Math.random() * (2 - 0)) + 0);
              setRandom(Math.floor(Math.random() * (4 - 2)) + 2);
              setRandom3(Math.floor(Math.random() * (6 - 4)) + 4);
            }
            if (Numberrandom === 2) {
              setRandom2(Math.floor(Math.random() * (2 - 0)) + 0);
              setRandom3(Math.floor(Math.random() * (4 - 2)) + 2);
              setRandom(Math.floor(Math.random() * (6 - 4)) + 4);
            }
            if (Numberrandom === 3) {
              setRandom3(Math.floor(Math.random() * (2 - 0)) + 0);
              setRandom2(Math.floor(Math.random() * (4 - 2)) + 2);
              setRandom(Math.floor(Math.random() * (6 - 4)) + 4);
            }
          }

          setLoading(false);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const promiseAll = async () => {
      await fetchPremios();
      await fetchPorcentWin();
    };

    if (window.location.search.includes("?back")) {
      setrandomAnimation(0);
      setrandomAnimation2(0);
      setrandomAnimation3(0);
      setRandom(1);
      setRandom2(2);
      setRandom3(3);
      setLoading(false);
    } else {
      promiseAll();
    }
  }, []);

  function playAgain() {
    navigate("/");
    window.location.reload();
  }

  const play = ref(database, "game/play");
  onValue(play, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      set(ref(database, "game/play"), false);
      playAgain();
    }
    console.log(data);
  });

  if (loading) {
    return <div className="home-body"></div>;
  } else {
    const mayorNumber =
      randomAnimation > randomAnimation2 &&
      // eslint-disable-next-line no-self-compare
      randomAnimation > randomAnimation
        ? randomAnimation
        : randomAnimation2 > randomAnimation3
        ? randomAnimation2
        : randomAnimation3;
    if (random === random2 && random === random3) {
      setTimeout(() => {
        const item: any = items[random];
        const cityRef = doc(db, "premios", item.id);

        // // // console.log(premios);

        console.log(item);

        let itemPremios = item.premios;
        let itemRealPremios = item.realPremios;
        let premioSelect;

        if (itemPremios.length === 1) {
          let auxPremio = {
            cantidad: itemPremios[0].cantidad - 1,
            mecanica: itemPremios[0].mecanica,
            uid: itemPremios[0].uid,
            imgFondo: itemPremios[0].imgFondo || "",
          };

          premioSelect = auxPremio;

          const aux4000: any = [];
          itemRealPremios.map((element: any) => {
            if (element.uid === auxPremio.uid) {
              aux4000.push(auxPremio);
            } else {
              aux4000.push(element);
            }
          });

          setDoc(cityRef, { premios: aux4000 }, { merge: true });
        } else {
          const cantidadAuxPremios = itemPremios.length;
          const objectSelect = Math.floor(Math.random() * cantidadAuxPremios);

          let auxPremio = {
            cantidad: itemPremios[objectSelect].cantidad - 1,
            mecanica: itemPremios[objectSelect].mecanica,
            uid: itemPremios[objectSelect].uid,
            imgFondo: itemPremios[objectSelect].imgFondo || "",
          };
          premioSelect = auxPremio;

          const aux4000: any = [];
          itemRealPremios.map((element: any) => {
            if (element.uid === auxPremio.uid) {
              aux4000.push(auxPremio);
            } else {
              aux4000.push(element);
            }
          });
          setDoc(cityRef, { premios: aux4000 }, { merge: true });
        }

        navigate(`/win?${premioSelect.imgFondo}`);
      }, mayorNumber + 2500);
    } else {
      setTimeout(() => {
        // // // console.log(premios);
        // var item: any = premios[Math.floor(Math.random() * premios.length)];
        // console.log(item);
        // const cityRef = doc(this.db, "premios", item.uid);
        // setDoc(cityRef, { cantidad: item.cantidad - 1 }, { merge: true });
        if (!window.location.search.includes("?back")) navigate(`/loss`);
      }, mayorNumber + 2500);
    }
    console.log(random);
    console.log(random2);
    console.log(random3);
    return (
      <div className="home-body">
        <ContentWrapper>
          <Roulette
            data={items}
            prize={items[random]}
            itemHeight={itemHeight}
            rouletteHeight={RouletteHeight}
            picked={false}
            canPick={false}
            animationDuration={randomAnimation}
          />
          <Roulette
            data={items}
            prize={items[random2]}
            itemHeight={itemHeight}
            rouletteHeight={RouletteHeight}
            picked={false}
            canPick={false}
            animationDuration={randomAnimation2}
          />
          <Roulette
            data={items}
            prize={items[random3]}
            itemHeight={itemHeight}
            rouletteHeight={RouletteHeight}
            picked={false}
            canPick={false}
            animationDuration={randomAnimation3}
          />

          <Button onClick={playAgain}></Button>
        </ContentWrapper>
      </div>
    );
  }
};

export default HomePage;
