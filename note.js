
let note = document.querySelector("[name=notes]");
let newNote = document.querySelector(".mynotes")
let saveNote = document.querySelector("[done]")
let entry = document.querySelector("#mynotes")
let msg = document.querySelector("#msg")
let form = document.querySelector("#form");


//focus on text area
document.querySelector("[name=add]").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("[name=notes]").focus();
});


form.addEventListener("submit", function (e) {
    e.preventDefault();

    if(!validate()) 
        return;
    
    acceptUserEntry();
    createNote();
})

let validate = () => {
    let validated = true;
    if (note.value == "") {
        msg.innerText = "Please enter a note"
        validated = false;
    }

    return validated;
}

let userEntry = [{}];

let acceptUserEntry = () => {
    userEntry.push (note.value);

    localStorage.setItem("userEntry", JSON.stringify(userEntry));

    console.log(userEntry)
}

let createNote = () => {
    const list = note.value;
    note.value = '';

    const myList = document.createElement('li');
    myList.innerText = list;
    newNote.append(myList);
    
}
