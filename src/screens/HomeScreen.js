import React from "react";
import { useParams } from "react-router-dom";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import Categories from "./../components/homeComponents/Categories";

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);

  // const keyword = match.params.keyword
  // const pagenumber = match.params.pagenumber
  const { keyword = '', pagenumber = 1 } = useParams();
  const pageNumber = Number(pagenumber);
  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pageNumber} />
      {/* <Categories /> */}
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
