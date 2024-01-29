"use client";
import { createSlice, current } from "@reduxjs/toolkit"
const cartSlice = createSlice({
    name: "Cart",
    initialState: JSON.parse(localStorage.getItem("product")) || [] || [{
        id: 0,
        product: "iPhone 9",
        price:
            549,
        category:
            "smartphones",
        description:
            "An apple mobile which is nothing like apple",
        thumbnail:
            "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        stock:
            94,
        brand:
            "Apple"
    }] ,
    reducers: {
        add: (state, action) => {
            state.push(action.payload)
            let product = JSON.stringify(current(state))

            localStorage.setItem("product", product)

        },
        addproduct: (state, action) => {
            //const data = {name : action.payload}

            state.push(action.payload)
            let product = JSON.stringify(current(state))

            localStorage.setItem("product", product)
        },




        remove: (state, action) => {

console.log(action.payload)
           /* const data = state.filter((item) => {


                return item.id !== action.payload
            });*/
            const index = state.findIndex((item)=>{
                return  item.id == action.payload
            })
            const data = state.splice(index,1)


            state = data
            console.log(data)
            
            localStorage.setItem("product", state)
        }
    }
})

export const { add, remove, addproduct } = cartSlice.actions;
export default cartSlice.reducer;