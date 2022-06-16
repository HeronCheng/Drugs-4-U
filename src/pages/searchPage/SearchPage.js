import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { SearchBox, InstantSearch, Configure, Pagination, Stats, RefinementList, connectHits } from "react-instantsearch-dom";
import { Outlet } from "react-router-dom";
import searchClient from "./typesenseConfig";

//components
import Nav from "../../components/Nav.js";
import Footer from "../../components/Footer";
import { AuthContext } from "../../App";
import Hit from "./Hit";

//圖片
import search from "../../img/search.png";
import click from "../../img/click.png";
import close from "../../img/close.png";
import loading from "../../img/loading.svg";


const SearchPage = () => {
    //載入圖示
    const [ isloading, setIsLoading ] = useState( true );

    const [ selectedValue, setSelectedValue ] = useState( "undischarged" );
    const [ showSelectedValue, setShowSelectedValue ] = useState( "未註銷藥品" );
    const handleSelectChange = ( e ) => {
        if( e.target.value === "全部藥品" ) {
            setSelectedValue( "alldrugs" );
            setShowSelectedValue( "全部藥品" );
        }
        else if( e.target.value === "已註銷藥品" ) {
            setSelectedValue( "cancellation" );
            setShowSelectedValue( "已註銷藥品" );
        }
        else if( e.target.value === "未註銷藥品" ) {
            setSelectedValue( "undischarged" );
            setShowSelectedValue( "未註銷藥品" );
        }
        else{
            setSelectedValue( "" );
        }
    };

    const { userUid } = useContext( AuthContext );
    const [ uid ] = userUid; 


    const Hits = ( { hits } ) => {
        
        return(
            <ol className="w-full xs:w-[95%] tablet:w-[80%] md:w-2/3">
                {hits.map( hit => (
                    <Hit hit={hit} key={hit.許可證字號} uid={uid} isloading={isloading} setIsLoading={setIsLoading}/>
                ) )}
            </ol>
        );
    };
    const CustomHits = connectHits( Hits );

    
    //展開分類選項
    const [ isActive, setIsActive ] = useState( false );
    const showSortList = () => {
        setIsActive( !isActive );
    };
    //選取分類
    const [ type, setType ] = useState( "劑型" );
    const changeType = ( e ) => {
        setType( e.target.value );
    };
    
    const cancel = () => {
        setIsActive( false );
    };


    return(
        <>
            <Nav/>
            <div id="loading" className={isloading?( "w-full h-full flex justify-center items-center bg-zinc-300 z-20 fixed" ):"hidden" }>
                <img src={loading}/>
            </div>
            <InstantSearch searchClient={searchClient} indexName={selectedValue}>
                <div className="pt-[52px] tablet:pt-[67px] bg-darkblue"></div>
                <div className="block md:hidden mt-6 ml-11 text-2xl font-extrabold tracking-widest">藥品搜尋介面</div>
                <div className="h-32 tablet:h-20 z-0 block tablet:flex">
                    <select className="ml-10 h-11 w-56 rounded-xl pl-3 leading-6 mt-6 mr-0 xs:mr-3 border shadow bg-dropdown" onChange={e => handleSelectChange( e )} >
                        <option value="未註銷藥品">未註銷藥品</option>
                        <option value="已註銷藥品">已註銷藥品</option>
                        <option value="全部藥品">全部藥品</option>
                    </select>  
                    <Configure hitsPerPage={10} />
                    <div id="normalSearch" className="relative block justify-center">
                        <img src={search} className="w-7 h-7 absolute top-8 left-[3.1rem] tablet:left-3" />
                        <SearchBox />
                    </div> 
                </div>
                <div className="block xs:flex justify-between w-11/12 mt-4">
                    <div>
                        <p className="pt-3 xs:pt-0 mb-5 xs:mb-0 ml-10 ">目前顯示的是&nbsp;<span className="font-bold text-lg text-rose-500">{showSelectedValue}</span>&nbsp;清單</p>
                    </div>
                    <Stats 
                        className="pt-0.5 ml-10 xs:ml-0 mb-5 xs:mb-0"
                        translations={{
                            stats( nbHits, processingTimeMS, nbSortedHits, areHitsSorted ) {
                                return areHitsSorted && nbHits !== nbSortedHits
                                    ? `${!nbSortedHits.toLocaleString()} relevant results sorted out of ${nbHits.toLocaleString()} found`
                                    : `找到 ${nbHits.toLocaleString()} 筆結果`;
                            },
                        }}
                    />
                </div>
                <div className="mt-2.5 w-full md:w-1/3 block md:hidden mb-4 md:mb-0">
                    <div id="classification" className={isActive ?"text-xl font-bold cursor-pointer bg-blue-50 border-slate-200 border-2 rounded-lg block md:hidden w-20 text-center h-10 leading-10  ml-10 ":"text-xl font-bold mt-2.5 cursor-pointer bg-blue-50 border-slate-200 border-2 rounded-lg block md:hidden w-20 text-center ml-10 h-10 leading-10"} onClick={showSortList}>分類</div>
                    <div className={isActive ? "block bg-slate-600 ml-10 rounded-md fixed left-[14%] xxs:left-[20%] xs:left-[25%] footer:left-[33%] top-[16%]  xs:top-[19%] tablet:top-[21%] z-10 w-[200px]" :"hidden"}>
                        <div className="flex relative">
                            <select className={isActive ? "block bg-dropdown rounded-xl border h-[2.75rem] pl-5 mt-4 ml-4":"hidden"} onClick={ e => changeType( e )}>
                                <option className="black-button" value="劑型" >藥品劑型</option>
                                <option className="black-button" value="藥品類別" >藥品類別</option>
                                <option className="black-button" value="許可證種類" >許可證種類</option>
                                <option className="black-button" value="管制藥品分類級別" >管制藥品分級</option>
                                <option className="black-button" value="製造廠國別" >製造廠國別</option>
                            </select>
                            <img src={close} className="w-[30px] h-[30px] invert absolute left-[166px] top-[20px] cursor-pointer" onClick={cancel}/>
                        </div>     
                        <RefinementList operator="or" attribute={type} className="w-40 search:w-48 lg:w-52 mx-auto text-base"/>
                    </div>
                </div>      
                <div className="ml-0 md:ml-9 mt-1.5 md:mt-4 border-t md:border-t-0">
                    <div className="flex justify-center md:justify-between">
                        <div className="hidden md:block my-6 bg-blue-50 border-slate-200 border-2 shadow-lg p-6 rounded-lg">
                            <div className="text-2xl font-bold mb-2.5 relative">分類<img src={click} className="w-8 absolute bottom-0.5 left-14"/></div>
                            <button className="black-button" value="劑型" onClick={e => changeType( e )}>藥品劑型</button>
                            <button className="black-button" value="藥品類別" onClick={e => changeType( e )}>藥品類別</button>
                            <button className="black-button" value="許可證種類" onClick={e => changeType( e )}>許可證種類</button>
                            <button className="black-button" value="管制藥品分類級別" onClick={e => changeType( e )}>管制藥品分級</button>
                            <button className="black-button" value="製造廠國別" onClick={e => changeType( e )}>製造廠國別</button>
                            <hr className="bg-slate-300 h-0.5"/>
                            <RefinementList operator="or" attribute={type} className="w-40 search:w-48 lg:w-52 mr-auto text-base"/>
                        </div>
                        <CustomHits hitComponent={Hit} />
                        <div className="w-[1%] xl:w-1/12"></div>
                    </div>
                    <Outlet />
                    <div className="flex justify-center my-10 xs:my-5">
                        <Pagination 
                            padding={2}
                            showPrevious={true}
                            showFirst={true}
                            showNext={true}
                            showLast={true}
                        />
                    </div>
                </div>
            </InstantSearch>                
            <Footer/>
        </>
    );
};


export default SearchPage;