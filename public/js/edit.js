const mailField = document.getElementById('mail');
const passwordField = document.getElementById('password');
const displayNameField = document.getElementById('displayName');
const photoField = document.getElementById('photo');

const editButton = document.getElementById('edit');
const deleteButton = document.getElementById('delete');

const auth = firebase.auth();

// print current user information so you can see the changes once done
auth.onAuthStateChanged(user => {
    console.log(user);
});

const editInformation = () => {
    const newNameAndPhoto = {
        newDisplayName: displayNameField.value,
        newPhotoURL: photoField.value
    };
    const newEmail = mailField.value;
    const newPassword = passwordField.value;
    // Holds all the information about the current signed in user
    const user = auth.currentUser;
    changeNameAndPhoto(user, newNameAndPhoto);

    // Changes the email and password if the respective fields are filled with values
    if(newPassword && newEmail) {
        const credential = createCredential(user);
        changePassword(user, credential, newPassword);
        changeEmail(user, credential, newEmail);
    }
    // only the email
    else if(newPassword) {
        const credential = createCredential(user);
        changePassword(user, credential, newPassword);
    }
    // only password
    else if(newEmail) {
        const credential = createCredential(user);
        changeEmail(user, credential, newEmail);
    }
    
}

const changeNameAndPhoto = (user, newNameAndPhoto) => {
    const {newDisplayName, newPhotoURL} = newNameAndPhoto;
    // displayName and photoURL properties
    if(newDisplayName && newPhotoURL)
        user.updateProfile({
            displayName: newDisplayName,
            photoURL: newPhotoURL
        })
        .then(() => {
            console.log('Profile updated successfully !');
        })
        .catch(error => {
            console.error(error);
        })
    // displayName only
    else if(newDisplayName)
        user.updateProfile({
            displayName: newDisplayName
        })
        .then(() => {
            console.log('DisplayName updated successfully !');
        })
        .catch(error => {
            console.error(error);
        })
    //photoURL only
    else if(newPhotoURL)
        user.updateProfile({
            photoURL: newPhotoURL
        })
        .then(() => {
            console.log('PhotoURL updated successfully !');
        })
        .catch(error => {
            console.error(error);
        })
}


const createCredential = user => {
    const password = prompt('Password:');
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );
    return credential;
}

const changePassword = (user, credential, newPassword) => {
    user.reauthenticateWithCredential(credential)
    .then(() => {
        user.updatePassword(newPassword);
        console.log('Password Updated!');
    })
    .catch(error => {
        console.error(error);
    })
}

const changeEmail = (user, credential, newEmail) => {
    user.reauthenticateWithCredential(credential)
    .then(() => {
        user.updateEmail(newEmail);
        console.log('Email Updated!');
    })
    .catch(error => {
        console.error(error);
    })
}

const deleteAccount = () => {
    const user = auth.currentUser;
    const credential = createCredential(user);
    user.reauthenticateWithCredential(credential)
    .then(() => {
        user.delete();
        console.log('Your account has been Deleted!');
    })
    .catch(error => {
        console.error(error);
    })
}

deleteButton.addEventListener('click', deleteAccount);

editButton.addEventListener('click', editInformation);
