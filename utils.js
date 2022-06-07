// Import the functions you need from the SDKs you need

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDbC9om63NfIl8r0YG7UOP_1f2-aTnqwZc',
  authDomain: 'primer-proyecto-d2963.firebaseapp.com',
  projectId: 'primer-proyecto-d2963',
  storageBucket: 'primer-proyecto-d2963.appspot.com',
  messagingSenderId: '847412259694',
  appId: '1:847412259694:web:be1c971f384589c054ef7f',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const querySnapshot = await getDocs(collection(db, 'tasks'));
export const getTask = (id) => getDoc(doc(db, 'tasks', id));

function createCard(id, task) {
  //<div class="card text-white bg-info mb-6  offset-md-4" style="max-width: 20rem;">
  const principalDiv = document.createElement('div');
  principalDiv.setAttribute('class', 'card bg-light mb-3 ');
  principalDiv.style = 'max-width: 30rem';
  principalDiv.style.margin = '20px auto';

  principalDiv.setAttribute('name', id);

  //<div class="card-header">Formulario Tareas</div>
  const headerDiv = document.createElement('div');
  const contentDiv = document.createTextNode('Id: ' + id);
  headerDiv.setAttribute('class', 'card-header bg-success text-light');

  headerDiv.appendChild(contentDiv);
  principalDiv.appendChild(headerDiv);

  const bodyDiv = document.createElement('div');
  const pTitle = document.createElement('p');
  const pTitleText = document.createTextNode('Title: ' + task.title);
  const hr = document.createElement('hr');
  const pDesc = document.createElement('p');
  const pDescText = document.createTextNode('Description: ' + task.description);

  pTitle.appendChild(pTitleText);
  bodyDiv.appendChild(pTitle);
  bodyDiv.appendChild(hr);
  pDesc.appendChild(pDescText);
  bodyDiv.appendChild(pDesc);
  bodyDiv.appendChild(hr);

  var input = document.createElement('input');
  input.type = 'button';
  input.value = 'Borrar Tarea';
  input.setAttribute('name', 'delete');
  input.setAttribute('id', id);
  input.setAttribute('class', 'btn btn-danger m-1');
  bodyDiv.appendChild(input);

  var input2 = document.createElement('input');
  input2.type = 'button';
  input2.value = 'Editar';
  input2.setAttribute('name', 'editar');
  input2.setAttribute('data-id', id);
  input2.setAttribute('class', 'btn btn-success m-1');
  bodyDiv.appendChild(input2);

  principalDiv.appendChild(bodyDiv);

  document.body.appendChild(principalDiv);
  const br = document.createElement('br');
  document.body.appendChild(br);
}

export function getTasks() {
  querySnapshot.forEach((doc) => {
    createCard(doc.id, doc.data());
  });
}
function generateRandomIdTask(num) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
export async function insertTask(task) {
  await setDoc(doc(db, 'tasks', generateRandomIdTask(20)), task);
  alert('Insertada la tarea: ' + task.title);
}

export async function deleteTask(id) {
  await deleteDoc(doc(db, 'tasks', id));
  alert('Borrada la tarea: ' + id);
}

export async function updateTask(id, newFields) {
  const titulo = doc(db, 'tasks', id);

  await updateDoc(titulo, newFields);
  alert('Actualizada la tarea: ' + id);
}

// export function editarTask(id) {
//   const form = document.getElementById('task-form');
//   querySnapshot.forEach((doc) => {
//     if (id == doc.id) {
//       console.log('esta es la id', doc.id);
//       form['task-title'].value = doc.data().title;
//       form['task-description'].value = doc.data().description;
//     }
//     console.log(doc.id, doc.data());
//   });

//   //
// }
