import React, { useState } from 'react'

import { Col, Row } from 'react-bootstrap';

import StoreItem from '../components/StoreItem';

import storeJSON from '../data/fakeStore';

function Store() {

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
    <>
    <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className='g-3'>
        {
          store.map((item:any, index:number) => 
            <Col key={index}>
              <StoreItem {...item}/>
            </Col>
          )
        }
      </Row>
    </>
  )
}

export default Store;