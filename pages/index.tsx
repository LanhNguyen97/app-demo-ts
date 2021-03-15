/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { callApi } from "@Utils/callApi";
import Product from "@Components/Product";

function Home(props) {
    const { data = [] } = props;
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center list-product my-3">
                    LIST PRODUCTS
                </div>
                <div className="col-12">
                    <div className="row">
                        {data.map((product: any) => {
                            return (
                                <div
                                    className="col-6 col-md-4 col-lg-3"
                                    key={product.name}
                                >
                                    <Product
                                        product={product}
                                        key={product.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

Home.getInitialProps = async ctx => {
    const res = await callApi(
        "https://5e1fc92ee31c6e0014c6000e.mockapi.io/api/product",
        "get"
    );

    return { data: res.data || [] };
};
export default Home;
