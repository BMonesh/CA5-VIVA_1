import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [rateCount, setRateCount] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [fakeData, setFakeData] = useState([])
  const [isFilter, setIsFilter] = useState(false)
  const [filterData, setFilterData] = useState([])

  const handleChange = () => {
    const filteredData = fakeData.filter(user => user.title.includes("Mens"))
    setFilterData(filteredData)
    setIsFilter(!isFilter)
  }

  const handleClick = async() => {
    setCount(count+1)
    console.log(count)
    if (count === 0){
      const datas = await axios.get("https://fakestoreapi.com/products");
      setFakeData(datas.data);
      console.log(datas.data);
      console.log(fakeData)
    }
    if (count === 1){
      setShowContent(!showContent)
      fakeData.map((data) => {
        if (data.rating.rate >= 4){
          setRateCount(rateCount + 1)
        }
      })
      document.cookie = `rate=${rateCount}; expires=Thu, 18 Dec 2030 12:00:00 UTC`
    }
    if (count === 2){
      setShowContent(!showContent)
      setCount(0)
      setFakeData([])
      document.cookie = 'rate=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
    }
  }

  return (
    <React.Fragment>
      <button onClick={()=>handleClick()}>Click me!</button>
      <div className="fake-data">
        {showContent ? ( 
          <React.Fragment>
            <div className='headers'>
              <label>
                Filter
                <select name="Filter" id="filter-id" onChange={handleChange}>
                  <option value="All">All</option>
                  <option value="Mens">Mens</option>
                </select>
              </label>
              {isFilter ? filterData.sort((a, b) => (a.price > b.price ? 1 : -1) && (a.rating.rate > b.rating.rate ? 1 : -1)).map((data) => (
                <div key={data.id}>
                  <h2>Tile: {data.title}</h2>
                  <p>Price: {data.price}</p>
                  <p>Rating: {data.rating.rate}</p>
                </div>
              )) :
                fakeData.sort((a, b) => (a.price > b.price ? 1 : -1) && (a.rating.rate > b.rating.rate ? 1 : -1)).map((data)=>(
                  <div key={data.id}>
                    <h2>Title: {data.title}</h2>
                    <p>Price: {data.price}</p>
                    <p>Rating: {data.rating.rate}</p>
                  </div>
                ))
              }
            </div>
          </React.Fragment>
        ) : null}
      </div>
    </React.Fragment>
  )
}

export default App
