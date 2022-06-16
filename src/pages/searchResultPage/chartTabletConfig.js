const chartConfig1 = ( arr1_1 ) => {
    //確認藥品代碼首二碼相同
    let prefix1=arr1_1.map( ( data ) => {
        return data.document.藥品代號.slice( 0, 2 );
    } );
    //去除重複的資料
    let newPrefix1 = [ ...new Set( prefix1 ) ];
    
    const len1=newPrefix1.length;
    let arr1_1_1=[];
    let arr1_1_2=[];
    let arr1_1_3=[];
    let arr1_1_4=[];
    const labels1=arr1_1.map( ( data ) => {
        return data.document.有效起日;
    } ).reverse();
    let newLabels1 = [ ...new Set( labels1 ) ];
    newLabels1.sort().push( "now" );

    if( len1 === 1 ) {
        arr1_1_1=arr1_1;

        arr1_1_1.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );

        let firstData=arr1_1_1.map( ( data ) => {
            return { x : data.document.有效起日, y : data.document.參考價 };
        } );
        firstData.push( { x : "now", y : arr1_1_1.at( -1 ).document.參考價 } );        
        
        return {
            labels : newLabels1,
            datasets : [
                {
                    label : arr1_1_1[0].document.藥品代號,                    
                    borderColor : "rgb(255, 99, 132)",
                    backgroundColor : "rgba(255, 99, 132, 0.5)",
                    data : firstData,
                },
            ],
        };
    }
    else if( len1 === 2 ) {
        arr1_1.forEach( ( data ) => {
            if( data.document.藥品代號.slice( 0, 2 ) === newPrefix1[0] ) {
                arr1_1_1.push( data );               
            }
            else{
                arr1_1_2.push( data );
            }
        } );
        arr1_1_1.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
        arr1_1_2.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
        let firstData=arr1_1_1.map( ( data ) => {
            return { x : data.document.有效起日, y : data.document.參考價 };
        } );
        firstData.push( { x : "now", y : arr1_1_1.at( -1 ).document.參考價 } );
        let secondData=arr1_1_2.map( ( data ) => {
            return { x : data.document.有效起日, y : data.document.參考價 };
        } );
        secondData.push( { x : "now", y : arr1_1_2.at( -1 ).document.參考價 } );

        return {
            labels : newLabels1,
            datasets : [
                {
                    label : arr1_1_1[0].document.藥品代號,                    
                    borderColor : "rgb(255, 99, 132)",
                    backgroundColor : "rgba(255, 99, 132, 0.5)",
                    data : firstData
                },
                {
                    label : arr1_1_2[0].document.藥品代號,                    
                    borderColor : "rgb(53, 162, 235)",
                    backgroundColor : "rgb(53, 162, 235, 0.5)",
                    data : secondData
                },
            ],
        };
    }
    else if( len1 === 3 ) {
        arr1_1.forEach( ( data ) => {
            if( data.document.藥品代號.slice( 0, 2 ) === newPrefix1[0] ) {
                arr1_1_1.push( data );               
            }
            else if( data.document.藥品代號.slice( 0, 2 ) === newPrefix1[1] ) {
                arr1_1_2.push( data );
            }
            else{
                arr1_1_3.push( data );
            }
        } );
        arr1_1_1.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
        arr1_1_2.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
        arr1_1_3.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
        let firstData=arr1_1_1.map( ( data ) => {
            return { x : data.document.有效起日, y : data.document.參考價 };
        } );
        firstData.push( { x : "now", y : arr1_1_1.at( -1 ).document.參考價 } );
        let secondData=arr1_1_2.map( ( data ) => {
            return { x : data.document.有效起日, y : data.document.參考價 };
        } );
        secondData.push( { x : "now", y : arr1_1_2.at( -1 ).document.參考價 } );
        let thirdData=arr1_1_3.map( ( data ) => {
            return { x : data.document.有效起日, y : data.document.參考價 };
        } );
        thirdData.push( { x : "now", y : arr1_1_3.at( -1 ).document.參考價 } );
        return {
            labels : newLabels1,
            datasets : [
                {
                    label : arr1_1_1[0].document.藥品代號,                    
                    borderColor : "rgb(255, 99, 132)",
                    backgroundColor : "rgba(255, 99, 132, 0.5)",
                    data : firstData
                },
                {
                    label : arr1_1_2[0].document.藥品代號,                    
                    borderColor : "rgb(53, 162, 235)",
                    backgroundColor : "rgb(53, 162, 235, 0.5)",
                    data : secondData
                },
                {
                    label : arr1_1_3[0].document.藥品代號,                    
                    borderColor : "rgb(75, 192, 192)",
                    backgroundColor : "rgba(75, 192, 192, 0.5)",
                    data : thirdData
                },
            ],
        };
    }
    else{
        arr1_1.forEach( ( data ) => {
            if( data.document.藥品代號.slice( 0, 2 ) === newPrefix1[0] ) {
                arr1_1_1.push( data );               
            }
            else if( data.document.藥品代號.slice( 0, 2 ) === newPrefix1[1] ) {
                arr1_1_2.push( data );
            }
            else if( data.document.藥品代號.slice( 0, 2 ) === newPrefix1[2] ) {
                arr1_1_3.push( data );
            }
            else{
                arr1_1_4.push( data );
            }
        } );
        arr1_1_1.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
        arr1_1_2.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
        arr1_1_3.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
        arr1_1_4.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
        let firstData=arr1_1_1.map( ( data ) => {
            return { x : data.document.有效起日, y : data.document.參考價 };
        } );
        firstData.push( { x : "now", y : arr1_1_1.at( -1 ).document.參考價 } );
        let secondData=arr1_1_2.map( ( data ) => {
            return { x : data.document.有效起日, y : data.document.參考價 };
        } );
        secondData.push( { x : "now", y : arr1_1_2.at( -1 ).document.參考價 } );
        let thirdData=arr1_1_3.map( ( data ) => {
            return { x : data.document.有效起日, y : data.document.參考價 };
        } );
        thirdData.push( { x : "now", y : arr1_1_3.at( -1 ).document.參考價 } );
        let forthData=arr1_1_4.map( ( data ) => {
            return { x : data.document.有效起日, y : data.document.參考價 };
        } );
        forthData.push( { x : "now", y : arr1_1_4.at( -1 ).document.參考價 } );
        return {
            labels : newLabels1,
            datasets : [
                {
                    label : arr1_1_1[0].document.藥品代號,                    
                    borderColor : "rgb(255, 99, 132)",
                    backgroundColor : "rgba(255, 99, 132, 0.5)",
                    data : firstData
                },
                {
                    label : arr1_1_2[0].document.藥品代號,                    
                    borderColor : "rgb(53, 162, 235)",
                    backgroundColor : "rgb(53, 162, 235, 0.5)",
                    data : secondData
                },
                {
                    label : arr1_1_3[0].document.藥品代號,                    
                    borderColor : "rgb(75, 192, 192)",
                    backgroundColor : "rgba(75, 192, 192, 0.5)",        
                    data : thirdData
                },
                {
                    label : arr1_1_4[0].document.藥品代號,                    
                    borderColor : "rgb(255, 153, 18)",
                    backgroundColor : "rgb(255, 153, 18, 0.5)",
                    data : forthData
                },
            ],
        };
    }    
};

