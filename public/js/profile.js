const logOut = document.getElementById('logOut');
const modifyAccount = document.getElementById('modifyAccount');
const displayNameHolder = document.getElementById('displayNameHolder');
const photoHolder = document.getElementById('photoHolder');

const auth = firebase.auth();

logOut.addEventListener('click', () => {
    //signOut() is a built in firebase function responsible for signing a user out
    auth.signOut()
    .then(() => {
        window.location.assign('../');
    })
    .catch(error => {
        console.error(error);
    })
})

auth.onAuthStateChanged(user => {
    console.log(user);
    displayNameHolder.innerText = user.displayName ;
    //photoHolder.setAttribute('src' , user.photoURL);

})

//Go to modification page
modifyAccount.addEventListener('click', () => {
    window.location.assign('../edit');
});
