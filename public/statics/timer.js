import {
    updateTotalStart,
    updateTotalTime
} from './dbFunctions.js'; 


 

   // Função para formatar o cronômetro 
    function formatTimer(id, timers) {
        if (timers[id]) {
            return `${String(timers[id].hours).padStart(2, '0')}:${String(timers[id].minutes).padStart(2, '0')}:${String(timers[id].seconds).padStart(2, '0')}`;
        } else {
            return '00:00:00';
        }
    } 



    // Função para iniciar o cronômetro
    function startTimer(id, button , timers,  timerIntervals , items  ) {
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
    function stopTimer(id, button , timers,  timerIntervals , items ) {
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




    

    export {
        formatTimer,
        startTimer,
        stopTimer
    };