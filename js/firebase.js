'use strict';

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";


import { getFirestore, collection, doc, Timestamp, addDoc, deleteDoc, onSnapshot, query, orderBy } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";    

import { getDatabase, ref, push, set, remove, onChildAdded, onChildRemoved, onChildChanged, update } //updateを追加
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// import { getFirestore, collection, doc, Timestamp, addDoc, deleteDoc, onSnapshot, query, orderBy } 
//   from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";      
// import { getAuth, signInAnonymously, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } 
//   from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { firebaseConfig } from "./MyAuthkeys.js";


const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const db = getDatabase(app); // realtime DBを使用
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
const db = getFirestore(app);
// グローバルに公開
window.db = db;

const logout_url = "index.html"; 
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


function googleAuthLaterProcess(auth, provider,to_url){
  console.log("googleAuthLaterProcess(auth, provider,to_url)" + auth + provider + to_url);
  //Google認証完了後の処理
  signInWithPopup(auth, provider).then((result) => {
      //Login後のページ遷移
      location.href=to_url;  
  }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
  });
}

function logOut(auth){
  // signInWithRedirect(auth, provider);
  signOut(auth).then(() => {
      // Sign-out successful.
      location.href = logout_url;
  }).catch((error) => {
      // An error happened.
      console.error(error);
  });
}

    
function getDbRefarence(db, tablename){
  if (!tablename || typeof tablename !== 'string') {
      console.error('有効なString変数を入力してください');
      return;
  }
  console.log('テーブル名：' + tablename);
  return ref(db, tablename); 
}

function setRealtimeDB(dbRef, inputObj) {
  const setObj = modifySetObj(inputObj);
  const newPostRef = push(dbRef);
  set(newPostRef, setObj);
  // clearJqueryElement(element);
}


function modifySetObj(inputObj){
  // 空のオブジェクトを作成
  const newObj = {};
  let newkeys = [];
  // Object.keysを使って、入力オブジェクトのすべてのキーを配列として取得
  const keys = Object.keys(inputObj);
  let isAerobic = false;
  if(inputObj.activity === "有酸素運動"){
    isAerobic = true;
  }
  console.log("inputObj.activity:" + inputObj.activity);
  // それぞれのキーに対して処理を行う
  keys.forEach((key, index) => {
      if(isAerobic){
        newkeys.push(itemAerobicHandle(key));

      } else {
        newkeys.push(itemAnAerobicHandle(key));
      }
      
  });

  newkeys.forEach((newkey,index)=>{
    newObj[newkey] = inputObj[keys[index]];
  });
  console.log(newObj);
  return newObj;
}

function itemAnAerobicHandle(key) {
  const itemHandleMap = {
    item1: "date",
    item2: "activity",
    item3: "training",
    item4: "weight",
    item5: "count",
    item6: "setcount",
  };
  const modifiedKey = itemHandleMap[key];
  if(modifiedKey){
    console.log("modifiedKey:" + modifiedKey);
    return modifiedKey;
  }
  console.log("key:" + key);
  return key;
}

function itemAerobicHandle(key) {
  const itemHandleMap = {
    item1: "date",
    item2: "activity",
    item3: "training",
    item4: "distance",
    item5: "minutes",
    item6: "setcount",
  };
  const modifiedKey = itemHandleMap[key];
  if(modifiedKey){
    return modifiedKey;
  }
  return key;
}


function clearJqueryElement(inputObj){
  // 入力値チェック
  if (!inputObj || typeof inputObj !== 'object') {
      console.error('有効なオブジェクトを入力してください');
      return;
  }
  const keys = Object.keys(inputObj);
  
  keys.forEach((key) => {
      // メソッドの存在チェック
      if (inputObj[key] && typeof inputObj[key].val === 'function') {
          try {
              inputObj[key].val("");
              console.log(`${key}のクリアに成功しました`);
          } catch (error) {
              console.error(`${key}のクリア中にエラーが発生: ${error}`);
          }
      } else {
          console.warn(`${key}はjqueryのval()メソッドを持っていません。`);
      }
  });
}

function setDBpath(user, date){
  const subdbname = date.split('-').join('/');
  console.log(subdbname);
  return "users/" + user.uid + "/" + subdbname;
}

export {db, app, googleAuthLaterProcess ,logOut, getDbRefarence, setRealtimeDB, modifySetObj, clearJqueryElement, setDBpath};