// Async Javascript

const getUser = (id) => {
    // The id must be greater than 10 but less than 20
    return new Promise((resolve, reject)=>{
        if(id>10 && id<100)
            resolve(id)
        else
            reject(new Error('ID must be >10 but <100'))
    })
}

let userId;
getUser(15)
.then(id => userId = id)
.catch(err => console.log(err.message))