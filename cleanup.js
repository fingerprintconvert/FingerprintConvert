const fs = require("fs-extra");

exports.removeFiles = async (...files)=>{

    for(const file of files){

        try{

            if(file){

                await fs.remove(file);

            }

        }catch(err){

            console.log(err.message);

        }

    }

};