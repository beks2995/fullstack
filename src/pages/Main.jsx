import axios from 'axios'
import { useEffect, useState } from 'react'

const Main = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios("http://localhost:8080/product")
        .then(({data}) => setProducts(data))
        .catch((err) => {})
        .finally(() => {
            setIsLoading(false)
        })
    }, [])
    return (
        <div>
            {
                isLoading
                ? 
                <span>Loading...</span>
                :
                    products.length !== 0 
                    ? 
                    products.map((el, indx) => (
                        <div className="product" key={indx}>
                            <b className="product__name">{el.name}</b>
                            <span className="product__price">{el.price}</span>
                        </div>
                    ))
                    :
                    <span>No product!</span>
            } 
        </div>
    )
}

export default Main