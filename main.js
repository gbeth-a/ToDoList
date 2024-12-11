// Constantes globales que están ligadas al html
const date = document.querySelector('#fecha');
const list = document.querySelector('#taskList'); // Se refiere al elemento visual del DOM
const input = document.querySelector('#input');
const add_btn = document.querySelector('#btn-add');
const uncheck = 'bi-circle';
const check = 'bi-record-circle';
const crossed_off = 'skratched';

// Variables
// Se necesitan inicializar con un valor aunque sea 0 o nulo para que el sistema funcione
let LIST = []; // Arreglo que contiene las tareas (no confundir con el list de arriba que es referente al html)
let id = 0; // Identificador único para cada tarea que se añada

// Mostrar la fecha actual
const DATE = new Date();
date.innerHTML = DATE.toLocaleDateString('es-MX', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
}).replace(/^./, (char) => char.toUpperCase()); //Para poner en mayúscula la primera letra


// Función para añadir tareas
// Creación inicial (decisión de estado visual)
function addTask(task, id, done = false, del = false) {
    if (del) return; // Si la tarea está eliminada, no la muestra

    // Determinar clases según estado
    const complete = done ? check : uncheck;
    const LINE = done ? crossed_off : '';

    // Crear elemento HTML (tarjetita)
    // Backticks alt + 96
    // ${} se usan para insertar variables  directamente en mi cadena de texto
    // ${id} inserta el valor de la variable id
    // ${complete} inserta la clase CSS que representa si la tarea está completada o no
    // ${LINE} inserta una clase CSS para tachar o no el texto
    // ${task} inserta el texto de la tarea
    const taskCard = `<li class="task-item" id="${id}">
      <i class="bi ${complete} fade" onclick="taskDone(this)"></i>
      <p class="text ${LINE}">${task}</p>
      <i class="bi bi-x fade" onclick="taskDeleted(this)"></i>
    </li>`;

    // Añadir al contenedor de la lista en el DOM
    // Usamos este método porque es una cadena HTML, es decir sólo texto entre los backticks
    // insertAdjacentElement es un método que espera un nodo real, no una cadena HTML
    // Un nodo real lo pude haber creado antes como: const taskCard = document.createElement('li')
    list.insertAdjacentHTML('beforeend', taskCard); // Aquí insertAdjacentHTML hará que el navegador lo convierte en un nodo real
}

// Función para marcar tarea como completada que se asigna al ícono del círculo en el elemento html de arriba como "onclick"
// Actualización dinámica (cambio de estado de texto e ícono)
function taskDone(taskCard) {
    // classList.toggle es un método que cambia dinámicamente las clases y es más limpio que add o remove
    taskCard.classList.toggle(check);
    taskCard.classList.toggle(uncheck);
    taskCard.parentNode.querySelector('.text').classList.toggle(crossed_off);

    // Actualizar estado en LIST
    // Se busca la tarea correspondiente en LIST usando taskId y se invierte su estado (done) con !
    const taskId = taskCard.parentNode.id;
    LIST[taskId].done = !LIST[taskId].done;
}

// Función para eliminar tarea que se asigna al ícono X en el elemento html de arriba como "onclick"
function taskDeleted(taskCard) {
    const taskId = taskCard.parentNode.id;

    // Eliminar del DOM
    taskCard.parentNode.remove();

    // Marcar la tarea como eliminada (del = true) en la lista LIST
    LIST[taskId].del = true;
}

// Pulsar un botón se cuenta como un evento, se crea uno para añadir tareas al hacer click en add_btn
add_btn.addEventListener('click', () => {
    const task = input.value.trim();

    if (task) {
        addTask(task, id);
        LIST.push({ task, id, done: false, del: false });
        id++; // Incrementar id para que cada tarjeta tenga id único
        input.value = ''; // Limpiar cajita del input cuando se añada la tarea
    } else { //Si el usuario no escribe nada entonces manda esta alerta:
        alert('Please write a task.');
    }
});
