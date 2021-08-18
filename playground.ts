type Person = {
    name: string,
    age: number
}

export default function play(){
    console.log("hello world")

    const personObj = {
        name: 'Emily',
        age: 27
    }

    function logPersonInfo2(person: Person){
    const info = `name: ${person.name} age: ${person.age}`
    console.log(info)
    return info
    }

    logPersonInfo2(personObj)

    // let test = "implicitly defined as string"
    // test = 12
}