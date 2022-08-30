import { Avatar, Box, FormControl, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAddress, logout } from '../../../redux/actions/userActions';
import { addressState, userState } from '../../../redux/reducers/userReducer';
import { RootState } from '../../../redux/store';
import { PrimaryButton } from '../../../shared';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CheckoutInformation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addressData = useSelector<RootState, addressState>((state) => state.userAddress);
    const userData = useSelector<RootState, userState>((state) => state.userLogin);
    const { userInfo } = userData;

    const { address } = addressData;

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        dispatch(getAddress());
    }, [dispatch]);

    return (
        <>
            <Box
                sx={{
                    flex: '1'
                }}
            >
                <Box
                    sx={{
                        marginBottom: '50px'
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h4"
                        sx={{
                            fontWeight: '600',
                            marginBottom: '16px'
                        }}
                    >
                        Contact information
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar src={userInfo?.avatar} />

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginLeft: '10px',
                                gap: '6px'
                            }}
                        >
                            <Typography
                                variant="body2"
                                component="span"
                                sx={{
                                    fontWeight: '600'
                                }}
                            >
                                {userInfo?.username}
                            </Typography>

                            <Typography
                                variant="body2"
                                component="span"
                                sx={{
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                                className="text-yellow-light"
                                onClick={() => handleLogout()}
                            >
                                Log out
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* FORM */}
                <Box>
                    <Typography
                        variant="h5"
                        component="h4"
                        sx={{
                            fontWeight: '600',
                            marginBottom: '16px'
                        }}
                    >
                        Shipping address
                    </Typography>

                    {address ? (
                        <Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        component="span"
                                        sx={{
                                            minWidth: '120px'
                                        }}
                                    >
                                        Address
                                    </Typography>
                                    <TextField
                                        hiddenLabel
                                        id="address"
                                        defaultValue={` ${address[0].street},${address[0].district},${address[0].town},${address[0].province}`}
                                        size="small"
                                        sx={{
                                            width: '70%'
                                        }}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        component="span"
                                        sx={{
                                            minWidth: '120px'
                                        }}
                                    >
                                        Numberphone
                                    </Typography>
                                    <TextField
                                        hiddenLabel
                                        id="phone"
                                        defaultValue={`(+84) ${address[0].phoneNumber}`}
                                        size="small"
                                        sx={{
                                            width: '70%'
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: '20px',
                                    paddingLeft: '12px',
                                    paddingRight: '12px'
                                }}
                            >
                                <Typography
                                    component="span"
                                    variant="caption"
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => navigate('/delivery')}
                                    className="text-yellow-light"
                                >
                                    <ArrowBackIcon
                                        sx={{
                                            fontSize: '20px'
                                        }}
                                    />
                                    {''}Back to Delivery
                                </Typography>

                                <PrimaryButton
                                    border={'none'}
                                    bgcolor={'#FFCE00'}
                                    height={'40px'}
                                    onClick={() => console.log('submit')}
                                    radius={'12px'}
                                    width={'30%'}
                                    color={'#FFF'}
                                >
                                    Checkout
                                </PrimaryButton>
                            </Box>
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h5">Please update address</Typography>
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default CheckoutInformation;
