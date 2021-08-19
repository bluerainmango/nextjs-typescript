// type strData = string

// interface Person{
//     name: strData
//     age: number
// }

class Person {
    name: string;
    age?: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
// interface functionFormat {
//     (person: {name: string, age: number}): string // 마지막 :string은 return 값의 type
// }

type functionFormat = (person: { name: string; age?: number }) => string;

//type aliases
// to describe function types
// type Person = {
//     name: string,
//     age: number
// }

export default function play() {
    console.log("hello world");

    const personObj = {
        name: "Emily",
        age: 27,
    };

    const logPersonInfo2: functionFormat = (person) => {
        const info = `name: ${person.name} age: ${person.age}`;
        console.log(info);
        return info;
    };

    // function logPersonInfo2(person: Person): string{
    // const info = `name: ${person.name} age: ${person.age}`
    // console.log(info)
    // return info
    // }

    // logPersonInfo2(personObj)
    logPersonInfo2(new Person("emily", 22));

    // let test = "implicitly defined as string"
    // test = 12

    // const names: Array<string> = ["emily", "andy"];
    const names: string[] = ["emily", "andy"];
    const numbers: Array<number> = [1, 2, 3, 4, 5];

    const random = Math.random() > 0.5 ? "Hello" : [1, 2];

    // Narrowing : type에 따라 달리 process
    // if(typeof random ==="string"){
    //     const upper = random.toUpperCase();
    // }else{
    //     console.log(random)
    // }

    // console.log(random.toUppercase())
}

// Extending interface
interface Human {
    name: string;
    age: number;
}

interface BusinessHuman extends Human {
    salary: number;
}

interface AcademicHuman extends Human {
    publications: string[];
}

type Car = {
    name: string;
};

type RaceCar = {
    speed: number;
} & Car & { mileage: number };

type CityCar = {
    space: string
} & Car

type AllCar = RaceCar | CityCar


export function printHuman() {
    const schoolGraduate: AcademicHuman = {
        name: "emily",
        age: 22,
        publications: ["haha"],
    };

    function logHuman(human: Human) { }

    // No error on more data
    logHuman(schoolGraduate);

    function logCar(car: AllCar) {
        console.log(car.name)

        // Type Casting
        console.log((car as CityCar).space)
        console.log((<CityCar>car).space)
    }

    logCar({ name: "fast car", space: "big" })


}

interface Family {
    name: string
}

interface Family {
    members: string[]
}

// How to define Obj type as param
function printInfo(someObj: object) { } // value is any type
// function printInfo(someObj: { [key: string]: any }) { } // value is any type
// function printInfo(someObj: { [key: string]: string }) { } // value is string type
// function printInfo(someObj: { [key: string]: string | number | boolean }) { } // value is string || number || boolean

printInfo({})

type Noop = () => any
type Noop2 = () => void
