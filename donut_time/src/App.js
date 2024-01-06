import "./firebaseConfig";
import {getFirestore, addDoc, collection, getDocs} from "firebase/firestore"
import { useState } from 'react';
import Canvas from "./components/Canvas";
import Graph from "./components/Graph";
function App() {

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  let [storedValues, setStoredValues] = useState([]);

  const db = getFirestore();

  const saveDataToFirestore = async() => {
    const docRef = await addDoc(collection(db,"expenses"), {
      cost:inputValue1,
      name: inputValue2,
    });
  }

  const fetchDataFromFirestore = async () => {
    const querySnapshot = await getDocs(collection(db,"expenses"));
    const tempArr = [];
    querySnapshot.forEach((doc) => {
      tempArr.push(doc.data());
    })
    console.log(tempArr);
    setStoredValues(tempArr);
  }


  return (
    <div className="App">
      <h1>Save data to Firebase Firestore</h1>
      <input type='text' value={inputValue1} onChange={(e) => setInputValue1(e.target.value)}/>
      <input type='text' value={inputValue2} onChange={(e) => setInputValue2(e.target.value)}/>
      <button onClick={saveDataToFirestore}>save</button>
      <button onClick={fetchDataFromFirestore}>fetch</button>
      {/* <Canvas/> */}
      <Graph/>
{/* 
      <div>
        {storedValues.map((item,index) => (
          <div key={index}>
            <p>{item.cost}:{item.name}</p>            
          </div>
        ))}
      </div> */}
    </div>
    
  );
}

export default App;
