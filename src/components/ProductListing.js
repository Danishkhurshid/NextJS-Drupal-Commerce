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
  const url = `${process.env.DRUPAL_API_URL}${imageUrl}`;
  const productTitle = item?.attributes?.title;
  const hrefValue = `/product/${item.id}`;
 
  return(
    <Link href= {hrefValue}>
      <div className="flex flex-col cursor-pointer">
        <Image src={url} width="300" height="300" alt="Product Picture" />
        <div className="text-lg text-teal">{variationTitle}</div>
        <div className="text-xl">{price}</div>
      </div>
    </Link>
  ); 
}

export default ProductListing;