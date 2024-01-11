export const RegEx = {
    only__number__regEx: /^[0-9]/,
    alphanumeric__without__spaces: /^[a-zA-Z0-9\-_]{0,40}$/,
    name__regEx: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]\s*)*$/,
    email__regEx: /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    phone__regEx: /^[6-9][0-9]{9}$/,
    gst__regEx : /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,  
    NoSpace : /^\S*$/,
    password : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?~\-])/,
    notEmpty : /^(?!\s*$).+/,
    length6:/^.{6,}$/,
    length19:/^.{20,}$/,  
    // url:/^(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))$/å
  };