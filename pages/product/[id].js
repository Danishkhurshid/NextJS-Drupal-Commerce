import ProductDetail from '../../src/components/ProductDetail';
import ProductListing from '../../src/components/ProductListing';
import { jsonapiClient, jsonapiNormalize } from '../../utils/api';

export default function Product({ product }) {
  const {attributes, relationships} = product?.data[0];
  const included = product?.included;
  const variationType = relationships.variations.data[0].type;
  const variations = relationships.variations.data;
  const variationsIncluded = included[variationType];
  const files = included['file--file'];
 
  console.log(product);
  // console.log(variations);
  // console.log(included);
  // Variation data.
  let [defaultVariation] = Object.values(variationsIncluded)
  // price, sku, variation title
  const price = defaultVariation?.attributes?.price?.formatted;
  const sku = defaultVariation?.attributes?.sku;
  const variationTitle = defaultVariation?.attributes?.title;
  console.log(defaultVariation);
  //field_images, attribute_size, attribute_color
  

  // Images.
  // Each variation has mutliple images. 
  const field_images = defaultVariation.relationships.field_images.data;

  // Color
  const colorId = defaultVariation?.relationships?.attribute_color?.data?.id;
  const colorType =  defaultVariation?.relationships?.attribute_color?.data.type;
  // console.log(included);
  const colors = included[colorType];
  const colorValue =  colors ? Object.values(colors).find(color => color.id === colorId) : '';
  const defaultcolor = colorValue?.attributes?.name;

  // Size
  const sizeId = defaultVariation?.relationships?.attribute_size?.data?.id;
  const sizeType =  defaultVariation?.relationships?.attribute_size?.data?.type;
  const sizes = included[sizeType];
  const sizeValue =  sizes ? Object.values(sizes).find(size => size.id === sizeId) : '';
  const defaultSize = sizeValue?.attributes?.name;
  console.log(defaultSize)
  
  // Everytime color changes we need to change images. 
  
    
  return(
    <>
      <ProductDetail 
        attributes= {attributes}
        relationships = {relationships}
        price = {price}
        sku = {sku}
        variationTitle = {variationTitle}
        colorName = {defaultcolor}
        field_images = {field_images}
        sizeName = {defaultSize}
        sizes = {sizes}
        files = {files}
      />
    </>
  );
}


export async function getStaticPaths() {
  const products =  await jsonapiClient(process.env.DRUPAL_API_URL, 'products');
  const paths = products.data.map((product) => {
    return {
      params: {
        id: product.id
      }
    }
  });
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  let product = await jsonapiClient(process.env.DRUPAL_API_URL, 'product_single', {
    parameters: {
      id: params.id,
    },
  });
  product = jsonapiNormalize(product);
  return {
    props: {
      product
    }
  }
}