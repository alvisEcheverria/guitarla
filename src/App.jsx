
import { Header, Guitar } from './components';
import { useCart } from './hooks/useCart';

function App() {

  const { data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, emptyCart, isEmpty, cartTotal } =  useCart();

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        emptyCart={emptyCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
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
