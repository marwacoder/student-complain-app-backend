const bc = require('bcrypt');
const { validationResult } = require('express-validator');
const { Student, StudentToExaminer } = require('../models/');




const create = async (req, res) => {
    const {  studentId, name, email, gender, password, confirmPassword, level, phoneNumber, role } = req.body;
    const findByUsername = await Student.findByPk(studentId);
    const errors = validationResult(req);
        try {
           
            if (findByUsername) {
             
                return await res.status(409).json({
                    error: {
                        msg: 'Username Already Exist',
                        statusCode: 409
                    }
                })
            }
            await bc.hash(password, 10, async(err, hash) => {
                if (err) {
                    return res.status(500).json({
                    error: {
                    msg: 'Server Error',
                    statusCode: 500
                }
            })
                } 
       await Student.create({
            studentId,
            name,
            gender,
            email,
           phoneNumber,
            level,
            password: hash,
            role
       })
            return  await res.status(201).json({
                msg: 'success',
                statusCode: 201
        })
                
        

             })  
            
        
            
    }catch (error) {
        if (error) {
            return res.status(500).json({
                error: {
                    msg: 'Server Error' + error,
                    statusCode: 500
                }
            })
        }
    }
}


const index = async(req, res) => {
    const getAllRegistered = await Student.findAll({include:[{model: StudentToExaminer, as: 'mails'}]});

    try {
        if (getAllRegistered) {
            
            return res.status(200).json({
                courses: getAllRegistered,
                msg: 'success',
                statusCode: 200
            })
        }

        
    }
    catch (error) {
        if (error) {
            return res.status(500).json({
            error: {
                    msg: 'Server Error',
                statusCode: 500
            }
           }) 
        }
    }
}

const show = async (req, res) => {
    const { id } = req.params;
    const findById = await Student.findByPk(id);

    try {
        
        if (findById) {
            return await res.status(200).json({
                profile: findById,
                msg: 'success',
                statusCode: 200
            })
        }
        return await res.status(404).json({
            error: {
                msg: 'Record Not Found',
                statusCode: 404
            }
        })


    }
    catch (error) {
        if (error) {
            return res.status(500).json({
                msg: 'Server Error',
                statusCode: 500
            })
        }
    }

}


const amend = async (req, res) => {
    const { id } = req.params;

    const updateById = await Student.findByPk(id);
    const errors = validationResult(req);
    try {
        if (!updateById) {
            return await res.status(404).json({
                error: {
                    message: 'Record Not Found',
                    statusCode: 404
              }
          })   
        }
        await Student.update({...req.body},{ where: { studentId: id } }) 
            return await res.status(201).json({
                msg: 'success',
                statusCode: 201
            })

    }
    catch (error) {
        if (error) {
            return res.status(500).json({
                msg: 'Server Error' + error,
                statusCode: 500
            })
        }
    }

}

const destroy = async(req, res)=>{
    const { id } = req.params;
    const destroyById = await Student.findByPk(id);

    try {
        
        if (!destroyById) {
            return await res.status(404).json({
                error: {
                    msg: 'Record Not Found',
                    statusCode: 404
              }
          })   
        }
        await Student.destroy({ where: { studentId: id } }) 
            return await res.status(201).json({
                message: 'success',
                statusCode: 201
            })

    }
    catch (error) {
        if (error) {
            return res.status(500).json({
                msg: 'Server Error',
                statusCode: 500
            })
        }
        
    }

}




module.exports = {create, index, show, amend, destroy }