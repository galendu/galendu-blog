---
title: 导航
date: 2024-02-26 22:28:41
type: "navigation"
toc: true
widgets:
---
<!-- <div>
  <a button  class="button is-primary" href="https://github.com/timqian/chinese-independent-blogs">chinese-independent-blogs</button>
  <a  button  class="button is-primary" href="https://scholar.google.com/">google学术</button>
  <a button  class="button is-info" href="https://github.com/timqian/chinese-independent-blogs">chinese-independent-blogs</button>
</div> -->


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Verification</title>
<style>
    body {
        font-family: Arial, sans-serif;
        text-align: center;
    }
    input[type="password"] {
        padding: 10px;
        margin: 10px;
    }
    button {
        padding: 10px 20px;
        margin: 10px;
        cursor: pointer;
    }
</style>
</head>
<body>
<h2>Password Verification</h2>
<input type="password" id="password" placeholder="Enter password">
<button onclick="verifyPassword()">Verify Password</button>
<p id="message"></p>

<script>
    function verifyPassword() {
        var password = document.getElementById("password").value;
        // 这里可以自定义你的密码验证逻辑
        if (password === "MyPassword") {
window.location.href = "51.html";
            // document.getElementById("message").innerHTML = "Password is correct!";
        } else {
            document.getElementById("message").innerHTML = "Incorrect password. Please try again.";
        }
    }
</script>
</body>
</html>
