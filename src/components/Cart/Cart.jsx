import React, { useEffect, useState } from 'react';
import './Cart.css'

const Cart = ({cart, clearCartItems}) => {
    let price = 0;
    const sortedCart = cart.sort((a, b) => b.quantity - a.quantity );

    for(const item of sortedCart) {
        price += parseInt(item.price) * item.quantity;
    }

    const tax = price*10/100;
    // console.log(tax)
    
    return (
        <aside className='cart-styles'>
            <h2 style={{marginTop: "55px"}}>Shopping Lists</h2>
            <ul className='ul-styles'>
                {
                    sortedCart.map(item => <li style={{marginBlock: "10px"}} className='unstyled' key={item.idMeal}>{item.strMeal.slice(0, 19)} <span style={{marginLeft: "5px"}}>Quantity: {item.quantity}</span></li>)
                }
            </ul>
            {
                <h4>Total-Price: {price + tax}tk only</h4>
            }
            <button onClick={clearCartItems}>Clear Cart</button>
        </aside>
    );
};

export default Cart;