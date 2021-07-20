const search = document.getElementById('search');
const form = document.getElementById('form');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMealEl = document.getElementById('single-meal');

// Search Meal and fetch from API
const searchMeal = ev => {
	ev.preventDefault();

	// Clear single meal
	mealsEl.innerHTML = '';

	// get search value
	const term = search.value.trim();

	// Guard clause
	if (!term) return alert('Please enter a food name');

	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
		.then(res => res.json())
		.then(data => {
			// console.log(data);
			resultHeading.innerHTML = `<h2>Search results for '${term}' :</h2>`;

			if (data.meal === null) {
				resultHeading.innerHTML = `<p>There are no search results. Please try again</p>`;
			} else {
				mealsEl.innerHTML = data.meals
					.map(
						meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `
					)
					.join('');
			}
		});

	// Clear search text
	search.value = '';
};

// Fetch Meal by ID
const getMealByID = async mealID => {
	const res = await fetch(
		`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
	);

	const data = await res.json();
	const meal = data.meals[0];

	// add meal to the DOM
	addMealtoDOM(meal);
	// console.log(meal);
};

// Fetch random meal
const getRandomMeal = async () => {
	// Cear mneals and elements
	mealsEl.innerHTML = '';
	resultHeading.innerHTML = '';

	const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

	const data = await res.json();
	const meal = data.meals[0];

	addMealtoDOM(meal);
	// console.log(meal);
};

function addMealtoDOM(meal) {
	const ingredients = [];

	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(
				`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
			);
		} else {
			break;
		}
	}

	singleMealEl.innerHTML = `
		<div class="single-meal">
			<h1>${meal.strMeal}</h1>
			<img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
			<div class="single-meal-info">
				${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
			</div>

			<div class="main">
				<p>${meal.strInstructions}</p>
				<h2>Ingredients: </h2>
				<ul>
					${ingredients.map(ing => `<li>${ing}</li>`).join('')}
				</ul>
			</div>
		</div>
	`;
	// console.log(ingredients);
}

// Event listeners
form.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', ev => {
	const mealInfo = ev.target.closest('.meal-info');
	if (!mealInfo) return;

	const getId = mealInfo.getAttribute('data-mealid');

	getMealByID(getId);
	// console.log(getId);
});

random.addEventListener('click', getRandomMeal);
