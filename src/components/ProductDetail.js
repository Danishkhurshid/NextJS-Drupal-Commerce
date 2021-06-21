import DisplayImages from './attributes/DisplayImages'

const ProductDetail = (props) => {
 const {body} = props.attributes;
 const {price, sku, variationTitle, colorName, field_images, sizeName, sizes, files} = props; 
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
    </div>
    </>
  );

}

export default ProductDetail;
