var selectedFile;

$( document ).ready(function() {
	document.getElementById("upload").addEventListener('change', handleFileSelect, false);
});

function handleFileSelect(event) {
	selectedFile = event.target.files[0];
};



function confirmUpload() {

	// Create a root reference
	var uploadTask = firebase.storage().ref().child('Files/' + selectedFile.name).put(selectedFile);
	
	// Pause the upload
	//uploadTask.pause();

	// Resume the upload
	//uploadTask.resume();

	// Cancel the upload
	//uploadTask.cancel();
	
	uploadTask.on('state_changed', function(snapshot){
		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log('Upload is ' + progress + '% done');
	}, 

	function(error) {
		// Handle unsuccessful uploads
	}, 

	function() {
		// Handle successful uploads on complete
  		// For instance, get the download URL: https://firebasestorage.googleapis.com/...
		  $(".area-answer")[0].before("File uploaded successfully!");
		  // Upload completed successfully, now we can get the download URL
		uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
			console.log('File available at: ', downloadURL);
		});
	});
	
}




function deleteFile() {

var x = document.getElementById("linkFileName").value;

// Create a reference to the file to delete
var desertRef = firebase.storage().ref().child('Files/'+x);

// Delete the file
desertRef.delete().then(function() {
$(".area-answer")[0].before("File deleted successfully!");
 console.log('File deleted successfully') ;
}).catch(function(error) {
  // Uh-oh, an error occurred!
});

}




function getFileURL() {

var linkfile = document.getElementById("linkFileName").value;

var fileRef = firebase.storage().ref().child('Files/'+linkfile);

// Get the download URL
fileRef.getDownloadURL().then(function(downloadURL) {
  // Insert url into an <img> tag to "download"
  $(".area-answer")[0].before('The File: ',linkfile ,' is available at: ', downloadURL);
  console.log('File available at', downloadURL);
}).catch(function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/object-not-found':
      // File doesn't exist
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;
  }
});

}




function listFiles() {
  var file_index = 1;
  var storageRef = firebase.storage().ref();
  var listRef = storageRef.child('Files');
  listRef.listAll().then(function(result){
      console.log(result);
      result.items.forEach(function(fileRef){
          fileRef.getDownloadURL().then(function(url){
              var thefile = $('<iframe/>').attr({
                  //'id' : 'fileRef.name'+ file_index,
                  'src': url,
              }).appendTo('#file-area');
  
              file_index++;
          });
      })
  }).catch(function(error){
      console.log(error);
  });
}




