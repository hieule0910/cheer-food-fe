import { Container, Box, Avatar, Typography, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addressState, userState } from '../../redux/reducers/userReducer';
import { RootState } from '../../redux/store';
import { PageHeader } from '../../shared';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// yup
import * as yup from 'yup';

import { PrimaryButton } from '../../shared/';
import { addAddress, getAddress } from '../../redux/actions/userActions';
import { AddressInfo } from 'net';

interface IFormInputs {
    username: string;
    street: string;
    town: string;
    district: string;
    province: string;
    phone: number;
}

interface addressType {
    street: any;
    town: any;
    district: any;
    province: any;
    phoneNumber: number;
}

const schema = yup.object({
    username: yup.string().required('This field is required'),
    street: yup.string().required('This field is required'),
    town: yup.string().required('This field is required'),
    district: yup.string().required('This field is required'),
    province: yup.string().required('This field is required'),
    phone: yup.string().required('This field is required')
});

const ProfileUser = () => {
    const dispatch = useDispatch();

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null;
    const addressUser = useSelector<RootState, addressState>((state) => state.userAddress);
    const { address } = addressUser;
    const addressInfo = address[0];

    useEffect(() => {
        dispatch(getAddress());
    }, []);

    const initValue: addressType = {
        district: addressInfo?.district || '',
        town: addressInfo.town || '',
        street: addressInfo.street || '',
        province: addressInfo.province || '',
        phoneNumber: addressInfo.phoneNumber || 0
    };
    const [userAddress, setUserAddress] = useState(initValue);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const onHandleSubmit: SubmitHandler<IFormInputs> = (data: any) => {
        console.log(data);

        dispatch(addAddress(userInfo._id, data.username, data.phone, data.street, data.town, data.district, data.province));
    };

    return (
        <>
            <Container>
                <PageHeader />

                <Box
                    sx={{
                        marginTop: '80px',
                        display: 'flex',
                        gap: '16px',
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: {
                                xs: 'center',
                                md: 'none'
                            }
                        }}
                    >
                        <Box
                            sx={{
                                width: '250px',
                                height: '250px'
                            }}
                        >
                            <Avatar
                                src={userInfo?.avatar}
                                sx={{
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                padding: '16px 0'
                            }}
                        >
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{
                                    fontWeight: '500'
                                }}
                            >
                                {userInfo?.username}
                            </Typography>
                            <Typography variant="subtitle1" component="p">
                                {userInfo?.email}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flex: '1'
                        }}
                    >
                        <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col items-center justify-start gap-7">
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    width: '80%'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        component="span"
                                        sx={{
                                            minWidth: '100px'
                                        }}
                                    >
                                        Username
                                    </Typography>

                                    <TextField
                                        hiddenLabel
                                        id="username"
                                        defaultValue={userInfo?.username}
                                        size="small"
                                        sx={{
                                            width: '50%'
                                        }}
                                        {...register('username')}
                                    />
                                </Box>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{
                                        color: 'red'
                                    }}
                                >
                                    {errors.username?.message}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '16px',
                                    width: '80%'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: {
                                            xs: 'flex-start',
                                            md: 'center'
                                        },
                                        gap: '16px',
                                        flexDirection: {
                                            xs: 'column',
                                            md: 'row'
                                        },
                                        width: '100%'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                component="span"
                                                sx={{
                                                    minWidth: '100px'
                                                }}
                                            >
                                                Street
                                            </Typography>

                                            <TextField
                                                hiddenLabel
                                                id="street"
                                                size="small"
                                                defaultValue={userAddress?.street}
                                                sx={{
                                                    width: '50%'
                                                }}
                                                {...register('street')}
                                            />
                                        </Box>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{
                                                color: 'red'
                                            }}
                                        >
                                            {errors.street?.message}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                component="span"
                                                sx={{
                                                    minWidth: '100px'
                                                }}
                                            >
                                                Town
                                            </Typography>

                                            <TextField
                                                hiddenLabel
                                                id="town"
                                                size="small"
                                                defaultValue={userAddress?.town}
                                                sx={{
                                                    width: '50%'
                                                }}
                                                {...register('town')}
                                            />
                                        </Box>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{
                                                color: 'red'
                                            }}
                                        >
                                            {errors.town?.message}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: {
                                            xs: 'flex-start',
                                            md: 'center'
                                        },
                                        gap: '16px',
                                        flexDirection: {
                                            xs: 'column',
                                            md: 'row'
                                        },
                                        width: '100%'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                component="span"
                                                sx={{
                                                    minWidth: '100px'
                                                }}
                                            >
                                                District
                                            </Typography>

                                            <TextField
                                                hiddenLabel
                                                id="district"
                                                size="small"
                                                defaultValue={userAddress?.district}
                                                sx={{
                                                    width: '50%'
                                                }}
                                                {...register('district')}
                                            />
                                        </Box>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{
                                                color: 'red'
                                            }}
                                        >
                                            {errors.district?.message}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                component="span"
                                                sx={{
                                                    minWidth: '100px'
                                                }}
                                            >
                                                Province
                                            </Typography>

                                            <TextField
                                                hiddenLabel
                                                id="province"
                                                size="small"
                                                defaultValue={userAddress?.province}
                                                sx={{
                                                    width: '50%'
                                                }}
                                                {...register('province')}
                                            />
                                        </Box>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{
                                                color: 'red'
                                            }}
                                        >
                                            {errors.province?.message}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    gap: '16px',
                                    width: '80%'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        component="span"
                                        sx={{
                                            minWidth: '100px'
                                        }}
                                    >
                                        Phone
                                    </Typography>

                                    <TextField
                                        hiddenLabel
                                        id="phone"
                                        size="small"
                                        defaultValue={userAddress?.phoneNumber}
                                        sx={{
                                            width: '50%'
                                        }}
                                        {...register('phone')}
                                    />
                                </Box>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{
                                        color: 'red'
                                    }}
                                >
                                    {errors.phone?.message}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    width: '80%',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <PrimaryButton
                                    border="1px solid #111"
                                    bgcolor="#fff"
                                    color="#111"
                                    height="50px"
                                    onClick={() => {
                                        handleSubmit;
                                    }}
                                    radius="16px"
                                    width="100px"
                                >
                                    Save
                                </PrimaryButton>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default ProfileUser;
