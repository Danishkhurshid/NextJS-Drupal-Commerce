import CartHandler from '../utils/CartService';
import { useState, useEffect } from 'react';
import CartData from '../src/components/CartData';
import { jsonapiNormalize } from '../utils/api';

export default function Cart () {

  const [cartObj, setCartObj] = useState(false);
   let order_items = '';
   let included = ''
   let orderData = '';
   let OrderTotal = '';

  if(cartObj?.data?.length > 0) {
    const {attributes, relationships } = cartObj.data[0];
    order_items = relationships?.order_items?.data;
    included = cartObj?.included;
    orderData = attributes;    
    OrderTotal = orderData?.order_total?.total?.formatted;
  }


  useEffect(() => {

    (async () => {
      let carts = await CartHandler.getCart();
      carts = jsonapiNormalize(carts);
      setCartObj(carts)
    })()

  },[]);


  return(
    <div className="flex justify-around	items-baseline">
    {
      order_items ? (
      <>
        <div>
          {order_items ?
            order_items.map((item, index) => {
              const itemType = item.type;
              const dataItem = included[itemType][item.id];
          
              return (
                <CartData
                  dataItem= {dataItem}
                  included={included}
                />
              );
            }) : ''
          }
        </div>
        <div className="border-solid border-4 border-light-blue-500 p-4">
          Order Total:
          {OrderTotal}
          <div>
            <button className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-black rounded mt-4">
              Checkout
            </button>
          </div>
        </div>
      </>
      )
      : <div>'Your cart is empty'</div>
    }
    </div>
  );
}