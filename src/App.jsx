import { useEffect, useState } from 'react';
import { Header, Guitar } from './components';
import { db } from './data/db';

function App() {

  const [ data ] = useState(db);
  const [ cart, setCart ] = useState(getStoredCart);

  function getStoredCart(){
    const storedCart = localStorage.getItem("cart");
    return storedCart? JSON.parse(storedCart) : [];
  };

  useEffect(()=> {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])

  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 0;

  const addToCart = (item) => {
    const itemExists = cart.findIndex(i => i.id === item.id);

    if(itemExists >= 0){
      if(cart[itemExists].quantity >= MAX_QUANTITY) return;
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart(prevCart => [...prevCart, item]);
    }
  };

  const removeFromCart = itemId => {  
    const updatedCart = cart.filter(item => item.id !== itemId);
    
    setCart(updatedCart);
  };

  const increaseQuantity = itemId => {
    const updatedCart = cart.map(item => {
      if(item.id === itemId && item.quantity < MAX_QUANTITY){
        return {
          ...item,
          quantity: item.quantity + 1 
        };
      }
        return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = itemId => {
    const updatedCart = cart.map(item => {
      if(item.id === itemId){
        return {
          ...item,
          quantity: item.quantity - 1
        };
      } 
      return item;
    });
    const filteredCart = updatedCart.filter(cart => cart.quantity > MIN_QUANTITY);
    setCart(filteredCart);
  };

  const emptyCart = ()=> setCart([]);

  return (
    <>
      <Header 
        cart={cart}
        setCart={setCart}
        removeFromCart={removeFromCart}
        emptyCart={emptyCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <ul className="row mt-5">
          {
            data.map((guitar) => (
              <Guitar 
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}
              />

          ))}
        </ul>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
