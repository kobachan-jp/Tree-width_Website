function sayHello(firstname : string){
    console.log('Hello ' + firstname)
}

let firstname : string = 'Takuya'
sayHello(firstname)

enum Direction{
    Up  = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
}

const value = 'DOWN'
const enumValue = value as Direction

if(enumValue == Direction.Down){
    console.log('Down is selected.')
}

class Queue<T>{
    private array :T[] = []
    
    push(item: T) {
        this.array.push(item)
    }

    pop(): T | undefined { 
        return this.array.shift()
    }
}

const queue = new Queue<number>()
queue.push(111)
queue.push(112)
//ueue.push('hoge')

let str = queue.pop()
console.log(str)

/*
function printId(id: number | string){
    console.log(id)
}
*/


type Id = number | string

function printId(id : Id){
    console.log(id)
}

printId(11)
printId('12')

type Identify = {
    id : number | string;
    name : string;
}

type Contact = {
    name : string;
    email : string;
    phone : string;
}

type IdentifyOrContact = Identify | Contact

const id: IdentifyOrContact = {
    id : '111',
    name : 'Takuya'
}

const contanct: IdentifyOrContact = {
    name : 'Takuya',
    email : 'test@example.com',
    phone : '012345678'
}

type Employee = Identify & Contact

const employee: Employee = {
    id : '111',
    name : 'Takuya',
    email: 'test@example.com',
    phone: '012345678'
}
/*
const employeeContact : Employee = {
    name:'Takuya',
    email : 'test@example.com',
    phone : '012345678'
}
*/

let postStatus : 'draft' | 'published' | 'deleted'
postStatus = 'draft'
//postStatus = 'drafts'

function compare(a:string, b:String): -1 | 0 | 1 {
    return a===b ? 0 :a >b ? 1 :-1
}

console.log(compare('b' ,'a'))
