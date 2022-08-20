DROP DATABASE IF EXISTS employeesdb;
CREATE DATABASE employeesdb;

USE employeesdb;

-- table1
CREATE TABLE department
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

-- table2
CREATE TABLE role
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    departmentid INT,
    FOREIGN KEY (departmentid)
    REFERENCES department(id)
);

-- table3
CREATE TABLE employee
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30),
    lastname VARCHAR(30),
    roleid INT,
    FOREIGN KEY (roleid)
    REFERENCES role(id),
    managerid INT NULL,
    FOREIGN KEY (managerid)
    REFERENCES employee(id) 
    ON DELETE CASCADE
); 