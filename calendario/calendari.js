const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
let currentDate = new Date();
let startDate = null;
let endDate = null;

document.addEventListener("DOMContentLoaded", function() {
    renderCalendar();

    document.getElementById("prevMonth").addEventListener("click", function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById("nextMonth").addEventListener("click", function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    document.getElementById("clear").addEventListener("click", function() {
        startDate = null;
        endDate = null;
        renderCalendar();
        document.getElementById("selectedDate").textContent = "Selecione o Período";
    });

    document.getElementById("ok").addEventListener("click", function() {
        if (startDate && endDate) {
            document.getElementById("selectedDate").textContent = `${formatDate(startDate)} a ${formatDate(endDate)}`;
        }
    });
});

function formatDate(date) {
    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const day = dayNames[date.getDay()];
    const month = monthNames[date.getMonth()];
    const dayOfMonth = date.getDate();
    return `${day}, ${month} ${dayOfMonth}`;
}

function renderCalendar() {
    const monthYear = document.getElementById("monthYear");
    const calendarDays = document.getElementById("calendarDays");

    monthYear.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const lastDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const daysInCalendar = [];
    
    for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
        daysInCalendar.push("");
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        daysInCalendar.push(i);
    }

    calendarDays.innerHTML = "";
    daysInCalendar.forEach((day) => {
        const dayElement = document.createElement("div");
        dayElement.textContent = day;

        if (day) {
            dayElement.addEventListener("click", function() {
                const selectedDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

                if (!startDate || (startDate && endDate)) {
                    startDate = selectedDay;
                    endDate = null; // Reinicia a data final
                } else {
                    if (selectedDay < startDate) {
                        endDate = startDate;
                        startDate = selectedDay;
                    } else {
                        endDate = selectedDay;
                    }
                }
                renderCalendar(); // Atualiza o calendário sem fechar
            });
        }

        // Marcação de dias selecionados
        if (startDate && startDate.getDate() === day && startDate.getMonth() === currentDate.getMonth()) {
            dayElement.classList.add("selected-start");
        }
        if (endDate && endDate.getDate() === day && endDate.getMonth() === currentDate.getMonth()) {
            dayElement.classList.add("selected-end");
        }
        if (startDate && endDate) {
            if (selectedDay > startDate && selectedDay < endDate) {
                dayElement.classList.add("selected-range");
            }
        }

        calendarDays.appendChild(dayElement);
    });
}
