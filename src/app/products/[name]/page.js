import axios from 'axios';
import ProductDetail from './ProductDetail';

export const getData = async (slug) => {
    const response = await axios.get(`https://api.vmetalsolutions.com/api/products?populate=*`, {
        method: "GET",
    });
    const datas = response.data.data;
    const data = datas.find(item => item.attributes.slug == slug)
    return data
}

const page = async ({ params }) => {

    const slug = params.name;
    const data = await getData(slug)

    return (
        <>
            <ProductDetail products={data} />
        </>
    )
}

export default page
