import React, { useState, useEffect } from "react";
import { storage, ref, getDownloadURL, listAll } from "./FirebaseConfig";
//圖片
import underConstruction from "../img/under-construction.png";

const StorageData = ( id ) => {

    const listRef = ref( storage, "appearance" );
    const [ url, setUrl ] = useState( [] );

    useEffect( () => {
        listAll( listRef )
            .then( ( res ) => {
                const newArr=res.items.reduce( function( filtered, itemRef ) {
                    if( itemRef.fullPath.includes( id.id ) ) {
                        let chosenData= itemRef.fullPath;
                        filtered.push( chosenData );
                    }
                    return filtered;
                }, [] );

                let promises = newArr.map( ( imageRef ) => getDownloadURL( ref( storage, imageRef ) ) );
                Promise.all( promises ).then( ( urls ) => {
                    setUrl( urls );
                } );

            } )
            .catch( ( error ) => {
                console.log( error );
            } );
    },[ url ] );

    return(
        <>
            { url.length === 0 ?
                ( <img src={underConstruction} key={underConstruction} alt="images"/> ):
                ( url.map( ( url, index ) => {
                    return <img src={url} key={index} alt="images"/>;
                } ) )
            }
        </>
    );
};

export default StorageData;