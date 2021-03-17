import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import Api from '../../../inc/Api';
import DisplayMessage from '../../DisplayMessages';
import Loader from '../../Loader';
import Admin from '../Admin';
import Settings from '../../../inc/Settings';
class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            message: [],
            product: {},
            messageType: '',
        }
    }
    componentDidMount() {
        this.loadProduct();
    }
    loadProduct() {
        let that =this;
        that.setState({
            isLoading:true
        });
        let {params} = this.props.match;
        let api = Api;
        if(api.setTokenToHeader()){
            api.get('/product/get/'+params.id,{},function(res){
                that.setState({
                    isLoading:false,
                    product:res.data
                })
            });
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
            messageType: ''
        })
        if (api.setTokenToHeader()) {
            api.post('/product/update/'+this.state.product.id, formData, function (res) {
                let data = res.data;
                if (data && data.type === "success") {
                    that.setState({
                        isLoading: false,
                        product: data.product,
                        messageType: "success",
                        message: ['Product Updated']
                    })
                } else {
                    const msg = [];
                    for (const key in data.message) {
                        msg.push(data.message[key]);
                    }
                    that.setState({
                        isLoading: false,
                        message: msg,
                        messageType: data.type
                    })
                }
            })
        }
    }
    onInputChangeHandler(e){
        let product = this.state.product;
        product[e.target.name] = e.target.value;
        this.setState({
            product:product
        })
    }
    render() {
        const product = this.state.product;
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
                    <title>Edit Product</title>
                </Helmet>
                <div className="product_form">
                    <form id="frm_product" className="form" encType="multipart/form-data" onSubmit={e => this.submitProduct(e)}>
                        <div className="row">
                            <div className="col-xs-12 col-sm-8">
                                <div className="form-group">
                                    <label className="w-full py-2 block">Title *</label>
                                    <input type="text" className="form-control" name="title" value={product.title} onChange = { e => this.onInputChangeHandler(e)} placeholder="Title" />
                                </div>

                                <div className="form-group">
                                    <label className="w-full py-2 block">Price *</label>
                                    <input type="number" className="form-control" name="price"  value={product.price} placeholder="Price"  onChange = { e => this.onInputChangeHandler(e)} />
                                </div>

                                <div className="form-group">
                                    <label className="w-full py-2 block">Description *</label>
                                    <textarea className="form-control" rows="5" name="description"  value={product.description} placeholder="Description"  onChange = { e => this.onInputChangeHandler(e)} />
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                { product.image ? <img src={ Settings.apiBaseUrl +'/storage/'+  product.image} style={{width:'100%', marginBottom:'15px'}} alt = {product.title} /> : '' }
                                <div className="form-group">
                                    <label className="w-full py-2 block">Image *</label>
                                    <input type="file" className="form-control" name="image" placeholder="Image" />
                                </div>
                            </div>
                        </div>


                        <DisplayMessage messages={this.state.message} messageType={this.state.messageType} />
                        <button className="btn btn-success mt-2 rs_btn">Update Product</button>
                    </form>
                </div>
            </Admin>
        );
    }
}

export default withRouter(EditProduct);