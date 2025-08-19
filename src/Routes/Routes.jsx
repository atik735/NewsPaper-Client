import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../components/Shared/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Register/SignUp";
import Login from "../Pages/Login/Login";
import AllArticles from "../Pages/All Articles/AllArticles";
import AddArticles from "../Pages/AddArticles/AddArticles";
import MyArticles from "../Pages/MyArticles/MyArticles";
import Dashboard from "../components/Dashboard/Dashboard";
import MyProfile from "../Pages/MyProfile/MyProfile";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";
import PrivateRoute from "./PrivateRoute";
import ArticleDetails from "../Pages/ArticlesDetails/ArticlesDetails";
import AddPublisher from "../components/Dashboard/AddPublisher";
import ManageArticles from "../components/Dashboard/ManageArticles";
import AllUsers from "../components/Dashboard/ManageUsers";
import UpdateArticle from "../Pages/UpdateArticle/UpdateArticle";
import SubscriptionPage from "../Pages/SubscriptionPage/SubscriptionPage";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../components/Dashboard/ManageUsers";
import AdminRoute from "./AdminRoute";
import ContactUs from "../components/ContactUs";
 
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allArticles",
        Component: AllArticles,
      },
      {
        path: "articles/:id",
        element:(
    <PrivateRoute>
      <ArticleDetails />
    </PrivateRoute>
        )
      },
      {
        path: "addArticles",
        element:(<PrivateRoute>
          <AddArticles />
        </PrivateRoute>)
      },
      {
        path: "myArticles",
         element:(<PrivateRoute><MyArticles /></PrivateRoute>)
      },
      {
        path:"/update-article/:id",
         element:(<PrivateRoute><UpdateArticle /></PrivateRoute>)
      },
      {
        path: "contactUs",
         element:(<ContactUs />)
      },
      {
        path: "subscription",
         element:(<PrivateRoute><SubscriptionPage /></PrivateRoute>)
      },
      {
  path: "/payment",
  element: <PrivateRoute><PaymentPage /></PrivateRoute>
},
      {
        path: "premium",
         element:<PrivateRoute><PremiumArticles /></PrivateRoute>
      },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><AdminRoute><DashboardLayout /></AdminRoute></PrivateRoute>,
    children: [
      { 
        index:true, 
        element:<PrivateRoute><Dashboard /></PrivateRoute>
      },
      { 
        path: 'manage-users', 
        element: <PrivateRoute><ManageUsers /></PrivateRoute>
      },
      { 
        path: 'manage-articles', 
        element: <PrivateRoute><ManageArticles /></PrivateRoute>
      },
      { 
        path: 'add-publisher', 
        element:<PrivateRoute><AddPublisher /></PrivateRoute>
      },
            {
        path: "myProfile",
         element:(<PrivateRoute><MyProfile /></PrivateRoute>)
      },
    ]
  },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);
