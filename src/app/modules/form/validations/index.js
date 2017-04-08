import { FORM_DATE_FORMAT } from './../constants';
import { SubmissionError } from 'redux-form';
import moment from 'moment';


export function requiredValidation(value) {
  if (!value) {
    return "FORM_VALIDATION_ERROR_REQUIRED";
  }
}

export function emailValidation(value) {
  if (!value) {
    return "FORM_VALIDATION_ERROR_REQUIRED";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return "FORM_VALIDATION_ERROR_EMAIL";
  }
}

export function passwordValidation(value) {
  if (!value) {
    return "FORM_VALIDATION_ERROR_REQUIRED";
  } else if (value.length < 8) {
    return "FORM_VALIDATION_ERROR_PASSWORD";
  }
}

export function passwordConfiramtionValidation(password, passwordConfirmation) {
  if (!passwordConfirmation) {
    return "FORM_VALIDATION_ERROR_REQUIRED";
  } else if (passwordConfirmation.length < 8) {
    return "FORM_VALIDATION_ERROR_PASSWORD";
  } else if (password !== passwordConfirmation) {
    return "FORM_VALIDATION_ERROR_PASSWORD_CONFIRMATION";
  }
}

export function numberValidation(value) {
  if (!value) {
    return "FORM_VALIDATION_ERROR_REQUIRED";
  } else if (!/^(0|[1-9][0-9]*)$/i.test(value)) {
    return "FORM_VALIDATION_ERROR_NUMBER";
  }
}

export function phoneVerificationValidation(phone) {
  return {
    code: requiredValidation(phone.code),
    verificationCode: requiredValidation(phone.verificationCode),
    number: numberValidation(phone.number),
    isVerified: !phone.isVerified
      ? "FORM_VALIDATION_ERROR_PHONE_NOT_VERIFIED"
      : false
  };
}

export function datepickerValidation(value) {
  if (!value) {
    return "FORM_VALIDATION_ERROR_REQUIRED";
  } else if (moment(value, FORM_DATE_FORMAT).format(FORM_DATE_FORMAT) === value) {
    return "FORM_VALIDATION_ERROR_DATE_FORMAT";
  }
}

export function serverValidation(errorRes) {
  if(!!errorRes.data){
    let errorObj = {};

    if( !!errorRes.data.base ){
      errorObj = {
        _error: errorRes.data.base
      }
    } else {
      errorObj = withDateValidation(errorRes.data.error);
    }

    throw new SubmissionError(errorObj);
  }
}

function withDateValidation(errors){
  if(!!errors && !!errors.birthdate){
    return Object.assign({}, errors, {
      birthdate: errors.birthdate
    })
  } else {
    return errors
  }
}