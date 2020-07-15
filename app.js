const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// This will hold the final array of objects
const employees = [];

// Beginning of prompt - assumes manager is the person generating the file
inquirer.prompt([
    {
        type: "input",
        name: "managerName",
        message: "What is your name?",
        validate: function(value){
            if(value){
                return true
            } 
            else{
                return "Please enter a name"
            }
        }
    },
    {
        type: "input",
        name: "managerId",
        message: "What is your id number?",
        validate: function(value){
            if(value){
                return true
            } 
            else{
                return "Please enter an id number"
            }
        }
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is your email?",
        validate: function(value){
            if(value.includes("@")){
                return true
            } 
            else{
                return "Please enter a valid email address"
            }
        }
    },
    {
        type: "input",
        name: "managerOffice",
        message: "What is your office number?",
        validate: function(value){
            if(value){
                return true
            } 
            else{
                return "Please enter an office number or 'none' if you do not have one"
            }
        }
    },
    {
        type: "list",
        name: "nextTeammate",
        message: "Would you like to add a teammate",
        choices: [
            "yes",
            "no, I'm finished"
        ]
    }

]).then(data => {
    // creates a manager object based on user inputs
    const newManager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOffice);
    // pushes to array
    employees.push(newManager);

    console.log("\nManager logged! \nEmployees: " + JSON.stringify(employees,null,'\t'));

    if (data.nextTeammate === "no, I'm finished") {
        fs.writeFile(outputPath, render(employees), (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("HTML file created");
            }
        });
        return
    }
    else {
        const teammate = function () {
            let stopFlag = false;
            if (stopFlag === false) {
                // checks to see what role the new teammate performs
                inquirer.prompt([
                    {
                        type: "list",
                        name: "nextTeammateRole",
                        message: "Okay, let's add a teammate. What role?",
                        choices: [
                            "Engineer",
                            "Intern"
                        ]
                    }
                ]).then(data => {
                    // inputs for engineers
                    if (data.nextTeammateRole === "Engineer") {
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "name",
                                message: "What is the employee's name?",
                                validate: function(value){
                                    if(value){
                                        return true
                                    } 
                                    else{
                                        return "Please enter a name"
                                    }
                                }
                            },
                            {
                                type: "input",
                                name: "id",
                                message: "What is the employee's id number?",
                                validate: function(value){
                                    if(value){
                                        return true
                                    } 
                                    else{
                                        return "Please enter an id"
                                    }
                                }
                            },
                            {
                                type: "input",
                                name: "email",
                                message: "What is the employee's email?",
                                validate: function(value){
                                    if(value.includes("@")){
                                        return true
                                    } 
                                    else{
                                        return "Please enter a valid email"
                                    }
                                }
                            },
                            {
                                type: "input",
                                name: "githubUsername",
                                message: "What is the employee's GitHub username?",
                                validate: function(value){
                                    if(value){
                                        return true
                                    } 
                                    else{
                                        return "Please enter a GitHub username or 'none', if applicable"
                                    }
                                }
                            },
                            {
                                type: "list",
                                name: "nextTeammate",
                                message: "Would you like to add a teammate",
                                choices: [
                                    "yes",
                                    "no, I'm finished"
                                ]
                            }]).then(data => {
                                const newEngineer = new Engineer(data.name, data.id, data.email, data.githubUsername);
                                employees.push(newEngineer);

                                console.log("\nEngineer logged! \nEmployees: " + JSON.stringify(employees,null,'\t'));

                                if (data.nextTeammate === "no, I'm finished") {
                                    stopFlag = true;
                                    fs.writeFile(outputPath, render(employees), (err) => {
                                        if (err) {
                                            console.log(err)
                                        }
                                        else {
                                            console.log("HTML file created");
                                        }
                                    });
                                    return
                                }

                                teammate();

                            })
                    }
                    else {
                        // inputs for interns
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "name",
                                message: "What is the employee's name?",
                                validate: function(value){
                                    if(value){
                                        return true
                                    } 
                                    else{
                                        return "Please enter a name"
                                    }
                                }
                            },
                            {
                                type: "input",
                                name: "id",
                                message: "What is the employee's id number?",
                                validate: function(value){
                                    if(value){
                                        return true
                                    } 
                                    else{
                                        return "Please enter an id number"
                                    }
                                }
                            },
                            {
                                type: "input",
                                name: "email",
                                message: "What is the employee's email?",
                                validate: function(value){
                                    if(value.includes("@")){
                                        return true
                                    } 
                                    else{
                                        return "Please enter a valid email"
                                    }
                                }
                            },
                            {
                                type: "input",
                                name: "school",
                                message: "What school did the employee go to?",
                                validate: function(value){
                                    if(value){
                                        return true
                                    } 
                                    else{
                                        return "Please enter a school or 'none', if applicable"
                                    }
                                }
                            },
                            {
                                type: "list",
                                name: "nextTeammate",
                                message: "Would you like to add a teammate",
                                choices: [
                                    "yes",
                                    "no, I'm finished"
                                ]
                            }]).then(data => {
                                const newIntern = new Intern(data.name, data.id, data.email, data.school);
                                employees.push(newIntern);

                                console.log("\nIntern logged! \nEmployees: " + JSON.stringify(employees,null,'\t'));

                                if (data.nextTeammate === "no, I'm finished") {
                                    stopFlag = true;
                                    fs.writeFile(outputPath, render(employees), (err) => {
                                        if (err) {
                                            console.log(err)
                                        }
                                        else {
                                            console.log("HTML file created");
                                        }
                                    });
                                    return
                                }

                                teammate();

                            })
                    }

                })
            }
        }
        teammate();
    }
})


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
