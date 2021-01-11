
import SearchBar from './SearchBar.js';
import help from './help.svg';


function Search() {
    return (
      <div class="container:md">
        <img class="object-contain h-48 w-full" src={help} alt="help" />
        <h1 class="font-bold text-4xl">What do you need help with?</h1>
        <SearchBar></SearchBar>

      </div>
    );
  }
  export default Search;