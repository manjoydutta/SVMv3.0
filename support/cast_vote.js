const user = sessionStorage.getItem("user");
const logged_in_user = document.querySelector("#voter-id");
logged_in_user.textContent = user;
document.getElementById('log-out-btn').addEventListener('click',function(){
      location.replace("../index.html");});
var vote = document.getElementById("vote-btn");
const firebaseConfig1 = {
      apiKey: "AIzaSyBEwJV2zhRCCGZgEo_39dC1dhr_Vgu45r4",
      authDomain: "voting-log.firebaseapp.com",
      databaseURL: "https://voting-log-default-rtdb.firebaseio.com",
      projectId: "voting-log",
      storageBucket: "voting-log.appspot.com",
      messagingSenderId: "84061766566",
      appId: "1:84061766566:web:0edc65e7c19340eca94567",
      measurementId: "G-5RNWGZDY34"
};
var app1 = firebase.initializeApp(firebaseConfig1, "app1");
var firebaseRef1 = app1.database();
const firebaseConfig2 = {
      apiKey: "AIzaSyB-q4d0ADpczAbACFQvvq7xGHoA_JTbsDM",
      authDomain: "vote-count-919f2.firebaseapp.com",
      databaseURL: "https://vote-count-919f2-default-rtdb.firebaseio.com",
      projectId: "vote-count-919f2",
      storageBucket: "vote-count-919f2.appspot.com",
      messagingSenderId: "97980019349",
      appId: "1:97980019349:web:4a53652dca0c7c67aaa19c",
      measurementId: "G-K13Y25BX6G"
};
var app2 = firebase.initializeApp(firebaseConfig2, "app2");
var firebaseRef2 = app2.database();
var temp,b,c;
firebaseRef1.ref('voter/'+user+"/flag").on("value", function(snapshot){
      temp = snapshot.val();
});
firebaseRef2.ref().on("value",function(snapshot){
      t = snapshot.child('tmc').val();
      b = snapshot.child('bjp').val();
      c = snapshot.child('cong').val();
});
vote.addEventListener("click", function(){
      if(temp==="F"){
            var tmc = document.getElementById("tmc");
            var bjp = document.getElementById("bjp");
            var cong = document.getElementById("cong");
            if (tmc.checked) {
                  firebaseRef2.ref().update({tmc:(t+1)});
                  var data={
                      voter:user,flag:"T"
                  }
                  firebaseRef1.ref('voter').child(""+user).update(data);
                  alert("Successfully Voted");
                  location.reload();}
            else if (bjp.checked) {
                  firebaseRef2.ref().update({bjp:(b+1)});
                  var data={
                      voter:user,flag:"T"
                  }
                  firebaseRef1.ref('voter').child(""+user).update(data);
                  alert("Successfully Voted");
                  location.reload();}
            else if (cong.checked) {                  
                  firebaseRef2.ref().update({cong:(c+1)});
                  var data={
                      voter:user,flag:"T"
                  }
                  firebaseRef1.ref('voter').child(""+user).update(data);
                  alert("Successfully Voted");
                  location.reload();}
            else {alert("No option selected. Select ONE Party to vote.");}}
      else{alert("Already Voted. Cannot vote again.");
            location.reload();}
});