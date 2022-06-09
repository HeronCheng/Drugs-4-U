import React, { useState, useEffect } from "react";
import { SearchBox, InstantSearch, Configure, connectHits } from "react-instantsearch-dom";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { v4 as uuidv4 } from "uuid";
//components
import Nav from "./Nav.js";
import Footer from "./Footer";
import { db, doc, setDoc, collection, getDocs, deleteDoc, query, where } from "./FirebaseConfig";
import duplicate from "../utils/duplicate";
//圖片
import search from "../img/search.png";
import add from "../img/add_box.png";
import cancel from "../img/cancel.png";
import listIcon from "../img/playlist_add_check.png";
import listIcon2 from "../img/cropsquare.png";


const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter( {
    server : {
        apiKey : process.env.REACT_APP_TYPESENSE_APIKEY, // Be sure to use an API key that only allows search operations
        nodes : [
            {
                host : process.env.REACT_APP_TYPESENSE_HOST,
                port : "443",
                protocol : "https",
            },
        ],
        cacheSearchResultsForSeconds : 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
    },
    additionalSearchParameters : {
        query_by : "中文品名, 英文品名, 主成分略述",
        filter_by : "劑型:=錠劑"
    },
} );

const searchClient = typesenseInstantsearchAdapter.searchClient;

const userId =localStorage.getItem( "userUid" );


function Hit( { hit, handleList } ) {  
    //添加項目
    const addDoc= ( name_ch, name_en, number ) => {
        let docId=uuidv4();
        let newData={
            id : docId,
            中文品名 : name_ch,
            英文品名 : name_en,
            許可證字號 : number
        };
        async function addData() {
            await setDoc( doc( db, "dup_check_list", userId, "list", docId ), newData );
        }
        addData()
            .then( () => console.log( "Document written with ID: ", docId ) )    
            .catch ( ( e ) => console.error( "Error adding document: ", e ) );
        
        handleList( docId );
    };
    return (
        <article 
            className="border-solid border-x-2 border-y shadow-md px-5 py-3 leading-8 bg-white" >
            <p className="text-base font-semibold text-cyan-900"> 
                { hit.中文品名 }                  
            </p>
            <p className="text-sm">
                { hit.英文品名 }
            </p>
            <div className="flex justify-end relative">
                <img src={add} className="w-7 cursor-pointer absolute bottom-[-9px] right-[-12px]" onClick={() => addDoc( hit.中文品名,hit.英文品名,hit.許可證字號 ) }/>
            </div>               
        </article>
    );
}

