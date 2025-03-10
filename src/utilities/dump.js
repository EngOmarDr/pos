import Beef from '../assets/dump/Beef.jpg'
import Butter from '../assets/dump/Butter.jpeg'
import cheese from '../assets/dump/cheese.jpg'
import chicken from '../assets/dump/chicken.jpg'
import Cucumber from '../assets/dump/Cucumber.webp'
import eggplant from '../assets/dump/eggplant.jpg'
import Lamp from '../assets/dump/Lamp.jpg'
import lettuce from '../assets/dump/lettuce.jpg'
import Milk from '../assets/dump/Milk.jpg'
import salmon from '../assets/dump/salmon .jpg'
import Tomato from '../assets/dump/Tomato.jpg'
import Yougert from '../assets/dump/Yougert.png'

export const categories = [
    {
        id:1,
        name:"Dairy-Derivatives"
    },
    {
        id:2,
        name:"Vegetables"
    },
    {
        id:3,
        name:"Meat"
    },
]
export const products = [
    {
        id:1,
        name: 'Milk',
        category:"Dairy-Derivatives",
        unitPrice: 2.00,
        productImage: Milk,
    },
    {
        id:2,
        name: 'Cheese',
        category:"Dairy-Derivatives",
        unitPrice: 5.00,
        productImage: cheese,
    },
    {
        id:3,
        name: 'Yougert',
        category:"Dairy-Derivatives",
        unitPrice: 2.50,
        productImage: Yougert,
    },
    {
        id:4,
        name: 'Butter',
        category:"Dairy-Derivatives",
        unitPrice: 5.00,
        productImage: Butter,
    },
    {
        id:5,
        name: 'tomatoes',
        category:"Vegetables",
        unitPrice: 3.50,
        productImage: Tomato,
    },
    {
        id:6,
        name: 'lettuce',
        category:"Vegetables",
        unitPrice: 1.50,
        productImage: lettuce,
    },
    {
        id:7,
        name: 'cucumber',
        category:"Vegetables",
        unitPrice: 2.50,
        productImage: Cucumber,
    },
    {
        id:8,
        name: 'Eggplant',
        category:"Vegetables",
        unitPrice: 4.50,
        productImage: eggplant,
    },
    {
        id:9,
        name: 'lamp',
        category:"Meat",
        unitPrice: 35.00,
        productImage: Lamp,
    },
    {
        id:10,
        name: 'Beef',
        category:"Meat",
        unitPrice: 25.00,
        productImage: Beef,
    },
    {
        id:11,
        name: 'salmon',
        category:"Meat",
        unitPrice: 18.99,
        productImage: salmon,
    },
    {
        id:12,
        name: 'chicken',
        category:"Meat",
        unitPrice: 6.30,
        productImage: chicken,
    },
    
]