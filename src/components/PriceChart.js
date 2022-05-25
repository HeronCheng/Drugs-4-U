import React, { useState, useEffect } from "react";
import Typesense from "typesense";
//圖片
import underConstruction1 from "../img/undercontruction.jpg";
//圖表
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
//宣告變數
let arr1_1=[];
let arr1_2=[];
let quantity1;
let unit1;
let data1;
let data2;
let quantity2;
let unit2;
let arr2_1=[];
let arr2_2=[];
let data3;
let quantity3;
let unit3;
let arr3_1=[];
let arr3_2=[];
let data4;
let quantity4;
let unit4;

const PriceChart = ( { id, name } ) => {
    const searchId=id.slice( 7,12 );
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
    console.log( chartData );

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

    if( chartData[0] !== undefined && chartData[0].document.劑型 === "錠劑" ) {
        const type=chartData[0].document.藥品代號.slice( 7, );
        chartData.forEach( ( data ) => {
            if( data.document.藥品代號.slice( 7, ) === type ) {
                arr1_1.push( data );               
            }
            else{
                arr1_2.push( data );
            }
        } );
        const labels1=arr1_1.map( ( data ) => {
            return data.document.有效起日;
        } ).reverse();
        const price1=arr1_1.map( ( data ) => {
            return data.document.參考價;
        } ).reverse();

        if( arr1_1.length !==0 ) {      
            data1 = {
                labels : labels1,
                datasets : [
                    {
                        label : name+chartData[0].document.藥品代號,
                        data : price1,
                        borderColor : "rgb(255, 99, 132)",
                        backgroundColor : "rgba(255, 99, 132, 0.5)",
                    },
                ],
            };
        }
        if( arr1_2.length !==0 ) {
            
            const labels2=arr1_2.map( ( data ) => {
                return data.document.有效起日;
            } ).reverse();
            const price2=arr1_2.map( ( data ) => {
                return data.document.參考價;
            } ).reverse();
            
            data2 = {
                labels : labels2,
                datasets : [
                    {
                        label : name+arr1_2[0].document.藥品代號,
                        data : price2,
                        borderColor : "rgb(53, 162, 235)",
                        backgroundColor : "rgb(53, 162, 235, 0.5)",
                    },
                ],
            };
        }
        return(
            <>
                { chartData[0] !== undefined ? ( <Line options={options} data={data1} /> ): <img src={underConstruction1}/> }
                { arr1_2.length !== 0 ? ( <Line options={options} data={data2} /> ):""}
            </>
        );    
    }    
    else if( chartData[0] !== undefined && chartData[0].document.劑型 !== "錠劑" ) {
        
        quantity1=chartData[0].document.規格量;
        unit1=chartData[0].document.規格單位;
        chartData.forEach( ( data ) => {
            if( data.document.規格量 === quantity1 ) {
                arr1_1.push( data );               
            }
            else{
                arr1_2.push( data );
            }
        } );

    
        const labels1=arr1_1.map( ( data ) => {
            return data.document.有效起日;
        } ).reverse();
        const price1=arr1_1.map( ( data ) => {
            return data.document.參考價;
        } ).reverse();

        if( arr1_1.length !==0 ) {      
            data1 = {
                labels : labels1,
                datasets : [
                    {
                        label : name+quantity1+unit1,
                        data : price1,
                        borderColor : "rgb(255, 99, 132)",
                        backgroundColor : "rgba(255, 99, 132, 0.5)",
                    },
                ],
            };
        }
    

        
        if( arr1_2.length !==0 ) {
            quantity2=arr1_2[0].document.規格量;
            unit2=arr1_2[0].document.規格單位;
            arr1_2.forEach( ( data ) => {
                if( data.document.規格量 === quantity2 ) {
                    arr2_1.push( data );               
                }
                else{
                    arr2_2.push( data );
                }
            } );
        }
        if( arr2_1.length !==0 ) {
            const labels2=arr2_1.map( ( data ) => {
                return data.document.有效起日;
            } ).reverse();
            const price2=arr2_1.map( ( data ) => {
                return data.document.參考價;
            } ).reverse();

            data2 = {
                labels : labels2,
                datasets : [
                    {
                        label : name+quantity2+unit2,
                        data : price2,
                        borderColor : "rgb(53, 162, 235)",
                        backgroundColor : "rgb(53, 162, 235, 0.5)",
                    },
                ],
            };
        }


        if( arr2_2.length !==0 ) {
            quantity3=arr2_2[0].document.規格量;
            unit3=arr2_2[0].document.規格單位;
            arr2_2.forEach( ( data ) => {
                if( data.document.規格量 === quantity3 ) {
                    arr3_1.push( data );               
                }
                else{
                    arr3_2.push( data );
                }
            } );
        }

        if( arr3_1.length !==0 ) {
            const labels3=arr3_1.map( ( data ) => {
                return data.document.有效起日;
            } ).reverse();
            const price3=arr3_1.map( ( data ) => {
                return data.document.參考價;
            } ).reverse();

            data3 = {
                labels : labels3,
                datasets : [
                    {
                        label : name+quantity3+unit3,
                        data : price3,
                        borderColor : "rgb(255, 99, 132)",
                        backgroundColor : "rgb(255, 99, 132, 0.5)",
                    },
                ],
            };
        }

        if( arr3_2.length !==0 ) {
            quantity4=arr3_2[0].document.規格量;
            unit4=arr3_2[0].document.規格單位;
            const labels4=arr3_2.map( ( data ) => {
                return data.document.有效起日;
            } ).reverse();
            const price4=arr3_2.map( ( data ) => {
                return data.document.參考價;
            } ).reverse();

            data4 = {
                labels : labels4,
                datasets : [
                    {
                        label : name+quantity4+unit4,
                        data : price4,
                        borderColor : "rgb(53, 162, 235)",
                        backgroundColor : "rgb(53, 162, 235, 0.5)",
                    },
                ],
            };
        }
        return(
            <>
                { chartData[0] !== undefined ? ( <Line options={options} data={data1} /> ): <img src={underConstruction1}/> }
                { arr2_1.length !== 0 ? ( <Line options={options} data={data2} /> ):""}
                { arr3_1.length !== 0 ? ( <Line options={options} data={data3} /> ):""}
                { arr3_2.length !== 0 ? ( <Line options={options} data={data4} /> ):""}
            </>
        );
    }
    
    
};

export default PriceChart;