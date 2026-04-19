<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.*" %>

<%
String name = request.getParameter("name");
String email = request.getParameter("email");
String event = request.getParameter("event");

List<String[]> list = (List<String[]>) session.getAttribute("data");

if (list == null) {
    list = new ArrayList<>();
}

list.add(new String[]{name, email, event});
session.setAttribute("data", list);
%>

<html>
<head>
<link rel="stylesheet" href="style.css">
</head>

<body>
<div class="container">
    <h1>Registration Successful</h1>

    <a href="view.jsp">
        <button>View All Registrations</button>
    </a>

    <br><br>

    <a href="index.jsp">
        <button>Register Another</button>
    </a>
</div>
</body>
</html>