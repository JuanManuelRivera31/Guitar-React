import { useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {
  //STATE ES INMUTABLE
  const [data, setData]= useState(db); //Se inicializa de una vez ya que es un archivo local
  //Si consumieramos una api usariamos use effect ya que no sabemos cuanto demora en cargar datos
  const [cart, setCart]= useState([]);//Inicializamos el carrito vacio y lo vamos a ir llenando o modificando con ciertos métodos array

  function addToCart(item){
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0){ //Existe en el carrito
      const updatedCart = [...cart] //Copia del carrito con spread operator(...)
      updatedCart[itemExists].quantity++
      setCart(updatedCart)//Sin modificar state original porque estamos tomando copia
      
    } else{ //Seteamos el carrito de compras y lo colocamos en nuestro state
      item.quantity= 1
      setCart([...cart, item]) //La funcion setCart sabe lo que hay en el state, toma una copia del state y escribe el nuevo elemento State
    }
  }

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))//Nos permite acceder al arreglo y tenemos acceso a array method
    //Accedemos a cada guitar individualmente => filtra las guitarras cuyo Id sea diferente al que paso - returna un nuevo arreglo y lo setea en nuestra funct
  }

  return (
    <>
    <Header 
      cart={cart}
      removeFromCart={removeFromCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => ( //Accedemos a data (state), utilizamos un array method (map) y el arreglo que nos retornaa lo nombramos guitar 
              <Guitar //Iteramos y generamos un componente Guitar por cada elemento en ese arreglo
              key={guitar.id} // Prop especial que siempre debemos utilizar cuando iteremos una lista y le pasamos un valor único
              guitar={guitar}
              setCart={setCart}//Prop=Funcion
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
