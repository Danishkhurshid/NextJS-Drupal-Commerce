import DisplayImages from './attributes/DisplayImages'
import CartHandler from '../../utils/CartService';

const ProductDetail = (props) => {
  
  const {body} = props.attributes;
  const {price, sku, variationTitle, colorName, field_images, sizeName, sizes, files, defaultVariation} = props; 

  const handleClick = async () =>{
    const productId = defaultVariation.id;
    const preFetchData = await CartHandler.addCartItem(productId, 1, "product-variation--simple");
  }
  return (
    <>
     <DisplayImages
        files={files}
        field_images={field_images}
      />
    <div className="w-full">
      <div>{variationTitle}</div>
      <div>{sku}</div>
      <div>{price}</div>
      <div>{body?.processed}</div>
      <button className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-black rounded mt-4" 
        onClick={handleClick}>
        Add to cart
      </button>
    </div>
    </>
  );

}

export default ProductDetail;
