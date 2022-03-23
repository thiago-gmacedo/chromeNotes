import storage from './storage.js';

chrome.tabs.query({active: true}, tabs => {
  const createNote = (name) => {
    const noteList = document.getElementById("notes");
    const note = document.createElement("div");
    note.classList.add("note-item");
    const noteName = document.createElement("div");
    noteName.innerText = name;
    note.classList.add("note-item");

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Del";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      note.remove();
      storage.removeNote(noteName.innerText);
    });

    const copyButton = document.createElement("button");
    copyButton.innerText = "Copy";
    copyButton.classList.add("copy-button");
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(noteName.innerText);
    });

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
      const input = document.createElement("input");
      const buttons = note.childNodes[1];
      input.classList.add("edit-input");
      input.value = note.firstChild.innerText;
      const backupName = note.firstChild.innerText;
      noteName.innerText = "";
      buttons.remove();
      note.appendChild(input);
      input.focus();
      input.addEventListener("blur", () => {
        const newName = input.value;
        note.firstChild.innerText = newName;
        input.remove();
        note.appendChild(buttons);
        storage.updateNote(backupName, newName)
      }, false);
    });
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    buttons.appendChild(copyButton);
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
    note.appendChild(noteName);
    note.appendChild(buttons);
    noteList.appendChild(note);
  }

  const form = document.getElementById('new-note-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('note-name').value;
    const name = input ? input : "New Note";
    createNote(name);
    storage.addNote({name});
    form.reset();
  });  
  
  const notes = storage.getNotes('notes');
  if (notes && notes.length > 0) {
    notes.forEach(note => {
      createNote(note.name);
    });
  } else {
    storage.setNotes([]);
    document.getElementById('notes').innerText = "No notes yet";
  };
});
  