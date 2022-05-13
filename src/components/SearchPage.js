import React from "react";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox } from "react-instantsearch-hooks-web";

//components
import Nav from "./Nav.js";
import Footer from "./Footer";


const searchClient = algoliasearch( "process.env.ALGOLIA_APP_ID", "process.env.ALGOLIA_API_KEY" );


const SearchPage = () => {
    
    return(
        <>
            <Nav/>
            <div className="pt-20 h-36 bg-sky-100 z-0">       
                <InstantSearch searchClient={searchClient} indexName="instant_search">
                    <SearchBox />
                </InstantSearch>                
            </div>
            <Footer/>
        </>
    );
};


export default SearchPage;