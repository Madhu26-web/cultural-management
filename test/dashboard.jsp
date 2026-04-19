<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.*" %>

<%
String user = request.getParameter("username");
String pass = request.getParameter("password");

// simple login check
if (user != null && pass != null) {
    if (user.equals("admin") && pass.equals("tce123")) {
        session.setAttribute("admin", "true");
    } else {
        out.println("<h3>Invalid Login</h3>");
        return;
    }
}

// check if already logged in
if (session.getAttribute("admin") == null) {
    response.sendRedirect("login.jsp");
}
%>

<html>
<head>
<link rel="stylesheet" href="style.css">
</head>

<body>

<div class="container">
    <h1>Dashboard</h1>

<%
List<String[]> list = (List<String[]>) session.getAttribute("data");
int count = (list == null) ? 0 : list.size();
%>

    <p><b>Total Registrations:</b> <%= count %></p>

    <a href="view.jsp"><button>View All</button></a>
    <a href="logout.jsp"><button>Logout</button></a>
</div>

</body>
</html>