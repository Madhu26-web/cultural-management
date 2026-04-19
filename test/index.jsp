<%@ page contentType="text/html; charset=UTF-8" %>

<html>
<head>
<meta charset="UTF-8">
<title>TCE Hub</title>
<link rel="stylesheet" href="style.css">

<script>
function validateForm() {
    let email = document.forms["regForm"]["email"].value;

    if (!email.endsWith("@tce.edu")) {
        document.getElementById("error").innerText = "Use your TCE email only (example@tce.edu)";
        return false;
    }

    return true;
}
</script>

</head>

<body>

<div class="container">
    <h1>TCE Hub</h1>
    <p>College Cultural Event Management System</p>
    <hr>

    <form name="regForm" action="submit.jsp" method="post" onsubmit="return validateForm()">

        <input type="text" name="name" placeholder="Enter your name" required><br>

        <input type="email" name="email" placeholder="Enter your TCE email" required><br>
        <p id="error" class="error"></p>

        <select name="event">
            <option>Dance</option>
            <option>Music</option>
            <option>Drama</option>
            <option>Photography</option>
        </select><br>

        <button type="submit">Register</button>
    </form>
</div>

</body>
</html>