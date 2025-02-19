import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import authServices from "../../services/auth"
import orderServices from "../../services/orders"
import { format, parseISO } from 'date-fns';
import styles from './page.module.css'
import { LuLogOut, LuTimer, LuCircleCheckBig, LuCircleAlert } from "react-icons/lu";
import { Link } from "react-router-dom";
import Loading from "../loading/page";

const formatDate = (isoString) => {
    return format(parseISO(isoString), "dd/MM/yyyy HH:mm");
};


export default function Profile() {

    const { logout } = authServices()
    const { getUserOrders, orderLoading, refetchOrders, ordersList } = orderServices()
    const navigate = useNavigate()
    const authData = JSON.parse(localStorage.getItem('auth'))

    useEffect(() => {
        if (!authData) {
            setTimeout(() => navigate('/auth'), 0);
        } else if (refetchOrders) {
            getUserOrders(authData?.user?._id)
        }
    }, [authData, refetchOrders]);

    if (orderLoading) {
        return( <Loading/>)
    }

    const handleLogout = () => {
        logout()
        return navigate('/')
    }
    
    console.log(ordersList)

    return(
        <div className={styles.pageContainer}>
            <div>
                <h1>{authData?.user?.fullname}</h1>
                <h3>{authData?.user?.email}</h3>
            </div>
            <button onClick={handleLogout}>Logout<LuLogOut/></button>
            {ordersList.length > 0 ?
                <div className={styles.ordersContainer}>
                    {ordersList.map((order) => (
                        <div key={order._id} className={styles.orderContainer}>
                            {order.pickupStatus === 'Pendente' ? <p className={`${styles.pickupStatus} ${styles.pending}`}><LuTimer />{order.pickupStatus}</p> : null}
                            {order.pickupStatus === 'Completo' ? <p className={`${styles.pickupStatus} ${styles.completed}`}><LuCircleCheckBig />{order.pickupStatus}</p> : null}
                            {order.pickupStatus === 'Canceled' ? <p className={`${styles.pickupStatus} ${styles.canceled}`}><LuCircleAlert />{order.pickupStatus}</p> : null}
                            <h3>{formatDate(order.pickupTime)}</h3>
                            {order.orderItems.map((item) => (
                                <div key={item._id}>
                                    <h4>{item.itemDetails[0].name}</h4>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                :
                <div>
                    Voce não tem pedidos ainda.
                    <Link to={'/plates'} className={styles.platesLink}>Clique aqui para ver nossas especialidades</Link>
                </div>
            }
        </div>
    )
}