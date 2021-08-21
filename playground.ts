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
  space: string;
} & Car;

type AllCar = RaceCar | CityCar;

export function printHuman() {
  const schoolGraduate: AcademicHuman = {
    name: "emily",
    age: 22,
    publications: ["haha"],
  };

  function logHuman(human: Human) {}

  // No error on more data
  logHuman(schoolGraduate);

  function logCar(car: AllCar) {
    console.log(car.name);

    // Type Casting
    console.log((car as CityCar).space);
    console.log((<CityCar>car).space);
  }

  logCar({ name: "fast car", space: "big" });
}

interface Family {
  name: string;
}

interface Family {
  members: string[];
}

// How to define Obj type as param
function printInfo(someObj: object) {} // value is any type
// function printInfo(someObj: { [key: string]: any }) { } // value is any type
// function printInfo(someObj: { [key: string]: string }) { } // value is string type
// function printInfo(someObj: { [key: string]: string | number | boolean }) { } // value is string || number || boolean

printInfo({});

type Noop = () => any;
type Noop2 = () => void;

function iterate(items: Array<Car>) {
  items.forEach((item) => {
    console.log(item);
  });
}

//! Custom generic type for class
// <T> 안에 각 instance 별 다른 type를 그때마다 넣어줄 수 있다.
// T 대신 아무 문자와도 되는데 <T> 가 convention
class Logger<T> {
  log(items: T[], cb: (item: T) => void) {
    items.forEach((item) => {
      cb(item);
    });
  }
}

const logger1 = new Logger<string>();
const strings = ["hhh", "aa", "ddd"];

logger1.log(strings, (str) => {
  console.log(str);
});

const logger2 = new Logger<number>();
const numbers = [12, 421, 22];

logger2.log(numbers, (num) => {
  console.log(num);
});

//! Generic Extends
// interface는 필수로 가져야할 property(+ type)를 명시
interface AI {
  model: string;
}

// 해당 interface를 설치한 class는 꼭 interface 내 모든 property를 초기값과 함께 가지고 있어야 함
class StudentAI implements AI {
  model = ""; // 초기값 넣어줌
}

type DNA = {
  model: string;
  age: number;
};

// <T extends AI> 의미: 최소 AI 인터페이스의 property를 지닌 class를 Instance의 init 값으로 추가해라.
class Logger2<T extends AI = StudentAI> {
  log(items: T[], cb: (item: T) => void) {
    items.forEach((item) => console.log(item));
  }
}

// const loggerAI = new Logger2<StudentAI>();
const loggerAI = new Logger2();

const ais = [{ model: "st-1" }, { model: "st-2" }];

loggerAI.log(ais, (ai) => console.log(ai));

interface Life {
  name: string;
}

interface Animal extends Life {
  age: number;
}

interface Alien extends Life {
  age: number;
  magic: string;
}

type Dog<T extends Life = Life> = {
  data: T;
  breed: string;
};

function logDog(info: Dog<Alien>) {
  console.log(info.data.magic);
}

type ET<T extends any = Alien> = T extends Alien
  ? {
      age: number;
      magin: string;
      face: string;
    }
  : string;

//! Single from array
function logET(info: ET<Alien>) {
  console.log(info);
}

interface Flower {
  name: string;
}

type SingleType<T> = T extends any[] ? T[number] : T;
//의미: 입력 값(T)이 array 형태이면 array[x] 해서 el 값 반환 or 입력 값. [number] 는 index type이 num이라는 뜻.

function playSingleType() {
  type Type1 = SingleType<string[]>; // [ str1, str2... ] 에서 값 하나 반환
  type Type2 = SingleType<number[]>; // [ num1, num2... ] 에서 값 하나 반환
  type Type3 = SingleType<Flower>; // 그냥 Flower 반환
}

//! Array types 정의하기
type CustomArray<T> = {
  [index: number]: T; // array index와 single el 값 type 명시
};

function playCustomArr() {
  const items: CustomArray<string> = ["1", "2", "3"];
  const items2: CustomArray<number> = [1, 2, 3];
}

//! Object types 정의하기
type CustomObject = {
  [key: string]: string | number | CustomArray<any>;
};

type CustomObject2<T = string | number | Person> = {
  [key: string]: T;
};

function playObj() {
  const person: CustomObject = {
    name: "asd",
  };

  const person2: CustomObject2<string> = {
    name: "dd",
  };
}

//! Function types 정의하기
function logger(...args: any[]) {
  return "hello";
}

const KinaLogger: typeof logger = (name: string, age: number) => "Hi!";

const info = {
  name: "emily",
  age: 22,
};

//! Infer R
type ReturnType<T> = T extends () => infer R ? R : number;
// 의미: RreturnType< > 에 param를 가지지 않는 함수 타입이 지정되면, 해당 함수의 return과 같은 형식의 type(or property)를, 아니면 number

function logger3() {
  return {
    name: "hh",
  };
}

const loggerReturn: ReturnType<typeof logger3> = { name: "emily" };

//! keyof type
interface Keys {
  name: string;
  age: number;
}

const keyofInfo: keyof Keys = "name";

//! Multiple param
type Multiple<FP = string, SP = number, RT = string> = (
  param1: FP,
  param2: SP
) => RT;

const superLog: Multiple<string, number, string> = (name, age) => {
  return "Hello";
};

const powerLog: Multiple = (brand, age) => brand + age;

//! Promise function 을 type 화하기
type Greeting = { message: string };

// type : 프로미스를 반환하는 함수를 T인자로 받으면 그 프로미스안 result라는 이름의 data를 반환해라
type InferGetData<T> = T extends () => Promise<{ result: infer Data }>
  ? Data
  : never;

const getData = async () => {
  const greeting: Greeting = { message: "hi" };

  return {
    result: {
      greeting,
      data: {
        name: "emily",
        age: 22,
      },
    },
  };
};

// getData의 프로미스 결과값 내 result 데이터 출력 함수
// 인자로 getData의 반환값과 같은 형식의 result obj가 필요하다
function printGreeting(result: InferGetData<typeof getData>) {
  console.log(result.greeting);
}

(async () => {
  const data = await getData();
  printGreeting(data.result);
})();
