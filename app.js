import React from './react.js'

// Currying can be used to pass props
function Input (props) {
    return function () {
        return React.createComponent(
            'input',
            props
        )
    }
}

// Example of a component using state and passing to it's children
function Form () {
    const [values, setValues] = React.useState({ email: '', password: '' })

    // Event handling functions
    function handleChange(e) {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    function handleSubmit() {
        alert(`Form info:\nemail: ${values.email}\npassword: ${values.password}`)
    }

    // Components created passing props to another function
    const EmailInput = Input({
        type: 'email',
        required: true,
        name: 'email',
        placeholder: 'Email address',
        value: values.email,
        change: handleChange,
        required: true
    })

    const PasswordInput = Input({
        type: 'password',
        name: 'password',
        placeholder: 'Password',
        value: values.password,
        change: handleChange,
        required: true
    })

    const SubmitButton = Input({
        type: 'submit',
        click: handleSubmit,
        value: 'Submit'
    })

    // Final component
    return React.createComponent(
        'form',
        {
            style: `display: flex;
                    flex-direction: column;
                    width: 300px;
                    gap: 10px`
        },
        'Example Form',
        EmailInput,
        PasswordInput,
        SubmitButton
    )
}

// Place the root component at the root div
React.render(Form, document.getElementById('root'))
