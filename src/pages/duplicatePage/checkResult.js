import { db, doc, setDoc, collection, getDocs, query, where } from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import duplicate from "../../utils/duplicate";

let testValue=[];
//抓資料庫中的ATC代碼
const fetchATCData = async( searchParameter ) => {     
    for ( let i = 0; i < searchParameter.length; i++ ) {
        for ( let k = i + 1; k < searchParameter.length; k++ ) {
            if ( i !== k ) {
                    
                const ref = collection( db, "newATC" );
                const q1 = query( ref, where( "許可證字號", "in", [ searchParameter[i].許可證字號 ] ) );
                const querySnapshot1 = await getDocs( q1 );
                let preAtcList=[];
        
                querySnapshot1.forEach( ( doc ) => {
                    let list=doc.data().代碼[0].split( "," );
                    let newList = [ ...new Set( list ) ];
                    preAtcList.push( newList );
                } );
                const q2 = query( ref, where( "許可證字號", "in", [ searchParameter[k].許可證字號 ] ) );
                const querySnapshot2 = await getDocs( q2 );
                querySnapshot2.forEach( ( doc ) => {
                    let list=doc.data().代碼[0].split( "," );
                    let newList = [ ...new Set( list ) ];
                    preAtcList.push( newList );
                } );
                let atcList=[];
                preAtcList.map( ( item ) => {
                    atcList.push( ...item );
                    return atcList;
                } );           
                    
                const checkAtcList = atcList.map( ( data ) => {
                    if( duplicate[data] !== undefined ) {
                        return duplicate[data];
                    }
                    else if( duplicate[data.slice( 0,5 )] !== undefined ) {
                        return duplicate[data.slice( 0,5 )];
                    }
                    else if( duplicate[data.slice( 0,4 )] !== undefined ) {
                        return duplicate[data.slice( 0,4 )];
                    }
                    else if( duplicate[data.slice( 0,3 )] !== undefined ) {
                        return duplicate[data.slice( 0,3 )];
                    }
                    else{ console.log( data,"not found" ); }
                } );
                    
                let repeat = checkAtcList.filter( function( element, index, arr ) {
                    return arr.indexOf( element ) !== index;
                } );

                if( repeat.length !== 0 ) {
                    testValue.push( [ i,k ] );
                }
            }               
        }
    }
    return testValue; 
};

    
function goCheck ( uid, searchParameter, resultState, setResultState, checkState, setCheckState, dupCheckList ) {
    if( dupCheckList.length<2 ) {
        document.getElementById( "alert" ).innerHTML="請至少選擇2個品項!";
    }
    else{
        document.getElementById( "alert" ).innerHTML="";
        fetchATCData( searchParameter ).then( ( result ) => {
            let docId = uuidv4();
            let compareData=[];
            result.forEach( item => {
                compareData.push( [ searchParameter[item[0]].中文品名, searchParameter[item[1]].中文品名 ] );
            } 
            );
            let databaseData=[];
            result.forEach( item => {
                databaseData.push( searchParameter[item[0]].中文品名+"%"+searchParameter[item[0]].許可證字號+"&"+searchParameter[item[1]].中文品名+"%"+searchParameter[item[1]].許可證字號 );
            } );
            if( result.length>0 ) {
                setResultState( compareData );
                setCheckState( "以上組合可能存在重複用藥的問題，" );
                let newData={
                    id : docId,
                    評估品項 : databaseData,
                    評估結果 : "以上組合可能存在重複用藥的問題，如上述結果有疑慮，請洽詢醫師或藥師。"
                };
                async function addData() {
                    await setDoc( doc( db, "dup_result_list", uid, "list", docId ), newData );
                }
                addData()
                    .then( () => console.log( "Document written with ID: ", docId ) )    
                    .catch ( ( e ) => console.error( "Error adding document: ", e ) );
            }
            else{
                setCheckState( "查無重複用藥問題，" );
                let newData={
                    id : docId,
                    評估品項 : searchParameter,
                    評估結果 : "查無重複用藥問題，如上述結果有疑慮，請洽詢醫師或藥師。"
                };
                async function addData() {
                    await setDoc( doc( db, "dup_result_list", uid, "list", docId ), newData );
                }
                addData()
                    .then( () => console.log( "Document written with ID: ", docId ) )    
                    .catch ( ( e ) => console.error( "Error adding document: ", e ) );
            }       
        } );
    }       
};

export { goCheck };