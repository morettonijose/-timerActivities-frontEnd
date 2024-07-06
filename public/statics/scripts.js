import {
    addItemToDatabase,
    updateItemInDatabase,
    fetchItemsFromDatabase,
    deleteItem,
    updateTotalStart,
    updateTotalTime
} from './dbFunctions.js';

document.addEventListener('DOMContentLoaded', function() {



    const itemList = document.getElementById('item-list');
    const createButton = document.getElementById('create-button');
    const addItemForm = document.getElementById('add-item-form');
    const editItemForm = document.getElementById('edit-item-form');
    const editIdInput = document.getElementById('edit-id');
    const editNameInput = document.getElementById('edit-name');
    const editDescriptionInput = document.getElementById('edit-description');
    const editCategoryInput = document.getElementById('edit-category');
    const categoryFilter = document.getElementById('category-filter');

    const saveCreateButton = document.getElementById('save-create');
    const cancelCreateButton = document.getElementById('cancel-create');
    const saveEditButton = document.getElementById('save-edit');
    const cancelEditButton = document.getElementById('cancel-edit');
    const editModal = document.getElementById('edit-modal');
    const createModal = document.getElementById('create-modal');
    const closeModalButtons = document.querySelectorAll('.close');


    let items = [];  // Array para armazenar os itens da lista
    let timers = {}; // Object to store timers for each item
    let timerIntervals = {}; // Object to store intervals for each timer


 

  
  /////////////FORMULARIO ADICIONAR////////////////////////////// 
  // Função para limpar campos do formulário de adição
    function clearAddForm() {
        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
        document.getElementById('category').value = 'Todos';  // Reinicia o filtro para "Todos"
    } 
    // Função para adicionar um novo item 
    addItemForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value; // Captura a categoria selecionada
    
        try {
            const newItem = await addItemToDatabase(name, description, category);
            items.push(newItem.activity);
            renderItems();
            clearAddForm();
            createModal.style.display = 'none'; // Fecha o modal de adição após adicionar
        } catch (error) {
            console.error('Erro:', error);
        }

    });
      



    /////////////FORMULARIO EDITAR//////////////////////////////  
    // Função para preencher o formulário de edição com os dados do item selecionado
    function openEditModal(id, name, description, category) {
        editIdInput.value = id;
        editNameInput.value = name;
        editDescriptionInput.value = description;

        // Preencher o campo de categoria (select) com a categoria atual
        const categorySelect = document.getElementById('edit-category');
        categorySelect.value = category; // Define o valor da categoria

        // Verifica qual opção do select está selecionada
        for (let option of categorySelect.options) {
            if (option.value === category) {
                option.selected = true; // Marca a opção como selecionada
            } else {
                option.selected = false; // Desmarca outras opções
            }
        }

        editModal.style.display = 'block';
    }   
    // Evento para salvar edição  
    saveEditButton.addEventListener('click', async function() {
        const id = editIdInput.value;
        const name = editNameInput.value;
        const description = editDescriptionInput.value;
        const category = editCategoryInput.value; // Capturar a categoria selecionada
    
        try {
            const updatedItem = await updateItemInDatabase(id, name, description, category);
            const index = items.findIndex(item => item.id === parseInt(id));
            if (index !== -1) {
                items[index] = updatedItem.activity;
                renderItems();
                editModal.style.display = 'none'; // Fechar o modal de edição após editar
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    });





    /////////////EVENTOS DE BOTOES  E SELECT DA  INTERFACE //////////////////////////////  
    // Adiciona eventos de clique nos botões de fechar modal
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            editModal.style.display = 'none';
            createModal.style.display = 'none';
        });
    });  
    // Evento para abrir modal de adição ao clicar em "Adicionar"
    createButton.addEventListener('click', function() {
        createModal.style.display = 'block';
    });

    // Evento para cancelar adição
    cancelCreateButton.addEventListener('click', function() {
        createModal.style.display = 'none';
    });

    // Evento para filtrar itens por categoria ao alterar o select
    categoryFilter.addEventListener('change', function() {
        renderItems();
    });

 
 








    /////////////CARREGA ATIVIDADES  ////////////////////////////// 
    loadItems(); // Carregar itens ao iniciar a aplicação 
    async function loadItems() {
        try {
            const data = await fetchItemsFromDatabase();
            items = data;
    
            // Iniciar o cronômetro com base no totalTime para cada item
            items.forEach(item => {
                if (item.totalTime > 0) {
                    const totalTimeInSeconds = item.totalTime;
                    const hours = Math.floor(totalTimeInSeconds / 3600);
                    const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
                    const seconds = totalTimeInSeconds % 60;
                    timers[item.id] = { hours, minutes, seconds };
                } else {
                    timers[item.id] = { hours: 0, minutes: 0, seconds: 0 };
                }
            });
            renderItems(); // Renderizar itens após carregar
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
        }
    }





    // RENDERIZA A LISTA DE ATIVIDADES  
    // Função para renderizar a lista de itens
    function renderItems() {
        itemList.innerHTML = '';
        const filterValue = categoryFilter.value;

        items.forEach(item => {
            if (filterValue === 'Todos' || item.category === filterValue) {
                const li = document.createElement('li');

                switch (item.category) {
                    case "Prioridade Alta":
                        li.setAttribute('class', "prioridade-alta");
                        break;
                    case "Prioridade Media":
                        li.setAttribute('class', "prioridade-media");
                        break;
                    case "Prioridade Baixa":
                        li.setAttribute('class', "prioridade-baixa");
                        break;
                    default:
                        break;
                }

                li.dataset.id = item.id;
                li.innerHTML = `
                    <span>${item.name}</span>: ${item.description} 
                    <div class="btn-container">
                        <span class="timer">${formatTimer(item.id)}</span>
                        <button class="start-stop-btn" data-status="stopped">Iniciar</button>
                        <button class="edit-btn">Editar</button>
                        <button class="delete-btn">Excluir</button>
                    </div>
                `;
                itemList.appendChild(li);
            }
        }); 
        // Adiciona eventos de edição, exclusão e controle de cronômetro aos respectivos botões
        addEventListenersToButtons();
    } 
    // Função para adicionar eventos de clique aos botões de edição, exclusão e controle de cronômetro aos itens renderizados via javascript
    function addEventListenersToButtons() {
        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');
        const startStopButtons = document.querySelectorAll('.start-stop-btn');

        editButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                const listItem = button.closest('li');
                const id = listItem.dataset.id;
                const itemToEdit = items.find(item => item.id === parseInt(id));
                if (itemToEdit) {
                    openEditModal(itemToEdit.id, itemToEdit.name, itemToEdit.description, itemToEdit.category);
                }
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', async event => {
                const listItem = button.closest('li');
                const id = listItem.dataset.id; 
                try {
                    let response = await deleteItem(id);
                    items = items.filter(item => item.id !== parseInt(id)); 
                    renderItems();
                } catch (error) {
                    console.error('Erro:', error);
                }
                
            });
        });

        startStopButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                const listItem = button.closest('li');
                const id = listItem.dataset.id;
                if (button.dataset.status === 'stopped') {
                    startTimer(id, button);
                } else {
                    stopTimer(id, button);
                }
            });
        });
    }




 
  


    ///////////// FUNÇÕES DO CRONOMETRO //////////////////////////////////// 
    // Função para formatar o cronômetro
      function formatTimer(id) {
        if (timers[id]) {
            return `${String(timers[id].hours).padStart(2, '0')}:${String(timers[id].minutes).padStart(2, '0')}:${String(timers[id].seconds).padStart(2, '0')}`;
        } else {
            return '00:00:00';
        }
    } 

    // Função para iniciar o cronômetro
    function startTimer(id, button) {
        const listItem = button.closest('li');
        const timerElement = listItem.querySelector('.timer');
        let [hours, minutes, seconds] = timerElement.textContent.split(':').map(Number);

        // Pausa todos os outros cronômetros
        Object.keys(timerIntervals).forEach(key => {
            if (key !== id && timerIntervals[key]) {
                clearInterval(timerIntervals[key]);
                timerIntervals[key] = null;
                const otherButton = itemList.querySelector(`[data-id="${key}"] .start-stop-btn`);
                otherButton.innerText = 'Iniciar';
                otherButton.dataset.status = 'stopped';
            }
        });

        if (!timers[id]) {
            timers[id] = { hours, minutes, seconds };
        }

        button.innerText = 'Pausar';
        button.dataset.status = 'running';

        if (!timerIntervals[id]) {
            timerIntervals[id] = setInterval(() => {
                timers[id].seconds++;
                if (timers[id].seconds >= 60) {
                    timers[id].seconds = 0;
                    timers[id].minutes++;
                    if (timers[id].minutes >= 60) {
                        timers[id].minutes = 0;
                        timers[id].hours++;
                    }
                }

                timerElement.textContent =
                    `${String(timers[id].hours).padStart(2, '0')}:${String(timers[id].minutes).padStart(2, '0')}:${String(timers[id].seconds).padStart(2, '0')}`;
            }, 1000);
        }

        // Incrementa o totalStart e atualiza no servidor
        const item = items.find(item => item.id === parseInt(id));
        item.totalStart++;
        updateTotalStart(id, item.totalStart);
    } 
    // Função para pausar o cronômetro
    function stopTimer(id, button) {
        clearInterval(timerIntervals[id]);
        timerIntervals[id] = null;

        button.innerText = 'Iniciar';
        button.dataset.status = 'stopped';

        // Salva o tempo total no servidor
        const item = items.find(item => item.id === parseInt(id));
        const totalTimeInSeconds = timers[id].hours * 3600 + timers[id].minutes * 60 + timers[id].seconds;
        item.totalTime = totalTimeInSeconds;
        updateTotalTime(id, totalTimeInSeconds);
    }


});