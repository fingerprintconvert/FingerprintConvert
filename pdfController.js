const fs = require("fs-extra");
const path = require("path");
const { PDFDocument } = require("pdf-lib");
const { v4: uuidv4 } = require("uuid");

exports.processPDF = async (req, res) => {

    try{

        if(!req.file){

            return res.status(400).json({

                success:false,

                message:"No PDF uploaded."

            });

        }

        const inputFile = req.file.path;

        const outputFile = path.join(

            "output",

            uuidv4() + ".pdf"

        );

        const bytes = await fs.readFile(inputFile);

        const pdf = await PDFDocument.load(bytes);

        const output = await pdf.save();

        await fs.writeFile(outputFile, output);

        res.download(outputFile, ()=>{

            fs.remove(inputFile);

            fs.remove(outputFile);

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            success:false,

            message:"PDF processing failed."

        });

    }

};