import Link from 'next/link';
import React from 'react'

const NavbarLeft = () => {
  return (
    <div className="flex items-center">
      <Link href="/" className="text-xl font-bold tracking-tight">
        Rent<span className="text-primary">Nest</span>
      </Link>
    </div>
  );
}

export default NavbarLeft