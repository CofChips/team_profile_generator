// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

// function Engineer(github) {
//     this.github = github;
//     this.getGithub = function () {
//         return this.github;
//     }
//     this.getRole = "Engineer"
// }

Engineer.prototype = new Employee();

Engineer.github = this.github;


module.exports = Engineer;