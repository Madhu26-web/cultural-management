<%@ page contentType="text/html; charset=UTF-8" %>

<html>
<head>
<link rel="stylesheet" href="style.css">
</head>

<body>

<div class="container">
    <h1>Admin Login</h1>

    <form action="dashboard.jsp" method="post">
        <input type="text" name="username" placeholder="Username" required><br>
        <input type="password" name="password" placeholder="Password" required><br>

        <button type="submit">Login</button>
    </form>
</div>

</body>
</html>