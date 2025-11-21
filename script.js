//Класс для збереження даних про елементи освітлення
class Light {
    constructor(id) {
        this.id = id;
        this.name_element;
        this.count_elements = 1;
        this.count_outputs = 1;
        this.count_total_outputs = 1;
        this.type_outputs;
        this.modal;
        this.shadow;
    }

    Change_count_elements(operation) {
        if (operation == "+") {
            this.count_elements += 1;
        }
        else if (operation == "-") {
            this.count_elements = Math.max(1, this.count_elements - 1);
        }

        count_modal_light_elements.textContent = this.count_elements;
        this.count_total_outputs = this.count_elements * this.count_outputs;
    }

    Change_count_outputs(operation) {
        if (operation == "+") {
            this.count_outputs += 1;
        }
        else if (operation == "-") {
            this.count_outputs = Math.max(1, this.count_outputs - 1);
        }

        count_modal_light_outputs.textContent = this.count_outputs;
        this.count_total_outputs = this.count_elements * this.count_outputs;
    }

    Control_modal_light(modal, shadow, operation) {
        this.modal = modal;
        this.shadow = shadow;
        if (operation == "on") {
            this.modal.style.display = "block";
            this.shadow.style.display = "block";
        }
        else if (operation == "off") {
            this.modal.style.display = "none";
            this.shadow.style.display = "none";
        }
    }

    Bind_buttons(plus_element, minus_element, plus_output, minus_output) {
        plus_element.addEventListener("click", () => this.Change_count_elements("+"));
        minus_element.addEventListener("click", () => this.Change_count_elements("-"));
        plus_output.addEventListener("click", () => this.Change_count_outputs("+"));
        minus_output.addEventListener("click", () => this.Change_count_outputs("-"));
    }

    Create_light_element() {
        this.name_element = modal_light_select.value;
        if (this.name_element == "Лампа" || this.name_element == "Торшер" || this.name_element == "Бра") {
            this.type_outputs = "DO";
        }
        else if (this.name_element == "LED") {
            this.type_outputs = "PWM";
        }
        else if (this.name_element == "Трековий світильник") {
            this.type_outputs = "DALI"
        }

        const device = document.createElement("div");
        device.classList.add("device");

        device.innerHTML = `
            <p class="device-name">${this.name_element}</p>
            <div class="device-info">
                <img class="device-img" src="img/lamp.png">
                <ul class="device-details">
                    <li>
                        <p>Кількість:</p>
                        <button class="button-counting">-</button>
                        <p>${this.count_elements}</p>
                        <button class="button-counting">+</button>
                    </li>
                    <li>
                        <p>Тип виходів:</p>
                        <p>${this.type_outputs}</p>
                    </li>
                    <li>
                        <p>К-сть виходів:</p>
                        <p>${this.count_outputs}</p>
                    </li>
                </ul>
            </div>
            <div class="device-result">
                <p>Результат</p>
                <ul>
                    <li>
                        <p>Необхідна к-сть виходів: </p>
                        <p>${this.count_total_outputs}</p>
                        <p>DO</p>
                    </li>
                </ul>
            </div>
        `;

        selected_devices.appendChild(device);

        this.modal.style.display = "none";
        this.shadow.style.display = "none";
    }
}

//Кількість екземплярів
lights_elements_count = 0

//Список екземплярів
lights_list = [];

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

//Зміна кількості елементів освітлення в екземплярі класу
const count_modal_light_elements = document.getElementById("modal-light-count-elements");
const plus_modal_light_elements = document.getElementById("button-counting-plus-modal-light-elements");
const minus_modal_light_elements = document.getElementById("button-counting-minus-modal-light-elements");

//Зміна кількості виходів освітлення в екземплярі класу
const count_modal_light_outputs = document.getElementById("modal-light-count-outputs");
const plus_modal_light_outputs = document.getElementById("button-counting-plus-modal-light-outputs");
const minus_modal_light_outputs = document.getElementById("button-counting-minus-modal-light-outputs");

//Включення модального вікна освітлення
add_light.addEventListener("click", () => {
    lights_list.push(new Light(lights_elements_count));
    lights_elements_count += 1;
    lights_list[lights_elements_count - 1].Control_modal_light(modal_light, shadow_background, "on");
    lights_list[lights_elements_count - 1].Bind_buttons(plus_modal_light_elements, minus_modal_light_elements, plus_modal_light_outputs, minus_modal_light_outputs);
});

//Вимкнення модального вікна освітлення
close_light.addEventListener("click", () => {
    lights_list[lights_elements_count - 1].Control_modal_light(modal_light, shadow_background, "off");
    lights_list.pop();
    lights_elements_count -= 1;
});

//Створення елементу освітлення
create_light.addEventListener("click", () => {
    lights_list[lights_elements_count - 1].Create_light_element();
});