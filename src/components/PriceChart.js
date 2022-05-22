import React, { useState, useEffect } from "react";
import { db, query, where, collection, getDocs } from "./FirebaseConfig";
//圖片
import underConstruction1 from "../img/undercontruction.jpg";

const PriceChart = ( id ) => {
    const [ priceData, setPriceData ] = useState ( "" );
    const queryString=( id.id ).slice( 6, 12 );
    useEffect( () => {
        async function fetchData() {
            const priceRef = collection( db, "price" );
            const q = query( priceRef, where( "藥品代號", "==", "A016352100" ) );
            const docSnap = await getDocs( q );
            return docSnap;
        };
        fetchData().then( result => {		
            console.log( result );
            result.forEach( ( doc ) => {
                console.log( doc.id, " => ", doc.data() ); 
            } );
        } );
    },[ priceData ] );
    

    return(
        <>
            <canvas id="priceChart" className="hidden"></canvas>
            <img src={underConstruction1}/>
        </>
    );
};

export default PriceChart;