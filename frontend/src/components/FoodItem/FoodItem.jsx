import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

// Error Boundary Component to catch errors in FoodItem
class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong with the food item.</h1>;
        }
        return this.props.children;
    }
}

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    // Defensive check for cartItems[id] to avoid undefined
    const quantity = cartItems && cartItems[id] ? cartItems[id] : 0;

    return (
        <ErrorBoundary>
            <div className="food-item">
                <div className="food-item-img-container">
                    <img className="food-item-image" src={`${url}/images/${image}`} alt={name} />
                    {
                        quantity === 0 ? (
                            <img
                                className="add"
                                onClick={() => addToCart(id)}
                                src={assets.add_icon_white}
                                alt="Add to Cart"
                            />
                        ) : (
                            <div className="food-item-counter">
                                <img
                                    onClick={() => removeFromCart(id)}
                                    src={assets.remove_icon_red}
                                    alt="Remove from Cart"
                                />
                                <p>{quantity}</p>
                                <img
                                    onClick={() => addToCart(id)}
                                    src={assets.add_icon_green}
                                    alt="Add More"
                                />
                            </div>
                        )
                    }
                </div>
                <div className="food-item-info">
                    <div className="food-item-name-rating">
                        <p>{name}</p>
                        <img src={assets.rating_starts} alt="Rating" />
                    </div>
                    <p className="food-item-desc">{description}</p>
                    <p className="food-item-price">${price}</p>
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default FoodItem;
