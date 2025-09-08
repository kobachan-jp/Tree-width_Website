function sayHello(firstname) {
    console.log('Hello ' + firstname);
}
var firstname = 'Takuya';
sayHello(firstname);
var Direction;
(function (Direction) {
    Direction["Up"] = "UP";
    Direction["Down"] = "DOWN";
    Direction["Left"] = "LEFT";
    Direction["Right"] = "RIGHT";
})(Direction || (Direction = {}));
var value = 'DOWN';
var enumValue = value;
if (enumValue == Direction.Down) {
    console.log('Down is selected.');
}
var Queue = /** @class */ (function () {
    function Queue() {
        this.array = [];
    }
    Queue.prototype.push = function (item) {
        this.array.push(item);
    };
    Queue.prototype.pop = function () {
        return this.array.shift();
    };
    return Queue;
}());
var queue = new Queue();
queue.push(111);
queue.push(112);
//ueue.push('hoge')
var str = queue.pop();
console.log(str);
function printId(id) {
    console.log(id);
}
printId(11);
printId('12');
var id = {
    id: '111',
    name: 'Takuya'
};
var contanct = {
    name: 'Takuya',
    email: 'test@example.com',
    phone: '012345678'
};
var employee = {
    id: '111',
    name: 'Takuya',
    email: 'test@example.com',
    phone: '012345678'
};
/*
const employeeContact : Employee = {
    name:'Takuya',
    email : 'test@example.com',
    phone : '012345678'
}
*/
var postStatus;
postStatus = 'draft';
//postStatus = 'drafts'
function compare(a, b) {
    return a === b ? 0 : a > b ? 1 : -1;
}
console.log(compare('b', 'a'));
//2025-08-26 pp.58
function error(message) {
    throw new Error(message);
}
function foo(x) {
    if (typeof x === 'string') {
        return true;
    }
    else if (typeof x === 'number') {
        return false;
    }
    return error('Never happens');
}
var PageType;
(function (PageType) {
    PageType[PageType["ViewProfile"] = 0] = "ViewProfile";
    PageType[PageType["EditProfile"] = 1] = "EditProfile";
    PageType[PageType["ChangePassword"] = 2] = "ChangePassword";
})(PageType || (PageType = {}));
var getTitleText = function (type) {
    switch (type) {
        case PageType.ViewProfile:
            return 'Setting';
        case PageType.EditProfile:
            return 'Edit Profile';
        case PageType.ChangePassword:
            return 'Change Password';
        default:
            var wrongType = type;
            throw new Error("".concat(wrongType, " is not in Pagetype"));
    }
};
console.log(getTitleText(PageType.ViewProfile)); // => Setting
console.log(getTitleText(PageType.EditProfile)); // => Edit Profile
console.log(getTitleText(PageType.ChangePassword)); // => Change Password
function getProperty(obj, key) {
    return obj[key];
}
var user = {
    name: 'Takuya',
    age: 36,
    email: 'test@example.com'
};
var userName = getProperty(user, 'name');
console.log(userName);
//const userGender = getProperty(user, 'gender')
