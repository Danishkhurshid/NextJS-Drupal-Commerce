import Image from 'next/image';
import Link from 'next/link'

export default function Header () {
  return(
    <div className="flex justify-between my-8">
    <div className="cursor-pointer">
     <Link href="/">
        <Image 
          src={'/logo.png'}
          width={128} 
          height={40}
          alt="logo" 
        />
      </Link>
    </div>
    <div className="cursor-pointer">
      <Link href="/cart">
        <Image 
          src={'/shopping-cart.png'}
          width={40} 
          height={40}
          alt="cart" 
        />
      </Link>
    </div>
      
    </div>
  );
}

