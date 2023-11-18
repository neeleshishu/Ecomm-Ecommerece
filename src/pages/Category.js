import React from 'react'
import { Link } from 'react-router-dom'

const Category = () => {

    const cate = [
        {
            "id":1,
            "image":"https://www.have-clothes-will-travel.com/wp-content/uploads/2019/05/qtq80-7bsDUb.jpeg",
            "type":"Clothes"
        },
        {
            "id":2,
            "image":"https://img.freepik.com/premium-photo/futuristic-gadgets-showcase-lineup-sleek-modern-technological-devices_977107-682.jpg",
            "type":"Electronics"
        },
        {
            "id":3,
            "image":"https://media.designcafe.com/wp-content/uploads/2021/12/27144355/design-cafe-modular-furniture-benefits.jpg",
            "type":"Furniture"
        },
        {
            "id":4,
            "image":"https://st2.depositphotos.com/1854227/6896/i/450/depositphotos_68964425-stock-photo-sneakers-on-the-floor.jpg",
            "type":"Shoes"
        },
        {
            "id":5,
            "image":"https://media.istockphoto.com/id/487770577/photo/makeup-set-on-table-front-view.jpg?s=612x612&w=0&k=20&c=IS_ZuHCF3N66jhDMwt2s7J_PGWABlpv2ISEAwpJ4JKU=",
            "type":"Other"
        }
    ]

  return (
    <div>
    <h1 className=' text-2xl text-center mt-4'>Categories We Provide</h1>
      <div className='all_category'>
      {cate.map((product) => (
        <Link to={`/category/${product.id}`} key={product.id} className="text-decoration-none">
          <img src={product.image} alt={product.type} class="w-full h-40 object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{product.type}</h2>
          </div>
        </Link>
      ))}
    </div>
    </div>
  )
}

export default Category
