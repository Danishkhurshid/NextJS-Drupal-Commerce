const url = process.env.DRUPAL_API_URL;

class CartService {
  async getCartToken () {
    const tokgen = Math.random().toString(36).substr(2);
    var myHeaders = new Headers()
    let cartToken = ''
    cartToken = (localStorage.getItem('cartToken') !== null) ? JSON.parse(localStorage.getItem('cartToken')) : tokgen;
    myHeaders.append('Commerce-Cart-Token',  cartToken)
    myHeaders.append('Content-Type', 'application/vnd.api+json');
    localStorage.setItem('cartToken', JSON.stringify(cartToken));
    return myHeaders;
  }

// Returns multiple carts associated with the cart token.
  getCart = async() => {
    const header = await this.getCartToken();
    const res = await fetch(`${url}/jsonapi/carts?include=order_items.purchased_entity.field_images`, {
      method: 'GET',
      headers: header
    })
    if(res.status !== 200) {
      return false;
    } else {
      const data = await res.json();
      return data; 
    } 
  }

// Adds a product to cart based on it's id and type. 
  addCartItem = async (id, quantity, type) => {
    const header = await this.getCartToken();
    var requestData = {
      data: [
        {
          type: type,
          id: id,
          meta: {
              quantity: quantity
          }
        }
      ]
    }
    const res = await fetch(`${url}/jsonapi/cart/add`, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(requestData)
    })
    if(res.status !== 200) {
      return false;
    } else {
      const data = await res.json();
      return data; 
    }    
  }
}
const CartHandler = new CartService();
export default CartHandler;
