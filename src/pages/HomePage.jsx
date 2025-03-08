import {categories ,products} from '../utilities/dump.js'
import Category from '../components/Category.jsx'
import { useState } from 'react'
import Product from '../components/Product.jsx'

export default function HomePage(){
  const [activeId,setActiveId] = useState(null)

  const filters = categories.map((category)=>{
    return  <Category
              key={category.id}
              id={category.id}
              categoryName={category.name}
              onClick = {handelActiveFilter}
              isActive = {activeId === category.id ? true : false}
            />
  })  
  const availableProducts = products.map((product)=>{
    return  <Product
              key={product.id}
              id={product.id}
              name={product.name}
              unitPrice={product.unitPrice}
              productImage={product.productImage}
            />
  })
  function handelActiveFilter(id){
    setActiveId(id)
  }

  function handelClearFilter(){
    setActiveId(null)
  }
  
  return (
    <div className="home-container">
      <div className="calculator-section">
        calculator
      </div>
      <div className="products-section">
        <div className='options'>
          <div className='filters'>
            {filters}
            <button className='clear-btn' onClick={()=>{handelClearFilter()}}>Clear</button>
          </div>
          <form className='search-bar'>
            <input type='search'/>
            <button>Search</button>
          </form>
        </div>
        <div className='products'>
          {availableProducts}
        </div>
      </div>
    </div>
  )
}