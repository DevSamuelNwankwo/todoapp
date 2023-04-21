// const DOM = {
//     todoInput: document.querySelector(".add-todo-input"),
//     todoSubmitButton: document.querySelector(".add-todo-button"),
//     todoContainer: document.querySelector(".todo-container"),
//     data: {
//         todos: localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [],
//         history: localStorage.getItem("todoHistory") ? JSON.parse(localStorage.getItem("todoHistory")) : []
//     }
// };


// // Display cached todo items
// window.addEventListener("DOMContentLoaded", e => displayCachedTodoItems());

// // Add todo item
// function addTodo() {
//     let todoHistory = DOM.data.history;
//     let todos = DOM.data.todos;
//     const todoValue = DOM.todoInput.value;

//     if (todoValue) {
//         const todoId = createTodoId(todos);
//         const todoItem = {
//             id: todoId,
//             todo: todoValue,
//             status: "uncompleted",
//             createdAt: new Date()
//         }

//         // Add todo item to data
//         todos.push(todoItem);

//         // Store todos in local storage
//         localStorage.setItem("todos", JSON.stringify(todos));

//         // Add todo item to history
//         todoHistory.push(todoItem);

//         // Store todo history in local storage
//         localStorage.setItem("todoHistory", JSON.stringify(todoHistory));

//         // Reset todo input
//         resetTodoInputValue();

//         // Focus on todo input
//         DOM.todoInput.focus();

//         // Display todo item after submittion
//         displayTodoItem(todoItem);
//     } else {
//         alert("Add a todo item");
//     }
// }

// // Create todo id
// function createTodoId(todos) {
//     // Initialize id
//     let id;

//     // Increment id if todo has items or set id to 0 if there are no todo items
//     if (todos.length)
//         id = todos[todos.length - 1].id + 1;
//     else
//         id = 0;

//     return id;
// }

// // Display todo item
// function displayTodoItem(todoItem) {
//     const todoContainer = DOM.todoContainer;
//     const todoHTML = `
//         <div style="width: 20vw" id="todo-${todoItem.id}">
//             <p>${todoItem.todo}</p>
//             <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem">
//                 ${todoItem.status === "uncompleted" ? "<button data-action='completed'>Completed</button>" : "<button data-action='uncompleted'>Uncompleted</button>"}
//                 <button data-action="delete">Delete</button>
//                 <button data-action="edit">Edit</button>
//             </div>
//         </div>
//     `;

//     // Append todo item to DOM
//     return todoContainer.insertAdjacentHTML("beforeend", todoHTML);
// }

// // Display cached todo items
// function displayCachedTodoItems() {
//     const todos = DOM.data.todos;
//     const todoContainer = DOM.todoContainer;
//     let todoHTML;

//     todos.forEach(todo => {
//         todoHTML = `
//             <div style="width: 20vw" id="todo-${todo.id}">
//                 <p>${todo.todo}</p>
//                 <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem">
//                 ${todo.status === "uncompleted" ? "<button data-action='completed'>Completed</button>" : "<button data-action='uncompleted'>Uncompleted</button>"}
//                 <button data-action="delete">Delete</button>
//                 <button data-action="edit">Edit</button>
//             </div>
//             </div>
//         `;

//         // Append todo item to DOM
//         return todoContainer.insertAdjacentHTML("beforeend", todoHTML);
//     })
// }

// function resetTodoInputValue() {
//     DOM.todoInput.value = "";
// }

// function triggerChildrenEvents({ target }) {
// const parentNode = target.parentNode.parentNode || target.parentNode;

// if (parentNode.id) {
//     const container = parentNode.parentNode;
//     let todoId = parentNode.id;
//     todoId = todoId.split("-")[1];
//     todoId = parseInt(todoId);

//     const targetActions = target.dataset.action;

//     if (targetActions === "delete")
//         deleteTodoItem(container, parentNode, todoId)
//     else if (targetActions === "edit")
//         editTodoItem(container, parentNode, todoId);
// }
// }

// // Delete todo item
// function deleteTodoItem(container, target, todoId) {
//     let todos = DOM.data.todos;

//     // Remove todo item from 
//     container.removeChild(target);

//     // Remove todo item by id
//     const filteredTodoItem = DOM.data.todos.filter(todo => todo.id !== todoId);

