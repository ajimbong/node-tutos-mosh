const path = require('path')
const os = require('os')

const freeMem = os.freemem()
const totalMem = os.totalmem()

function logFileInfo(){
    console.log(path.parse(__filename))
    console.log(`The total free memory is ${freeMem} out or ${totalMem}`)
}

module.exports = {logFileInfo}