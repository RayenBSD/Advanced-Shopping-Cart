import React, { useState } from 'react'

import { Offcanvas, Stack } from 'react-bootstrap'

import { useShoppingCart } from '../context/ShoppingCartContext'
import storeJSON from '../data/fakeStore'
import { formatCurrency } from '../util/formatCurrency'
import CartItem from './CartItem'

type ShoppingCartProps = {
    isOpen:boolean
}

function ShoppingCart({ isOpen }:ShoppingCartProps) {

    const { closeCart, cartItems } = useShoppingCart();

    const [store, setStore] = useState<string[] | any>([]);

    const result = async () => {
      let data:any = await storeJSON();
      //console.log(data);
  
      data = JSON.parse(data);
      console.log(data);
  
      if (!data) {
        setStore([]);
        return      
      }
      setStore(data);
    }
    
    result();

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className='ms-auto fw-bold fs-5'>
                        Total 
                        {
                            formatCurrency(cartItems.reduce((total, cartItem) => {
                                const item = store.find((i: any) => i.id === cartItem.id)
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0))
                        }
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ShoppingCart