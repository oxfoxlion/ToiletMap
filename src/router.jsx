import React from "react"
import { createHashRouter } from "react-router";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Map from "./pages/Map";

import Layout from "./layout/Layout";

export const route = createHashRouter([
    {
        path:"/",
        element: <Layout></Layout>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },{
                path:"map",
                element:<Map></Map>
            },{
                path:"search",
                element:<SearchResults></SearchResults>
            }
        ]
    }
])