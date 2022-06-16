import { db, doc, collection, getDocs, deleteDoc } from "../../firebaseConfig";
import printJS from "print-js";

const handleList = ( id, listState, setListState ) => {
    setListState( id ); 
};

//抓收藏資料庫中的資料
const fetchData = async( uid ) => {
    const docSnap = await getDocs( collection( db, "like_list", uid, "list" ) );
    return docSnap;
};

//刪除收藏資料
const handleDeleteLike = ( uid, id, listState, setListState ) => {

    async function deleteData() {
        await deleteDoc( doc( db, "like_list", uid, "list", id ) );
    }

    deleteData()
        .then( () => console.log( "success" ) )
        .catch( () => console.log( "fail" ) );

    handleList( id, listState, setListState );
};

//收藏資料輸出PDF
const printLikeList = () => {
    printJS( { printable : "list", type : "html", header : "<h1 style='text-align: center;letter-spacing: 0.1em;'>藥品清單</h1>" ,targetStyles : [ "*" ] } );
};

//抓資料庫中的重複用藥結果資料
const fetchDupData = async( uid ) => {
    const docSnap = await getDocs( collection( db, "dup_result_list", uid, "list" ) );
    return docSnap;
};

//刪除重複用藥檢查資料
const handleDeleteDup = ( uid, id, listState, setListState ) => {

    async function deleteData() {
        await deleteDoc( doc( db, "dup_result_list", uid, "list", id ) );
    }

    deleteData()
        .then( () => console.log( "success" ) )
        .catch( () => console.log( "fail" ) );

    handleList( id, listState, setListState );
};

//輸出重複用藥檢查的PDF
const printDupList = () => {
    printJS( { printable : "dupList", type : "html", header : "<h1 style='text-align: center;letter-spacing: 0.1em;'>重複用藥檢查結果列表</h1>" ,targetStyles : [ "*" ] } );
};

export { fetchData, handleDeleteLike, printLikeList, fetchDupData, handleDeleteDup, printDupList };