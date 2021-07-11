
import Image from 'next/image';

export default function CartData (props) {
  const {dataItem, included} = props;
  console.log(dataItem);
  const variations = included[dataItem?.relationships?.purchased_entity?.data?.type];
  const variation = variations[dataItem?.relationships?.purchased_entity?.data?.id];

  const files = included[variation?.relationships?.field_images?.data[0]?.type];
  const file = files[variation?.relationships?.field_images?.data[0]?.id];

  console.log(variation?.relationships?.field_images?.data[0]?.id);
  console.log(file);
  const fileUrl = file?.attributes?.uri?.url;
  const imageUrl = `${process.env.DRUPAL_API_URL}${fileUrl}`;
  console.log(imageUrl)

  let title = dataItem.attributes.title;
  let quantity = dataItem.attributes.quantity;
  let unitPrice = dataItem.attributes.unit_price;
  let itemTotal = dataItem.attributes.total_price;

  return (
    <div className="flex border-solid border-4 border-light-blue-500 mt-4 p-4">
      <div> 
        <Image src={imageUrl} width="200" height="200" alt="variation default pic" />
      </div>
      <div className="ml-8">
        <div>Title: {title}</div>
        <div>Unit Price: {unitPrice.formatted}</div>
        <div>Quantity: {quantity}</div>
        <div>Item total: {itemTotal.formatted}</div>
      </div>
    </div>
  )
}