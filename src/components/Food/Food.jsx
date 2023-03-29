import React from 'react';
import './Food.css';

const Food = ({food, getFood}) => {
    const {strMeal, strMealThumb, strInstructions, strCategory, strYoutube, idMeal} = food;
    return (
        <article className='articleStyles'>
            <figure>
                <img src={strMealThumb && strMealThumb} alt={strMeal} />
            </figure>
            <section>
                <header>
                    <h3>{strMeal && strMeal}</h3>
                    <h4>Catagory: {strCategory && strCategory}</h4>
                </header>
                <main>
                    <p>{strInstructions && strInstructions.slice(0, 350) + "..."}</p>
                </main>
                <footer>
                    <a href={strYoutube && strYoutube}>{strYoutube? strYoutube.slice(0, 30): "No Youtube Link Found"}</a>
                </footer>
            </section>
            <button className='btn-cart' type='button' onClick={()=> getFood(idMeal)}>Add to Cart</button>
        </article>
    );
};

export default Food;