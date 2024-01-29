
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
    fetchAllProducts,
    fetchProductsByFilters,
    fetchBrands,
    fetchCategories,
    fetchProductById,
    fetchBrandsByFilters,
    createProduct,
    updateProduct,
    fetchCarouselProducts,
    deleteProductBYId
} from './productApi';

const initialState = {
    products: [],
    carouselproduct: [],
    brands: [],
    categories: [],
    status: 'idle',
    updatestatus: false,
    totalItems: 0,
    totalProducts: 0,
    selectedProduct: null,
    Buy: null
};

export const fetchProductByIdAsync = createAsyncThunk(
    "product/fetchProductById", async (id) => {

        const response = await fetchProductById(id);
        return response.data
    }
)

export const fetchAllProductAsync = createAsyncThunk(
    "product/fetchAllProducts", async () => {
        const response = await fetchAllProducts();
        return response.data
    }
)

export const fetchCarouselProductAsync = createAsyncThunk(
    "product/fetchCarouselProducts", async () => {
        const response = await fetchCarouselProducts();
        return response.data
    }
)




export const fetchProductsByFiltersAsync = createAsyncThunk(
    "product/fetchProductsByFilters", async (categoryfilter, { sort, pagination, admin }) => {
        const response = await fetchProductsByFilters(categoryfilter, sort, pagination, admin)
        return response.data
    }
)


export const fetchBrandByFiltersAsync = createAsyncThunk(
    "product/fetchBrandsByFilters", async (orderfilter, { sort, pagination, admin }) => {
        const response = await fetchBrandsByFilters(orderfilter, sort, pagination, admin)
        return response.data
    }
)

export const fetchBrandsAsync = createAsyncThunk(
    "product/fetchBrands", async (data) => {
        const response = await fetchBrands()
        return response.data
    }

)

export const fetchCategoriesAsync = createAsyncThunk(
    "product/fetchCategories", async (data) => {
        const response = await fetchCategories()
        return response.data
    }
)

export const createProductAsync = createAsyncThunk(
    "product/create", async (product) => {
        const response = await createProduct(product);
        return response.data
    }
)

export const updateProductAsync = createAsyncThunk(
    "product/update", async (update) => {
        const response = await updateProduct(update);
        return response.data
    }
)



export const deleteProductBYIdAsync = createAsyncThunk(
    'product/deleteProductBYId',
    async (itemId) => {
        const response = await deleteProductBYId(itemId);
        return response.data;
        // The value we return becomes the `fulfilled` action payload
    }
);


const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null
        },
        addsort: (state, action) => {
            state.products = action.payload
            state.totalItems = action.payload
        },
        addpage: (state, action) => {
            state.products = action.payload
            state.totalItems = +action.payload.data.totaldoc
        },
        addtotalItems: (state, action) => {
            state.totalProducts = action.payload
        },
        addToBuy: (state, action) => {
            state.Buy = action.payload
            const data = JSON.stringify(action.payload.data)
            localStorage.setItem("buy", data)
        },
        removeBuy: (state, action) => {
            localStorage.removeItem("buy")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByFiltersAsync.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
                state.status = "idel",
                    state.products = action.payload.products
                state.totalItems = action.payload.totalItems
            })
            .addCase(fetchBrandByFiltersAsync.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchBrandByFiltersAsync.fulfilled, (state, action) => {
                state.status = "idel",
                    state.products = action.payload.products
                state.totalItems = +action.payload.totalItems
            })
            .addCase(fetchAllProductAsync.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
                state.status = "idel",
                    state.products = action.payload.products.data.product
                state.products.push(action.payload.products.data.product)
                state.totalItems = +action.payload.products.data.totaldoc
            })
            .addCase(fetchCarouselProductAsync.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchCarouselProductAsync.fulfilled, (state, action) => {
                state.status = "idel",
                    state.carouselproduct = action.payload.carouselproducts.data.product
                state.carouselproduct.push(action.payload.carouselproducts.data.product)
                state.totalItems = +action.payload.carouselproducts.data.totaldoc
            })
            .addCase(fetchBrandsAsync.pending, async (state, action) => {

                state.status = "loading"
            })
            .addCase(fetchBrandsAsync.fulfilled, async (state, action) => {
                state.status = "idel",
                    state.brands.push(action.payload)
            })
            .addCase(fetchCategoriesAsync.pending, async (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchCategoriesAsync.fulfilled, async (state, action) => {
                state.status = "idel"
                state.categories = action.payload
            })
            .addCase(fetchProductByIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
                state.status = "idel",
                    state.selectedProduct = action.payload
            })
            .addCase(createProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createProductAsync.fulfilled, (state, action) => {
                state.status = "idel",
                    state.products.push(action.payload);
            })
            .addCase(updateProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.products.findIndex(
                    (product) => product.id === action.payload.id
                );
                state.products[index] = action.payload;
                state.selectedProduct = action.payload;
                state.updatestatus = true

            })
            .addCase(deleteProductBYIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProductBYIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.products.findIndex((product) => product.id == action.payload.id);
                state.products.splice(index, 1);
            })
    }
})



export const { clearSelectedProduct } = ProductSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectCarouselProducts = (state) => state.product.carouselproduct;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;
export const selectupdatestatus = (state) => state.product.updatestatus;
export const selectTotalProductsNo = (state) => state.product.totalProducts
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBuyItems = (state) => state.product.Buy;
export const { addsort, addpage, addtotalItems, addToBuy, removeBuy } = ProductSlice.actions
export default ProductSlice.reducer;