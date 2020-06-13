function registrar(){
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;

    firebase.auth().createUserWithEmailAndPassword(email, contrasena).then(function(){
        verificar()
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });

      
}


function ingreso(){
    var email2 = document.getElementById('email2').value;
    var contrasena2 = document.getElementById('contrasena2').value;

    firebase.auth().signInWithEmailAndPassword(email2, contrasena2).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
        // ...
      });
}

function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('Exite usuario')
          aparece(user);
          var displayName = user.displayName;
          var email = user.email;
          console.log('**********************');
          console.log(user.emailVerified)
          console.log('**********************');
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          console.log('No extiste este usuario')
            contenido.innerHTML= `
             <div class="container mt-5">
         <div class="alert alert-warning" role="alert">
             No has iniciado session.
        </div>
    <div>
    `;


        }
      });
}
observador();

function aparece(user){
    var user = user;
    var contenido = document.getElementById('contenido');
    if(user.emailVerified){
    contenido.innerHTML= `
    <div class="container mt-5">
    <div class="alert alert-success" role="alert">
     <h4 class="alert-heading">Bienvenido!! ${user.email}</h4>
    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
     <hr>
     <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>

    
    <button onclick="cerrar()" class="btn btn-danger">Cerrar Sesion</button>
    <div>
    `;
    }
}

function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        console.log('Saliendo..')
    })
    .catch(function(error){
        console.log(error)
    })
}


function verificar(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
    // Email sent.
    console.log('enviando correo..');
    }).catch(function(error) {
    // An error happened.
    console.log(error);
    });
} 