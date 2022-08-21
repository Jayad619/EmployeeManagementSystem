const { prompt } = require("inquirer");

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