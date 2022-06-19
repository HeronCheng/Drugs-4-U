import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { addDoc, fetchData, delDoc } from "./bookMark";
//components
import Nav from "../../components/Nav.js";
import Footer from "../../components/Footer";
import StorageData from "./StorageData";
import PriceChart from "./PriceChart";
import { db, doc, getDoc } from "../../firebaseConfig";
import NationalDN from "../../utils/nation";
import { AuthContext } from "../../App";

//圖片
import loading from "../../img/Rolling.gif";
import add from "../../img/bookmark_add.png";
import fill from "../../img/bookmark_add_FILL.png";

const SearchResultPage = () => {
    //儲存從資料庫取出來的藥品資訊
    const [ drugData, setDrugData ] = useState ( "" );
    let { id } = useParams();
    
    useEffect( () => {
        async function fetchDrugData() {
            let docSnap = await getDoc( doc( db, "all", id ) );
            const data = docSnap._document.data.value.mapValue.fields;
            const drugDataArr = {
                "中文品名" : data.中文品名.stringValue,
                "英文品名" : data.英文品名.stringValue,
                "主成分略述" : data.主成分略述.stringValue,
                "許可證字號" : data.許可證字號.stringValue,
                "適應症" : data.適應症.stringValue,
                "藥品類別" : data.藥品類別.stringValue,
                "劑型" : data.劑型.stringValue,
                "包裝" : data.包裝.stringValue,
                "製造廠國別" : data.製造廠國別.stringValue,
                "申請商名稱" : data.申請商名稱.stringValue,
                "製造商名稱" : data.製造商名稱.stringValue,
                "用法用量" : data.用法用量.stringValue,
                "管制藥品分類級別" : data.管制藥品分類級別.stringValue,
                "許可證種類" : data.許可證種類.stringValue
            };
            return drugDataArr;
        }
        fetchDrugData().then( result => {
            setDrugData( result );
        } );
    }, [] );

    //切換右方欄位的圖片跟圖表顯示
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

    //確認登入狀態
    const { isSignedIn, userUid } = useContext( AuthContext );

    const [ signedIn ] = isSignedIn;
    const [ uid ] = userUid; 

    const [ bookMark, setBookMark ] = useState( false );

    
    fetchData( uid, drugData ).then( ( result ) => {
        if( result !== undefined ) {
            setBookMark( true );
        }
        else{
            setBookMark( false );
        }
    } );

    return(
        <>
            <Nav/>
            <div className="pt-[68px] bg-darkblue z-0">              
            </div>
            <div className="flex justify-between">
                <Link to="/search"><button className="black-button w-16 tracking-wider m-3 xss:m-7 ">Back</button></Link>
                { signedIn ? <img src={bookMark?fill:add} className="w-12 h-12 m-7 cursor-pointer" onClick={bookMark?() => delDoc( uid, drugData, bookMark, setBookMark ):() => addDoc( uid, drugData, bookMark, setBookMark )}/> : "" }
            </div>
            <div className="mb-20 block search:flex w-full justify-around">
                <div className="mx-auto search:mx-0 w-full xss:w-[90%] xs:w-[80%] sm:w-[75%] search:w-[55%] border-stone-300 border-y-2 xss:border-2 border-solid rounded-none xss:rounded-md font-sans p-4 shadow-lg flex justify-center items-center">                            
                    {( drugData !== "" ) ? 
                        ( <>
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan="2" className="mb-3 text-left text-cyan-900">
                                            <span className="text-3xl mr-3.5 font-bold tracking-wider ">{drugData["中文品名"]}</span>
                                            <span className="text-2xl font-semibold">{drugData["英文品名"]}</span>   
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="align-top leading-7">
                                    <tr>
                                        <td className="w-[30%] search:w-36 text-right font-semibold pt-3">許可證字號&nbsp;  </td>
                                        <td className="w-[60%] tablet:w-[75%] pl-3 text-gray-600 pt-3">{drugData["許可證字號"]}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">主成分略述&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData["許可證種類"]==="原料藥"?( drugData["英文品名"] ):( drugData["主成分略述"] )}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">適應症&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData["適應症"]}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">用法用量&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData["用法用量"] ? drugData["用法用量"]:"無"}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">藥品類別&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData["藥品類別"]}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">許可證種類&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData["許可證種類"]}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">管制藥品分級&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData["管制藥品分類級別"] ? drugData["管制藥品分類級別"]:"非屬管制藥品"}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">劑型&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData["劑型"]}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">包裝&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData["包裝"]}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">製造廠國別&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">
                                            {NationalDN[drugData["製造廠國別"]]}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">申請商名稱&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData["申請商名稱"]}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right font-semibold">製造商名稱&nbsp;  </td>
                                        <td className="pl-3 text-gray-600">{drugData["製造商名稱"]}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                        ) : ( <img src={loading} className="w-24"/> )                                            
                    }
                </div>
                <div className="mt-10 search:mt-0 mx-auto search:mx-0 w-full xss:w-[90%] xs:w-[80%] sm:w-[75%] search:w-[37%] border-stone-300 border-y-2 xss:border-2 border-solid rounded-none xss:rounded-md shadow-lg ">
                    <button className={ showPic ? "font-semibold text-lg py-1.5 w-1/2 border-2 bg-blue-100": "font-semibold text-lg py-1.5 w-1/2 border-2" } onClick={changeToPrice}>外觀</button>
                    <button className={ showPrice ? "font-semibold text-lg py-1.5 w-1/2 border-2 bg-blue-100": "font-semibold text-lg py-1.5 w-1/2 border-2" } onClick={changeToPic}>健保給付價格</button>
                    { showPic ? ( <StorageData id={id}/> ) : ( <PriceChart id={id} name={drugData["中文品名"]}/> ) }
                </div>
            </div>
            <Footer/>
        </>
    );
};


export default SearchResultPage;