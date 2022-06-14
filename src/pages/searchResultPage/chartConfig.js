const chartConfig = ( arr,arr1,arr2,arr3,arr4 ) => {
        
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
            
        return {
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

        return {
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
           
        return {
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
};

export default chartConfig;