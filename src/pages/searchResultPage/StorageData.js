import React, { useState, useEffect } from "react";
import { storage, ref, getDownloadURL, listAll, db, getDoc, doc } from "../../firebaseConfig";

//圖片
import underConstruction from "../../img/under-construction.png";
import loading from "../../img/Rolling.gif";

const StorageData = ( id ) => {
    //載入圖示
    const [ isloading, setIsLoading ] = useState( true );

    const listRef = ref( storage, "appearance" );
    const [ url, setUrl ] = useState( [] );

    useEffect( () => {
        listAll( listRef )
            .then( ( res ) => {
                const newArr=res.items.reduce( function( filtered, itemRef ) {
                    if( itemRef.fullPath.includes( id.id ) ) {
                        let chosenData= itemRef.fullPath;
                        filtered.push( chosenData );
                    }
                    return filtered;
                }, [] );
                
                let promises = newArr.map( ( imageRef ) => getDownloadURL( ref( storage, imageRef ) ) );
                Promise.all( promises ).then( ( urls ) => {
                    setUrl( urls );
                } );
                setIsLoading( false );
            } )
            .catch( ( error ) => {
                console.log( error );
            } );
    },[] );

    const [ packageInsert, setPackageInsert ] = useState( "" );
    const [ drugpackage, setDrugPackage ] = useState( "" );
    //從firestore取出仿單及外盒圖檔連結資料

    useEffect( () => {
        async function fetchData() {
            const docRef = doc( db, "package", id.id );
            const docSnap = await getDoc( docRef );
            const data = docSnap._document.data.value.mapValue.fields;
            const drugPackageArr = [ data.仿單圖檔連結.stringValue, data.外盒圖檔連結.stringValue ];
            return drugPackageArr;
        };
        fetchData().then( result => {		
            setPackageInsert( result[0] );
            setDrugPackage( result[1] );
        } );
    },[] );

    //展開 button 選項
    const [ insertIsActive, setInsertIsActive ] = useState( false );
    const showList = () => {
        setInsertIsActive( !insertIsActive );
    };
    
    const InsertSelectOption = () => {
        const newArr1 = packageInsert.split( ";" );
        return (
            <div className="relative">
                <div onClick={showList} ><button className="black-button">仿單圖檔連結</button></div>
                <div className={insertIsActive? "absolute left-[14px] top-[54px] z-10 bg-slate-50 rounded-md p-2 w-28 text-center":"hidden"}>
                    {
                        ( newArr1.map( ( url, index ) => {
                            return (
                                <a href={url} key={index} className="mx-auto my-3.5 block">圖檔連結{index+1}</a>
                            );
                        } ) )
                    }
                </div>
            </div>
            
        );
        
    };

    const [ packageIsActive, setPackageIsActive ] = useState( false );
    const showTheList = () => {
        setPackageIsActive( !packageIsActive );
    };
    
    const PackageSelectOption = () => {

        const newArr2 = drugpackage.split( ";" );
        return (
            <div className="relative">
                <div onClick={showTheList} ><button className="black-button">外盒圖檔連結</button></div>
                <div className={packageIsActive? "absolute left-[14px] top-[54px] z-10 bg-slate-50 rounded-md p-2 w-28 text-center":"hidden"}>
                    {
                        ( newArr2.map( ( url, index ) => {
                            return (
                                <a href={url} key={index} className="mx-auto mb-3.5 block">圖檔連結{index+1}</a>
                            );
                        } ) )
                    }
                </div>
            </div>        
        );       
    };
    
    return(
        <>
            <div>
                <div id="loading" className={isloading? "block":"hidden" }>
                    <img src={loading} className="w-24 mx-auto my-[30%]"/>
                </div>
                <div className={isloading? "hidden":"block" }>
                    { url.length === 0 ?
                        ( <img src={underConstruction} key={underConstruction} alt="images"/> ):
                        ( url.map( ( url, index ) => {
                            return <img src={url} key={index} alt="images" className="mx-auto my-3.5"/>;
                        } ) )
                    }
                    <div className="flex justify-center">
                        { packageInsert === "" ? "" : ( packageInsert.includes( ";" )? <InsertSelectOption/>:<a href={packageInsert} className="black-button">仿單圖檔連結</a> ) }
                        { drugpackage === "" ? "" : ( drugpackage.includes( ";" )? <PackageSelectOption/>:<a href={drugpackage} className="black-button">外觀圖檔連結</a> ) }
                    </div>
                </div>
            </div>           
        </>
    );
};

export default StorageData;