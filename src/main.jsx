import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import MainLayout from './Components/Shared/MainLayout.jsx';
import Home from './Components/Homepage/Home.jsx';
import PropertiesDetails from './Components/Properties/PropertiesDetails.jsx';
import AllProperties from './Components/Properties/AllProperties.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import MyProfile from './Components/Dashboard/UserBoard/MyProfile.jsx';
import Wishlist from './Components/Dashboard/UserBoard/Wishlist.jsx';
import MakeanOffer from './Components/Dashboard/UserBoard/MakeanOffer.jsx';
import PropertyBought from './Components/Dashboard/UserBoard/PropertyBought.jsx';
import MyReviews from './Components/Dashboard/UserBoard/MyReviews.jsx';
import AddProperty from './Components/Dashboard/AgentBoard/AddProperty.jsx';
import MyAddedProperties from './Components/Dashboard/AgentBoard/MyAddedProperties.jsx';
import MySoldProperties from './Components/Dashboard/AgentBoard/MySoldProperties.jsx';
import AddReview from './Components/Dashboard/UserBoard/AddReview.jsx';
import AuthProvider from './Components/Authentication/AuthProvider.jsx';
import Login from './Components/Authentication/Login.jsx';
import Register from './Components/Authentication/Register.jsx';
import Reviews from './Components/Homepage/Reviews.jsx';
import ItemReviews from './Components/Dashboard/UserBoard/ItemReviews.jsx';
import OfferedProperties from './Components/Dashboard/AgentBoard/OfferedProperties.jsx';
import ManageProperties from './Components/Dashboard/AdminBoard/ManageProperties.jsx';
import ManageUsers from './Components/Dashboard/AdminBoard/ManageUsers.jsx';
import EditProperty from './Components/Dashboard/AgentBoard/EditProperty.jsx';
import SecretRoute from './Components/Secret/SecretRoute.jsx';
import Payment from './Components/Payment/Payment.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },{
        path:'details/:id',
        //this will be a private Route
        element:<SecretRoute><PropertiesDetails ></PropertiesDetails></SecretRoute>,

        loader:({params})=>fetch(`https://e-state-server-jh3i81lpb-md-mahrufs-projects.vercel.app/property/${params.id}`)
        
      },{
      path:'review/:title',
      element:<ItemReviews></ItemReviews>,
      // loader:({params})=>fetch(`https://e-state-server-jh3i81lpb-md-mahrufs-projects.vercel.app/review/${params.title}`)
      }
      ,
      {
        path:'allProperties',
        element:<AllProperties></AllProperties>
      },
      {
        path:'makeanoffer/:id',
        element:<MakeanOffer></MakeanOffer>,
        loader:({params})=>fetch(`https://e-state-server-jh3i81lpb-md-mahrufs-projects.vercel.app/wishlist/${params.id}`)
      }
    ]
  },{
    path:'/dashboard',
    element:<SecretRoute><Dashboard></Dashboard></SecretRoute>,
    children:[
      {
        path:'myprofile',
        element:<MyProfile></MyProfile>
      },{
        path:'wishlist',
        element:<Wishlist></Wishlist>
      },{
        path:'propertybought',
        element:<PropertyBought></PropertyBought>
      },{
        path:'myreview',
        element:<MyReviews></MyReviews>
      },
      //agent item
      {
        path:'addProperties',
        element:<AddProperty></AddProperty>
      },{
        path:'myAddedProperties',
        element:<MyAddedProperties></MyAddedProperties>
      },{
        path:'mySoldProperties',
        element:<MySoldProperties></MySoldProperties>
      },{
        path:'requestedProperties',
        element:<OfferedProperties></OfferedProperties>
      }
      //admin Item
      ,{
        path:'manageProperties',
        element:<ManageProperties></ManageProperties>
      },{
        path:'manageUsers',
        element:<ManageUsers></ManageUsers>
      }
    ]
  },{
    
        path:'/addReview/:id',
        element:<AddReview></AddReview>,
         loader:({params})=>fetch(`https://e-state-server-jh3i81lpb-md-mahrufs-projects.vercel.app/property/${params.id}`)
      
  },
  {
    path:'/login',
    element:<Login></Login>
  },{
   path:'/editProperty/:id',
   element:<EditProperty></EditProperty>,
   loader:({params})=>fetch(`https://e-state-server-jh3i81lpb-md-mahrufs-projects.vercel.app/property/${params.id}`)
  },
  {
    path:'/register',
    element:<Register></Register>
  },{
        path:'payment',
        element:<Payment></Payment>
      }
]);
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>
  
  </StrictMode>,
)
