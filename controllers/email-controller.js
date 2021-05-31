
const id = require('shortid');
const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
const { validationResult } = require('express-validator');
const { ExaminerInbox, Student, ExaminerSent,LecturerSent, LecturerInbox, Lecturer, Course } = require('../models/');
const course = require('../models/course');
const lecturersent = require('../models/lecturersent');





const auth = {
    auth: {
        api_key: '3ea092999822cfcdf3458b981f391914-9a235412-f955065d',
        domain: 'sandboxb6cdab014309409ca9d513b76023f7f6.mailgun.org'
    }
};


const transporter = nodemailer.createTransport(mailgun(auth));

const examinerInbox = async (req, res, next) => {
    const { complainType, from, to, message, status, studentId, courseId } = req.body;
    console.log(req.body)
    const mailOptions = {
    from: from,
    to: to,
    subject: complainType,
    text: message,
    }; 
    try {
        transporter.sendMail(mailOptions, async (err, data) => {
            // if (err) {
            //     return await res.status(500).json({
            //         error: {
            //             msg: 'Server Error',
            //             statusCode: 500
            //         }
            //     })
            // } 
            // if (data) {
                await ExaminerInbox.create({
                     emailId: id(),
                complainType,
                     message,
                     from,
                     to,
                     studentId,
                     courseId,
                    status,
                     date: new Date
                        })
                return await res.status(201).json({
                    msg: 'success',
                    statusCode: 201
                        })
            //}
            
                })
    } catch (error) {
        return res.status(500).json({
            error: {
                msg: 'Server Error',
                statusCode: 500
            }
        })
    }
}

const lecturerInbox = async (req, res, next) => {
    const { complainType, from, to, message, status, studentId, courseId, lecturerId } = req.body;
    const course = await Lecturer.findAll({where:{courseId}})
    console.log(req.body)
    const mailOptions = {
    from: from,
    to: to,
    subject: complainType,
    text: message,
    }; 
    try {
        transporter.sendMail(mailOptions, async (err, data) => {
            // if (err) {
            //     return await res.status(500).json({
            //         error: {
            //             msg: 'Server Error',
            //             statusCode: 500
            //         }
            //     })
            // } 
            // if (data) {
            if (course) {
                await LecturerInbox.create({
                    emailId: id(),
                    complainType,
                    message,
                    from,
                    to,
                    studentId,
                    courseId,
                    lecturerId,
                    status,
                    date: new Date
                })
                return await res.status(201).json({
                    msg: 'success',
                    statusCode: 201
                })
            }
            return await res.status(404).json({
                error: {
                    msg: 'Course Not Assign To Lecturer'
                }
            })
            //}
            
                })
    } catch (error) {
        return res.status(500).json({
            error: {
                msg: 'Server Error',
                statusCode: 500
            }
        })
    }
}