const chartConfig2 = ( arr1_2 ) => {
    if( arr1_2.length !==0 ) {
        //確認藥品代碼首二碼相同
        let prefix2=arr1_2.map( ( data ) => {
            return data.document.藥品代號.slice( 0, 2 );
        } );
        //去除重複的資料
        let newPrefix2 = [ ...new Set( prefix2 ) ];
    
        const len2=newPrefix2.length;
        let arr1_2_1=[];
        let arr1_2_2=[];
        let arr1_2_3=[];
        let arr1_2_4=[];

        const labels2=arr1_2.map( ( data ) => {
            return data.document.有效起日;
        } ).reverse();
        let newLabels2 = [ ...new Set( labels2 ) ];
        newLabels2.sort().push( "now" );

        if( len2 === 1 ) {
            arr1_2_1=arr1_2;
            arr1_2_1.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            let firstData=arr1_2_1.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            firstData.push( { x : "now", y : arr1_2_1.at( -1 ).document.參考價 } ); 
            
            return {
                labels : newLabels2,
                datasets : [
                    {
                        label : arr1_2[0].document.藥品代號,                    
                        borderColor : "rgb(53, 162, 235)",
                        backgroundColor : "rgb(53, 162, 235, 0.5)", 
                        data : firstData,
                    },
                ],
            };
        }
        else if( len2 === 2 ) {
            arr1_2.forEach( ( data ) => {
                if( data.document.藥品代號.slice( 0, 2 ) === newPrefix2[0] ) {
                    arr1_2_1.push( data );               
                }
                else{
                    arr1_2_2.push( data );
                }
            } );
            arr1_2_1.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            arr1_2_2.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            let firstData=arr1_2_1.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            firstData.push( { x : "now", y : arr1_2_1.at( -1 ).document.參考價 } );
            let secondData=arr1_2_2.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            secondData.push( { x : "now", y : arr1_2_2.at( -1 ).document.參考價 } );
            return {
                labels : newLabels2,
                datasets : [
                    {
                        label : arr1_2_1[0].document.藥品代號,                    
                        borderColor : "rgb(255, 99, 132)",
                        backgroundColor : "rgba(255, 99, 132, 0.5)",
                        data : firstData
                    },
                    {
                        label : arr1_2_2[0].document.藥品代號,                    
                        borderColor : "rgb(53, 162, 235)",
                        backgroundColor : "rgb(53, 162, 235, 0.5)",
                        data : secondData
                    },
                ],
            };
        }
        else if( len2 === 3 ) {
            arr1_2.forEach( ( data ) => {
                if( data.document.藥品代號.slice( 0, 2 ) === newPrefix2[0] ) {
                    arr1_2_1.push( data );               
                }
                else if( data.document.藥品代號.slice( 0, 2 ) === newPrefix2[1] ) {
                    arr1_2_2.push( data );
                }
                else{
                    arr1_2_3.push( data );
                }
            } );
            arr1_2_1.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            arr1_2_2.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            arr1_2_3.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            let firstData=arr1_2_1.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            firstData.push( { x : "now", y : arr1_2_1.at( -1 ).document.參考價 } );
            let secondData=arr1_2_2.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            secondData.push( { x : "now", y : arr1_2_2.at( -1 ).document.參考價 } );
            let thirdData=arr1_2_3.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            thirdData.push( { x : "now", y : arr1_2_3.at( -1 ).document.參考價 } );
            return {
                labels : newLabels2,
                datasets : [
                    {
                        label : arr1_2_1[0].document.藥品代號,                    
                        borderColor : "rgb(255, 99, 132)",
                        backgroundColor : "rgba(255, 99, 132, 0.5)",
                        data : firstData
                    },
                    {
                        label : arr1_2_2[0].document.藥品代號,                    
                        borderColor : "rgb(53, 162, 235)",
                        backgroundColor : "rgb(53, 162, 235, 0.5)",
                        data : secondData
                    },
                    {
                        label : arr1_2_3[0].document.藥品代號,                    
                        borderColor : "rgb(75, 192, 192)",
                        backgroundColor : "rgba(75, 192, 192, 0.5)",
                        data : thirdData
                    },
                ],
            };
        }
        else{
            arr1_2.forEach( ( data ) => {
                if( data.document.藥品代號.slice( 0, 2 ) === newPrefix2[0] ) {
                    arr1_2_1.push( data );               
                }
                else if( data.document.藥品代號.slice( 0, 2 ) === newPrefix2[1] ) {
                    arr1_2_2.push( data );
                }
                else if( data.document.藥品代號.slice( 0, 2 ) === newPrefix2[2] ) {
                    arr1_2_3.push( data );
                }
                else{
                    arr1_2_4.push( data );
                }
            } );
            arr1_2_1.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            arr1_2_2.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            arr1_2_3.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            arr1_2_4.sort( ( a, b ) => a.document.有效起日.localeCompare( b.document.有效起日 ) );
            let firstData=arr1_2_1.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            firstData.push( { x : "now", y : arr1_2_1.at( -1 ).document.參考價 } );
            let secondData=arr1_2_2.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            secondData.push( { x : "now", y : arr1_2_2.at( -1 ).document.參考價 } );
            let thirdData=arr1_2_3.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            thirdData.push( { x : "now", y : arr1_2_3.at( -1 ).document.參考價 } );
            let forthData=arr1_2_4.map( ( data ) => {
                return { x : data.document.有效起日, y : data.document.參考價 };
            } );
            forthData.push( { x : "now", y : arr1_2_4.at( -1 ).document.參考價 } );
            return {
                labels : newLabels2,
                datasets : [
                    {
                        label : arr1_2_1[0].document.藥品代號,                    
                        borderColor : "rgb(255, 99, 132)",
                        backgroundColor : "rgba(255, 99, 132, 0.5)",
                        data : firstData
                    },
                    {
                        label : arr1_2_2[0].document.藥品代號,                    
                        borderColor : "rgb(53, 162, 235)",
                        backgroundColor : "rgb(53, 162, 235, 0.5)",
                        data : secondData
                    },
                    {
                        label : arr1_2_3[0].document.藥品代號,                    
                        borderColor : "rgb(75, 192, 192)",
                        backgroundColor : "rgba(75, 192, 192, 0.5)",        
                        data : thirdData
                    },
                    {
                        label : arr1_2_4[0].document.藥品代號,                    
                        borderColor : "rgb(255, 153, 18)",
                        backgroundColor : "rgb(255, 153, 18, 0.5)",
                        data : forthData
                    },
                ],
            };
        }    
    }
};

export { chartConfig1, chartConfig2 };