//     // Revalidate data
//     DOM.data.todos = [].concat(filteredTodoItem);

//     // Remove todo items
//     localStorage.removeItem("todos");

//     // Add new filted data
//     localStorage.setItem("todos", JSON.stringify(filteredTodoItem));
// }

// // Edit todo item
// function editTodoItem(container, target, todoId) {
//     const todoItem = DOM.data.todos.filter(todo => todo.id === todoId)[0];
//     const todoItemValue = todoItem.todo;
//     console.log(todoItemValue, DOM.data.todos.map(todo => todo.id === todoId ? {...todo, updatedAt: new Date() } : todo));

//     // Add todo item value to input
//     DOM.todoInput.value = todoItemValue;

//     // Focus of form input
//     DOM.todoInput.focus();

//     // Delete todo item
//     deleteTodoItem(container, target, todoId);

// }


// DOM.todoInput.addEventListener("keydown", event => {
//     if (event.which === 13 || event.keyCode === 13)
//         addTodo();
// });
// DOM.todoSubmitButton.addEventListener("click", addTodo);
// DOM.todoContainer.addEventListener("click", triggerChildrenEvents);

// Data Controller
const DataController = (function() {
    class Todo {
        constructor(id = 0, todo = "", status = "uncompleted", createdAt = "") {
            this.id = id;
            this.todo = todo;
            this.status = status;
            this.createdAt = createdAt;
        }
    }

    const data = {
        todos: getDataFromStorage("todos"),
        history: getDataFromStorage("todoHistory")
    }

    function getDataFromStorage(key) {
        return (
            localStorage.getItem(`${key}`) ?
            JSON.parse(localStorage.getItem(`${key}`)) : []
        );
    }

    return {
        addTodoItem: (todo) => {
            let id;

            if (data.todos.length)
                id = data.todos[data.todos.length - 1].id + 1;
            else
                id = 0;

            // Create todo
            const newTodo = new Todo(id, todo, "uncompleted", new Date());

            // Add new todo item to data
            data.todos.push(newTodo);

            return newTodo;
        },
        deleteTodoItem: todoID => {
            const removeTodoItem = data.todos.filter(todo => todo.id !== todoID);

            // Revalidate todo data
            data.todos = [].concat(removeTodoItem);
        },
        editTodoItem: function(todoID) {
            const todoItem = data.todos.filter(todo => todo.id === todoID)[0];

            // Delete todo item
            this.deleteTodoItem(todoID);

            // Return todo value
            return {
                value: todoItem.todo,
                status: todoItem.status
            };
        },
        toggleTodoItemStatus: (todoID, todoStatus) => {
            const modifiedTodoItem = data.todos.map(todo => todo.id === todoID ? {...todo, status: todoStatus } : todo);

            // Modify todo data
            data.todos = [].concat(modifiedTodoItem);

            return data.todos.filter(todo => todo.id === todoID)[0];
        },
        cacheData: (key, data) => {
            localStorage.setItem(`${key}`, JSON.stringify(data));
        },
        removeCachedData: (key) => {
            localStorage.removeItem(`${key}`);
        },
        _getTodos: () => data.todos
    }
})();

// UI Controller
const UIController = (function() {
    const DOM = {
        todoInput: document.querySelector(".add-todo-input"),
        todoSubmitButton: document.querySelector(".add-todo-button"),
        dynamicTodoContainer: status => document.querySelector(`.todo-container#${status}`),
        todoContainers: document.querySelectorAll(".todo-container"),
        editedTodoStatus: null
    };

    return {
        _getDOM: () => DOM,
        _renderTodoHTML: ({ id, todo, status = "uncompleted", createdAt }) => {
            let container = DOM.dynamicTodoContainer(DOM.editedTodoStatus || status);

            let html = `
                <div class="todo-item animate-fade-in" id="todo-${id}">
                    <p>${todo}</p>
                    <div>
                        ${status === "uncompleted" ? "<button data-action='completed'>Completed</button>" : "<button data-action='uncompleted'>Uncompleted</button>"}
                        <button data-action="delete">Delete</button>
                        <button data-action="edit">Edit</button>
                    </div>
                </div>
            `;

            // Append todo item to DOM
            container.insertAdjacentHTML("beforeend", html);
        },
        resetInput: () => {
            DOM.todoInput.value = ""
        },
        focusOnInput: () => {
            DOM.todoInput.focus();
        },
        addTodoItem: function(todo) {
            // Reset input field
            this.resetInput();

            // Focus on input
            this.focusOnInput();

            // Display todo ui
            this._renderTodoHTML(todo);
        },
        deleteTodoItemFromUI: (container, todoEle) => {
            container.removeChild(todoEle)
        },
        editTodoItem: function(todo, container, todoElement) {
            const { value, status } = todo;

            // Set edited todo status
            DOM.editedTodoStatus = status;

            // Set todo input value
            DOM.todoInput.value = value;

            // Focus on todo input
            this.focusOnInput()

            // Delete todo item from ui
            this.deleteTodoItemFromUI(container, todoElement)
        },
        toggleTodoItemPos: function(todo, container, todoElement) {
            // Remove todo item from parent container
            container.removeChild(todoElement);

            // Add todo item to ${todo.status} container
            this._renderTodoHTML(todo);
        },
        loadCachedTodos: function(todos) {
            todos.map(todo => this._renderTodoHTML(todo));
        }
    }
})();

