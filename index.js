//Me traigo mi db firestore
import {
  getTasks,
  insertTask,
  deleteTask,
  getTask,
  updateTask,
} from './utils.js';
//console.log(db);
//Extraigo todos los documentos de tasks y creo tarjetas con ellos

getTasks();
let editarestado = false;
let id = '';
//Obtenemos el form y capturamos el submit
const form = document.getElementById('task-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = {
    title: form['task-title'].value,
    description: form['task-description'].value,
  };
  if (!editarestado) {
    insertTask(task);
  } else {
    updateTask(id, {
      title: form['task-title'].value,
      description: form['task-description'].value,
    });
    editarestado = false;
  }
});

const buttonsCardD = document.getElementsByName('delete');
buttonsCardD.forEach((element) => {
  element.addEventListener('click', () => {
    var divDelete = element.parentNode.parentNode;
    document.body.removeChild(divDelete);
    //console.log("Estoy borrando la tarea: "+element.id);
    deleteTask(element.id);
  });
});

const buttonsCardU = document.getElementsByName('editar');
buttonsCardU.forEach((element) => {
  element.addEventListener('click', async (e) => {
    const doc = await getTask(e.target.dataset.id);
    const task = doc.data();
    form['task-title'].value = task.title;
    form['task-description'].value = task.description;
    editarestado = true;
    id = e.target.dataset.id;
    let boton = document.querySelector('#task-button');
    boton.value = 'Actualizar';
  });
});
