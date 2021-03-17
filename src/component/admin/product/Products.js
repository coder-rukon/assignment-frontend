import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Api from '../../../inc/Api';
import Loader from '../../Loader';
import Admin from '../Admin';
import ProductIitem from './ProductItem';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            products: [],
            data: {}
        }
    }
    componentDidMount() {
        let { page } = this.props.match.params;
        this.loadProducts(page)
    }
    loadProducts(page) {

        let that = this;
        let api = Api;
        that.setState({
            isLoading: true
        })
        if (api.setTokenToHeader()) {
            api.get('/product/get-all?page=' + page, {}, function (res) {
                if (res.data) {
                    that.setState({
                        isLoading: false,
                        data: res.data,
                        products: res.data.data
                    })
                }
            })
        }
    }

    deleteProduct(product) {
        let that = this;
        let api = Api;
        swal({
            title: "Are you want to delete ?",
            text: product.title,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                that.setState({
                    isLoading: true
                })
                if (api.setTokenToHeader()) {
                    api.post('/product/delete', { id: product.id }, function (res) {
                        swal(res.data.message, { icon: res.data.type, });
                        that.loadProducts();
                    })
                }
            }
        });

    }
    displayProducts() {
        const products = this.state.products;
        return (
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>Id</td>
                        <td>Image</td>
                        <td>Title</td>
                        <td>Price</td>
                        <td>Actions</td>
                    </tr>
                    {products.map((product, key) => { return <ProductIitem deleteProduct={this.deleteProduct.bind(this)} key={key} product={product} /> })}
                </tbody>
            </table>
        )
    }
    displayPaggination() {
        let data = this.state.data;
        let pages = [];
        for (let i = 1; i <= data.last_page; i++) {
            pages.push(i);
        }
        return (
            <nav >
                <ul className="pagination">
                    {data.prev_page_url ? <li className="page-item"><button className="page-link" onClick={e => this.loadProducts((data.current_page - 1))}>Previous</button></li> : ''}
                    {pages.map((pageNo, key) => {
                        return (<li key={key} className= { data.current_page === pageNo ? "page-item active" : "page-item" }><button className="page-link" onClick={e => this.loadProducts(pageNo)}>{pageNo}</button></li>)
                    })}
                    {data.next_page_url ? <li className="page-item"><button className="page-link" onClick={e => this.loadProducts((data.current_page + 1))}>Next</button></li> : ''}
                </ul>
            </nav>
        )
    }
    render() {
        if (this.state.isLoading) {
            return (
                <Admin>
                    <div className="text-center">
                        <Loader />
                    </div>
                </Admin>
            )
        }
        return (
            <Admin>
                <Helmet>
                    <title>Products</title>
                </Helmet>
                <div className="btn-group mb-2">
                    <Link className="nav-link btn btn-success" to="/admin/products">All Products</Link>
                    <Link className="nav-link btn btn-info" to="/admin/product/add">Add Product</Link>
                </div>
                {this.displayProducts()}
                {this.displayPaggination()}
            </Admin>
        );
    }
}

export default withRouter(Products);