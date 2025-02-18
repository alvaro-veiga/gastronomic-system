import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import authServices from "../../services/auth"
import orderServices from "../../services/orders"
import { format, parseISO } from 'date-fns';
import styles from './page.module.css'

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
        return( <h1>loading...</h1>)
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
            <button onClick={handleLogout}>Logout</button>
            {ordersList.length > 0 ?
                <div className={styles.ordersContainer}>
                    {ordersList.map((order) => (
                        <div key={order._id} className={styles.orderContainer}>
                            <p>{order.pickupStatus}</p>
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
                    Voce não tem pedidos ainda
                </div>
            }
        </div>
    )
}