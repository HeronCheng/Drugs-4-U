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
        
    },[] );


    const options = {
        responsive : true,
        plugins : {
            legend : {
                position : "top",
                labels: {
                    font: {
                        size: 14
                    }
                }
            },
            title : {
                display : true,
                text : " 歷年健保給付價格",
                font: {
                    size: 16
                },
                padding: {
                    bottom: 20,
                    top:20
                }
            },
        },
    };


    return(
        <>
            { 
                chartData[0] !== undefined ? ( chartData[0].document.劑型 === "錠劑" || 
                chartData[0].document.劑型 === "口服懸液用粉劑" || 
                chartData[0].document.劑型 === "丸劑" || 
                chartData[0].document.劑型 === "口含錠" || 
                chartData[0].document.劑型 === "口腔崩散錠" ||
                chartData[0].document.劑型 === "口腔噴霧性膠囊" ||
                chartData[0].document.劑型 === "口腔錠" ||
                chartData[0].document.劑型 === "膜衣錠" ||
                chartData[0].document.劑型 === "口溶膜" ||
                chartData[0].document.劑型 === "口溶錠" ||
                chartData[0].document.劑型 === "口頰溶片" ||
                chartData[0].document.劑型 === "口頰錠" ||
                chartData[0].document.劑型 === "子宮內避孕器" ||
                chartData[0].document.劑型 === "可溶錠" ||
                chartData[0].document.劑型 === "多層錠" ||
                chartData[0].document.劑型 === "舌下錠" ||
                chartData[0].document.劑型 === "咀嚼錠" ||
                chartData[0].document.劑型 === "長效膜衣錠" ||
                chartData[0].document.劑型 === "長效錠" ||
                chartData[0].document.劑型 === "持續性膜衣錠" ||
                chartData[0].document.劑型 === "持續性糖衣錠" ||
                chartData[0].document.劑型 === "持續性藥效膜衣錠" ||
                chartData[0].document.劑型 === "持續性藥效膠囊劑" ||
                chartData[0].document.劑型 === "持續性藥效錠" ||
                chartData[0].document.劑型 === "持續性釋放膜衣錠" ||
                chartData[0].document.劑型 === "持續性釋放膠囊" ||
                chartData[0].document.劑型 === "持續性釋放錠" ||
                chartData[0].document.劑型 === "持續釋放口溶錠" ||
                chartData[0].document.劑型 === "持續釋放膜衣錠" ||
                chartData[0].document.劑型 === "凍晶口溶錠" ||
                chartData[0].document.劑型 === "軟膠囊劑" ||
                chartData[0].document.劑型 === "發泡錠" ||
                chartData[0].document.劑型 === "微粒膠囊" ||
                chartData[0].document.劑型 === "腸溶軟膠囊劑" ||
                chartData[0].document.劑型 === "腸溶微粒膠囊劑" ||
                chartData[0].document.劑型 === "腸溶膜衣錠" ||
                chartData[0].document.劑型 === "腸溶膠囊劑" ||
                chartData[0].document.劑型 === "腸溶糖衣錠" ||
                chartData[0].document.劑型 === "腸溶錠" ||
                chartData[0].document.劑型 === "緩釋微粒膠囊" ||
                chartData[0].document.劑型 === "緩釋膜衣錠" ||
                chartData[0].document.劑型 === "緩釋膠囊" ||
                chartData[0].document.劑型 === "緩釋錠" ||
                chartData[0].document.劑型 === "膜衣錠" ||
                chartData[0].document.劑型 === "膠囊劑" ||
                chartData[0].document.劑型 === "糖衣錠" ? 
                    <ChartTablet chartData={chartData} options={options} name={name}/>:
                    <ChartOthers chartData={chartData} /> ): <img src={underConstruction1}/> }
        </>
    );
};

export default PriceChart;