import React, { Component } from 'react';
import moment from 'moment';

class Products extends Component {

    /**
     * Calculating duration for a week from now
     * to a given date
     * 
     * @param {*} date 
     */
    calculateDuration (date) {
        if (moment().diff(new Date(date), 'days') < 7) {
            return this.getRelativeTime(date);
        }

        return this.dateFormat(date);
    }

    /**
     * Formatting a UTC date string by Jan 01 2019
     * 
     * @param {*} date 
     */
    dateFormat (date) {
        return moment(new Date(date)).format("MMM D YYYY");
    }

    /**
     * Returns a relative priod of given date
     * e.g: 2 days ago
     * 
     * @param {*} date 
     */
    getRelativeTime (date) {
        return moment(new Date(date)).fromNow();
    }

    // Render
    render () {
        let fontSize = {
            fontSize: this.props.size
        }

        let date = this.props.date;

        return (
            <div className="col-xs-12 col-sm-3">
                <figure className="product-card">
                    <div className="image-container">
                        <p className="product-image" style={ fontSize }>{ this.props.face }</p>
                    </div>

                    <figcaption className="text-center">
                        <p>{ this.props.id }</p>
                        <p>
                            <span className="price-label">Price </span>
                            <span className="price-value">${ this.props.price / 100 }</span>
                        </p>
                        <p>{ this.calculateDuration(date) }</p>
                    </figcaption>
                </figure>
            </div>
        );
    }
}

export default Products;