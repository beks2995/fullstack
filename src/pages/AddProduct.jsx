import {useState, useEffect} from 'react'
import axios from 'axios'

const AddProduct = () => {
    const [products, setProducts] = useState([])
    const [name, setName] = useState("")
    const [description, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        axios("http://localhost:8080/product")
        .then(({data}) => setProducts(data))
        .catch((err) => {})
    }, [])
    console.log(products);
    const addProd = async (e) => {
        e.preventDefault()
        
        let res = await axios({
            method: "post",
            url: "http://localhost:8080/product",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                "_id": products.length === 0 ? 1 : products.at(-1)._id + 1,
                "name": name,
                "description": description,
                "price": price
              }
        }).catch(err => {
            console.log(err);
        })
        // if (res.status === 200) {
        //   setName("");
        //   setPrice("");
        //   setDesc("");
        //   setMessage("Product added successfully");
        // } else {
        //   setMessage("Some error occured");
        // }
      }
  return (
    <div>
        <form onSubmit={addProd}>
                <h2>Добавление товара</h2>
                <label>
                    Название
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>
                    Описание
                    <textarea value={description} onChange={(e) => setDesc(e.target.value)}></textarea>
                </label>
                <label>
                    цена
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <button type="submit">Добавить</button>
        <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
    </div>
  )
}

export default AddProduct