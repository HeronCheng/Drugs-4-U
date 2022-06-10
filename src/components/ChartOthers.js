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

const ChartOthers = ( { chartData } ) => {
    //宣告變數
    let data1;
    let data2;
    let data3;
    let data4;
    let arr1_1=[];
    let arr1_2=[];
    let arr1_3=[];
    let arr1_4=[];
    let arr1_5=[];
    let arr1_6=[];
    let arr1_7=[];
    let arr1_8=[];


    //確認藥品代碼首二碼相同
    let prefix=chartData.map( ( data ) => {
        return data.document.規格量;
    } );
    //去除重複的資料
    let newPrefix = [ ...new Set( prefix ) ];

    const len=newPrefix.length;

    function chartConfig( arr,arr1,arr2,arr3,arr4 ) {
        
        //確認藥品代碼首二碼相同
        let prefix1=arr.map( ( data ) => {
            return data.document.藥品代號.slice( 0, 2 );
        } );
        //去除重複的資料
        let newPrefix1 = [ ...new Set( prefix1 ) ];
        const len1=newPrefix1.length;
        //x軸資料
        const labels=arr.map( ( data ) => {
            return data.document.有效起日;
        } ).reverse();
        let newLabels = [ ...new Set( labels ) ];
        newLabels.sort().push( "now" );
        if( len1 === 1 ) {
            arr1=arr;
            arr1.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            let firstData=arr1.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            firstData.push( { x : "now", y : arr1.at( -1 ).document.參考價 } );        
            return {
                labels : newLabels,
                datasets : [
                    {
                        label : arr1[0].document.藥品代號,                    
                        borderColor : "rgb(255, 99, 132)",
                        backgroundColor : "rgba(255, 99, 132, 0.5)",
                        data : firstData,
                    },
                ],
            };
        }
        else if( len1 === 2 ) {
            arr.forEach( ( data ) => {
                if( data.document.藥品代號.slice( 0, 2 ) === newPrefix1[0] ) {
                    arr1.push( data );               
                }
                else{
                    arr2.push( data );
                }
            } );
            
            arr1.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            arr2.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            let firstData=arr1.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            firstData.push( { x : "now", y : arr1.at( -1 ).document.參考價 } );
            let secondData=arr2.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            secondData.push( { x : "now", y : arr2.at( -1 ).document.參考價 } );
            
            return data2 = {
                labels : newLabels,
                datasets : [
                    {
                        label : arr1[0].document.藥品代號,                    
                        borderColor : "rgb(255, 99, 132)",
                        backgroundColor : "rgba(255, 99, 132, 0.5)",
                        data : firstData
                    },
                    {
                        label : arr2[0].document.藥品代號,                    
                        borderColor : "rgb(53, 162, 235)",
                        backgroundColor : "rgb(53, 162, 235, 0.5)",
                        data : secondData
                    },
                ],
            };
        }
        else if( len1 === 3 ) {
            arr.forEach( ( data ) => {
                if( data.document.藥品代號.slice( 0, 2 ) === newPrefix1[0] ) {
                    arr1.push( data );               
                }
                else if( data.document.藥品代號.slice( 0, 2 ) === newPrefix1[1] ) {
                    arr2.push( data );
                }
                else{
                    arr3.push( data );
                }
            } );
            arr1.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            arr2.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            arr3.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            let firstData=arr1.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            firstData.push( { x : "now", y : arr1.at( -1 ).document.參考價 } );
            let secondData=arr2.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            secondData.push( { x : "now", y : arr2.at( -1 ).document.參考價 } );
            let thirdData=arr3.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            thirdData.push( { x : "now", y : arr3.at( -1 ).document.參考價 } );

            return data3 = {
                labels : newLabels,
                datasets : [
                    {
                        label : arr1[0].document.藥品代號,                    
                        borderColor : "rgb(255, 99, 132)",
                        backgroundColor : "rgba(255, 99, 132, 0.5)",
                        data : firstData
                    },
                    {
                        label : arr2[0].document.藥品代號,                    
                        borderColor : "rgb(53, 162, 235)",
                        backgroundColor : "rgb(53, 162, 235, 0.5)",
                        data : secondData
                    },
                    {
                        label : arr3[0].document.藥品代號,                    
                        borderColor : "rgb(75, 192, 192)",
                        backgroundColor : "rgba(75, 192, 192, 0.5)",
                        data : thirdData
                    },
                ],
            };
        }
        else{
            arr.forEach( ( data ) => {
                if( data.document.藥品代號.slice( 0, 2 ) === newPrefix1[0] ) {
                    arr1.push( data );               
                }
                else if( data.document.藥品代號.slice( 0, 2 ) === newPrefix1[1] ) {
                    arr2.push( data );
                }
                else if( data.document.藥品代號.slice( 0, 2 ) === newPrefix1[2] ) {
                    arr3.push( data );
                }
                else{
                    arr4.push( data );
                }
            } );
            arr1.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            arr2.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            arr3.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            let firstData=arr1.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            firstData.push( { x : "now", y : arr1.at( -1 ).document.參考價 } );
            let secondData=arr2.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            secondData.push( { x : "now", y : arr2.at( -1 ).document.參考價 } );
            let thirdData=arr3.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            thirdData.push( { x : "now", y : arr3.at( -1 ).document.參考價 } );
            let forthData=arr4.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            forthData.push( { x : "now", y : arr4.at( -1 ).document.參考價 } );
           
            return data4 = {
                labels : newLabels,
                datasets : [
                    {
                        label : arr1[0].document.藥品代號,                    
                        borderColor : "rgb(255, 99, 132)",
                        backgroundColor : "rgba(255, 99, 132, 0.5)",
                        data : firstData
                    },
                    {
                        label : arr2[0].document.藥品代號,                    
                        borderColor : "rgb(53, 162, 235)",
                        backgroundColor : "rgb(53, 162, 235, 0.5)",
                        data : secondData
                    },
                    {
                        label : arr3[0].document.藥品代號,                    
                        borderColor : "rgb(75, 192, 192)",
                        backgroundColor : "rgba(75, 192, 192, 0.5)",        
                        data : thirdData
                    },
                    {
                        label : arr4[0].document.藥品代號,                    
                        borderColor : "rgb(255, 153, 18)",
                        backgroundColor : "rgb(255, 153, 18, 0.5)",
                        data : forthData
                    },
                ],
            };
        }
    }

    let arr1_1_1=[];
    let arr1_1_2=[];
    let arr1_1_3=[];
    let arr1_1_4=[];
    let arr1_2_1=[];
    let arr1_2_2=[];
    let arr1_2_3=[];
    let arr1_2_4=[];
    let arr1_3_1=[];
    let arr1_3_2=[];
    let arr1_3_3=[];
    let arr1_3_4=[];
    let arr1_4_1=[];
    let arr1_4_2=[];
    let arr1_4_3=[];
    let arr1_4_4=[];
    let arr1_5_1=[];
    let arr1_5_2=[];
    let arr1_5_3=[];
    let arr1_5_4=[];
    let arr1_6_1=[];
    let arr1_6_2=[];
    let arr1_6_3=[];
    let arr1_6_4=[];
    let arr1_7_1=[];
    let arr1_7_2=[];
    let arr1_7_3=[];
    let arr1_7_4=[];
    let arr1_8_1=[];
    let arr1_8_2=[];
    let arr1_8_3=[];
    let arr1_8_4=[];

    if( len === 1 ) {
        arr1_1=chartData;
    } else if( len === 2 ) {
        chartData.forEach( ( data ) => {
            if( data.document.規格量 === newPrefix[0] ) {
                arr1_1.push( data );               
            }
            else{
                arr1_2.push( data );
            }
        } );   
    }
    else if( len === 3 ) {
        chartData.forEach( ( data ) => {
            if( data.document.規格量 === newPrefix[0] ) {
                arr1_1.push( data );               
            }
            else if ( data.document.規格量 === newPrefix[1] ) {
                arr1_2.push( data );
            }
            else{
                arr1_3.push( data );
            }
        } );
    }
    else if( len === 4 ) {
        chartData.forEach( ( data ) => {
            if( data.document.規格量 === newPrefix[0] ) {
                arr1_1.push( data );               
            }
            else if ( data.document.規格量 === newPrefix[1] ) {
                arr1_2.push( data );
            }
            else if ( data.document.規格量 === newPrefix[2] ) {
                arr1_3.push( data );
            }
            else{
                arr1_4.push( data );
            }
        } );
    }
    else if( len === 5 ) {
        chartData.forEach( ( data ) => {
            if( data.document.規格量 === newPrefix[0] ) {
                arr1_1.push( data );               
            }
            else if ( data.document.規格量 === newPrefix[1] ) {
                arr1_2.push( data );
            }
            else if ( data.document.規格量 === newPrefix[2] ) {
                arr1_3.push( data );
            }
            else if ( data.document.規格量 === newPrefix[3] ) {
                arr1_4.push( data );
            }
            else{
                arr1_5.push( data );
            }
        } );
    }
    else if( len === 6 ) {
        chartData.forEach( ( data ) => {
            if( data.document.規格量 === newPrefix[0] ) {
                arr1_1.push( data );               
            }
            else if ( data.document.規格量 === newPrefix[1] ) {
                arr1_2.push( data );
            }
            else if ( data.document.規格量 === newPrefix[2] ) {
                arr1_3.push( data );
            }
            else if ( data.document.規格量 === newPrefix[3] ) {
                arr1_4.push( data );
            }
            else if ( data.document.規格量 === newPrefix[4] ) {
                arr1_5.push( data );
            }
            else{
                arr1_6.push( data );
            }
        } );
    }
    else if( len === 7 ) {
        chartData.forEach( ( data ) => {
            if( data.document.規格量 === newPrefix[0] ) {
                arr1_1.push( data );               
            }
            else if ( data.document.規格量 === newPrefix[1] ) {
                arr1_2.push( data );
            }
            else if ( data.document.規格量 === newPrefix[2] ) {
                arr1_3.push( data );
            }
            else if ( data.document.規格量 === newPrefix[3] ) {
                arr1_4.push( data );
            }
            else if ( data.document.規格量 === newPrefix[4] ) {
                arr1_5.push( data );
            }
            else if ( data.document.規格量 === newPrefix[5] ) {
                arr1_6.push( data );
            }
            else{
                arr1_7.push( data );
            }
        } );
    }
    else if( len === 8 ) {
        chartData.forEach( ( data ) => {
            if( data.document.規格量 === newPrefix[0] ) {
                arr1_1.push( data );               
            }
            else if ( data.document.規格量 === newPrefix[1] ) {
                arr1_2.push( data );
            }
            else if ( data.document.規格量 === newPrefix[2] ) {
                arr1_3.push( data );
            }
            else if ( data.document.規格量 === newPrefix[3] ) {
                arr1_4.push( data );
            }
            else if ( data.document.規格量 === newPrefix[4] ) {
                arr1_5.push( data );
            }
            else if ( data.document.規格量 === newPrefix[5] ) {
                arr1_6.push( data );
            }
            else if ( data.document.規格量 === newPrefix[6] ) {
                arr1_7.push( data );
            }
            else{
                arr1_8.push( data );
            }
        } );
    }

    const options = ( arr ) => {
        return {
            responsive : true,
            plugins : {
                legend : {
                    position : "top",
                },
                title : {
                    display : true,
                    text : arr[0].document.規格量+arr[0].document.規格單位+" 歷年健保給付價格",
                },
            },
        };
    };
    
    const output1=<Line options={options( arr1_1 )} data={chartConfig( arr1_1,arr1_1_1,arr1_1_2,arr1_1_3,arr1_1_4 )} />;

    let output2, output3, output4, output5, output6, output7, output8;
    if( arr1_2.length !== 0 ) {
        let config=chartConfig( arr1_2,arr1_2_1,arr1_2_2,arr1_2_3,arr1_2_4 );
        output2=<Line options={options( arr1_2 )} data={config} />;
    }
    if( arr1_3.length !== 0 ) {
        let config=chartConfig( arr1_3,arr1_3_1,arr1_3_2,arr1_3_3,arr1_3_4 );
        output3=<Line options={options( arr1_3 )} data={config} />;
    }
    if( arr1_4.length !== 0 ) {
        let config=chartConfig( arr1_4,arr1_4_1,arr1_4_2,arr1_4_3,arr1_4_4 );
        output4=<Line options={options( arr1_4 )} data={config} />;
    }
    if( arr1_5.length !== 0 ) {
        let config=chartConfig( arr1_5,arr1_5_1,arr1_5_2,arr1_5_3,arr1_5_4 );
        output5=<Line options={options( arr1_5 )} data={config} />;
    }
    if( arr1_6.length !== 0 ) {
        let config=chartConfig( arr1_6,arr1_6_1,arr1_6_2,arr1_6_3,arr1_6_4 );
        output6=<Line options={options( arr1_6 )} data={config} />;
    }
    if( arr1_7.length !== 0 ) {
        let config=chartConfig( arr1_7,arr1_7_1,arr1_7_2,arr1_7_3,arr1_7_4 );
        output7=<Line options={options( arr1_7 )} data={config} />;
    }
    if( arr1_8.length !== 0 ) {
        let config=chartConfig( arr1_8,arr1_8_1,arr1_8_2,arr1_8_3,arr1_8_4 );
        output8=<Line options={options( arr1_8 )} data={config} />;
    }

    return(
        <>
            {output1}
            {output2}
            {output3}
            {output4}
            {output5}
            {output6}
            {output7}
            {output8}
        </>
    );
};

export default ChartOthers;