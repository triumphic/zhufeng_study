var Student = /** @class */ (function () {
    function Student(firstName, middelInitial, lastName) {
        this.firstName = firstName;
        this.middelInitial = middelInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middelInitial + "  " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello," + person.firstName + " " + person.lastName + "性别：";
}
var user = new Student('Jane', 'M', 'User');
console.log(user);
document.body.innerHTML = greeter(user);
