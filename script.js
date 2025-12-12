import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBIpfNgU7CyPqrqo1VLixBnzPFxs-HsdBQ",
    authDomain: "realtime-database-c4620.firebaseapp.com",
    databaseURL: "https://realtime-database-c4620-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "realtime-database-c4620",
    storageBucket: "realtime-database-c4620.firebasestorage.app",
    messagingSenderId: "1015072081492",
    appId: "1:1015072081492:web:9656dd2c7008dcc47f0fc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
const shoppingListRef = ref(db, "shoppingList");

const shoppingListRefSnapshot = onValue(shoppingListRef, (snapshot) => {
    if (snapshot.exists()) {
        clearShoppingList();
        const data = Object.entries(snapshot.val());
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            const currentItem = data[i];
            const key = currentItem[0];
            const value = currentItem[1];
            addItem(currentItem);
        }
    } else {
        DOM.shoppingListEl.innerHTML = "No items in the list...."
    }
})

const DOM = {
    inputFieldEl: document.getElementById('input-field'),
    addBottunEl: document.getElementById('add-button'),
    shoppingListEl: document.getElementById('shopping-list'),
}

DOM.addBottunEl.addEventListener('click', () => {
    let inputFieldValue = DOM.inputFieldEl.value;
    if (inputFieldValue === '') {
        return;
    }
    push(shoppingListRef, inputFieldValue);
    console.log(inputFieldValue);
    emptyInputField();
})

const clearShoppingList = () => {
    DOM.shoppingListEl.innerHTML = '';
}

const removeItem = (itemId) => {
    let elementInDb = ref(db, `shoppingList/${itemId}`);
    remove(elementInDb);
}

const addItem = (item) => {
    const itemId = item[0];
    const itemValue = item[1];
    let li = document.createElement('li');
    li.textContent = itemValue;
    DOM.shoppingListEl.appendChild(li);
    li.addEventListener('dblclick', () => {
        removeItem(itemId);
    })
}

const emptyInputField = () => {
    DOM.inputFieldEl.value = '';
}

const emptyShoppingList = () => {
    DOM.shoppingListEl.innerHTML = '';
}
