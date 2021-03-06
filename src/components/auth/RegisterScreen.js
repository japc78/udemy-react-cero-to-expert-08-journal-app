import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';

import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from '../../actions/ui'
import { startRegisterWithEmailPassword } from '../../actions/auth';
// https://www.npmjs.com/package/validator

export const RegisterScreen = () => {
    /*
        {
            name: 'Bitcero',
            email: 'dev@bitcero.com',
            password: '12345',
            password2: '12345'
        }


        //useForm

        const handleRegister = (e) {
            console.log(name, email, password1, password2);
        }
    */

   const dispatch = useDispatch();
   const { msgError } = useSelector(state => state.ui);

   const [ formValues, handleInputChange] = useForm({
        name: 'Bitcero',
        email: 'dev@bitcero.com',
        password: '123456',
        confirmPassword: '123456'
   })

    const { name, email, password, confirmPassword} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        // console.log(name, email, password, confirmPassword);
        if (isFormValid()) {
            // console.log('formulario correcto');
            dispatch(startRegisterWithEmailPassword( email, password, name));
        }
    }

    const isFormValid = () => {

        if ( validator.isEmpty(name) ) {
            // console.log('Name is required');
            dispatch(setError('Name is required'));
            return false;
        } else if (validator.isEmpty(email) || !validator.isEmail(email)){
            // console.log('Email is not valid');
            dispatch(setError('Email is not valid'));
            return false;
        } else if ( password !== confirmPassword || password.length < 5) {
            // console.log('Password should be at least 6 character and match each other');
            dispatch(setError('Password should be at least 6 character and match each other'));
            return false
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit = { handleRegister } className="animate__animated animate__fadeIn animate_faster">
                {
                    // si hay msgError
                    msgError &&
                    (<div className="auth__alert-error">
                        <strong>{ msgError }</strong>
                    </div>)
                }


                <input onChange={ handleInputChange } className="auth__input" type="text" placeholder="Name" name="name" autoComplete="off" value={ name }/>

                <input onChange={ handleInputChange } className="auth__input" type="text" placeholder="email" name="email" autoComplete="off" value={ email }/>
                <input onChange={ handleInputChange } className="auth__input" type="password" placeholder="Password" name="password" value={ password }/>
                <input onChange={ handleInputChange } className="auth__input" type="confirmPassword" placeholder="Repeat password" name="confirmPassword" value={ confirmPassword }/>

                <button className="btn btn-primary btn-block mb-5 mt-1" type="submit">Register</button>
                <Link className="link" to="/auth/login">
                    Already register
                </Link>
            </form>
        </>
    )
}
