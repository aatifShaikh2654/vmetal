import "./page.css";
import Herosection from "@/components/Herosection";
import ScrollSection from "@/components/ScrollSection";
import ProductSlide from "@/components/ProductSlide";
import Testimonial from "@/components/Testimonial";
import Brands from "@/components/Brands";
import axios from "axios";
import Contact from "@/components/Contact";

export const getProducts = async () => {
  try {
    const response = await axios.get(`https://api.vmetalsolutions.com/api/products?populate=*`, {
      method: "GET",
    });
    const data = response.data.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}


const page = async () => {

  const products = await getProducts();

  return (
    <>
      <Herosection />
      <ScrollSection />
      <ProductSlide products={products} />
      <Testimonial />
      <Brands subtitle={"Brands"} />
      <Contact />
    </>
  );
}

export default page;