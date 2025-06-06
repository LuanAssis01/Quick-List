const form = document.querySelector("form");
const nameItem = document.getElementById("name-item");
const list = document.querySelector("ul");
const alertRemove = document.getElementById("alert-remove");

let items = [];

form.onsubmit = (event) => {
  event.preventDefault();

  if (nameItem.value.trim() === "") return;

  const item = {
    id: new Date().getTime(),
    name: nameItem.value,
    completed: false,
    creatAt: new Date(),
  };

  items.push(item);
  nameItem.value = "";
  render();
};

function toggleCompleted(id) {
  items = items.map((item) => {
    if (item.id === id) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });
  render();
}

function render() {
  try {
    list.innerHTML = "";
    for (const item of items) {
      const list_item = document.createElement("li");
      list_item.classList.add("item");
      if (item.completed) {
        list_item.classList.add("completed");
      }

      const div = document.createElement("div");

      const input = document.createElement("input");
      input.type = "checkbox";
      input.classList.add("check-item");
      input.checked = item.completed;
      input.onchange = () => toggleCompleted(item.id);

      const label = document.createElement("label");
      label.textContent = item.name;

      const trashIcon = document.createElement("img");
      trashIcon.setAttribute("src", "img/Frame(3).svg");
      trashIcon.setAttribute("alt", "trash");
      trashIcon.classList.add("delete-item");
      trashIcon.onclick = () => removeItem(item.id);

      list.append(list_item);
      list_item.append(div, trashIcon);
      div.append(input, label);
    }
  } catch (error) {
    console.error(error);
  }
}

function removeItem(id) {
  items = items.filter((i) => i.id !== id);
  render();

  alertRemove.classList.add("show");

  setTimeout(() => {
    alertRemove.classList.remove("show");
  }, 3000);
}

const alertCloseIcon = alertRemove.querySelector(":scope > img");
alertCloseIcon.onclick = () => {
  alertRemove.classList.remove("show");
};

list.addEventListener("click", (event) => { });
