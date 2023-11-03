const addButtons = document.querySelector("#add-note");

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];

  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class="w-[14.8rem] h-[17rem] bg-white relative mx-5 my-5">
      <div class="text-xl font-bold absolute top-[14rem] right-[1rem] px-16">
        <button>
          <i
            class="edit-btn bg-green-500 p-2 rounded-full hover:bg-white hover:text-green-500 transition-all fa-regular fa-pen-to-square"
          ></i>
        </button>
        <button>
          <i
            class="delete-btn bg-red-500 p-2 rounded-full hover:bg-white hover:text-red-500 transition-all fa-solid fa-trash"
          ></i>
        </button>
      </div>
      <div class="${text ? "" : "hidden"} p-2 main"></div>  
    <textarea class="${
      text ? "hidden" : ""
    } w-[14.8rem] h-[13rem] p-2 pb-14"></textarea>
    </div>
      `;

  note.insertAdjacentHTML("afterbegin", htmlData);

  const editBtn = note.querySelector(".edit-btn");
  const deleteBtn = note.querySelector(".delete-btn");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  // delete the note
  deleteBtn.addEventListener("click", () => {
    note.remove();
  });

  // toggle using edit button
  textArea.value = text;
  mainDiv.innerHTML = text;
  editBtn.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;

    updateLSData();
  });

  document.body.appendChild(note);
};

// getting data back from localstorage
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addButtons.addEventListener("click", () => addNewNote());
