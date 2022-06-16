import React, { useState, useEffect, useContext } from "react";
import { fetchData, fetchDupData } from "./fetchDatabaseData";
//components
import Nav from "../../components/Nav.js";
import Footer from "../../components/Footer";
import PdfContent from "./PdfContent";
import { AuthContext } from "../../App";
import LikeList from "./LikeList";
import DuplicateList from "./DuplicateList";
//圖片
import loading from "../../img/loading.svg";

const MemberPage = () => {
    //載入圖示
    const [ isloading, setIsLoading ] = useState( true );

    const { userUid, userName } = useContext( AuthContext );
    const [ uid ] = userUid;
    const [ name ] = userName;

    const [ likeList, setLikeList ] = useState( [] );
    const [ listState, setListState ] = useState( "" );


    let list=[];

    useEffect( () => {
        fetchData( uid ).then( result => {	
            if( result !== null ) {	
                result.forEach( ( doc ) => {                   
                    list.push( doc.data() );
                } );
                setLikeList( list );
                setIsLoading( false );
            } } )
            .catch( console.log( "fail" ) );
    }, [ listState ] );


    let dup_list=[];
    const [ dupList, setDupList ] = useState( [] );

    useEffect( () => {
        fetchDupData( uid ).then( result => {	
            if( result !== null ) {	
                result.forEach( ( doc ) => {                   
                    dup_list.push( doc.data() );
                } );
                setDupList( dup_list );
            } } )
            .catch( console.log( "fail" ) );
    }, [ listState ] );


    return(
        <>
            <div id="loading" className={isloading?( "w-full h-full flex justify-center items-center bg-zinc-300 z-20 fixed" ):"hidden" }>
                <img src={loading}/>
            </div>
            <Nav/>
            <div className="pt-[52px] tablet:pt-[66.5px] z-10 bg-darkblue">              
            </div>           
            <div className="flex justify-between">
                <div className="mt-5 ml-3 xs:ml-10 text-xl font-bold">{name} 您好，歡迎使用會員專區。</div>
            </div> 
            <div className="my-5 block lg:flex w-full justify-center ">
                <LikeList likeList={likeList} listState={listState} setListState={setListState}/>
                <DuplicateList dupList={dupList} listState={listState} setListState={setListState}/>
            </div> 
            <PdfContent likeList={likeList} dupList={dupList}/>        
            <Footer/>
        </>
    );
};


export default MemberPage;