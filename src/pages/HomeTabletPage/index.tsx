import React, { useEffect, useReducer, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

import uno from "../../assets/26092023/sigaparticipando.png";
import dos from "../../assets/26092023/premio2.png";
import tres from "../../assets/26092023/premio3.png";
import cuatro from "../../assets/26092023/premio4.png";

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
  apiKey: "AIzaSyAacH5gXyfMAZEpnUXS2jK8G-hvTUnFj-w",
  authDomain: "roulette-web-game.firebaseapp.com",
  projectId: "roulette-web-game",
  storageBucket: "roulette-web-game.appspot.com",
  messagingSenderId: "253810969328",
  appId: "1:253810969328:web:5bc44333dfd3b913771035",
  measurementId: "G-N3PD38VW6R",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const db = getFirestore(app);

const ContentWrapper = styled.div`
  // margin-top: 0px;
  margin-left: 19.79vw;
  width: 513px;
  height: 55.7vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  // background: black;
`;

const Button = styled.div`
  position: absolute;
  margin-top: 89vh;
  margin-left: 64vw;
  border: 0px solid #08be27;
  border-radius: 70px;
  width: 100px;
  height: 100px;
`;

const RouletteHeight = 205;
const itemHeight = 170;

let items: IRouletteItem[] = [
  { id: 6, title: "", subtitle: "", image: uno },
  { id: 7, title: "", subtitle: "", image: dos },
  { id: 8, title: "", subtitle: "", image: tres },
  { id: 9, title: "", subtitle: "", image: cuatro },
  { id: 6, title: "", subtitle: "", image: uno },
  { id: 7, title: "", subtitle: "", image: dos },
  { id: 8, title: "", subtitle: "", image: tres },
  { id: 9, title: "", subtitle: "", image: cuatro },
  { id: 6, title: "", subtitle: "", image: uno },
  { id: 7, title: "", subtitle: "", image: dos },
  { id: 8, title: "", subtitle: "", image: tres },
  { id: 9, title: "", subtitle: "", image: cuatro },
  { id: 6, title: "", subtitle: "", image: uno },
  { id: 7, title: "", subtitle: "", image: dos },
  { id: 8, title: "", subtitle: "", image: tres },
  { id: 9, title: "", subtitle: "", image: cuatro },
  { id: 6, title: "", subtitle: "", image: uno },
  { id: 7, title: "", subtitle: "", image: dos },
  { id: 8, title: "", subtitle: "", image: tres },
  { id: 9, title: "", subtitle: "", image: cuatro },
];

const HomeTabletPage: React.FC = () => {
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

  let cantidadPremios = 3;

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
        // console.log(premios);

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
          // console.log("Document data:", docSnap.data());

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
              // console.log("entrePrimero222");

              // console.log("adasdasd", premiosAux);

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
          // console.log(cantidadPremios);

          items = [
            { id: 7, title: "", subtitle: "", image: uno },
            ...premiosAux,
            ...items,
          ];

          if (cantidadPremios !== 0) {
            if (docSnap.data().number === -1) {
              const randomNumber = Math.floor(Math.random() * 15);

              if (
                randomNumber === 1 ||
                randomNumber === 2 ||
                randomNumber === 3
              ) {
                if (premiosAux.length === 3) {
                  setRandom(randomNumber);
                } else {
                  if (premiosAux.length === 2) {
                    if (randomNumber === 1 || randomNumber === 2) {
                      setRandom(randomNumber);
                    } else {
                      setRandom(0);
                    }
                  } else {
                    if (premiosAux.length === 1) {
                      if (randomNumber === 1) {
                        setRandom(randomNumber);
                      } else {
                        setRandom(0);
                      }
                    }
                  }
                }
              } else {
                setRandom(0);
              }
            }
            if (docSnap.data().number === 0) {
              setRandom(0);
            }

            if (docSnap.data().number === 30) {
              const randomNumber = Math.floor(Math.random() * 10);

              if (
                randomNumber === 1 ||
                randomNumber === 2 ||
                randomNumber === 3
              ) {
                if (premiosAux.length === 3) {
                  setRandom(randomNumber);
                } else {
                  if (premiosAux.length === 2) {
                    if (randomNumber === 1 || randomNumber === 2) {
                      setRandom(randomNumber);
                    } else {
                      setRandom(0);
                    }
                  } else {
                    if (premiosAux.length === 1) {
                      if (randomNumber === 1) {
                        setRandom(randomNumber);
                      } else {
                        setRandom(0);
                      }
                    }
                  }
                }
              } else {
                setRandom(0);
              }
            }

            if (docSnap.data().number === 50) {
              const randomNumber = Math.floor(Math.random() * 7);
              console.log(randomNumber);
              if (
                randomNumber === 1 ||
                randomNumber === 2 ||
                randomNumber === 3
              ) {
                if (premiosAux.length === 3) {
                  setRandom(randomNumber);
                } else {
                  if (premiosAux.length === 2) {
                    if (randomNumber === 1 || randomNumber === 2) {
                      setRandom(randomNumber);
                    } else {
                      setRandom(0);
                    }
                  } else {
                    if (premiosAux.length === 1) {
                      if (randomNumber === 1) {
                        setRandom(randomNumber);
                      } else {
                        setRandom(0);
                      }
                    }
                  }
                }
              } else {
                setRandom(0);
              }
            }

            if (docSnap.data().number === 100) {
              console.log(cantidadPremios);
              let numberWin = Math.floor(Math.random() * cantidadPremios);
              console.log("numberWin", numberWin);
              // if (premiosAux.length === 3) {
              setRandom(numberWin + 1);
              // } else {
              //   setRandom(1);
              // }
            }
          } else {
            setRandom(0);
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
      setRandom(0);
      setRandom2(2);
      setRandom3(3);
      setLoading(false);
    } else {
      promiseAll();
    }
  }, []);

  function playAgain() {
    navigate("/tablet");
    window.location.reload();
  }

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
    // if (random === random2 && random === random3) {
    if (random === 1 || random === 2 || random === 3) {
      setTimeout(() => {
        console.log(items);
        console.log(random);
        const item: any = items[random];
        console.log(item);
        const cityRef = doc(db, "premios", item.id);
        // console.log(cityRef);

        // // // console.log(premios);

        // console.log(item);

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
        if (!window.location.search.includes("?back")) navigate(`/loss`);
      }, mayorNumber + 2500);
    }

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
          {/* <Roulette
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
          /> */}

          <Button onClick={playAgain}></Button>
        </ContentWrapper>
      </div>
    );
  }
};

export default HomeTabletPage;
