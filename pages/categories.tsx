/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import Checkbox from "@Components/CheckBox";
import Product from "@Components/Product";
import { callApi } from "@Utils/callApi";

const Categories = (props: any) => {
    console.log("props ===>", props);
    const { dataCategories = [], dataProduct = [] } = props;
    const [state, setState] = useImmer({
        activeCategory: "",
        data: [],
    });

    let _isMounted = true;

    const setStateCommon = (objects: any) => {
        if (_isMounted) {
            Object.keys(objects).forEach(key => {
                setState(draft => {
                    draft[key] = objects[key];
                });
            });
        }
    };

    const filterProductsByCategory = (categoryId: any) => {
        const data = dataProduct.filter(
            (item: any) => item.categoryId == categoryId
        );
        setStateCommon({ activeCategory: categoryId, data });
    };

    useEffect(() => {
        if (dataCategories.length > 0) {
            filterProductsByCategory(dataCategories[0].categoryId);
        }

        return () => {
            _isMounted = false;
        };
    }, [dataCategories, dataProduct]);

    const onChange = (name: string) => {
        filterProductsByCategory(name);
    };
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3">
                    <div>Categories</div>
                    {dataCategories.map((item: any) => {
                        return (
                            <Checkbox
                                key={item.name}
                                label={item.name}
                                checked={
                                    state.activeCategory === item.categoryId
                                }
                                name={item.categoryId}
                                onChange={onChange}
                            />
                        );
                    })}
                </div>
                <div className="col-md-9">
                    <div className="row">
                        {state.data.map((item: any) => {
                            return (
                                <div
                                    className="col-6 col-md-6 col-lg-3"
                                    key={item.name}
                                >
                                    <Product product={item} key={item.name} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

// export async function getServerSideProps() {
//     const res = await callApi(
//         "https://5e1fc92ee31c6e0014c6000e.mockapi.io/api/category",
//         "get"
//     );
//     const resProduct = await callApi(
//         "https://5e1fc92ee31c6e0014c6000e.mockapi.io/api/product",
//         "get"
//     );

//     return {
//         props: {
//             dataCategories: res ? res.data : [],
//             dataProduct: resProduct ? resProduct.data : [],
//         },
//     };
// }

Categories.getInitialProps = async () => {
    const res = await callApi(
        "https://5e1fc92ee31c6e0014c6000e.mockapi.io/api/category",
        "get"
    );
    const resProduct = await callApi(
        "https://5e1fc92ee31c6e0014c6000e.mockapi.io/api/product",
        "get"
    );
    console.log("getInitialsProps===>", res.data, resProduct.data);
    return {
        dataCategories: res ? res.data : [],
        dataProduct: resProduct ? resProduct.data : [],
    };
};

export default Categories;
