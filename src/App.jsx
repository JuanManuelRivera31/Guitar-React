import { useState, useEffect } from "react"
    //El state de react es asincrono //STATE ES INMUTABLE
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

  const initialCart = () => {
    const localStorageCart= localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
    //Si local storage tiene algo va setearlo a arreglo si no su valor inicial es un arreglo vacio
  }

  const [data]= useState(db) //Se inicializa de una vez ya que es un archivo local
  //Si consumieramos una api usariamos use effect ya que no sabemos cuanto demora en cargar datos
  const [cart, setCart]= useState(initialCart)//Inicializamos el carrito vacio y lo vamos a ir llenando o modificando con ciertos métodos array

  const MAX_ITEMS= 5
  const MIN_ITEMS= 1

  useEffect(() => { //Va sincronizar - Use Effect para los efectos secundarios cuando nuestro state cambia
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]) //Cada que cart cambie realiza el codigo anterior

  function addToCart(item){
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0){ //Existe en el carrito
      if(cart[itemExists].quantity >= MAX_ITEMS) return
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

  function increaseQuantity(id){
    const updatedCart = cart.map( item =>  { //Map inmuta el arreglo y state original y retorna una nueva copia
      if(item.id === id && item.quantity < MAX_ITEMS){
        return{
          ...item, //Retorna y mantinene el nombre, imagen, precio de la guitar
          quantity: item.quantity + 1 //Incrementa la cantidad
        }
      }
      return item //Para que se mantengan el resto de elementos sobre los que no di click
    })
    setCart(updatedCart) //Seteamos para que no se quede en memoria
  }

  function decrementQuantity(id){
    const updatedCart= cart.map( item =>  {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return{ ...item,
        quantity: item.quantity - 1
      }
    }
    return item
    })
  setCart(updatedCart)
  }

  function clearCart(){
    setCart([]) //Seteamos un arreglo vacio
  }

  return (
    <>
    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decrementQuantity={decrementQuantity}
      clearCart={clearCart}
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
