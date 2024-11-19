package com.example.servlet;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

public class HelloServlet extends HttpServlet {

    // Database connection parameters
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/MyDatabase"; // Database URL
    private static final String DB_USER = "root"; // Your MySQL username
    private static final String DB_PASSWORD = "Nicolas1234@"; // Your MySQL password

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set content type
        response.setContentType("text/html");

        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>Hello, World! Data from MySQL Database:</h1>");

        try {
            // Explicitly load MySQL JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Establish connection to the database
            Connection conn = DriverManager.getConnection(JDBC_URL, DB_USER, DB_PASSWORD);

            // Create a SQL query to fetch data
            String sql = "SELECT * FROM Users";
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);

            // Display data from the result set
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String email = rs.getString("email");

                out.println("<p> ID: " + id + ", Name: " + name + ", Email: " + email + "</p>");
            }

            // Close the connection
            rs.close();
            stmt.close();
            conn.close();

        } catch (ClassNotFoundException e) {
            out.println("<p>Error: JDBC Driver not found!</p>");
            e.printStackTrace();
        } catch (SQLException e) {
            out.println("<p>Error connecting to database: " + e.getMessage() + "</p>");
            e.printStackTrace();
        }

        out.println("</body></html>");
    }
}
