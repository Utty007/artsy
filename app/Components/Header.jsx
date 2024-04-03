import Link from 'next/link';
import CartIcon from "../Assets/Icons/CartIcon";
import NotificationIcon from "../Assets/Icons/NotificationIcon";
import SearchIcon from "../Assets/Icons/SearchIcon";


function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3">
      <h1 className="text-xl font-bold">ARTSY.</h1>
      <nav className="flex items-center gap-5">
        <span><Link href="/" className="transition-all focus:text-zinc-950 focus:font-bold hover:underline text-zinc-600">Home</Link></span>
        <span><Link href="/Marketplace" className="transition-all focus:text-zinc-950 focus:font-bold hover:underline text-zinc-600">Marketplace</Link></span>
        <span><Link href="/Auctions" className="transition-all focus:text-zinc-950 focus:font-bold hover:underline text-zinc-600">Auctions</Link></span>
        <span><Link href="/Drops" className="transition-all focus:text-zinc-950 focus:font-bold hover:underline text-zinc-600">Drops</Link></span>
      </nav>
      <div className="flex items-center">
        <SearchIcon />
        <CartIcon />
        <NotificationIcon />
      </div>
    </header>
  )
}

export default Header;
