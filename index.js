const { prompt } = require("inquirer");
const db = require("./db/connections");
require("console.table");

function letsStart() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "How would you like to proceed?",
      choices: [
        {
          name: "View Departments",
          value: "viewAllDepartments"
        },
        {
          name: "View Roles",
          value: "viewAllRoles"
        },
        {
          name: "View Employees",
          value: "viewAllEmployees"
        },
        {
          name: "Add Department",
          value: "addDepartment"
        },
        {
          name: "Add Role",
          value: "addRole"
        },
        {
          name: "Add Employee",
          value: "addEmployee"
        },
        {
          name: "Update An Employee Role",
          value: "updateEmployeeRole"
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    // Call the function depending on what the user chooses.
    switch (choice) {
      case "viewAllDepartments":
        viewAllDepartments();
        break;
      case "viewAllRoles":
        viewAllRoles();
        break;
      case "viewAllEmployees":
        viewAllEmployees();
        break;
      case "addDepartment":
        addDepartment();
        break;
      case "addRole":
        addRole();
        break;
      case "addEmployee":
        addEmployee();
        break;
      case "updateEmployeeRole":
        updateEmployeeRole();
        break;
    }
  }
  )
}

letsStart()
function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  letsStart();
}

function viewAllRoles() {
  db.query("SELECT * FROM role", (err, res) => {
    console.table(res);
  });
  letsStart();
}

function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err, res) => {
    console.table(res);
  });
  letsStart();
}

function addDepartment() {
  prompt([
    {
      type: "input",
      name: "choice",
      message: "What is the name of the department that you want to add?",
    },
  ]).then((res) => {
    let answer = res.choice;
    db.query(
      "INSERT INTO department (name) VALUES (?)",
      [answer],
      (err, res) => {
        if (err) throw err;
        console.table(res);
      }
    );
    letsStart();
  });
}

function addNewRole() {
  let departmentID = [];
  let departmentName = [];
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    res.forEach(({ id }) => {
      departmentID.push(id);
    });

    res.forEach(({ name }) => {
      departmentName.push(name);
    });
    addRole(departmentID, departmentName);
  });
}

function addRole(departmentID, departmentName) {
  let id = "";
  prompt([
    {
      type: "input",
      name: "roleName",
      message: "What is the role that you want to add?",
    }, 
    {
      type: "input",
      name: "salary",
      message: "What is the salary for this role?",
    },
    {
      type: "list",
      name: "departmentName",
      message: "Which department does the role belong to?",
      choices: departmentName,
    }
  ]).then((answers) => {
    for(let i = 0; i < departmentID.length; i++) {
      if (answers.departmentName === departmentName[i]) {
        id += departmentID[i];
        console.log(id);
      }
    }
    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', 
    [answers.roleName, answers.salary, parseInt(id)], (err, res) => {
      if(err) throw err;
      console.log('Role has been added')
    }
    );
  });
}  
function addEmployee() {
  let addNewRoles = [];

  db.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;

    addNewRole = res.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message:
            "Please enter the first name of the new employee you would like to add?",
        },
        {
          type: "input",
          name: "last_name",
          message:
            "Please enter the last name of the new employee you would like to add",
        },
        {
          type: "list",
          name: "role_id",
          message: "Please select the role of the new employee?",
          choices: addNewRole,
        },
        {
          type: "input",
          name: "manager",
          message: "Please enter the manager's ID",
        },
      ])
      .then((answers) => {
        db.query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [answers.first_name, answers.last_name, answers.role_id, answers.manager],
          (err, res) => {
            if (err) throw err;

            console.log('Added a new employee!');
          }
        );
      });
  });
}

function updateEmployeeRole() {
  const roleData = [];

  db.query("SELECT * FROM role", (err, result) => {
    if (err) throw err;

    const roleData = result.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });

    db.query("SELECT * FROM employee", (err, res) => {
      if (err) throw err;

      const employeeData = res.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        };
      });

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message:
              "Please select the name of the employee whose role you would like to update",
            choices: employeeData,
          },
          {
            type: "list",
            name: "role",
            message: "Please select their new role",
            choices: roleData,
          },
        ])
        .then((res) => {
          console.log(res.employee);
          console.log(res.role);
          db.query(
            "UPDATE employee SET employee.role_id = (?) WHERE employee.id = (?)",
            [res.role, res.employee],
            (err, res) => {
              if (err) throw err;

              console.log('Employee role updated');
            }
          );
        })
        });
    });
}