const mailField = document.getElementById('mail');
const passwordField = document.getElementById('password');
const displayNameField = document.getElementById('displayName');
const photoField = document.getElementById('photo');
const labels = document.getElementsByTagName('label');
const signUp = document.getElementById('signUp');
const failureModal = document.querySelector('.failure');
const feedbackMessage = document.querySelector('.feedbackMessage');
let state = 0;

const auth = firebase.auth();

const signUpFunction = () => {
    const email = mailField.value;
    const password = passwordField.value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
        //console.log('Signed Up Successfully !');
        state = 1;
        window.location.assign('../profile');     
    })
    .catch(error => {
        //console.error(error);
        showErrorModal(error.message);
    })
}

const sendVerificationEmail = () => {
   
    auth.currentUser.sendEmailVerification()
    .then(() => {
        console.log('Verification Email Sent Successfully !');
        
        window.location.assign('../profile');
    })
    .catch(error => {
        console.error(error);
    })
}

signUp.addEventListener('click', signUpFunction);

auth.onAuthStateChanged(user => {
    if(user && (state === 0))
        window.location.assign('../profile');
})

const showErrorModal = errorMessage => {
    failureModal.style.display = 'flex' ;
    feedbackMessage.innerText = errorMessage ;
    setTimeout (() => {
        failureModal.style.display = 'none' ;
    }, 1300)
}

mailField.addEventListener('focus', () => {
    labels.item(0).className = "focused-field";
});

passwordField.addEventListener('focus', () => {
    labels.item(1).className = "focused-field";
});

mailField.addEventListener('blur', () => {
    if(!mailField.value)
        labels.item(0).className = "unfocused-field";
});

passwordField.addEventListener('blur', () => {
    if(!passwordField.value)
        labels.item(1).className = "unfocused-field";
});