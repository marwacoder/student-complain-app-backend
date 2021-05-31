const { body} = require('express-validator');


const validate = (method) => {
    switch (method) {
        case 'career': {
            return [
                body('firstName', 'cannot be empty').notEmpty(),
                body('lastName', 'cannot be empty').notEmpty(),
                body('age', 'not a valid age').isNumeric().notEmpty(),
                body('phoneNumber', 'must be a valid phone Number').isMobilePhone(),
                body('email', 'must be a valid email address').isEmail(),
                body('homeAddress1', 'must not be empty').notEmpty(),
                body('homeAddress2', '').optional(),
                body('stateOfOrigin', 'cannot be empty').notEmpty(),
                body('qualification', 'must not be empty').notEmpty(),
                body('workExp', 'must not be empty').notEmpty(),
                body('interest', 'must not be empty').notEmpty() 
            ]
        }
    
            case 'donation': {
            return [
                body('donationName', 'donor name should not be empty').notEmpty(),
                body('donationContactPerson', 'donor contact address empty').notEmpty(),
                body('donationPhone', 'must be a valid phone Number').isMobilePhone(),
                body('donationPhone', 'donor phone Number should not be empty').isEmpty(),
                body('donationContact', 'must be a valid phone Number').isMobilePhone(),
                body('donationContact', 'donor phone Number should not be empty').isEmpty(),
                body('donationEmail', 'must be a valid email address').isEmail(),
                body('donationUse', 'use of donation should not be empty').notEmpty(),
                body('donationAddressOne', 'address1 should not be empty').isEmpty(),
                body('donationAddressTwo', 'address2 should not be empty').notEmpty().optional(),
                body('donationPickUp', 'pickup should not be empty').notEmpty().optional(),
                body('donationValue', 'what you want to donate should not be empty').notEmpty(),
                body('donationMessage', 'donor message should not be empty').notEmpty() 
            ]
        }
            case 'register': {
            return [
                body('username', 'must be a valid username').notEmpty(),  
                body('password').custom((value, { req }) => {
                    if (value !== req.body.confirmPassword) {
                        throw new Error('password not matched');
                    }
                    return true;
                }),
                body('role', 'must be a valid username').notEmpty(),
                

            ]
        }
            case 'id': {
            return [
                body('id', 'id must not be empty').notEmpty()
            ]
        }
    }
    
}

module.exports = { validate };