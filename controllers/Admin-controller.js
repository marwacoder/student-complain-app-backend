const bc = require('bcrypt');
const { validationResult } = require('express-validator');
const { Admin } = require('../models/');




const create = async (req, res) => {
    const {  staffId, name, email, gender, password, confirmPassword, phoneNumber, role } = req.body;
    const findByUsername = await Admin.findByPk(staffId);
    const errors = validationResult(req);
        try {
           
         if (!findByUsername) {
            await bc.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                    error: {
                    msg: 'Server Error' + err,
                    statusCode: 500
                }
            })
                } else {
        Admin.create({
            staffId,
            name,
            gender,
            email,
            phoneNumber,
            password: hash,
           role,
       })
            return res.status(201).json({
                msg: 'success',
                statusCode: 201
        })
                }
        

             })  
            
        }
        
             else return await res.status(409).json({
            error: {
                msg: 'Username Already Exist',
                statusCode: 409
            }
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
    const getAllRegistered = await Admin.findAll();

    try {
        if (getAllRegistered) {
            
            return res.status(200).json({
                users: getAllRegistered,
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
    const findById = await Admin.findByPk(id);

    try {
        
        if (findById) {
            return await res.status(200).json({
                user: findById,
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

    const updateById = await Admin.findByPk(id);
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
        await Admin.update({
          ...req.body
        },{ where: { staffId: id } }) 
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
    const destroyById = await Admin.findByPk(id);

    try {
        
        if (!destroyById) {
            return await res.status(404).json({
                error: {
                    msg: 'Record Not Found',
                    statusCode: 404
              }
          })   
        }
        await Admin.destroy({ where: { staffId: id } }) 
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