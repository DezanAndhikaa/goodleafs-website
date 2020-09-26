/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Copyright 2020 Codingin (https://www.codingin.id)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Codingin

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Description from "@material-ui/icons/Description";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import LocalShipping from "@material-ui/icons/LocalShipping";
import Notifications from "@material-ui/icons/Notifications";
import BarChart from "@material-ui/icons/BarChart";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Report from "views/Report/Reportpage.js";
import UserManagement from "views/UserManagement/UserManagement.js";
import UserProfile from "views/UserManagement/UserApps/UserAppsManagement.js";
import ArticleManagement from "views/ArticleManagement/ArticleManagement.js";
import TableList from "views/TableList/TableList.js";
import PromoManagement from "views/PromoManagement/PromoManagement.js";
import Delivery from "views/DeliveryManagement/DeliveryManagement.js";
import Orders from "views/OrderManagement/OrderManagement.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import ProductManagement from "views/ProductManagement/ProductManagement.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user-management",
    name: "User Management",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserManagement,
    layout: "/admin",
  },
  {
    path: "/product-management",
    name: "Product Management",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ProductManagement,
    layout: "/admin",
  },
  {
    path: "/promo-management",
    name: "Promo",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: PromoManagement,
    layout: "/admin",
  },
  {
    path: "/delivery-cost",
    name: "Delivery",
    rtlName: "الرموز",
    icon: LocalShipping,
    component: Delivery,
    layout: "/admin",
  },
  {
    path: "/order-management",
    name: "Order Management",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Orders,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: Orders,
    layout: "/admin",
  },
  {
    path: "/report",
    name: "Report",
    rtlName: "ملف تعريفي للمستخدم",
    icon: BarChart,
    component: Report,
    layout: "/admin",
  },
  {
    path: "/article",
    name: "Article Management",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Description,
    component: ArticleManagement,
    layout: "/admin",
  },
  {
    path: "/user-apps-management",
    name: "User Apps Management",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
];

export default dashboardRoutes;
