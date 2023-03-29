import React from 'react';
import { useEffect, useState } from 'react'
import Food from '../Food/Food';
import './Foods.css';

const Foods = ({foods, getFood}) => {
    
    return (
        <section className='foods-container-grid'>
            {
                foods.map(food => <Food key={food.idMeal} food={food} getFood={getFood}></Food>)
            }
        </section>
    );
};

export default Foods;