import React, { useEffect } from 'react';
import { InputField, PrimaryButton } from '../../../../shared';
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button';
import axios from '../../../../axios';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthButton } from '../../../../shared';
// yup
import * as yup from 'yup';

import { Box, CircularProgress, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { userState } from '../../../../redux/reducers/userReducer';
import { login } from '../../../../redux/actions/userActions';
import { createCart, getCart } from '../../../../redux/actions/cartActions';
import { cartState } from '../../../../redux/reducers/cartReducer';

const dataInput = [
    {
        label: 'Email Address',
        id: 'email',
        type: 'text'
    },
    {
        label: 'Password',
        id: 'password',
        type: 'password'
    }
];

interface IFormInputs {
    email: string;
    password: string;
}

const schema = yup.object({
    email: yup
        .string()
        .required('This field is required')
        .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'This is not valid email format'),
    password: yup
        .string()
        .required('This field is required')
        .matches(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, 'Password should be 8 chars minimum and at least 1 number')
});

const SignInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector<RootState, userState>((state) => state.userLogin);
    const cartData = useSelector<RootState, cartState>((state) => state.getCart);

    const { userInfo, isFetching, error } = userLogin;
    const { cartInfo } = cartData;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const onHandleSubmit: SubmitHandler<IFormInputs> = (data: any) => {
        const { email, password } = data;
        dispatch(login(email, password));
        reset({
            email: '',
            password: ''
        });
    };

    useEffect(() => {
        if (userInfo?._id) {
            dispatch(createCart(userInfo?._id));
            navigate('/delivery');
        }
    }, [userInfo, navigate]);

    const handleLoginGG = async (googleData: any) => {
        console.log(googleData);
        const { data } = await axios({
            method: 'POST',
            url: '/auth/google',
            data: { tokenId: googleData.tokenId },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
        window.location.href = '/manage';
    };

    const handleFailureGG = (res: any) => {
        console.log(res);
    };

    return (
        <>
            {isFetching ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col mt-4 w-1/2 phone:w-full tablet:w-4/5">
                    {dataInput.map((item) => (
                        <InputField
                            register={register}
                            id={item.id}
                            name={item.id}
                            label={item.label}
                            errors={errors}
                            key={item.id}
                            type={item.type}
                        />
                    ))}

                    {error && (
                        <Typography
                            sx={{
                                color: 'red',
                                marginBottom: '8px'
                            }}
                            variant="caption"
                            component="span"
                        >
                            Email or Password are incorrect! Please try again
                        </Typography>
                    )}

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <AuthButton page="submit-signUp">Log In</AuthButton>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            marginTop: '30px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '16px'
                        }}
                    >
                        <GoogleLogin
                            clientId="435548077713-e3ucpctn2c3tes7rfg3vgi86l6lpv4sb.apps.googleusercontent.com"
                            onSuccess={handleLoginGG}
                            onFailure={handleFailureGG}
                            cookiePolicy={'single_host_origin'}
                            render={(renderProps) => <GoogleButton onClick={renderProps.onClick} />}
                        />

                        {/* <PrimaryButton
                            border="1px solid #111"
                            bgcolor="transparent"
                            height="50px"
                            onClick={() => alert('done')}
                            radius="30px"
                            width="100%"
                            color="#111"
                        >
                            Login with Facebook{''} <FacebookIcon className="!fill-fb" />
                        </PrimaryButton> */}
                    </Box>
                </form>
            )}
        </>
    );
};

export default SignInForm;
