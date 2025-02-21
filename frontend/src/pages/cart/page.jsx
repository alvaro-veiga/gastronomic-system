import { useState } from "react"
import { useCartContext } from "../../context/useCartContext"
import styles from './page.module.css'
import ConfirmOrderPopup from "../../components/confirmOrderPopup/confirmOrderPopup"

export default function Cart() {

    const { cartItems, updateCartItems, removeFromCart } =  useCartContext()
    const [confirmPopupOpen, setConfimPopupOpen] = useState(false)

    const handleChangeItemQty= (mode, itemId) => {
        const updatedCartItem =cartItems.map((item)=> {
            if (item._id === itemId ) {
                if(mode === 'less' && item.quantity > 1) {
                    item.quantity -= 1
                } else if (mode === 'more'){
                    item.quantity += 1
                }
            }
            return item
        })
        updateCartItems(updatedCartItem)
    }

    console.log(cartItems)

    if (!cartItems.length) {
        return(
            <div>
                <h1>Seu carrinho esta vazio.. :/</h1>
                <button>Veja nossas especialidades</button>
            </div>
        )
    }

    const handleOpenPopup = () => {
        setConfimPopupOpen(!confirmPopupOpen)
    }

    const handleConfirmOrder = (orderData) => {
        console.log(orderData)
    }

    return(
        <>
            <div className={styles.pageContainer}>
                <h1>Seus items:</h1>
                <section>
                    <div className={styles.itemListContainer}>
                        {cartItems.map((item) => (
                            <div className={styles.itemContainer} key={item._id}>
                                <img src={item.imgUrl} alt="" />
                                <div className={styles.itemContent}>
                                    <h2>{item.name}</h2>
                                    <p>{String(item.ingredients)}</p>
                                    <p>{item.description}</p>
                                    <div className={styles.portionsContainer}>
                                        <p>Quantidade:</p>
                                        <p>{item.quantity}</p>
                                        <div className={styles.portionsBtn}>
                                            <button onClick={() =>{handleChangeItemQty('less', item._id)}}>-</button>
                                            <button onClick={() =>{handleChangeItemQty('more', item._id)}}>+</button>
                                        </div>
                                    </div>
                                    <button onClick={()=> { removeFromCart(item._id)}}>Remover item</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <button className={styles.confirmBtn} onClick={handleOpenPopup}>Confirmar seu pedido</button>
            </div>

            <ConfirmOrderPopup open={confirmPopupOpen} onClose={handleOpenPopup} onConfirm={handleConfirmOrder}/>
        </>
    )
}