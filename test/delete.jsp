<%@ page import="java.util.*" %>

<%
int index = Integer.parseInt(request.getParameter("index"));

List<String[]> list = (List<String[]>) session.getAttribute("data");

if (list != null && index >= 0 && index < list.size()) {
    list.remove(index);
}

response.sendRedirect("view.jsp");
%>