const DuplicatePage = () => {

    const [ isOpen, setIsOpen ] = useState( false );

    const open = () => {
        setIsOpen( true );
    };
    const close = () => {
        setIsOpen( false );
    };

    const [ dupCheckList, setDupCheckList ] = useState( [] );
    const [ listState, setListState ] = useState( "" );

    const handleList = ( id ) => {
        setListState( id ); 
    };

    //抓資料庫中的資料
    const fetchData = async() => {
        const docSnap = await getDocs( collection( db, "dup_check_list", userId, "list" ) );
        return docSnap;
    };

    let list=[];

    useEffect( () => {
        fetchData().then( result => {			
            if( result!==null ) {		
                result.forEach( ( doc ) => {                   
                    list.push( doc.data() );
                } );
                setDupCheckList( list );
            } } )
            .catch( console.log( "fail" ) );
    }, [ listState ] );

    let searchParameter=dupCheckList.map( item => {
        return { 許可證字號 : item.許可證字號,中文品名 : item.中文品名 };     
    } );

    //刪除資料
    const handleDelete = ( id ) => {

        async function deleteData() {
            await deleteDoc( doc( db, "dup_check_list", userId, "list", id ) );
        }

        deleteData()
            .then( () => console.log( "success" ) )
            .catch( () => console.log( "fail" ) );

        handleList( id );
    };
    //搜尋列表
    const Hits = ( { hits } ) => (
        <ol className="w-60 rounded-xl ml-4 absolute z-10 top-[66px] left-[-16px]">
            {hits.map( hit => (
                <Hit hit={hit} key={hit.許可證字號} handleList={handleList}/>
            ) )}
        </ol>
    );

    const CustomHits = connectHits( Hits );

    const [ checkState, setCheckState ] = useState( "" );
    
    let testValue=[];
    //抓資料庫中的ATC代碼
    const fetchATCData = async( ) => {
        
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

                    if( repeat.length === 0 ) {
                        console.log( "查無重複用藥" );
                    }
                    else{                       
                        testValue.push( [ searchParameter[i].中文品名,searchParameter[k].中文品名 ] );
                    } 
                                

                }   
                        
            }
        }
        return testValue; 
    };
    const [ resultState, setResultState ] = useState( [] );  
    
    function goCheck () {
        fetchATCData().then( ( result ) => {
            if( result.length>0 ) {
                setResultState( result );
                setCheckState( "以上組合可能存在重複用藥的問題，" );
            }
            else{
                setCheckState( "查無重複用藥問題，" );
            }       
        } );
        
    };
    return(
        <>
            <Nav/>
            <div className="pt-[67px] bg-darkblue z-0 " >                 
            </div>           
            <div className="mt-5 mb-10 md:my-5 block md:flex w-full justify-center" >
                <div className={dupCheckList.length<2?"w-full md:w-[44%] h-[420px] px-5 pb-5":"w-full md:w-[44%] px-5 pb-5"}>
                    <div className="w-[90%] xs:w-[80%] md:w-full mx-auto">
                        <InstantSearch searchClient={searchClient} indexName="undischarged">
                            <div className="bg-white block dup:flex">   
                                <Configure hitsPerPage={6} />
                                <div className="relative">
                                    <img src={search} className="w-7 h-7 absolute top-8 left-3" />
                                    <SearchBox onClick={open} />
                                    {
                                        isOpen?
                                            <CustomHits 
                                                hitComponent={Hit}
                                            /> : ""
                                    }
                                </div>  
                                <div className="ml-0 dup:ml-5 mt-2 dup:mt-6 mb-6 md:mb-0 font-semibold">檢查您是否有吃到<span className="text-rose-500">重複</span>的藥品 :<br/>請搜尋藥品按下提交，<span id="dup_text_right">右</span><span className="hidden" id="dup_text_down">下</span>方會呈現結果。</div>            
                            </div>                                       
                        </InstantSearch>     
                        <div className="flex mt-3 mb-5 bg-gradient-to-r from-blue-300 to-white rounded">
                            <img src={listIcon}/>
                            <div className="leading-[3rem] font-extrabold text-2xl tracking-widest ml-2" onMouseOver={close}>已選擇藥品</div>
                        </div>
                        {dupCheckList.map( function( item,index ) {
                            return (
                                <div key={Math.random()} onMouseOver={close} className="flex">
                                    <div className="w-10 mb-3 leading-[108px] text-2xl font-extrabold text-slate-50 text-center bg-gray-600 rounded mr-3">{index+1}</div>
                                    <div className="flex w-[100%] border-2 border-stone-600 rounded mb-3 p-5 bg-zinc-50 hover:bg-zinc-100 hover:shadow-md">
                                        <div>
                                            <div className="font-bold text-base sm:text-lg text-cyan-900 mb-2">{item.中文品名}</div><div className="text-sm sm:text-base">{item.英文品名}</div>
                                        </div>
                                        <div className="flex-auto"></div>
                                        <img src={cancel} className="w-8 h-8 justify-self-end cursor-pointer" onClick={() => handleDelete( item.id )}/>
                                    </div>                              
                                </div>
                            );
                        }
                        )}
                        <button className="black-button mx-auto mt-4 w-20" onClick={() => goCheck()}>Submit</button>
                    </div>
                    
                </div>
                <div className="w-full md:w-[43%]" onMouseOver={close}>
                    <div className={checkState===""?"w-[80%] md:w-full h-[420px] md:h-[90%] font-JasonHandwriting1-Regular text-slate-900 rounded-md mt-5 border mx-auto md:ml-3 bg-zinc-50":"w-[80%] h-auto md:w-full font-JasonHandwriting1-Regular text-slate-900 rounded-md mt-5 border mx-auto md:ml-3 bg-zinc-50"}>
                        <div className={checkState===""? "hidden":"w-[90%] xs:w-[80%] mx-auto mt-[45px] text-left text-3xl leading-10 font-semibold tracking-widest "}>
                            <span className="text-4xl mb-5">結果如下</span>
                            <hr className="mt-4"/>
                            {resultState.map( function( item ) {
                                return (
                                    <div key={Math.random()} className="flex text-gray-600">
                                        <div className="flex w-[100%] border-b border-stone-300 p-4 ">
                                            <div >
                                                <div><div className="font-semibold flex"><img src={listIcon2} className="w-9 h-9 mr-3"/><span>{item[0]}</span></div><div className="font-semibold flex"><img src={listIcon2} className="w-9 h-9 mr-3"/><span>{item[1]}</span></div></div>
                                            </div>
                                        </div>                              
                                    </div>
                                );
                            }
                            )}
                            <div className="mb-[45px] mt-4">
                                <span className="text-rose-500">{checkState}</span>
                                <br/>
                                <span >如上述結果有疑慮，</span>
                                <br/>
                                <span >請洽詢醫師或藥師。</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};


export default DuplicatePage;