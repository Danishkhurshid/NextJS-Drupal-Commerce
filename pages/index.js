import ProductListing from '../src/components/ProductListing';
import { jsonapiClient, jsonapiNormalize } from '../utils/api';

export default function Home ({resultNormalized}) {
  const {data, included} = resultNormalized;

  // Map over each data item. That has multiple variations
  const displayData = data.map((item)=>{
    return(
      <>
      <ProductListing item={item} included={included}/>
      </>
    );
  });

  return(
    <>
    {displayData}
    </>
  );
}


export async function getStaticProps() {
  const data = await jsonapiClient(process.env.DRUPAL_API_URL, 'products');
  const resultNormalized = jsonapiNormalize(data);
  return {
    props: {
      resultNormalized,
    },
  }
}
