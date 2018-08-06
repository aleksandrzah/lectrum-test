export const sum = (operand1, operand2) => {
    if (typeof operand1 !== 'number') {
        throw new Error('Operand 1 should be a number.');
    } else if (typeof operand2 !== 'number') {
        throw new Error('Operand 2 should be a number.');
    }

    return operand1 + operand2;
};

export const delay = (duration = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve('success'), duration);
    });
};

export const getUniqueID = (length = 15) => {
    if (typeof length !== 'number') {
        throw new Error('The function argument should be a number!');
    }

    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const getFullApiUrl = (api, GROUP_ID) => {
    if (typeof api !== 'string' || typeof GROUP_ID !== 'string') {
        throw new Error(
            "'api' and 'GROUP_ID' arguments passed should be a string!",
        );
    }

    return `${api}/${GROUP_ID}`;
};

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getNameException = string => {
  if (string.length < 3) return "Enter at least 3 characters";

  return "";
};

export const getEmailException = email =>
    emailRegex.test(String(email).toLowerCase()) || "Enter valid email";

export const validate = (fns, value) =>
    fns.reduce((acc, item) => {
      const maybeException = item(value);

      if (typeof maybeException === 'string' && maybeException.length > 0) return [...acc, maybeException];

      return acc;
    }, []);
