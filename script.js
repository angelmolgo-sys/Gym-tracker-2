const form = document.getElementById("workout-form");
const list = document.getElementById("workout-list");

let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

function saveWorkouts() {
  localStorage.setItem("workouts", JSON.stringify(workouts));
}

function renderWorkouts() {
  list.innerHTML = "";

  workouts.forEach((session, sessionIndex) => {
    const sessionDiv = document.createElement("div");
    sessionDiv.style.marginTop = "20px";

    const dateHeader = document.createElement("h3");
    dateHeader.textContent = `Workout Date: ${session.date}`;
    sessionDiv.appendChild(dateHeader);

    session.exercises.forEach((exercise, exerciseIndex) => {
      const li = document.createElement("li");

      li.innerHTML = `
        ${exercise.exercise} — ${exercise.sets} x ${exercise.reps} @ ${exercise.weight}kg
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      `;

      // Delete exercise
      li.querySelector(".delete").addEventListener("click", () => {
        session.exercises.splice(exerciseIndex, 1);
        saveWorkouts();
        renderWorkouts();
      });

      // Edit exercise
      li.querySelector(".edit").addEventListener("click", () => {
        document.getElementById("workout-date").value = session.date;
        document.getElementById("exercise").value = exercise.exercise;
        document.getElementById("sets").value = exercise.sets;
        document.getElementById("reps").value = exercise.reps;
        document.getElementById("weight").value = exercise.weight;

        session.exercises.splice(exerciseIndex, 1);
        saveWorkouts();
        renderWorkouts();
      });

      sessionDiv.appendChild(li);
    });

    list.appendChild(sessionDiv);
  });
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const date = document.getElementById("workout-date").value;
  const exercise = document.getElementById("exercise").value;
  const sets = document.getElementById("sets").value;
  const reps = document.getElementById("reps").value;
  const weight = document.getElementById("weight").value;

  let session = workouts.find(w => w.date === date);

  if (!session) {
    session = { date: date, exercises: [] };
    workouts.push(session);
  }

  session.exercises.push({ exercise, sets, reps, weight });

  saveWorkouts();
  renderWorkouts();
  form.reset();
});

renderWorkouts();