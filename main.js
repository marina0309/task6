const productsMap = {
    "product1": {price: 3000, checkbox: false, select: false},  // только товар
    "product2": {price: 4000, checkbox: true, select: false}, // с чекбоксом
    "product3": {price: 5500,checkbox: false, select: true} // с селектом услуг
}; // Менять только цену
const selectMap = {"select1": 500 , "select2": 1000, "select3": 2000, "select4": 3000};
// Менять только цену
const checkboxPrice = 500; // цена услуги чекбокса
window.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.getElementById("quantityInput");
    const radio = Array.from(document.getElementsByName("radio-type"));
    const Select = document.getElementById("select");
    const checkBox = document.getElementById("checkBox")
    const answerDiv = document.getElementById("answerDiv");
    const render = (price, productState) => {
        if(productState) {
            switch (product) {
                case "product1": {
                    Select.parentElement.style.display = "none";
                    checkBox.parentElement.style.display = "none";
                    break;
                }
                case "product2": {
                    Select.parentElement.style.display = "none";
                    checkBox.parentElement.style.display = "flex";
                    break;
                }
                case "product3": {
                    Select.parentElement.style.display = "flex";
                    checkBox.parentElement.style.display = "none";
                    break;
                }
            }
        }
        if (isNaN(price)) {
            answerDiv.innerText = `Вы ввели неправильно :(`; // перефразировать
        } else {
            answerDiv.innerText =
                `Price: ${price}`;
        }
    }
    const undVal = (el) =>{ return (el===undefined?undefined:el.value)}
    let product = undVal(radio.find(el => el.checked));
    let selectPrice = 0;
    let checkboxCurrentPrice = 0;
    let quantity = quantityInput.value;
    const calc = () => {
        if(quantity === "")
            return 0;
        else if (/^[0-9]+$/.test(quantity)) {
            const prod = productsMap[product]
            return (prod.price + (prod.checkbox?checkboxCurrentPrice:0) + (prod.select?selectPrice:0) )* quantity;
        } else {
            return NaN;
        }
    };

    quantityInput.addEventListener("input", (event) => {
        quantity = event.target.value;
        render(calc(), false);
    })

    radio.forEach((el) => {el.addEventListener("change", (event) => {
        if(event.target.checked) {
            product = event.target.value;
            render(calc(), true);
        }
    })})

    checkBox.addEventListener("change", (event) => {
        if(event.target.checked) checkboxCurrentPrice = checkboxPrice;
        else checkboxCurrentPrice = 0;
        render(calc(), false)
    })

    Select.addEventListener("change", (event) => {
        let sum = 0;
        Array.from(Select.selectedOptions).forEach((el) => sum += selectMap[el.value]);
        selectPrice = sum;
        render(calc(), false)
    })


});
