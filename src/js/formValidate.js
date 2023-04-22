import {sendForm} from "./sendForm";

document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll("[data-form]");

    forms.forEach(form => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (formValidate(this) === true) {

                const formData = new FormData(this);
                sendForm(formData, this);
            }
        });

    });
});

const formValidate = (form) => {

    /**
     * Removes an error message for the given input element.
     *
     * @param {HTMLElement} input - The input element to remove an error message for.
     */
    const removeError = (input) => {
        const formField = input.parentNode;
        if (input.classList.contains("error")) {
            input.classList.remove("error");
            formField.querySelector(".form__error").remove();
        }
    };

    /**
     * Creates an error message for the given input element.
     *
     * @param {HTMLElement} input - The input element to create an error message for.
     * @param {string} textErr - The text to display in the error message.
     */
    const createError = (input, textErr) => {
        input.classList.add("error");
        input.insertAdjacentHTML("afterend",
            `<div class="form__error">${textErr}</div>`
        );
    };

    /**
     * Checks validation in each input.
     *
     * @param {HTMLElement} input - The input element to remove the error for.
     */
    const checkInputError = (input) => {
        if (input.dataset.emailVal === "true") {
            removeError(input);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                createError(input, "Invalid email");
                result = false;
            }
        }

        const uppercaseRegex = /^(?=.*[A-Z])[^\s]*$/;
        const cyrillicRegex = /[а-яА-Я]/;
        const numberRegex = /[1-9]/;
        const specialCharacterRegex = /[!@#$%]/;
        const spaceRegex = /\s+/;

        if (input.dataset.minMaxLengthVal) {
            removeError(input);
            const length = JSON.parse(input.dataset.minMaxLengthVal);
            if (input.value.length < length.min) {
                createError(input, "Minimum number of characters is 2");
                result = false;
            }
            if (input.value.length > length.max) {
                createError(input, "Maximum number of characters is 25");
                result = false;
            }
        }

        if (input.dataset.dateOfBirthVal === "true") {
            removeError(input);
            const dateToday = new Date();
            const dateOfBirth = new Date(input.value);
            if (dateOfBirth >= dateToday) {
                createError(input, "Invalid date of birth");
                result = false;
            }
        }

        if (input.dataset.minLengthVal) {

            if (input.dataset.specialCharacterVal === "true" && !specialCharacterRegex.test(input.value)) {
                removeError(input);
                createError(input, "At least 1 special character from the listed ones !@#$%");
                result = false;
            }
            if (input.dataset.uppercaseVal === "true" && !uppercaseRegex.test(input.value)) {
                removeError(input);
                createError(input, "At least 1 uppercase character");
                result = false;
            }
            if (input.dataset.cyrillicVal === "true" && !numberRegex.test(input.value)) {
                removeError(input);
                createError(input, "At least one digit 1-9");
                result = false;
            }
            if (input.value.length < input.dataset.minLengthVal) {
                removeError(input);
                createError(input, "Minimum number of characters is 8");
                result = false;
            }
            if (input.dataset.numberVal === "true" && cyrillicRegex.test(input.value)) {
                removeError(input);
                createError(input, "The input contains Cyrillic characters");
                result = false;
            }
        }


        if (input.dataset.name === "Confirm password") {
            removeError(input);
            const password = form.querySelector("[data-name=Password]").value;
            if (input.value !== password) {
                createError(input, "Passwords must match");
                result = false;
            }
        }

        if (spaceRegex.test(input.value)) {
            removeError(input);
            createError(input, "Remove spaces");
            result = false;
        }

        if (input.dataset.required === "true") {
            if (input.value === "") {
                removeError(input);
                createError(input, "Required");
                result = false;
            }
        }
    };

    let result = true;

    form.querySelectorAll("input").forEach(input => {
        removeError(input);
        checkInputError(input);
        input.addEventListener("focus", () => {
            removeError(input);
        });
        input.addEventListener("focusout", () => {
            checkInputError(input);
        });
    });

    return result;
};





