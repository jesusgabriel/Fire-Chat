var config = {
    apiKey: "AIzaSyBugCs6DhuUHK0DaFqikDs4Av8elMSuQ0Q",
    authDomain: "fire-chat-35eea.firebaseapp.com",
    databaseURL: "https://fire-chat-35eea.firebaseio.com",
    storageBucket: "fire-chat-35eea.appspot.com",
    messagingSenderId: "351839237659"
};
firebase.initializeApp(config);

var db = firebase.database();
var messegesRef = db.ref("messeges/");

function sendMessege(username) {
    messegesRef.push({
        user: username,
        messege: $("#messege-input").val()
    });
}
$(".btn-facebook").click(function() {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      $(".login-screen").fadeOut(function() {
          $("#chat-screen").fadeIn();
      });

      messegesRef.on("value", function(snapshot) {
          console.log(snapshot.val());
          $("#messages").html("");
          var values = snapshot.val();
          for (var msgId in values) {
              var msg = values[msgId];
              $("#messages").append(`
          <li><strong>${msg.user}</strong>: ${msg.messege}</li>
          `);
          }
      });
      document.addEventListener("keydown", function(e) {
          if (e.keyCode === 13){
            sendMessege(user.displayName);
            $("#messege-input").val("");
          }
      });

  }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " - " + errorMessage);
  });
});
