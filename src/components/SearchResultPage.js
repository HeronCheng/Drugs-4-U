import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
//components
import Nav from "./Nav.js";
import Footer from "./Footer";
import StorageData from "./StorageData";
import PriceChart from "./PriceChart";
import { db, doc, getDoc } from "./FirebaseConfig";
import NationalDN from "../utils/nation";
//圖片
import loading from "../img/Rolling.gif";
import add from "../img/bookmark_add.png";
import fill from "../img/bookmark_add_FILL.png";

const SearchResultPage = () => {
    const [ drugData, setDrugData ] = useState ( "" );
    let { id } = useParams();
    
    useEffect( () => {
        async function fetchData() {
            let docSnap = await getDoc( doc( db, "all", id ) );
            const data = docSnap._document.data.value.mapValue.fields;
            const drugDataArr = [ data.中文品名.stringValue, data.英文品名.stringValue, data.主成分略述.stringValue, data.許可證字號.stringValue, data.適應症.stringValue, data.藥品類別.stringValue, data.劑型.stringValue, data.包裝.stringValue, data.製造廠國別.stringValue, data.申請商名稱.stringValue, data.製造商名稱.stringValue, data.用法用量.stringValue, data.管制藥品分類級別.stringValue, data.許可證種類.stringValue ];
            return drugDataArr;
        }
        fetchData().then( result => {
            setDrugData( result );
        } );

    }, [] );

    const [ showPic, setShowPic ] = useState ( true );
    const [ showPrice, setShowPrice ] = useState ( false );
    const changeToPrice = ( ) => {
        if( showPic === true ) {
            setShowPic( true );
        }
        else{
            setShowPic( !showPic );
            setShowPrice( !showPrice );
        }
        return showPic;
    };
    const changeToPic = ( ) => {
        if( showPrice === true ) {
            setShowPrice( true );
        }
        else{
            setShowPrice( !showPrice );
            setShowPic( !showPic );
        }
        return showPrice;
    };

    return(
        <>
            <Nav/>
            <div className="pt-[68px] bg-darkblue z-0">              
            </div>
            <div className="flex justify-start"><Link to="/search"><button className="black-button w-16 tracking-wider m-3 xss:m-7 ">Back</button></Link></div>
            <div className="mb-20 block search:flex w-full justify-around">
                <div className="mx-auto search:mx-0 w-full xss:w-[90%] xs:w-[80%] sm:w-[75%] search:w-[55%] border-stone-300 border-y-2 xss:border-2 border-solid rounded-none xss:rounded-md font-sans p-4 shadow-lg flex justify-center items-center">               
                    {( drugData !== "" ) ? 
                        ( <>
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan="2" className="mb-3 text-left text-cyan-900"><span className="text-3xl mr-3.5 font-bold tracking-wider ">{drugData[0]}</span><span className="text-2xl font-semibold">{drugData[1]}</span></th>
                                    </tr>
                                </thead>
                                <tbody className="align-top leading-7">
                                    <tr>
                                        <td className="w-[30%] search:w-36 text-right font-semibold pt-3">許可證字號&nbsp;  </td>
                                        <td className="w-[60%] tablet:w-[75%] pl-3 text-gray-600 pt-3">{drugData[3]}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">主成分略述&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData[13]==="原料藥"?( drugData[1] ):( drugData[2] )}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">適應症&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData[4]}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">用法用量&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData[11] ? drugData[11]:"無"}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">藥品類別&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData[5]}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">許可證種類&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData[13]}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">管制藥品分級&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData[12] ? drugData[12]:"非屬管制藥品"}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">劑型&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData[6]}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">包裝&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData[7]}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">製造廠國別&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">
                                            {NationalDN[drugData[8]]}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">申請商名稱&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData[9]}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">製造商名稱&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData[10]}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                        ) :
                        ( <img src={loading} className="w-24"/> )                                            
                    }
                </div>
                <div className="mt-10 search:mt-0 mx-auto search:mx-0 w-full xss:w-[90%] xs:w-[80%] sm:w-[75%] search:w-[37%] border-stone-300 border-y-2 xss:border-2 border-solid rounded-none xss:rounded-md shadow-lg ">
                    <button className={ showPic ? "font-semibold text-lg py-1.5 w-1/2 border-2 bg-blue-100": "font-semibold text-lg py-1.5 w-1/2 border-2" } onClick={changeToPrice}>外觀</button>
                    <button className={ showPrice ? "font-semibold text-lg py-1.5 w-1/2 border-2 bg-blue-100": "font-semibold text-lg py-1.5 w-1/2 border-2" } onClick={changeToPic}>健保給付價格</button>
                    { showPic ? ( <StorageData id={id}/> ) : ( <PriceChart id={id} name={drugData[0]}/> ) }
                </div>
            </div>

           
            <Footer/>
        </>
    );
};


export default SearchResultPage;