const getExaminerInbox = async(req, res) => {

    const inbox = await ExaminerInbox.findAll({include: {model: Student, as: 'student'}});

    try {
        if (inbox) {
            return await res.status(200).json({
                msg: 'success',
                inbox
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            error: {
                msg: 'Server Error',
                statusCode: 500
            }
        })
    }
    
}


const getLecturerInbox = async (req, res) => {
    const { id } = req.params;

    const inbox = await LecturerInbox.findAll({include: [{model: Student, as: 'student'},{model: Course, as: 'course'}],where:{lecturerId: id}});

    try {
        if (inbox) {
            return await res.status(200).json({
                msg: 'success',
                inbox
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            error: {
                msg: 'Server Error',
                statusCode: 500
            }
        })
    }
    
}

const examinerSent = async (req, res, next) => {
    const { comment, from, to, status, studentId, studentEmailId, complainType } = req.body;
    
    const mailOptions = {
    from: from,
    to: to,
    subject: complainType,
    text: comment,
    }; 
    try {
        console.log(req.body)
        //transporter.sendMail(mailOptions, async (err, data) => {
            // if (err) {
            //     return await res.status(500).json({
            //         error: {
            //             msg: 'Error Occur'
            //         }
            //     })
            // } else { 

            await ExaminerSent.create({
                emailId: id(),
                comment,
                from,
                to,
                studentId,
                studentEmailId,
                status,
                date: new Date
            });
          await  ExaminerInbox.update({
                status: status
            },
                {
                    where: {
                        emailId: studentEmailId
                    }
                }
            )
            return await res.status(201).json({
                msg: 'success',
                statusCode: 201
            //})
       // }
                })
    } catch (error) {
        return res.status(500).json({
            error: {
                msg: 'Server Error' + error,
                statusCode: 500
            }
        })
    }
}


const lecturerSent = async (req, res, next) => {
    const { comment, from, to, status, studentId, studentEmailId, complainType } = req.body;
    
    const mailOptions = {
    from: from,
    to: to,
    subject: complainType,
    text: comment,
    }; 
    try {
        console.log(req.body)
        //transporter.sendMail(mailOptions, async (err, data) => {
            // if (err) {
            //     return await res.status(500).json({
            //         error: {
            //             msg: 'Error Occur'
            //         }
            //     })
            // } else { 

            await LecturerSent.create({
                emailId: id(),
                comment,
                from,
                to,
                studentId,
                studentEmailId,
                status,
                date: new Date
            });
          await  ExaminerInbox.update({
                status: status
            },
                {
                    where: {
                        emailId: studentEmailId
                    }
                }
            )
            return await res.status(201).json({
                msg: 'success',
                statusCode: 201
            //})
       // }
                })
    } catch (error) {
        return res.status(500).json({
            error: {
                msg: 'Server Error' + error,
                statusCode: 500
            }
        })
    }
}



const index = async(req, res) => {
    const mails = await ExaminerInbox.findAll({include:[{model: Student, as: 'students'}]});
    try {
        if (mails) {
            return await res.status(200).json({
                msg: 'success',
                mails,
                statusCode: 200
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            error: {
                msg: 'Server Error',
                statusCode: 500
            }
        })
    }
}

const show1 = async (req, res) => {
    const { id } = req.params;
    const findById = await ExaminerSent.findAll({where: {studentId: id}});

    try {
        
        if (findById) {
            return await res.status(200).json({
                mails: findById,     
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


const show2 = async (req, res) => {
    const { id } = req.params;
    const findById = await LecturerSent.findAll({where: {studentId: id}});

    try {
        
        if (findById) {
            return await res.status(200).json({
                mails: findById,
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

const show3 = async (req, res) => {
    const findById = await ExaminerInbox.findAll();

    try {
        
        if (findById) {
            return await res.status(200).json({
                mails: findById,     
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


const show4 = async (req, res) => {
    const findById = await LecturerInbox.findAll();

    try {
        
        if (findById) {
            return await res.status(200).json({
                mails: findById,
                msg: 'success',
                statusCode: 200,
                total: findById.length
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



const destroyExaminerOrLecturerInbox = async (req, res) => {
    
    const { id } = req.params;
    console.log(req.params)
    const examinerMail = await ExaminerInbox.findByPk(id);
    const lecturerMail = await LecturerInbox.findByPk(id);
    try {
        if (!examinerMail && !lecturerMail) {
            return await res.status(404).json({
                error: {
                    msg: 'Record Not Found',
                    statusCode: 404
                }
            })
        }
        if (examinerMail) {
            await ExaminerInbox.destroy({ where: { emailId: id } })
            return await res.status(201).json({
                msg: 'success',
                statusCode: 201
            })
        } 
        if (lecturerMail) {
            await LecturerInbox.destroy({ where: { emailId: id } })
            return await res.status(201).json({
                msg: 'success',
                statusCode: 201
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            error: {
                msg: 'Server Error' ,
                statusCode: 500
            }
        })
        
    }
}



const destroyExaminerOrLecturerSent = async (req, res) => {
    
    const { id } = req.params;
    console.log(req.params)
    const examinerMail = await ExaminerSent.findByPk(id);
    const lecturerMail = await LecturerSent.findByPk(id);
    try {
        if (!examinerMail && !lecturerMail) {
            return await res.status(404).json({
                error: {
                    msg: 'Record Not Found',
                    statusCode: 404
                }
            })
        }
        if (examinerMail) {
            await ExaminerSent.destroy({ where: { emailId: id } })
            return await res.status(201).json({
                msg: 'success',
                statusCode: 201
            })
        } 
        if (lecturerMail) {
            await LecturerSent.destroy({ where: { emailId: id } })
            return await res.status(201).json({
                msg: 'success',
                statusCode: 201
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            error: {
                msg: 'Server Error',
                statusCode: 500
            }
        })
        
    }
}

module.exports = {
    index, destroyExaminerOrLecturerSent, show1,show2, show3,show4, examinerInbox,
    examinerSent, lecturerInbox, lecturerSent, destroyExaminerOrLecturerInbox,
    getLecturerInbox, getExaminerInbox
};