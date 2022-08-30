import React, { useState } from 'react';
import { Container, Box, Typography, Rating, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { InputField } from '../../../shared';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { PrimaryButton } from '../../../shared/index';

import { dataCategoryAdmin } from '../../../utils/staticData';
import { useDispatch } from 'react-redux';
import { addNewProduct } from '../../../redux/actions/productActions';
import { useNavigate } from 'react-router-dom';

const dataInput = [
    {
        label: 'Name',
        id: 'name',
        type: 'text'
    },
    {
        label: 'Description',
        id: 'desc',
        type: 'text'
    },
    {
        label: 'Price',
        id: 'price',
        type: 'text'
    },
    {
        label: 'Country',
        id: 'country',
        type: 'text'
    },
    {
        label: 'Image',
        id: 'image',
        type: 'text'
    }
];
interface IFormInputs {
    name: string;
    desc: string;
    price: number;
    country: string;
    image: string;
}

const schema = yup.object({
    name: yup.string().required('This field is required'),
    desc: yup.string().required('This field is required'),
    price: yup.number().typeError('Price must be a number'),
    country: yup.string().required('This field is required'),
    image: yup.string().required('This field is required')
});

const AddNewProduct = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [valueRate, setValueRate] = React.useState<number | null>(4);
    const [category, setCategory] = React.useState(dataCategoryAdmin[0].categoryName);
    const [slug, setSlug] = useState('');
    const [idCategory, setIdCategory] = useState('');
    const [idProductType, setIdProductType] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setCategory(value);
        const valueSlug = value.toLocaleLowerCase();
        setSlug(valueSlug);
        switch (value) {
            case 'Best Foods':
                setIdCategory(dataCategoryAdmin[0].idCategory);
                setIdProductType(dataCategoryAdmin[0].idProductType);
                break;
            case 'Burgers':
                setIdCategory(dataCategoryAdmin[1].idCategory);
                setIdProductType(dataCategoryAdmin[1].idProductType);
                break;
            case 'Drinks':
                setIdCategory(dataCategoryAdmin[2].idCategory);
                setIdProductType(dataCategoryAdmin[2].idProductType);
                break;
            case 'Pizzas':
                setIdCategory(dataCategoryAdmin[3].idCategory);
                setIdProductType(dataCategoryAdmin[3].idProductType);
                break;
            default:
                return;
        }
    };

    const onHandleSubmit: SubmitHandler<IFormInputs> = (data: any) => {
        console.log(data);
        console.log(idCategory);
        console.log(valueRate);

        dispatch(
            addNewProduct({
                name: data.name,
                slug: slug,
                image: data.image,
                desc: data.desc,
                price: data.price,
                rate: valueRate,
                country: data.country,
                category: idCategory,
                productType: idProductType
            })
        );

        reset({
            name: '',
            desc: '',
            price: 0,
            country: '',
            image: ''
        });
    };
    return (
        <>
            <Container>
                <Typography
                    component="span"
                    variant="caption"
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '8px',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate(-1)}
                >
                    Back {''}
                    <ArrowBackIcon
                        sx={{
                            fontSize: '16px'
                        }}
                    />
                </Typography>
                <Box
                    sx={{
                        width: '50%'
                    }}
                >
                    <Typography variant="h6" component="h2">
                        Add New Product
                    </Typography>

                    <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col">
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

                        <Box
                            sx={{
                                marginBottom: '16px'
                            }}
                        >
                            <Typography component="legend">Rating</Typography>
                            <Rating
                                name="rating"
                                precision={0.5}
                                value={valueRate}
                                onChange={(event, newValue) => {
                                    setValueRate(newValue);
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                width: '30%',
                                marginBottom: '20px'
                            }}
                        >
                            <Typography component="legend">Category</Typography>
                            <Select labelId="delivery-category" id="category" value={category} onChange={handleChange} autoWidth>
                                {dataCategoryAdmin.map(({ categoryName }) => (
                                    <MenuItem value={categoryName} key={categoryName}>
                                        {categoryName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>

                        <PrimaryButton
                            border="1px solid #111"
                            bgcolor="#fff"
                            color="fff"
                            height="50px"
                            onClick={() => console.log('done')}
                            radius="16px"
                            width="30%"
                        >
                            Save
                        </PrimaryButton>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default AddNewProduct;
