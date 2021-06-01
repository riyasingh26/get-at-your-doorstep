import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/product";
import ProductCreateForm from "../../../Components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../Components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import useSelection from "antd/lib/table/hooks/useSelection";
import ProductUpdateForm from "../../../Components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match }) => {
  //state
  const [values, setValues] = useState(initialState);
  const [subOptions, setsubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayofSubs, setArrayofSubIds] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  //router
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      console.log("single product", p);
      //1 load single prdct
      setValues({ ...values, ...p.data });
      console.log("p data is ", p.data);
      //2 load single product category subs
      getCategorySubs(p.data.category._id).then((res) => {
        setsubOptions(res.data);
      });
      //3 prepare array of sub ids to show as default sub values in antd selct
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      console.log("arr", arr);
      setArrayofSubIds((prev) => arr);
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    //console.log(e.target.name, "----", e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setsubOptions(res.data);
    });
    //setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h3>Update Product</h3>
          {JSON.stringify(values)}
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayofSubs={arrayofSubs}
            setArrayofSubIds={setArrayofSubIds}
          />
          <br />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
