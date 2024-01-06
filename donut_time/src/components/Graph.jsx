import React, { useEffect } from 'react'
import * as d3 from 'd3'
import {getFirestore, addDoc, collection, getDocs} from "firebase/firestore"
import { useState } from 'react';

const Graph = () => {

    const dims = {height: 300, width:300, radius: 150};
    const cent = {x: (dims.width / 2 + 5), y: (dims.height / 2 + 5)};
    const [storedValues, setStoredValues] = useState([]);
    const db = getFirestore();


    const svg = d3.select('.canvas')
        .append('svg')
        .attr('width', dims.width + 150)
        .attr('height', dims.height + 150);
  
    const graph = svg.append('g').attr('transform',`translate(${cent.x},${cent.y})`);
    const pie = d3.pie().sort(null).value(d => d.cost);

    const arcPath = d3.arc().outerRadius(dims.radius).innerRadius(dims.radius / 2);

    
    const fetchDataFromFirestore = async () => {
        const querySnapshot = await getDocs(collection(db,"expenses"));
        const tempArr = [];
        querySnapshot.forEach((doc) => {
          tempArr.push(doc.data());
        })
        setStoredValues(tempArr)
    }


    useEffect(() => {
        fetchDataFromFirestore()
    },[storedValues])


    return (
    <div>
        {storedValues.map((item, index) => (
            <div key={index}>
                    {item.cost}{item.name}
            </div>
        ))
    }
    </div>
  )
}

export default Graph