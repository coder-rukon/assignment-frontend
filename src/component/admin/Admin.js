import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        
    }
    render() {
        if(!this.props.auth.isLogin){
            return <Redirect to="/login"/>
        }
        return (
            <div className="admin_panel">
                <div className="container">
                    {this.props.children}
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
export default  connect(mapStateToProps) (Admin);