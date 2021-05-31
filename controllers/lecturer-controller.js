const bc = require('bcrypt');
const id = require('shortid');
const { validationResult } = require('express-validator');
const { Lecturer, Course } = require('../models/');




const create = async (req, res) => {
    const {  lecturerId, name, email, gender, password, courseId, phoneNumber, role } = req.body;
    const findByUsername = await Lecturer.findByPk(lecturerId);
    const findByCourse = await Lecturer.findAll({where: courseId});
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
            if (findByCourse) {
             
                return await res.status(409).json({
                    error: {
                        msg: 'Course Already AAssigned',
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
       await Lecturer.create({
            lecturerId,
            name,
            gender,
            email,
            phoneNumber,
            password: hash,
           role,
            courseId
           
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
                    msg: 'Server Error',
                    statusCode: 500
                }
            })
        }
    }
}



const index = async(req, res) => {
    const getAllRegistered = await Lecturer.findAll({include: [{model: Course, as:'course'}]});

    try {
        if (getAllRegistered) {
            
            return res.status(200).json({
                course: getAllRegistered,
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
    const findById = await Lecturer.findByPk(id,{include: [{model: Course, as:'course'}]});

    try {
        
        if (findById) {
            return await res.status(200).json({
                lecturer: findById,
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
     const { name, gender, level, phoneNumber, email } = req.body;
    const { id } = req.params;

    const updateById = await Lecturer.findByPk(id);
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
        await Lecturer.update({
                name,
                gender,
                level,
                phoneNumber,
                email,   
        },{ where: { lecturerId: id } }) 
            return await res.status(201).json({
                msg: 'success',
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

const destroy = async(req, res)=>{
    const { id } = req.params;
    const destroyById = await Lecturer.findByPk(id);

    try {
        
        if (!destroyById) {
            return await res.status(404).json({
                error: {
                    msg: 'Record Not Found',
                    statusCode: 404
              }
          })   
        }
        await Lecturer.destroy({ where: { lecturerId: id } }) 
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