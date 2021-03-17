import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router';
import Api from '../../../inc/Api';
import DisplayMessage from '../../DisplayMessages';
import Loader from '../../Loader';
import Admin from '../Admin';

class NewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            message: [],
            messageType: ''
        }
    }
    submitProduct(e) {
        e.preventDefault();
        let formData = new FormData(document.getElementById('frm_product'));
        let api = Api;
        let that = this;
        that.setState({
            isLoading: true,
            message: [],
            product: null,
            messageType: ''
        })
        if (api.setTokenToHeader()) {
            api.post('/product/create', formData, function (res) {
                let data = res.data;
                if (data && data.type === "success") {
                    that.setState({
                        isLoading: false,
                        product: data.product,
                        messageType: "success",
                        message: ['Product Created']
                    })
                } else {
                    const msg = [];
                    for (const key in data.message) {
                        msg.push(data.message[key]);
                    }
                    that.setState({
                        isLoading: false,
                        message: msg,
                        product: null,
                        messageType: data.type
                    })
                }
            })
        }
    }
    render() {
        if(this.state.product){
            return <Redirect to={'/admin/product/edit/'+this.state.product.id}/>
        }
        
        return (
            <Admin>
                <Helmet>
                    <title>Create Product</title>
                </Helmet>
                <div className="product_form">
                    <form id="frm_product" className="form" encType="multipart/form-data" onSubmit={e => this.submitProduct(e)}>
                        <div className="form-group">
                            <label className="w-full py-2 block">Title *</label>
                            <input type="text" className="form-control" name="title" placeholder="Title" />
                        </div>

                        <div className="form-group">
                            <label className="w-full py-2 block">Price *</label>
                            <input type="number" className="form-control" name="price" placeholder="Price" />
                        </div>

                        <div className="form-group">
                            <label className="w-full py-2 block">Description *</label>
                            <textarea className="form-control" rows="5" name="description" placeholder="Description"></textarea>
                        </div>
                        <div className="form-group">
                            <label className="w-full py-2 block">Image *</label>
                            <input type="file" className="form-control" name="image" placeholder="Image" />
                        </div>
                        <DisplayMessage messages={this.state.message} messageType = {this.state.messageType}/>
                        { this.state.isLoading ? <Loader/> : <button className="btn btn-success mt-2 rs_btn">Create product</button> }
                        
                    </form>
                </div>
            </Admin>
        );
    }
}

export default NewProduct;