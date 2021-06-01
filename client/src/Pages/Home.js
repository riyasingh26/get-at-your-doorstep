import React from "react";
import Jumbotron from "../Components/cards/Jumbotron";
import NewArrivals from "../Components/home/NewArrivals";
import MostLiked from "../Components/home/MostLiked";
import CategoryList from "../Components/category/CategoryList";
import SubList from "../Components/sub/SubList";

const Home = () => {
  return (
    <>
      <div
        className="jumbotron text-danger h1 font-weight-bold text-center"
        //style="background-image: url('https://www.freepik.com/free-photo/woman-holding-various-shopping-bags-copy-space_10419007.htm#page=1&query=Shopping&position=4'); height: 100vh;"
      >
        <Jumbotron text={["New Arrivals", "Most Liked"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>
      <NewArrivals />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Most Liked
      </h4>
      <MostLiked />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <CategoryList />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Subs</h4>
      <SubList />
      <br />
      <br />
      <h6 className="text-center p-3 mt-5 mb-5 display-4 jumbotron ">
        Made By Riya Singh
      </h6>
    </>
  );
};

export default Home;
