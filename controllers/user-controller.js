const id = require('shortid');
const bc = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const { Admin, Lecturer, Student, Examiner, Course } = require('../models/');
const examiner = require('../models/examiner');




const auth = async (req, res, next) => {
    const { username, password } = req.body;
     const admin = await Admin.findAll({ where: { staffId: username } }); 
    const lecturer = await Lecturer.findAll({include: [{model: Course, as: 'course' }], where: { lecturerId: username, password: password } });
    const student = await Student.findAll({ where: { studentId: username, password: password } });
    const examiner = await Examiner.findAll({ where: { examinerId: username, password: password } });

    try {
          
        if (admin.length <= 0 && examiner.length <= 0 && lecturer.length <= 0 && student.length <= 0) {
                return await res.status(401).json({
                    msg: 'Invalid username or password',
                    statusCode: 401
                })
        }
        

        if (examiner.length > 0) {
                
                    const token = jwt.sign({
                        examinerId: examiner[0].examinerId,
                        password: examiner[0].password
                    }, 'secrete',
                        {
                            expiresIn: 3600
                        }
                    );
                    return await res.status(200).json({
                        msg: 'success',
                        user: examiner,
                        token: token,
                        expiresIn: 3600
                    })
            }
                
        
        else if (admin.length > 0) {
            bc.compare(password, admin[0].password, async (err, result) => {
                if (err) {
                    return await res.status(401).json({
                        msg: 'Invalid username or password',
                        statusCode: 401
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        staffId: admin[0].staffId,
                        password: admin[0].password
                    }, 'secrete',
                        {
                            expiresIn: 3600
                        }
                    );
                    await res.status(200).json({
                        msg: 'success',
                        user: admin,
                        token: token,
                        expiresIn: 3600
                    })
                }
            })
        }
       else if (student.length > 0) {
                    const token = jwt.sign({
                        studentId: student[0].studentId,
                        password: student[0].password
                    }, 'secrete',
                        {
                            expiresIn: 3600
                        }
                    );
                    return await res.status(200).json({
                        msg: 'success',
                        user: student,
                        token: token,
                        expiresIn: 3600
                    })
        }
         
       else if (lecturer.length > 0) {
                    const token = jwt.sign({
                        lecturerId: lecturer[0].lecturerId,
                        password: lecturer[0].password
                    }, 'secrete',
                        {
                            expiresIn: 3600
                        }
                    );
                    return await res.status(200).json({
                        msg: 'success',
                        user: lecturer,
                        token: token,
                        expiresIn: 3600
                    })
        }
        else {
            return await res.status(401).json({
                    msg: 'Invalid username or password',
                    statusCode: 401
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

const amend = async (req, res) => {
    const { id } = req.params;
    const {phoneNumber, email, password } = req.body;
     const admin = await Admin.findByPk(id); 
    const lecturer = await Lecturer.findByPk(id);
    const student = await Student.findByPk(id);
    const examiner = await Examiner.findByPk(id);

    
    try {
         if (!admin && !examiner  && !lecturer && !student) {
                return await res.status(404).json({
                    msg: 'Record Not Found',
                    statusCode: 404
                })
        }
        if (admin) {
            bc.hash(password, 10, async(err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: {
                            msg: 'Server Error',
                            statusCode: 500
                        }
                    })
                } else {
                    await Admin.update({ email, phoneNumber, password: hash }, { where: { staffId: id } })
                    return await res.status(201).json({
                        msg: 'success',
                        statusCode: 201
                    })
                }
            })
        }
        if (examiner) {
            bc.hash(password, 10, async(err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: {
                            msg: 'Server Error',
                            statusCode: 500
                        }
                    })
                } else {
                    await Examiner.update({ email, phoneNumber, password: hash }, { where: { examinerId: id } })
                    return await res.status(201).json({
                        msg: 'success',
                        statusCode: 201
                    })
                }
            })
        }
        if (lecturer) {
            bc.hash(password, 10, async(err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: {
                            msg: 'Server Error',
                            statusCode: 500
                        }
                    })
                } else {
                    await Lecturer.update({ email, phoneNumber, password: hash }, { where: { lecturerId: id } })
                    return await res.status(201).json({
                        msg: 'success',
                        statusCode: 201
                    })
                }
            })
        }
        if (student) {
            bc.hash(password, 10, async(err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: {
                            msg: 'Server Error',
                            statusCode: 500
                        }
                    })
                } else {
                    await Student.update({ email, phoneNumber, password: hash }, { where: { studentId: id } })
                    return await res.status(201).json({
                        msg: 'success',
                        statusCode: 201
                    })
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: {
                msg: 'Server Error'+ error,
                statusCode: 500
            }
        })
    }
}



module.exports = { auth, amend }