// Controller
const Controller = (function(dtCtrl, uiCtrl) {
    function initialize() {
        const DOM = uiCtrl._getDOM();

        // Display all cached todo items
        window.addEventListener("DOMContentLoaded", () => uiCtrl.loadCachedTodos(dtCtrl._getTodos()));

        // Todo input
        DOM.todoInput.addEventListener('keydown', e => {
            // Submit input if user clicks on enter key
            if (e.which === 13 || e.keyCode === 13)
                addTodo()
        });

        // Todo Submit button
        DOM.todoSubmitButton.addEventListener("click", addTodo);

        // Propagate event in todo parent container
        DOM.todoContainers.forEach(container => container.addEventListener("click", propagateEvent));
    }

    // Add todo item
    function addTodo() {
        const todoInputValue = uiCtrl._getDOM().todoInput.value;

        if (todoInputValue) {
            const todoValue = uiCtrl._getDOM().todoInput.value;

            // Add todo data
            const todo = dtCtrl.addTodoItem(todoValue);

            // Store todo data in cache
            dtCtrl.cacheData("todos", dtCtrl._getTodos());

            // Store todo history data in cache
            dtCtrl.cacheData("todoHistory", dtCtrl._getTodos());

            // Display todo ui
            uiCtrl.addTodoItem(todo);
        } else alert("Please add a todo")
    }

    function propagateEvent({ target }) {
        const todoElement = target.parentNode.parentNode;

        if (todoElement.id) {
            let todoId = todoElement.id;
            todoId = todoId.split("-")[1];
            todoId = parseInt(todoId);
            const container = todoElement.parentNode;

            // Get target action dataset
            const targetActions = target.dataset.action;

            if (targetActions === "delete")
                deleteTodo(todoId, container, todoElement);
            else if (targetActions === "edit")
                editTodo(todoId, container, todoElement);
            else if (targetActions === "uncompleted" || targetActions === "completed")
                toggleTodoStatus(todoId, targetActions, container, todoElement);
        }

    }

    // Delete todo item
    function deleteTodo(todoID, container, todoElement) {
        // Remove todo item from data
        dtCtrl.deleteTodoItem(todoID);

        // Recache todo data
        dtCtrl.cacheData("todos", dtCtrl._getTodos());

        // Remove todo item from dom
        uiCtrl.deleteTodoItemFromUI(container, todoElement)
    }

    // Edit todo item
    function editTodo(todoId, container, todoElement) {
        const todo = dtCtrl.editTodoItem(todoId);

        // Recache todo data
        dtCtrl.cacheData("todos", dtCtrl._getTodos());

        // Edit todo
        uiCtrl.editTodoItem(todo, container, todoElement);
    }

    // Toggle todo item status
    function toggleTodoStatus(todoID, status, container, todoElement) {
        // Toggle todo item status
        const todo = dtCtrl.toggleTodoItemStatus(todoID, status);

        // Revalidate todo cached data
        dtCtrl.cacheData("todos", dtCtrl._getTodos());

        // Toggle todo item position
        uiCtrl.toggleTodoItemPos(todo, container, todoElement);
    }

    return {
        init: () => initialize()
    }
})(DataController, UIController);

// Initialize App
Controller.init();