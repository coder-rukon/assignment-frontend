import { Helmet } from "react-helmet";

const ErrorPage = (props) => {
    return (
        <div className="error_page">
            <Helmet>
                <title>404 Error</title>
            </Helmet>
            <div className="container">
                <h2 className="alert alert-danger">404 Error. Page Not Found!</h2>
            </div>
        </div>
    )
}
export default ErrorPage;