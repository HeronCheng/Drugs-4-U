import React, { useState, useEffect } from "react";
import Typesense from "typesense";
//圖片
import underConstruction1 from "../img/undercontruction.jpg";
//components
import ChartTablet from "./ChartTablet.js";
import ChartOthers from "./ChartOthers.js";

const PriceChart = ( { id, name } ) => {
    let searchId;
    const value=id.slice( 2,4 );
    if( value === "藥陸" || value === "菌疫" || value === "醫器" || value === "罕藥" || value === "罕菌" ) {
        searchId = id.slice( 8,13 );
    }
    else if( value === "罕菌" ) {
        searchId = id.slice( 9,14 );
    }
    else {
        searchId = id.slice( 7,12 );
    }

    let client = new Typesense.Client( {
        "nodes" : [ {
            "host" : process.env.REACT_APP_TYPESENSE_HOST, 
            "port" : "443",
            "protocol" : "https"
        } ],
        "apiKey" : process.env.REACT_APP_TYPESENSE_APIKEY,
        "connectionTimeoutSeconds" : 2
    } );

    let search = {
        "q" : name,
        "query_by" : "藥品中文名稱",
        "per_page" : 50
    };

    const [ chartData, setChartData ]=useState( [] );
    useEffect( () => { 
        client.collections( "price" )
            .documents()
            .search( search )
            .then( function ( searchResults ) {
                const newArr=searchResults.hits.reduce( ( filtered, itemRef ) => {
                    if( itemRef.document.藥品代號.includes( searchId ) ) {
                        filtered.push( itemRef ); 
                    }
                    return filtered;
                },[] );
                setChartData( newArr );
            } );
        
    },[ chartData ] );

    const options = {
        responsive : true,
        plugins : {
            legend : {
                position : "top",
            },
            title : {
                display : true,
                text : "歷年健保給付價格",
            },
        },
    };
   
    return(
        <>
            { chartData[0] !== undefined ? ( chartData[0].document.劑型 === "錠劑" ? <ChartTablet chartData={chartData} options={options} name={name}/>:
                <ChartOthers chartData={chartData} options={options} name={name}/> ): <img src={underConstruction1}/> }
        </>
    );
};

export default PriceChart;