import { db, doc, setDoc, getDoc, deleteDoc } from "../../firebaseConfig";

//添加收藏項目
const addDoc= ( uid, drugData, bookMark, setBookMark ) => {
    let newData={
        中文品名 : drugData["中文品名"],
        英文品名 : drugData["英文品名"],
        許可證字號 : drugData["許可證字號"],
        成分 : drugData["主成分略述"],
        適應症 : drugData["適應症"]
    };
    async function addData() {
        await setDoc( doc( db, "like_list", uid, "list", drugData["許可證字號"] ), newData );
    }
    addData()
        .then( () => {
            console.log( "Document written with ID: ", drugData["許可證字號"] );
            setBookMark( true );
        } )    
        .catch ( ( e ) => console.error( "Error adding document: ", e ) );
};

//確認此藥品是否已收藏(抓資料庫中的資料)
const fetchData = async( uid, drugData ) => {
    const docSnap = await getDoc( doc( db, "like_list", uid, "list", drugData["許可證字號"] ) );
    return docSnap.data();
};


//刪除收藏項目
const delDoc = ( uid, drugData, bookMark, setBookMark ) => {

    async function delData() {
        await deleteDoc( doc( db, "like_list", uid, "list", drugData["許可證字號"] ) );
    }
        
    delData()
        .then( () => {
            console.log( "Document delete with ID: ", drugData["許可證字號"] );
            setBookMark( false );
        } )    
        .catch ( ( e ) => console.error( "Error adding document: ", e ) );
};

export { addDoc, fetchData, delDoc };