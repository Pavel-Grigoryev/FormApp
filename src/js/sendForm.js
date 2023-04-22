export const sendForm = async (formData, form) => {
    const parent = form.parentNode;
    const grandParent = parent.parentNode;
    try {
        grandParent.classList.add("loading");
        for (let [name, value] of formData) {
            console.log(`${name}: ${value}`);
        }
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        showModal("You have successfully registered", true);
        form.reset();
    } catch (e) {
        showModal(e.message, false);
    } finally {
        grandParent.classList.remove("loading");
    }
};

const popup = document.querySelector(".main__popup");
const showModal = (text, isFormSend) => {
    popup.classList.add("active");
    if (!isFormSend) {
        popup.classList.add("error");
    }
    popup.textContent = `${text}`;
    setTimeout(() => {
        popup.classList.remove("active");
        if (!isFormSend) {
            popup.classList.remove("error");
        }
    }, 5000);
};
