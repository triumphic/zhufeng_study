class Student{
    fullName: string;
    constructor(public firstName:String, public middelInitial:String , public lastName:String) {
        this.fullName = firstName + " " + middelInitial + "  " + lastName;
    }
}

interface Person {
    firstName: String;
    lastName: String;
}

function greeter(person: Person){
    return "Hello," + person.firstName + " " + person.lastName + "性别：";
}

let user = new Student('Jane', 'M', 'User')
console.log(user)

document.body.innerHTML = greeter(user)