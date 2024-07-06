// dbFunctions.js

async function addItemToDatabase(name, description, category) {
    const response = await fetch('http://127.0.0.1:5000/activity/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            description,
            status: 'Inativo',  // Status padrão
            category,          // Categoria selecionada
            totalTime: '0',    // TotalTime inicial
            totalStart: 0      // TotalStart inicial
        }),
    });
    if (!response.ok) {
        throw new Error('Erro ao adicionar item');
    }
    return await response.json();
}

async function updateItemInDatabase(id, name, description, category) {
    const response = await fetch(`http://127.0.0.1:5000/activity/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            description,
            category, // Incluir a categoria na atualização
        }),
    });

    if (!response.ok) {
        throw new Error('Erro ao editar item');
    }

    return await response.json();
}

async function fetchItemsFromDatabase() {
    try {
        const response = await fetch('http://127.0.0.1:5000/activities');
        if (!response.ok) {
            throw new Error('Erro ao carregar itens');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        throw error; // Propaga o erro para ser tratado externamente, se necessário
    }
}

async function deleteItem(id) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/activity/del/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar item');
        }

        return response;
    } catch (error) {
        console.error('Erro:', error);
        return error
    }
}

async function updateTotalStart(id, totalStart) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/activity/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ totalStart }),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar totalStart');
        }

    } catch (error) {
        console.error('Erro:', error);
    }
}

async function updateTotalTime(id, totalTime) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/activity/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: 'Inativo',
                totalTime,
            }),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar status e totalTime');
        }

    } catch (error) {
        console.error('Erro:', error);
    }
}

export {
    addItemToDatabase,
    updateItemInDatabase,
    fetchItemsFromDatabase,
    deleteItem,
    updateTotalStart,
    updateTotalTime
};