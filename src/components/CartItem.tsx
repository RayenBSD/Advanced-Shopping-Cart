import React, { useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import storeJSON from '../data/fakeStore'
import { formatCurrency } from '../util/formatCurrency'
import CloseIcon from '@mui/icons-material/Close';

type CartItemProps = {
    id:number,
    quantity:number
}

function CartItem({ id, quantity }:CartItemProps) {
    const { removeFromCart } = useShoppingCart()

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
    const item = store.find((i: any) => i.id === id)
    
    if(item == null) return null
    
    return (
        <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
            <img 
                src={item.image} 
                style={{width: '125px', height: '75px', objectFit: 'cover'}}
            />
            <div className='me-auto'>
                <div>
                    {item.title}
                    {
                        (quantity > 0)
                        &&
                        (
                            <span 
                                className='text-muted'
                                style={{fontSize: '.65rem'}}
                            >
                                {quantity}x
                            </span>
                        )
                    }
                </div>
                <div 
                    className='text-muted'
                    style={{fontSize: '.75rem'}}
                >
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div>
                {formatCurrency(item.price * quantity)}
            </div>
            <Button
                variant='outline-danger'
                size='sm'
                onClick={() => removeFromCart(item.id)}
            >
                <CloseIcon />
            </Button>
        </Stack>
    )
}

export default CartItem