import Image from 'next/image';
import { useState } from 'react'

const DisplayImages = (props) => {
  const {field_images, files} = props;
  const defaultfile =  files[field_images[0]?.id];
  let defaultImageUrl = defaultfile?.attributes?.uri?.url;
  defaultImageUrl = `${process.env.DRUPAL_API_URL}${defaultImageUrl}`;
  const [defaultImage, setDefaultImage] = useState(defaultImageUrl);


// Change image url as per user action
  const changeImage = (url) => {
    setDefaultImage(url);
  }

// Map through images and render them.
  const renderImgaes = field_images.map((image=>{
    let file = files[image.id];
    let imageUrl = file.attributes.uri.url;
    let url = `${process.env.DRUPAL_API_URL}${imageUrl}`;
    return (
      <div>
        <Image 
          src={url} 
          width="100" 
          height="100" 
          alt="variation pic" 
          onClick={() => changeImage(url)}
        />
      </div>
    )
  }));

  return (
    <div className="w-full flex">
      <div className="px-8">{renderImgaes}</div>
      <Image src={defaultImage} width="300" height="300" alt="variation default pic" />
    </div>
  );

}

export default DisplayImages;