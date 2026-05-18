<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login - Vikas Store</title>

<style>
body{
margin:0;
font-family:Arial, sans-serif;
background:linear-gradient(135deg,#1e3c72,#2a5298);
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}

.auth-container{
background:white;
width:400px;
padding:40px;
border-radius:12px;
box-shadow:0 10px 30px rgba(0,0,0,0.3);
}

.auth-container h2{
text-align:center;
margin-bottom:25px;
}

.input-group{
margin-bottom:15px;
}

.input-group input{
width:100%;
padding:12px;
border:1px solid #ccc;
border-radius:6px;
font-size:14px;
}

.auth-btn{
width:100%;
padding:12px;
background:#ff9900;
border:none;
color:white;
font-weight:bold;
border-radius:6px;
cursor:pointer;
transition:0.3s;
}

.auth-btn:hover{
background:#e68a00;
}

.toggle{
text-align:center;
margin-top:15px;
cursor:pointer;
color:#2a5298;
font-weight:bold;
}

.error{
color:red;
font-size:13px;
margin-top:5px;
text-align:center;
}

.loading{
opacity:0.7;
pointer-events:none;
}

@media(max-width:500px){
.auth-container{
width:90%;
}
}
</style>
</head>

<body>

<div class="auth-container">
<h2 id="formTitle">Login</h2>

<div id="nameField" class="input-group" style="display:none;">
<input type="text" id="name" placeholder="Full Name">
</div>

<div id="phoneField" class="input-group" style="display:none;">
<input type="text" id="phone" placeholder="Phone Number">
</div>

<div id="addressField" class="input-group" style="display:none;">
<input type="text" id="address" placeholder="Address">
</div>

<div class="input-group">
<input type="email" id="email" placeholder="Email">
</div>

<div class="input-group">
<input type="password" id="password" placeholder="Password">
</div>

<button class="auth-btn" onclick="handleAuth()" id="authButton">
Login
</button>

<div class="error" id="errorMsg"></div>

<div class="toggle" onclick="toggleForm()" id="toggleText">
Don't have an account? Register
</div>

</div>

<script>

let isLogin=true;

function toggleForm(){
isLogin=!isLogin;

document.getElementById("formTitle").innerText=isLogin?"Login":"Register";
document.getElementById("authButton").innerText=isLogin?"Login":"Register";
document.getElementById("toggleText").innerText=isLogin?
"Don't have an account? Register":
"Already have an account? Login";

document.getElementById("nameField").style.display=isLogin?"none":"block";
document.getElementById("phoneField").style.display=isLogin?"none":"block";
document.getElementById("addressField").style.display=isLogin?"none":"block";
}

async function handleAuth(){

const button=document.getElementById("authButton");
button.classList.add("loading");
button.innerText="Please wait...";

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;
const name=document.getElementById("name").value;
const phone=document.getElementById("phone").value;
const address=document.getElementById("address").value;

if(!email || !password){
showError("Email and Password required");
resetButton();
return;
}

try{

let url=isLogin?
"http://localhost:5000/api/auth/login":
"http://localhost:5000/api/auth/register";

let body=isLogin?
{email,password}:
{name,email,password,phone,address};

const res=await fetch(url,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(body)
});

const data=await res.json();

if(!res.ok){
showError(data.message || "Something went wrong");
resetButton();
return;
}

if(isLogin){
localStorage.setItem("token",data.token);
localStorage.setItem("user",JSON.stringify(data.user));
window.location.href="profile.html";
}else{
alert("Registration Successful! Please Login.");
toggleForm();
}

}catch(err){
showError("Server error. Is backend running?");
}

resetButton();
}

function showError(msg){
document.getElementById("errorMsg").innerText=msg;
}

function resetButton(){
const button=document.getElementById("authButton");
button.classList.remove("loading");
button.innerText=isLogin?"Login":"Register";
}

</script>

</body>
</html>