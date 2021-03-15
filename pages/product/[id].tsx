import React from "react";
import { useDispatch } from "react-redux";

import { callApi } from "@Utils/callApi";

import {
    getPromotionalPrice,
    numberWithCommasAndCurrency,
} from "@Utils/common";

import {
    ContainerProduct,
    ProductPrice,
    ProductName,
    OriginalPrice,
    WrapperPrice,
} from "@Styled/style.detailProduct";
import Button from "@Components/Button";
import { addToCart } from "@Actions";

const DetailProduct = (props: any) => {
    const { product = {} } = props;
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(addToCart(product));
    };

    return (
        <ContainerProduct className="container">
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3">
                    <img src={product.linkImage} alt={product.name} />
                </div>
                <div className="col-12 col-md-6 col-lg-9">
                    <div className="info-product">
                        <ProductName className="name-product mb-2">
                            {product.name}
                        </ProductName>
                        <WrapperPrice className="mb-2">
                            <ProductPrice className="price-product">
                                {getPromotionalPrice(
                                    product.price,
                                    product.discount
                                )}
                            </ProductPrice>
                            <OriginalPrice>
                                {numberWithCommasAndCurrency(product.price)}
                            </OriginalPrice>
                        </WrapperPrice>
                        <div className="desc-product mb-2">
                            {product.description}
                        </div>
                        <Button theme="success" onClick={onClick}>
                            Add to cart
                        </Button>
                    </div>
                </div>
            </div>
        </ContainerProduct>
    );
};

// export async function getServerSideProps(context: any) {
//     const { query } = context;
//     let dataProduct = [];

//     if (query) {
//         const res = await callApi(
//             `https://5e1fc92ee31c6e0014c6000e.mockapi.io/api/product/${query.id}`,
//             "get"
//         );

//         if (res && res.data) {
//             dataProduct = res.data;
//         }
//     }

//     return {
//         props: {
//             product: dataProduct,
//         },
//     };
// }

DetailProduct.getServerSideProps = async (context: any) => {
    const { query } = context;
    let dataProduct = [];

    if (query) {
        const res = await callApi(
            `https://5e1fc92ee31c6e0014c6000e.mockapi.io/api/product/${query.id}`,
            "get"
        );

        if (res && res.data) {
            dataProduct = res.data;
        }
    }

    return {
        product: dataProduct,
    };
};

export default DetailProduct;
