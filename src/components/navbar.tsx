import { Link } from "@nextui-org/link";
export const Navbar = () => {

  return (
    <div  id="NavBar">
      <Link
        color="foreground"
        href="/"
      
      >
        <div id="NavBrand">
        <img src="https://cdn4.iconfinder.com/data/icons/factory-21/512/N_T_1168Artboard_1_copy_2-512.png"
            alt="Logo"
              width={40}
              height={40}
              />
              
              <h1 className="font-bold text-xl">My Inventory</h1>
      </div>
      </Link>
    </div>
  );
};

export default Navbar;