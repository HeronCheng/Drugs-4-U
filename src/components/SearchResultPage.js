import React from "react";
import { useParams } from "react-router-dom";
//components
import Nav from "./Nav.js";
import Footer from "./Footer";
import {db, doc, getDoc, collection, setDoc}  from "./FirebaseConfig";


const SearchResultPage = () => {
    let { id } = useParams();
    async function fetchData(){
        let docSnap = await getDoc(doc(db, "undischarged", id));
        return docSnap;
    }
    fetchData().then(result=>{			
        if(result!==null){		
            result.forEach((doc) => {
                    console.log(doc)
                });
    }})
    return(
        <>
            <Nav/>
            <div className="pt-20 h-36 bg-sky-100 z-0">
                
            </div>
            <div className="my-10 flex w-full justify-around">
                <div className="w-[55%] h-72 border-stone-300 border-4 border-solid rounded-md"></div>
                <div className="w-[35%] h-72 border-stone-300 border-4 border-solid rounded-md"></div>
            </div>
            <Footer/>
        </>
    );
};


export default SearchResultPage;