import './App.css';
import React, {useState, useEffect} from 'react'
import Loading from './components/Loading';
import Tours from './components/Tours';

function App() {

  const url = 'https://course-api.com/react-tours-project';
  
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) =>{
    const newTours = tours.filter((tour) => tour.id !== id); /*me quedo con los tours que no tengan ese id*/
    setTours(newTours);
  }

  const fetchTours = async() => {
    try{
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    }
    catch(error){
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() =>{
    fetchTours();
  }, [])


  if(loading){
    return(
      <main>
        <Loading />
      </main>
    );
  }
  if(tours.length === 0){
    return <main>
      <div className='title'>
        <h2>no tours left</h2>
        <button className='btn' onClick={() => fetchTours()}>refresh</button>
      </div>
    </main>
  }
  return (
    <main><Tours tours={tours} removeTour={removeTour}/></main>
  );
}

export default App;
