import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Home extends Component {
    render() {
        return (
            <section className="jumbotron text-center mt-5 mb-5">
                <Helmet>
                    <title>Assignment Project</title>
                </Helmet>
                <div className="container">
                    <h1 className="jumbotron-heading">Assignment Project</h1>
                </div>
            </section>
        );
    }
}

export default Home;