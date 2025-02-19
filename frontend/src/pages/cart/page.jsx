import { useCartContext } from "../../context/useCartContext"
import styles from './page.module.css'

export default function Cart() {

    const { cartItems } =  useCartContext()

    console.log(cartItems)

    if (!cartItems.length) {
        return(
            <div>
                <h1>Seu carrinho esta vazio.. :/</h1>
                <button>Veja nossas especialidades</button>
            </div>
        )
    }

    return(
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
                                        <button>-</button>
                                        <button>+</button>
                                    </div>
                                </div>
                                <button>Remover item</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <button className={styles.confirmBtn}>Confirmar seu pedido</button>
        </div>
    )
}