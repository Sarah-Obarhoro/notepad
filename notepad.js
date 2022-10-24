let submit = document.querySelector('[name=login]');

//Database
const users = [
    {
        username: 'Miss Sarah',
        password: '2468'
    },
    {
        username: 'Mr. Jamie',
        password: '1234'
    }
]

//Login service
const login = (username, password) => {
    let logged = false
    users.forEach(user => {
        if (user.username == username && user.password == password ) {
            logged = user   
        }
    });

    return logged
};


//Login event
submit.addEventListener('click', function (e){
    e.preventDefault()

    const user = document.querySelector('[name=username]')
    const pass = document.querySelector('[name=password]')

    // const user = user.value
    // const password = password.value

    //verification
    if(user.value == ""){
        return alert ("Please enter a username")
        // return
    }
    else if(pass.value == ""){
        return alert ("Please enter your password")
        // return
    }

    const authenticate = login(user.value, pass.value);
    console.log(authenticate)

    if(authenticate){
        //good
        user.value = ''
        pass.value = ''

        window.location = 'note.html'
        return
    }
    else{
        //bad
    }
})


