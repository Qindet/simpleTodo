import React, {Component} from "react";
import './item-add-form.css'

export default class ItemAddForm extends Component{

    render() {
        const {onAdded} = this.props
        console.log(this.props)
        return (
            <div className="item-add-form">
                <button className="btn btn-outline-secondary" onClick={() => onAdded()}>Add item</button>
            </div>
        )
    }
}