<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.*" %>

<%
if (session.getAttribute("admin") == null) {
    response.sendRedirect("login.jsp");
    return;  // 🔥 IMPORTANT
}
%>

<html>
<head>
<link rel="stylesheet" href="style.css">
</head>

<body>

<div class="container">
<h1>All Registrations</h1>

<table border="1" cellpadding="10">
<tr>
<th>Name</th>
<th>Email</th>
<th>Event</th>
<th>Action</th>
</tr>

<%
List<String[]> list = (List<String[]>) session.getAttribute("data");

if (list != null && !list.isEmpty()) {
    for (int i = 0; i < list.size(); i++) {
        String[] row = list.get(i);
%>

<tr>
<td><%= row[0] %></td>
<td><%= row[1] %></td>
<td><%= row[2] %></td>
<td>
    <a href="delete.jsp?index=<%= i %>">Delete</a>
</td>
</tr>

<%
    }
} else {
%>
<tr>
<td colspan="4">No registrations yet</td>
</tr>
<%
}
%>

</table>

<br>

<a href="index.jsp">
    <button>Add New</button>
</a>

</div>

</body>
</html>