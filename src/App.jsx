import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { useCart } from "./hooks/useCart"

function App() {
  
  const { data, cart, addToCart, removeFromCart, decrementQuantity,increaseQuantity,
    clearCart, isEmpty, cartTotal } = useCart()

  return (
    <>
    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decrementQuantity={decrementQuantity}
      clearCart={clearCart}
      isEmpty={isEmpty}
      cartTotal={cartTotal}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => ( //Accedemos a data (state), utilizamos un array method (map) y el arreglo que nos retornaa lo nombramos guitar
              <Guitar //Iteramos y generamos un componente Guitar por cada elemento en ese arreglo
              key={guitar.id} // Prop especial que siempre debemos utilizar cuando iteremos una lista y le pasamos un valor único
              guitar={guitar}
              // setCart={setCart}//Prop=Funcion
              addToCart={addToCart}//Cada componente va tener la funcionalidad de agg ese elemento al carrito
              />
            ))}
        </div>
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
