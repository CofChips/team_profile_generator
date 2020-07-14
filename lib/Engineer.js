// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Engineer extends Employee{
    constructor(name,id,email,github){
        super(name,id,email);
        this.github = github;
        this.getGithub = function (){
            return this.github;
        }
    }
}

Engineer.prototype.getRole = function() {return "Engineer"};

// function Engineer(github) {
//     this.github = github;
//     this.getGithub = function () {
//         return this.github;
//     }
//     this.getRole = "Engineer"
// }

// Engineer.prototype = new Employee();

// Engineer.github = this.github;


module.exports = Engineer;