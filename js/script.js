const form = document.querySelector("form");
const nameItem = document.getElementById("name-item");
const list = document.querySelector("ul");
const alert = document.getElementById("alert-remove");

let items = [];

form.onsubmit = (event) => {
  event.preventDefault();

  const item = {
    id: new Date().getTime(),
    name: nameItem.value,
    creatAt: new Date(),
  };

  items.push(item);
  nameItem.value = "";
  render();
};

function render() {
  try {
    list.innerHTML = "";
    for (const item of items) {
      const list_item = document.createElement("li");
      list_item.classList.add("item");

      const div = document.createElement("div");

      const input = document.createElement("input");
      input.type = "checkbox";
      input.classList.add("check-item");

      const label = document.createElement("label");
      label.textContent = item.name;

      const trashIcon = document.createElement("img");
      trashIcon.setAttribute("src", "img/Frame(3).svg");
      trashIcon.setAttribute("alt", "trash");
      trashIcon.classList.add("delete-item");

      trashIcon.onclick = () => {
        removeItem(item);
      };

      list.append(list_item);
      list_item.append(div, trashIcon);
      div.append(input, label);
    }
  } catch (error) {
    alert(error);
  }
}

function removeItem(item) {
  items = items.filter((i) => i.id !== item.id);
  render();
}

list.addEventListener("click", (event) => {});
