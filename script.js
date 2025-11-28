document.addEventListener('DOMContentLoaded', () => {

    const openBtn = document.getElementById('openFormBtn');
    const popup = document.getElementById('formPopup');
    const closeBtn = document.querySelector('.close-btn');
    const form = document.getElementById('contactForm');
    const statusMsg = document.getElementById('statusMessage');

    // Уникальный ключ для localStorage
    const STORAGE_KEY = 'contactFormValues';

    function openForm() {
        popup.style.display = 'flex';
        history.pushState({ formOpen: true }, '', '#form');
        window.scrollTo(0, 0);
    }

    function closeForm() {
        popup.style.display = 'none';
        history.pushState({}, '', window.location.pathname + window.location.search); // Очищаем хэш, чтобы вернуться к обычному URL

        statusMsg.textContent = '';
        statusMsg.className = 'status';
    }


    function clearFormData() {
        localStorage.removeItem(STORAGE_KEY);
    }


    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Собираем данные формы
        const formData = new FormData(form);

        try {
            const response = await fetch('https://formcarry.com/s/9MOe0WO5uDQ', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                statusMsg.textContent = '✅ Форма успешно отправлена!';
                statusMsg.className = 'status success';

                // очищаем форму
                form.reset();
                clearFormData();
            } else {
                throw new Error('Ошибка сервера');
            }
        } catch (error) {
            statusMsg.textContent = '❌ Ошибка отправки: ' + error.message;
            statusMsg.className = 'status error'; // для классов main.css чтобы менять цвет
        }
    });


    // --- Обработчики событий ---

    openBtn.addEventListener('click', openForm); // открытие формы при клике

    closeBtn.addEventListener('click', closeForm); // закрытие формы при клике

    // Обработка истории браузера (нажатие "Назад")
    window.addEventListener('popstate', (event) => {
        if (!event.state || !event.state.formOpen) {
            closeForm();
        }
    });


    form.addEventListener('input', saveFormData);

});