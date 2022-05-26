import React, { useEffect } from 'react';
//from '../learners/styles/quantity.js';

function Quantity() {
    useEffect(() => {
        const plus = document.getElementById("plus");
        const minus = document.getElementById("minus");
        const input = document.getElementById("count");

        plus.addEventListener("click", () => {
            input.value = parseInt(input.value) + 1;
        });

        minus.addEventListener("click", () => {
            if (input.value > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });

    return (
        <>
            <div className="product-qty">
                <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">Qty :</li>
                    <li className="list-inline-item" id="qty-input">
                        <input className="form-control" type="button" defaultValue="-" id="minus" />
                        <input className="form-control" type="text" defaultValue="1" id="count" />
                        <input className="form-control" type="button" defaultValue="+" id="plus" />
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Quantity