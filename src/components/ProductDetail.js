import Image from 'next/image';

const ProductDetail = ({product}) => {
  console.log(product);
 const {attributes, relationships} = product?.data[0];
 const {body, title} = attributes;
 
  return (
    <>
    <div>{attributes?.title}</div>
    <div>{attributes?.body?.processed}</div>
    </>
  );

}

export default ProductDetail;
