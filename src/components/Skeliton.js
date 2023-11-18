import React from 'react'

const Skeliton = () => {
    const counter = 6;

    const Feedcounter = () => (
        <div className='productsk'>
        <div className='productimgsk'></div>
        <div className='producttitlesk'></div>
        <div className='productprisecartsk'>
        <div className='productpricesk'></div>
        <div className='productcartsk'></div>
        </div>
    </div>
    )
  return( 
    <div className='all_products_list'>
    {Array(counter).fill(<Feedcounter/>)}
    </div>
    )
}

export default Skeliton
