let data = JSON.parse(localStorage.getItem("timebranz")) || [];

function add() {
  const title = document.getElementById("title").value.trim();
  const date = document.getElementById("date").value;

  if (!title || !date) return;

  data.push({ title, date });
  save();
}

function save() {
  localStorage.setItem("timebranz", JSON.stringify(data));
  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach((item, i) => {
    const diff = diffTime(item.date);

    const el = document.createElement("div");
    el.className = "card";

    el.innerHTML = `
      <div>
        <strong>${item.title}</strong>
        <div class="time">${diff.days} dni • ${diff.hours} h • ${diff.minutes} min</div>
      </div>
      <button class="remove" onclick="del(${i})">✕</button>
    `;

    list.appendChild(el);
  });
}

function diffTime(d) {
  const start = new Date(d);
  const now = new Date();
  const ms = now - start;

  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60
  };
}

function del(i) {
  data.splice(i, 1);
  save();
}

setInterval(render, 60000);
render();
