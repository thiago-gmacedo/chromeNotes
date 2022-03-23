export default {
  getNotes: () => {
    return JSON.parse(localStorage.getItem('notes'));
  },
  setNotes: (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
  },
  addNote: (note) => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
  },
  removeNote: (note) => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const newNotes = notes.filter(n => n.name !== note);
    console.log(note)
    localStorage.setItem('notes', JSON.stringify(newNotes));
  },
  updateNote: (note, newNote) => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const newNotes = notes.map(n => {
      console.log(n.name, note, newNote)
      if (n.name === note) {
        console.log('deu')
        n.name = newNote;
      }
      return n;
    });
    localStorage.setItem('notes', JSON.stringify(newNotes));
  },
}
