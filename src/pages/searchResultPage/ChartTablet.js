import React from "react";
import { chartConfig1, chartConfig2 } from "./chartTabletConfig";
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

const ChartTablet = ( { chartData, options } ) => {
    //宣告變數
    let arr1_1=[];
    let arr1_2=[];

    //確認藥品代碼末三碼相同
    const type=chartData[0].document.藥品代號.slice( 7, );
    chartData.forEach( ( data ) => {
        if( data.document.藥品代號.slice( 7, ) === type ) {
            arr1_1.push( data );               
        }
        else{
            arr1_2.push( data );
        }
    } );   

    return(
        <>
            <Line options={options} data={chartConfig1( arr1_1 )} />
            { arr1_2.length !== 0 ? ( <Line options={options} data={chartConfig2( arr1_2 )} /> ):""}
        </>
    );    
   
};


export default ChartTablet;