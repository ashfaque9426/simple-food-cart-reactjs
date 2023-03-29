import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Foods from './components/Foods/Foods'
import Cart from './components/Cart/Cart'
import addToLocalDB, { getDataFromLocalDB, removeAllDataFromLocalDB } from './fakeDB'

function App() {
  // setting up the states
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [foods, setFoods] = useState([]);

  // loding data from api call using useEffect React Hook
  useEffect(() => {
    const fetchFoods = async () => {
      await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=b").then(async res => await res.json()).then(data => setFoods(data['meals']));
    }
    fetchFoods();
  }, []);
  // console.log(foods);

  // setting the cart tiems whin add to cart button clicked and setting the mealId to local storage so do quantity
  const getFood = (mealId) => {
    let myCart = [];
    const myMeal = cart.find(food => food.idMeal === mealId);
    if(!myMeal) {
      const myMeal = foods.find(food => food.idMeal === mealId);
      myMeal.quantity = 1;
      myMeal.price = 590;
      myCart = [...cart, myMeal];
      addToLocalDB(mealId, myMeal.quantity);
    }
    else {
      myMeal.quantity = myMeal.quantity + 1;
      myMeal.price = 590;
      const remaining = cart.filter(food => food.idMeal !== mealId);
      myCart = [...remaining, myMeal];
      addToLocalDB(mealId, myMeal.quantity);
    }
    // myCart = [...cart, myMeal];
    setCart(myCart);
  }
  // console.log(cart);

  // setting the cart items from local storage
  useEffect(()=> {
    let tempCart = [];
    const storedData = getDataFromLocalDB();
    if(storedData) {
      for(const key in storedData) {
        const addedMeal = foods.find(food => food.idMeal === key);
        if(addedMeal) {
          addedMeal.quantity = storedData[key];
          addedMeal.price = 590;
          tempCart.push(addedMeal);
        }
      }
    }
    setCart(tempCart);
  }, [foods]);

  // clearing the cart items from local storage and ui
  const clearCartItems = () => {
    removeAllDataFromLocalDB();
    setCart([]);
  }

  
  return (
    <div className="App">
      <header>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <h1>Items Available: {foods.length}</h1>
      </header>
      <main className='main-container-grid' role="main">
        <Foods foods={foods} getFood={getFood}></Foods>
        <section>
          <Cart cart={cart} clearCartItems={clearCartItems}></Cart>
        </section>
      </main>
    </div>
  )
}

export default App
