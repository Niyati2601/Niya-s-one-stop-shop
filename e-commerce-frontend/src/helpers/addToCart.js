import { toast } from "react-toastify"
import summaryApi from "../common"

const addToCart = async(e,id) =>{
    e?.stopPropagation()
    e?.preventDefault()

    const res = await fetch(summaryApi.addTocart.url,{
        method: summaryApi.addTocart.method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productId: id
        })

    })

    const responseData = await res.json();
    if(responseData.success) {
        toast.success(responseData.message);
    } else {
        toast.error(responseData.message);
    }

    return responseData
}

export default addToCart