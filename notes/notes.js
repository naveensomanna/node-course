const fs = require("fs");
const chalk=require("chalk");


function getNotes() {
  const dataBuffer = fs.readFileSync("notes.json");
  const dataJSON = dataBuffer.toString();
  const dataParse = JSON.parse(dataJSON);
  return dataParse;
}

function addNotes(title, body) {
  const notes = loadNotes();
  const isTitleFound = notes.some((item) => item.title === title);
  if (!isTitleFound) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes)
  }else{
   console.log("Title already found")
  }

}




function removeNotes(title){
    const notes=getNotes();
    const updatedNotes=notes.filter((note)=>note.title!==title);
    if(updatedNotes.length!==notes.length){
        console.log(chalk.green("Note removed"));
    }else{
        console.log(chalk.red("No Note Found"));
    }
    saveNotes(updatedNotes);

}



function listNotes(){
    const notes=getNotes();
    notes.forEach(element => {
        console.log(chalk.default.green(element.title))
    });
}

function loadNotes() {
  try {
    return getNotes();
  } catch (err) {
    return [];
  }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
  getNotes,
  addNotes,
  removeNotes,
  listNotes
};
