use employeesdb;

INSERT INTO department
    (name)
VALUES
    ('Marketing'),
    ('Management'),
    ('IT'),
    ('Finance');

INSERT INTO role
    (title, salary, departmentid)
VALUES
    ('Marketing Director', 50000, 1),
    ('Marketing Consulatant', 40000, 1),
    ('General Manager', 60000, 2),
    ('Supervisor', 70000, 2),
    ('Scrum Master', 55000, 3),
    ('Software Engineer', 45000, 3),
    ('Auditor', 35000, 4),
    ('Accountant', 26000, 4);

INSERT INTO employee
    (firstname, lastname, roleid, managerid)
VALUES
    ('Bader', 'Munir', 1, NULL),
    ('Rezowan', 'Malek', 2, 1),
    ('Usama', 'Arshad', 3, NULL),
    ('Jayad', 'Arshad', 4, 3),
    ('Amina', 'Hayat', 5, NULL),
    ('Aisha', 'Abdirahman', 6, 5),
    ('Razaqat', 'Ahmed', 7, NULL),
    ('Fabian', 'Sarango', 8, 7); 