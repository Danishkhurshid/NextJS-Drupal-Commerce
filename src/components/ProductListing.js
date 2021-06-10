import Image from 'next/image'
import Link from 'next/link'

const ProductListing = ({item, included}) => {
  let price = '';
  let variationTitle = '';

  const variations = item.relationships.variations.data;
  const variationtype = item.relationships.variations.data[0].type;
  const variationId = item.relationships.variations.data[0].id;
  const variation =  included[variationtype][variationId];
  price = variation.attributes.resolved_price.formatted;
  variationTitle = variation.attributes.title;

  const imageId = variation.relationships.field_images.data[0].id;
  const imageFile = included['file--file'][imageId];
  let imageUrl = imageFile.attributes.uri.url;
  const url = `http://decoupled-drupal:8888${imageUrl}`;
  const productTitle = item?.attributes?.title;
  const hrefValue = `/product/${item.id}`;
 
  return(
    <>
      <Image src={url} width="300" height="300" alt="Profile Picture" />
      <div>{productTitle}</div>
      <Link href= {hrefValue}>{variationTitle}</Link>
      <div>{price}</div>
    </>
  ); 
}

export default ProductListing;