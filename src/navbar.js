import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav>
        <div class="container mx-auto px-6 py-2 flex justify-between items-center">
          <a class="font-bold text-2xl lg:text-4xl" href="https://www.joinpuzzl.com/">Puzzl </a>
        <div class="hidden lg:block">
          <ul class="inline-flex">
            <li><a class="px-4 hover:text-gray-800" href="https://www.joinpuzzl.com/">Home</a></li>
            <Link to="/"><p class="px-4 font-bold">Knowledge Center</p></Link>
            <li><a class="px-4 hover:text-gray-800" href="https://www.joinpuzzl.com/docs/">Docs</a></li>
          </ul>
        </div>
      </div>
      </nav>
    );
}


export default Navbar;