//Виклик модального вікна
const add_light = document.getElementById("button-add-light");
const add_switch = document.getElementById("button-add-switch");

//Закриття модального вікна
const close_light = document.getElementById("button-close-modal-light");

//Додавання елемента
const create_light = document.getElementById("button-create-modal-light");

//Модальні вікна
const modal_light = document.getElementById("modal-light");

//Селектори елементів
const modal_light_select = document.getElementById("modal-light-select");

//Контейнер доданих елементів
const selected_devices = document.getElementById("selected-devices");

//Фонове затемнення
const shadow_background = document.getElementById("shadow-background");

//Логіка збільшення кількості виходів для модального вікна освітлення
const count_modal_light_outputs = document.getElementById("modal-light-count-outputs");
const plus_modal_light = document.getElementById("button-counting-plus-modal-light");
const minus_modal_light = document.getElementById("button-counting-minus-modal-light");

add_light.addEventListener("click", () => {
    shadow_background.style.display = "block";
    modal_light.style.display = "block";
});

close_light.addEventListener("click", () => {
    shadow_background.style.display = "none";
    modal_light.style.display = "none";
});

plus_modal_light.addEventListener("click", () => {
    let value = parseInt(count_modal_light_outputs.textContent);
    value += 1;
    count_modal_light_outputs.textContent = value;
});

minus_modal_light.addEventListener("click", () => {
    let value = parseInt(count_modal_light_outputs.textContent);
    value = Math.max(1, value - 1);
    count_modal_light_outputs.textContent = value;
});

create_light.addEventListener("click", () => {
    const light_type = modal_light_select.value;
    const light_count_outputs = parseInt(count_modal_light_outputs.textContent);

    const device = document.createElement("div");
    device.classList.add("device");

    device.innerHTML = `
        <p class="device-name">${light_type}</p>
        <div class="device-info">
            <img class="device-img" src="img/lamp.png">
            <ul class="device-details">
                <li>
                    <p>Кількість:</p>
                    <button class="button-counting">-</button>
                    <p>1</p>
                    <button class="button-counting">+</button>
                </li>
                <li>
                    <p>Тип виходів:</p>
                    <p>DO</p>
                </li>
                <li>
                    <p>К-сть виходів:</p>
                    <p>${light_count_outputs}</p>
                </li>
            </ul>
        </div>
        <div class="device-result">
            <p>Результат</p>
            <ul>
                <li>
                    <p>Необхідна к-сть виходів: </p>
                    <p>1</p>
                    <p>DO</p>
                </li>
            </ul>
        </div>
    `;

    selected_devices.appendChild(device);

    modal_light.style.display = "none";
    shadow_background.style.display = "none";
});