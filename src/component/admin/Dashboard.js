import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Admin from './Admin';

class Dashboard extends Component {
    render() {
        return (
            <Admin>
                <Helmet>
                    <title>Dashboard</title>
                </Helmet>
                <h2>Welcome to Dashbaord</h2>
                <div className="btn-group mt-5">
                    <Link className="nav-link btn btn-success" to="/admin/products">All Products</Link>
                    <Link className="nav-link btn btn-info" to="/admin/product/add">Add Product</Link>
                </div>
            </Admin>
        );
    }
}

export default Dashboard;