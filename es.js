// let str = 'insert into products values '
// for(let i=0;i<10;i++){
//     str += ` (${i}, "name${i}","desc${i}", 10${1}, 100, "img${i}"), `
// }
// str = str.substring(0, str.length-2)
// console.log(str);


// function deepCopy(obj) {
//     // Serialize the object to JSON and then parse it

    // return JSON.parse(JSON.stringify(obj));
// }



// const a =  {p1:3,arr:[90],arrr:[9],f(){
//     console.log("object");
// }}
// console.log(a);
// let b={p1,arr,arrr,f} = a;
// console.log(p1,arr,arrr,f);
// console.log(b);

function f(){
    console.log(arguments);
}

f(0,1,2,3,4,5,6,7,8,9,"Mayank");


// // // // Example usage
// // // const originalObject = {
// // //     key1: 'value1',
// // //     key2: [1, 2, 3],
// // //     key3: {
// // //         subkey1: 'subvalue1',
// // //         subkey2: [4, 5, 6],
// // //     },
// // //     key4: function () {
// // //         console.log('Function inside the object.');
// // //     },
// // // };

// // // const copiedObject = deepCopy(originalObject);

// // // // Check if deep copy works
// // // console.log(copiedObject);

// // // // Modify the original object to see if the copied object is affected
// // // originalObject.key1 = 'modifiedValue1';
// // // originalObject.key2[0] = 999;
// // // originalObject.key3.subkey1 = 'modifiedSubvalue1';
// // // originalObject.key4 = function () {
// // //     console.log('Modified function inside the object.');
// // // };

// // // // Check the original and copied objects
// // // console.log(originalObject);
// // // console.log(copiedObject);
// // function deepCopy(obj, memo = new WeakMap()) {
// //     if (obj === null || typeof obj !== 'object') {
// //         return obj;
// //     }

// //     // If the object is already in the memo, return the stored copy
// //     if (memo.has(obj)) {
// //         return memo.get(obj);
// //     }

// //     // Handle arrays
// //     if (Array.isArray(obj)) {
// //         const arrCopy = [];
// //         memo.set(obj, arrCopy);

// //         obj.forEach((item, index) => {
// //             arrCopy[index] = deepCopy(item, memo);
// //         });

// //         return arrCopy;
// //     }

// //     // Handle objects
// //     const objCopy = {};
// //     memo.set(obj, objCopy);

// //     for (let key in obj) {
// //         if (obj.hasOwnProperty(key)) {
// //             objCopy[key] = deepCopy(obj[key], memo);
// //         }
// //     }

// //     return objCopy;
// // }

// // // Example usage
// // const originalObject = {
// //     key1: 'value1',
// //     key2: [1, 2, 3],
// //     key3: {
// //         subkey1: 'subvalue1',
// //         subkey2: [4, 5, 6],
// //     },
// //     key4: function () {
// //         console.log('Function inside the object.');
// //     },
// // };

// // const copiedObject = deepCopy(originalObject);

// // // Check if deep copy works
// // console.log(copiedObject);

// // // Modify the original object to see if the copied object is affected
// // originalObject.key1 = 'modifiedValue1';
// // originalObject.key2[0] = 999;
// // originalObject.key3.subkey1 = 'modifiedSubvalue1';
// // originalObject.key4 = function () {
// //     console.log('Modified function inside the object.');
// // };

// // // Check the original and copied objects
// // console.log(originalObject);
// // console.log(copiedObject);
// // copiedObject.key4();
// function deepCopy(obj) {
//     const stack = [{ original: obj, copy: {} }];

//     while (stack.length > 0) {
//         const { original, copy } = stack.pop();

//         for (let key in original) {
//             if (original.hasOwnProperty(key)) {
//                 const value = original[key];

//                 if (value && typeof value === 'object') {
//                     copy[key] = Array.isArray(value) ? [] : {};
//                     stack.push({ original: value, copy: copy[key] });
//                 } else {
//                     copy[key] = value;
//                 }
//             }
//         }
//     }

//     return stack[0]?.copy;
// }

// // Example usage
// const originalObject = {
//     key1: 'value1',
//     key2: [1, 2, 3],
//     key3: {
//         subkey1: 'subvalue1',
//         subkey2: [4, 5, 6],
//     },
//     key4: function () {
//         console.log('Function inside the object.');
//     },
// };

// const copiedObject = deepCopy(originalObject);

// // Check if deep copy works
// console.log(copiedObject);

// // Modify the original object to see if the copied object is affected
// originalObject.key1 = 'modifiedValue1';
// originalObject.key2[0] = 999;
// originalObject.key3.subkey1 = 'modifiedSubvalue1';
// originalObject.key4 = function () {
//     console.log('Modified function inside the object.');
// };

// // Check the original and copied objects
// console.log(originalObject);
// console.log(copiedObject);
