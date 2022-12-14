import {
    GET_LIST_PRODUCT_FAILURE,
    GET_LIST_PRODUCT_REQUEST,
    GET_LIST_PRODUCT_SUCCESS,
    GET_FILTER_PRODUCT_FAILURE,
    GET_FILTER_PRODUCT_REQUEST,
    GET_FILTER_PRODUCT_SUCCESS,
    GET_DETAIL_PRODUCT_FAILURE,
    GET_DETAIL_PRODUCT_REQUEST,
    GET_DETAIL_PRODUCT_SUCCESS,
    FILTER_PRODUCT_BY_NAME,
    FILTER_PRODUCT_BY_PRICE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCESS
} from '../constants/productConstants';

export interface productInfo {
    _id?: string;
    name: string;
    image: string;
    desc: string;
    price: number;
    rate: number;
    country: string;
    category?: string;
}

export interface productState {
    productInfo?: Array<productInfo>;
    isFetching?: boolean;
    error?: boolean;
}

interface filterProductInfo {
    products?: Array<productInfo>;
    pageNumber?: number;
    pages?: number;
    totalProducts?: number;
}

export interface filterProductState {
    filterProductInfo?: filterProductInfo;
    isFetching?: boolean;
    error?: boolean;
}

export interface detailProductState {
    productInfo?: productInfo;
    isFetching?: boolean;
    error?: boolean;
}

export interface searchTextName {
    textName: string;
}

const searchTextNameValue: searchTextName = {
    textName: ''
};

interface Action {
    type: string;
    payload: string;
}

export const listProductReducer = (state: productInfo, action: Action) => {
    switch (action.type) {
        case GET_LIST_PRODUCT_REQUEST:
            return {
                isFetching: true,
                error: false
            };
        case GET_LIST_PRODUCT_SUCCESS:
            return {
                productInfo: action.payload,
                isFetching: false,
                error: false
            };
        case GET_LIST_PRODUCT_FAILURE:
            return {
                isFetching: false,
                error: true
            };
        default:
            return { ...state };
    }
};

export const listFilterProductReducer = (state: filterProductInfo, action: Action) => {
    switch (action.type) {
        case GET_FILTER_PRODUCT_REQUEST:
            return {
                isFetching: true,
                error: false
            };
        case GET_FILTER_PRODUCT_SUCCESS:
            return {
                filterProductInfo: action.payload,
                isFetching: false,
                error: false
            };
        case GET_FILTER_PRODUCT_FAILURE:
            return {
                isFetching: false,
                error: true
            };
        default:
            return { ...state };
    }
};

export const detailProductReducer = (state: detailProductState, action: Action) => {
    switch (action.type) {
        case GET_DETAIL_PRODUCT_REQUEST:
            return {
                isFetching: true,
                error: false
            };
        case GET_DETAIL_PRODUCT_SUCCESS:
            return {
                productInfo: action.payload,
                isFetching: false,
                error: false
            };
        case GET_DETAIL_PRODUCT_FAILURE:
            return {
                isFetching: false,
                error: true
            };
        default:
            return { ...state };
    }
};

export const filterProductBynameReducer = (state: searchTextName = searchTextNameValue, action: Action) => {
    switch (action.type) {
        case FILTER_PRODUCT_BY_NAME:
            return { textName: action.payload };
        default:
            return { ...state };
    }
};

export const filterProductByPriceReducer = (state: any, action: Action) => {
    switch (action.type) {
        case FILTER_PRODUCT_BY_PRICE:
            return { price: action.payload };
        default:
            return { ...state };
    }
};
