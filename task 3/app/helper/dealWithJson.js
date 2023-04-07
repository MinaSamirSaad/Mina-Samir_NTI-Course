const fs = require('fs')

class Deal{
    static writeInJson = (filename , data = [])=>{
        fs.writeFileSync(filename, JSON.stringify(data))
    }
    static readInJson = (fileName )=>{
        let result;
        try{
            result = JSON.parse(fs.readFileSync(fileName))
            if(!Array.isArray(result)) throw new Error("not an array")
        }
        catch(e){
            result = []
        }
        return result
    }
}
module.exports = Deal