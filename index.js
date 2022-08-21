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
    addRole(departmentID, departmentName)
  });
}

function addRole(departmentID, departmentName) {
  let id = '';
  prompt([
    {
      type: 'input',
      name: 'roleName',
      message: 'What is the role that you want to add?'
    }, 
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?'
    },
    {
      type: 'list',
      name: 'departmentName',
      message: 'Which department does the role belong to?',
      choices: departmentName
    }
  ]).then((answers) => {
    for(let i=0; i<departmentID.length; i++) {
      if(answers.departmentName === departmentName[i]) {
        id += departmentID[i]
        console.log(id)
      }
    }
    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', 
    [answers.roleName, answers.salary, parseInt(id)], (err, res) => {
      if(err) throw err;
      console.log('Role has been added')
    })
  })
}  