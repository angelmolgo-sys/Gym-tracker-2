let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
const form = document.getElementById("workout-form");
const list = document.getElementById("workout-list");

function renderWorkouts() {
  list.innerHTML = "";

  workouts.forEach((workout, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${workout.exercise} — ${workout.sets} sets × ${workout.reps} reps @ ${workout.weight}kg
      <button class="delete">Delete</button>
    `;

    li.querySelector(".delete").addEventListener("click", () => {
      workouts.splice(index, 1);
      saveWorkouts();
      renderWorkouts();
    });

    list.appendChild(li);
  });
}

function saveWorkouts() {
  localStorage.setItem("workouts", JSON.stringify(workouts));
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const exercise = document.getElementById("exercise").value;
  const sets = document.getElementById("sets").value;
  const reps = document.getElementById("reps").value;
  const weight = document.getElementById("weight").value;

  workouts.push({
  exercise,
  sets,
  reps,
  weight
});

saveWorkouts();
renderWorkouts();

  form.reset();
});
renderWorkouts();