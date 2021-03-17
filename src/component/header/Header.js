import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';
import * as T from '../../redux/Types';
import Api from '../../inc/Api';
import swal from 'sweetalert';
class Header extends Component {
    logout(e){
        let api = Api;
        let that = this;
        if(api.setTokenToHeader()){
            api.post('auth/logout',{},function(res){
                swal(res.data.message)
                that.props.logout();
                api.removeToken();
            });
        }
    }
    render() {
        return (
            <div className="header">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link className="navbar-brand" to="/">Assignment</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            { this.props.auth.isLogin ? <AdminNav/> : '' }
                        </div>
                        <div className="my-2 my-lg-0">
                            {
                                this.props.auth.isLogin ? <button onClick = { e => this.logout(e)} type="button" className="btn btn-outline-success">Logout</button> : <><Link to="/login" className="btn btn-outline-success">Login</Link><Link to="/register" className="btn btn-outline-success my-2 my-sm-0">Register</Link></>
                            }
                            
                        </div>
                    </nav>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.Auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch({type:T.LOGOUT}) }
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Header);