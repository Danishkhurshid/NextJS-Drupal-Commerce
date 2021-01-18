import ProductDetail from '../../src/components/ProductDetail';
import ProductListing from '../../src/components/ProductListing';
import { jsonapiClient, jsonapiNormalize } from '../../utils/api';

export default function Product({ product }) {
  return(
    <>
    <ProductDetail product= {product}/>
    </>
  );
}


export async function getStaticPaths() {
  const products =  await jsonapiClient(process.env.REACT_APP_API_URL, 'products');
  const paths = products.data.map((product) => {
    console.log(product.id)
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
  console.log(params);
  let product = await jsonapiClient(process.env.REACT_APP_API_URL, 'product_single', {
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