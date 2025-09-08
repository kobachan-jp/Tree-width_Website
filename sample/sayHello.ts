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

//2025-08-26 pp.58
function error(message: string): never{
    throw new Error(message)
}

function foo(x:string | number | number[]): boolean{
    if(typeof x === 'string'){
        return true
    }else if (typeof x === 'number'){
        return false 
    }
    return error('Never happens')
}

enum PageType{
    ViewProfile,
    EditProfile,
    ChangePassword,
}

const getTitleText = (type : PageType) => {
    switch (type) {
        case PageType.ViewProfile:
            return 'Setting'
        case PageType.EditProfile:
            return 'Edit Profile'
        case PageType.ChangePassword:
            return 'Change Password'
        default:
            const wrongType: never = type
            throw new Error(`${wrongType} is not in Pagetype`)
    }
}

console.log(getTitleText(PageType.ViewProfile));   // => Setting
console.log(getTitleText(PageType.EditProfile));   // => Edit Profile
console.log(getTitleText(PageType.ChangePassword)); // => Change Password

//2025-08-28 pp.59
/*interface User{
    name : string
    social?:{
        facebook: boolean
        twitter: boolean
    }
}

let user : User
user = {name : 'Takuya',social:{facebook:true, twitter:true}}
console.log(user.social?.facebook)

user={name:'takuya'}
console.log(user.social?.facebook)

//2025-08-29
function addOne(value : number | string){
    if ( typeof value === 'string'){
        return Number(value)+1
    }
    return value+1
}
console.log(addOne(10))
console.log(addOne('20'))

type User = {
    info? :{
        name: string;
        age: number;
    }
}

let response = {}
const user = (response as any) as User
if ( user.info){
    console.log(user.info.name)
}
*/
interface User {
    name: string;
    age: number;
    email:string;
}

type UserKey = keyof User
function getProperty<T, K extends keyof T>(obj:T, key:K):T[K]{
    return obj[key]
}

const user : User={
    name: 'Takuya',
    age: 36,
    email: 'test@example.com'
}

const userName = getProperty(user,'name')
console.log(userName)
//const userGender = getProperty(user, 'gender')


