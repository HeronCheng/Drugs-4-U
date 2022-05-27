import React from "react";
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
let data1;
let data2;

const ChartTablet = ( { chartData, options, name } ) => {
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
            <Line options={options} data={data1} />
            { arr1_2.length !== 0 ? ( <Line options={options} data={data2} /> ):""}
        </>
    );    
   
};

const areEqual = ( prevProps, nextProps ) => true;
export default React.memo( ChartTablet, areEqual );
