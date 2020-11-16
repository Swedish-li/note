import React, { FC } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const ErrorMsg: FC = props => (
    <>
        {props.children ? (
            <div
                style={{
                    color: 'red',
                    width: '20%',
                    marginLeft: '0.8em',
                    wordBreak: 'keep-all',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            >
                {props.children}
            </div>
        ) : (
            ''
        )}
    </>
)

const InputContainer: FC = props => (
    <div
        style={{
            display: 'flex',
            margin: '0.5em',
            height: '1.3em',
            width: '80%'
        }}
    >
        {props.children}
    </div>
)

const Container: FC = props => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        }}
    >
        {props.children}
    </div>
)

const Label: FC = props => (
    <label
        style={{
            display: 'inline-block',
            width: '30%',
            textAlign: 'right',
            padding: 'auto 5px'
        }}
    >
        {props.children}
        {':'}
    </label>
)

export const Basic = () => (
    <Container>
        <h3>My App</h3>
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors: Partial<typeof values> = {}

                if (!values.email) {
                    errors.email = 'Required!'
                } else if (!EMAIL_REGEX.test(values.email)) {
                    errors.email = 'Invalid email address'
                }

                return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values)
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    setSubmitting(false)
                })
            }}
        >
            {({ isSubmitting, errors, touched }) => {
                const baseInputStyles = {
                    width: '40%',
                    marginLeft: '0.8em'
                }

                const getInputStatus = (touched: boolean, error: string) => {
                    if (!touched) {
                        return 'black'
                    }
                    if (error) {
                        return 'red'
                    } else {
                        return 'green'
                    }
                }
                const statusEmailStyles = {
                    borderColor: getInputStatus(touched.email, errors.email)
                }

                const statusPasswordStyles = {
                    borderColor: getInputStatus(
                        touched.password,
                        errors.password
                    )
                }

                return (
                    <Form noValidate style={{ width: '100%' }}>
                        <InputContainer>
                            <Label>Email</Label>
                            <Field
                                type="email"
                                name="email"
                                style={{
                                    ...baseInputStyles,
                                    ...statusEmailStyles
                                }}
                            />
                            <ErrorMessage name="email" component={ErrorMsg} />
                        </InputContainer>
                        <InputContainer>
                            <Label>Password</Label>
                            <Field
                                type="password"
                                name="password"
                                style={{
                                    ...baseInputStyles,
                                    ...statusPasswordStyles
                                }}
                            />
                            <ErrorMessage
                                name="password"
                                component={ErrorMsg}
                            />
                        </InputContainer>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '80%'
                            }}
                        >
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{ alignSelf: 'center' }}
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    </Container>
)
