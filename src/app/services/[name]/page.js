import axios from 'axios';
import ServiceDetails from './ServiceDetails';

export const getData = async (slug) => {
    const response = await axios.get(`https://api.vmetalsolutions.com/api/services?populate=*`, {
        method: "GET",
    });
    const datas = response.data.data;
    console.log(datas);
    const data = datas.find(item => item.attributes.slug == slug)
    return data
}

const page = async ({ params }) => {

    const slug = params.name;
    const data = await getData(slug)

    return (
        <>
            <ServiceDetails data={data} />
        </>
    )
}

export default page
