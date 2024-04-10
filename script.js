const foodItemInput = document.getElementById('foodItem');
const calorieCountInput = document.getElementById('calorieCount');
const foodTable = document.getElementById('foodTable');
const totalCaloriesSpan = document.getElementById('totalCalories');

let totalCalories = 0;

function addFoodItem() {
    const foodItem = foodItemInput.value.trim();
    const calorieCount = parseInt(calorieCountInput.value);

    if (foodItem && !isNaN(calorieCount)) {
        totalCalories += calorieCount;
        updateTotalCaloriesDisplay();

        const row = foodTable.insertRow();
        row.insertCell(0).innerHTML = foodItem;
        row.insertCell(1).innerHTML = calorieCount;

        saveData();

        foodItemInput.value = '';
        calorieCountInput.value = '';
    }
}

function updateTotalCaloriesDisplay() {
    totalCaloriesSpan.textContent = totalCalories;
}

function saveData() {
    const foodItems = [];
    for (let i = 1; i < foodTable.rows.length; i++) {
        const item = {
            food: foodTable.rows[i].cells[0].innerHTML,
            calories: parseInt(foodTable.rows[i].cells[1].innerHTML)
        };
        foodItems.push(item);
    }

    const dataToSave = JSON.stringify(foodItems);
    document.cookie = `foodData=${dataToSave}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
}

function loadData() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const parts = cookie.split('=');
        if (parts[0] === 'foodData') {
            const foodData = JSON.parse(parts[1]);
            for (const item of foodData) {
                addRowToTable(item.food, item.calories);
                totalCalories += item.calories;
            }
            updateTotalCaloriesDisplay();
            break;
        }
    }
}

function addRowToTable(food, calories) {
    const row = foodTable.insertRow();
    row.insertCell(0).innerHTML = food;
    row.insertCell(1).innerHTML = calories;
}

function resetData() {
    totalCalories = 0;
    updateTotalCaloriesDisplay();
    while (foodTable.rows.length > 1) {
        foodTable.deleteRow(1);
    }
    document.cookie = 'foodData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
}

const exerciseDescriptionInput = document.getElementById('exerciseDescription');
const caloriesBurnedInput = document.getElementById('caloriesBurned');

function subtractCalories() {
    const description = exerciseDescriptionInput.value.trim();
    const caloriesBurned = parseInt(caloriesBurnedInput.value);

    if (description && !isNaN(caloriesBurned)) {
        totalCalories -= caloriesBurned;
        updateTotalCaloriesDisplay();

        const row = foodTable.insertRow();
        row.insertCell(0).innerHTML = `Exercise: ${description}`;
        row.insertCell(1).innerHTML = `-${caloriesBurned}`;

        saveData();

        exerciseDescriptionInput.value = '';
        caloriesBurnedInput.value = '';
    }
}

loadData();