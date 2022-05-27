import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { SearchBox, InstantSearch, Hits, Configure } from "react-instantsearch-dom";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { v4 as uuidv4 } from 'uuid';
//components
import Nav from "./Nav.js";
import Footer from "./Footer";
import { db, doc, getDoc, setDoc, collection, getDocs } from "./FirebaseConfig";

//圖片
import search from "../img/search.png";
import add from "../img/add_box.png";

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
        facet_by : "劑型, 藥品類別, 管制藥品分類級別, 製造廠國別, 許可證種類"
    },
} );

const searchClient = typesenseInstantsearchAdapter.searchClient;

const userId =localStorage.getItem("userUid");

function Hit( { hit } ) {
    
    let docId=uuidv4();
    //添加項目
    const addDoc= async( name_ch, name_en, number ) => {
		let newData={
			id: docId,
            中文品名:name_ch,
            英文品名:name_en,
            許可證字號:number
		}
		try{
			await setDoc(doc(db, "dup_check_list", userId, "list", docId), newData);
			console.log("Document written with ID: ", docId );
		}
		catch (e) {
			console.error("Error adding document: ", e);
		}
	}
    return (
        <article className="border-solid border-x-2 border-y shadow-md px-5 py-3 leading-8 hover:shadow-lg bg-white">
                <p className="text-base font-semibold text-cyan-900"> 
                    { hit.中文品名 }                  
                </p>
                <p className="text-sm">
                    { hit.英文品名 }
                </p>
                <div className="flex justify-end relative">
                    <img src={add} className="w-7 cursor-pointer absolute bottom-[-9px] right-[-12px]" onClick={()=>{addDoc(hit.中文品名,hit.英文品名,hit.許可證字號)}}/>
                </div>
                
        </article>
    );
}

const DuplicatePage = () => {

    const [ isOpen, setIsOpen ] = useState(false);
    const open = () => {
        setIsOpen(true);
    }
    const close = () => {
        setIsOpen(false);
    }

    const [ dupCheckList, setDupCheckList ] = useState([]);
    //抓資料庫中的資料
	useEffect(()=>{
		let docSnap;
		async function fetchData(){
			docSnap = await getDocs(collection(db, "dup_check_list", userId, "list"));
			return docSnap;
		}

		let list=[];

		fetchData().then(result=>{			
			if(result!==null){		
				result.forEach((doc) => {
					list.push(doc.data())
					});
            setDupCheckList(dupCheckList.concat(list));
		}})
		.catch(setDupCheckList(dupCheckList))

	},[])

    return(
        <>
            <Nav/>
            <div className="pt-20 bg-sky-100 z-0">
            <InstantSearch searchClient={searchClient} indexName="undischarged">
                <div className="bg-sky-100 z-0 flex">   
                    <Configure hitsPerPage={6} />
                    <div className="relative">
                        <img src={search} className="w-7 h-7 absolute top-6 left-6" />
                        <SearchBox onFocus={open} onBlur={close}/>
                        {
                        isOpen?
                        <Hits 
                        hitComponent={Hit}
                        className="w-60 rounded-xl ml-4 absolute z-10 top-14"
                        onFocus={open}
                        /> : ""
                        }
                    </div>              
                </div>                                       
            </InstantSearch>                
            </div>
            <div className="my-10 flex w-full justify-around">
                <div className="w-[45%] h-72 border-stone-300 border-4 border-solid rounded-md"></div>
                <div className="w-[45%] h-72 border-stone-300 border-4 border-solid rounded-md"></div>
            </div>
            <Footer/>
        </>
    );
};


export default DuplicatePage;