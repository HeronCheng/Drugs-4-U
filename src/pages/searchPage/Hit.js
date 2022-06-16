import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Highlight } from "react-instantsearch-dom";
import { addDoc, fetchData, delDoc } from "./bookMark";
import { AuthContext } from "../../App";
//圖片
import add from "../../img/bookmark_add.png";
import fill from "../../img/bookmark_add_FILL.png";

function Hit( { hit, setIsLoading } ) {

    const { isSignedIn, userUid } = useContext( AuthContext );
    const [ signedIn ] = isSignedIn;
    const [ uid ] = userUid; 

    let urlParameter = encodeURIComponent( hit.許可證字號 );
    const [ bookMark, setBookMark ] = useState( false );

    fetchData( uid, hit ).then( ( result ) => {
        if( result !== undefined ) {
            setBookMark( true );
        }
        else{
            setBookMark( false );
        }
    } );

    useEffect( () => {
        setIsLoading( false );
    },[] );

    return (
        <article className="border-solid border-y border-x-0 xs:border-2 shadow-none xs:shadow-md rounded-none xs:rounded-lg p-5 mx-auto my-0 xs:my-6 leading-8 hover:shadow-none xs:hover:shadow-lg hover:bg-slate-50">  
            <div className="relative">
                <Link to={`/search/${urlParameter}`}>
                    <h1 className="text-lg xs:text-xl font-bold mb-3 text-cyan-900 w-[90%]"> 
                        <Highlight 
                            attribute="中文品名" 
                            hit={hit}
                            highlightedTagName="em"                            
                        />&nbsp;&nbsp;
                        <Highlight 
                            attribute="英文品名" 
                            hit={hit}
                            highlightedTagName="em"
                        /> 
                    </h1>
                </Link>
                { signedIn ? <img src={bookMark?fill:add} className="absolute right-[-7px] top-[-7px] cursor-pointer" onClick={bookMark?() => delDoc( uid, hit, bookMark, setBookMark ):() => addDoc( uid, hit, bookMark, setBookMark )}/> : "" }
            </div>
            <hr className="mb-3"/>
            <p className="text-zinc-700 w-[95%] text-sm xs:text-base"><span className="font-semibold">適應症 :</span> {hit.適應症}</p>
            <p className="text-zinc-700 w-[95%] text-sm xs:text-base"><span className="font-semibold">許可證字號 :</span> {hit.許可證字號}</p>
        </article>
    );
}

export default Hit;