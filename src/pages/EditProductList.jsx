import {useState, useEffect} from 'react'
import axios from 'axios'

const EditProductList = () => {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [description, setDesc] = useState("")
  const [price, setPrice] = useState("")
  useEffect(() => {
      axios("http://localhost:8080/product")
      .then(({data}) => setProducts(data))
      .catch((err) => {})
  }, [])

  // useEffect(() => {
  //   axios({
  //     method: "post",
  //     url: "http://localhost:8080/product",
  //     headers: {
  //         "Content-Type": "application/json"
  //     },
  //     data: {
  //         "id": id,
  //         "name": name,
  //         "description": description,
  //         "price": price
  //       }
  //   })
  //   .catch(err => {})
  // })

  const editHandle = (id) => {
    
  }

  return (
    <div>
            {
                products.length !== 0 
                ? 
                products.map((el, indx) => (
                    <div className="product" key={indx}>
                        <b className="product__name">{el.name}</b>
                        <span className="product__price">{el.price}</span>
                        <button onClick={() => editHandle(el.id)} className="edit">edit</button>
                    </div>
                ))
                :
                <span>No product!</span>
            }
    </div>
  )
}

export default EditProductList