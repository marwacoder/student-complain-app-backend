const id = require('shortid');
const { validationResult } = require('express-validator');
const { Course, Admin, Lecturer } = require('../models/');




const create = async (req, res) => {
    const { courseCode, courseTitle, adminId } = req.body;
    const findById = await Course.findAll({where: {courseCode: courseCode}});
    //const adminsId = await Admin.findByPk(adminId)
    const errors = validationResult(req);

    try {

       if (findById.length >0) {
            return await res.status(409).json({
                error: {

                    msg: 'Record Already Exist',
                    statusCode: 4099
                }
            })
        }
            await Course.create({
                courseId: id(),
                courseCode,
                courseTitle,
                adminId
            })
            return await res.status(201).json({
                msg: 'success',
                statusCode: 201
            })
        
    }catch (error) {
        if (error) {
            return res.status(500).json({
                error: {
                    msg: 'Server Error'+ error,
                    statusCode: 500
                }
            })
        }
    }
}





const index = async(req, res) => {
    const getAllRegistered = await Course.findAll();
    

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
    const findById = await Course.findByPk(id);

    try {
        
        if (findById) {
            return await res.status(200).json({
                courses: findById,
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

    const updateById = await Course.findByPk(id);
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
        await Course.update({
          ...req.body
        },{ where: { courseId: id } }) 
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
    const destroyById = await Course.findByPk(id);

    try {
        
        if (!destroyById) {
            return await res.status(404).json({
                error: {
                    msg: 'Record Not Found',
                    statusCode: 404
              }
          })   
        }
        await Course.destroy({ where: { courseId: id } }) 
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