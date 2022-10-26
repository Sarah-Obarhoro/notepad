
let note = document.querySelector("[name=notes]");
let content = document.querySelector(".mynotes")
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

    //rebuild notes with latest saved changes
    buildNotes();
})

let validate = () => {
    let validated = true;
    if (note.value == "") {
        msg.innerText = "Please enter a note"
        validated = false;
    }

    return validated;
}

let acceptUserEntry = () => {
    let notes = JSON.parse(localStorage.getItem("userEntry")) ?? []
    notes.push({
        id: Math.floor(Math.random() * 99999),
        note: note.value
    })

    localStorage.setItem("userEntry", JSON.stringify(notes));
    note.value = '';

    // console.log(userEntry)
}

let buildNotes = () => {
    const data = JSON.parse(localStorage.getItem('userEntry')) ?? {};
    const notes = Object.values(data)

    content.innerHTML = "";

    notes.forEach((data) => {
        
        const newList = document.createElement('li');
        newList.setAttribute('data-note-id', data.id);
        newList.innerHTML = `
            ${data['note']} 
            <div class="editnotes">
                <button name="edit" type="button" data-note-id="${data.id}"> <i class="fa fa-edit"></i> </button>
                <button name="delete" type="button" data-note-id="${data.id}"> <i class="fa fa-trash"></i> </button>
            </div>`;
    
            content.appendChild(newList);    

    });

    deleteEvent();
    editNote();
}

let editNote = () => {
    let edit = document.querySelectorAll('[name=edit]')

    edit.forEach((e) => {
        e.addEventListener('click', (e) => {
            let button = e.target
            let noteId = button.getAttribute('data-note-id')

            const data = JSON.parse(localStorage.getItem('userEntry')) ?? {};
            let notes = Object.values(data)

            let getNote = data.filter ((note) => {
                return note.id == noteId
            })[0]

            note.value = getNote.note
            note.focus()
        })            
    })



}

let deleteEvent = () => {
    let del = document.querySelectorAll('[name=delete]')

    del.forEach(function(e){
        e.addEventListener('click', (e) => {
            let button = e.target
            let noteId = button.getAttribute('data-note-id')

            //get notes from data storage
            const data = JSON.parse(localStorage.getItem('userEntry')) ?? {};
            let notes = Object.values(data)

            // notes.map((data, index) => {

            //     if(data.id == noteId){
            //         notes.splice(index, 1);
            //         localStorage.setItem("userEntry", JSON.stringify(notes));
            //         buildNotes();
            //     }
            // })

            notes = notes.filter((data) => {
                return data.id != noteId
            });

            localStorage.setItem("userEntry", JSON.stringify(notes));
            buildNotes();


            console.log(notes)

            // console.log(noteId)
        });
    })
}

// build notes once page loads
buildNotes();

// setInterval(() => {
//     buildNotes();

//     // console.log('Notes listener Fired!')

// }, 1000);