import Image from 'next/image';

const ProductDetail = (props) => {
 const {body} = props.attributes;
 const {price, sku, variationTitle, colorName, field_images, sizeName, sizes, files} = props;
  console.log(files);
  console.log(field_images);
 // Display images. 
 const displayImages = () => {
   
 }
 
  return (
    <>
    <div>{variationTitle}</div>
    <div>{sku}</div>
    <div>{price}</div>
    <div>{body?.processed}</div>
    </>
  );

}

export default ProductDetail;
