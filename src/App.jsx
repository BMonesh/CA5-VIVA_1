import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [fakeData, setFakeData] = useState([])

  const handleClick = async() => {
    setCount(count+1)
    console.log(count)
    if (count === 0){
      const datas = await axios.get("https://fakestoreapi.com/products");
      setFakeData(datas.data);
      console.log(datas.data)
    }
    if (count === 1){
      setShowContent(!showContent)
    }
    if (count === 2){
      setShowContent(!showContent)
      setCount(0)
      setFakeData([])
    }
  }

  return (
    <React.Fragment>
      <button onClick={()=>handleClick()}>Click me!</button>
      <div className="fake-data">
        {showContent && fakeData.map((data) => {
          return (
            <div key={data.id} >
              <h3>{data.category}</h3>
              <p>{data.image}</p>
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}

export default App
