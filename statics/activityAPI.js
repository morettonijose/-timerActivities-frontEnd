// activityAPI.js
export class ActivityAPI {



    static async addActivity(activity) {
        const response = await fetch('http://127.0.0.1:5000/activity/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activity),
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar item');
        }

        return response.json();
    }



    static async updateActivity(id, updates) {
        const response = await fetch(`http://127.0.0.1:5000/activity/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar item');
        }

        return response.json();
    }



    static async deleteActivity(id) {
        const response = await fetch(`http://127.0.0.1:5000/activity/del/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar item');
        }
    }




    static async loadActivities() {
        const response = await fetch('http://127.0.0.1:5000/activities');
        if (!response.ok) {
            throw new Error('Erro ao carregar itens');
        }
        return response.json();
    }


    
}