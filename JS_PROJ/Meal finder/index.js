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
			console.log(data);
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

// Event listeners
form.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', ev => console.log(ev));
