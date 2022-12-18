function auth(){
    var email=document.getElementById("email").value;
    var password=document.getElementById("loginpassword").value;
    var pswrepeat=document.getElementById("password").value;
    if(email=="admin.@gmail.com"&&password=="admin123")
    {
      window.location.assign("calc.html");
      alert("login successfully");
    }
    else
    {
      alert("invalid information");
      return;
    }
}
