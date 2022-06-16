import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, doc, setDoc } from "../../firebaseConfig";
import { AuthContext } from "../../App";
//圖片
import add from "../../img/add_box.png";

function Hit( { hit, handleList } ) { 
    
    const { userUid } = useContext( AuthContext );

    const [ uid ] = userUid; 

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
            await setDoc( doc( db, "dup_check_list", uid, "list", docId ), newData );
        }
        addData()
            .then( () => console.log( "Document written with ID: ", docId ) )    
            .catch ( ( e ) => console.error( "Error adding document: ", e ) );
        
        handleList( docId );
    };
    return (
        <article className="border-solid border-x-2 border-y shadow-md px-5 py-3 leading-8 bg-white" >
            <p className="text-base font-semibold text-cyan-900"> 
                { hit.中文品名 }                  
            </p>
            <p className="text-sm">
                { hit.英文品名 }
            </p>
            <div className="flex justify-end relative">
                <img src={add} className="w-7 cursor-pointer absolute bottom-[-9px] right-[-12px]" onClick={() => addDoc( hit.中文品名, hit.英文品名, hit.許可證字號 ) }/>
            </div>               
        </article>
    );
}

export default Hit;