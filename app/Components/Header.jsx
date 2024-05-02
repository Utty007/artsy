import Link from 'next/link';
import CartIcon from "../Assets/Icons/CartIcon";
import NotificationIcon from "../Assets/Icons/NotificationIcon";
import SearchIcon from "../Assets/Icons/SearchIcon";

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3">
      <div className='lg:hidden'>
        <label className="btn btn-circle bg-transparent border-0 shadow-none swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />
          {/* hamburger icon */}
          <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
          {/* close icon */}
          <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
        </label>
      </div>
      <h1 className="text-xl font-bold">ARTSY.</h1>
      <nav className="hidden lg:flex items-center gap-5">
        <span><Link href="/" className="transition-all focus:text-zinc-950 focus:font-bold hover:underline text-zinc-600">Home</Link></span>
        <span><Link href="/Marketplace" className="transition-all focus:text-zinc-950 focus:font-bold hover:underline text-zinc-600">Marketplace</Link></span>
        <span><Link href="/Auctions" className="transition-all focus:text-zinc-950 focus:font-bold hover:underline text-zinc-600">Auctions</Link></span>
        <span><Link href="/Drops" className="transition-all focus:text-zinc-950 focus:font-bold hover:underline text-zinc-600">Drops</Link></span>
      </nav>
      <div className="flex items-center">
        <SearchIcon />
        <CartIcon />
        <span className='hidden lg:block'>
          <NotificationIcon />
        </span>
      </div>
    </header>
  )
}

export default Header;


/* 
What to learn as a Blockchain Developer
Solidity Programming Language - Main Language for writing ETH smart contracts.

*/