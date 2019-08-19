import React from 'react';
import OrderPreview from '../order/OrderPreview';
import CustomerPreview from '../customer/CustomerPreview';
import ProductPreview from '../product/ProductPreview';
import { Link } from "react-router-dom";

const List = props => {
  if (!props.elements) {
    return (
      <div className="element-preview">Зареждане...</div>
    );
  }

  if (props.elements.length === 0) {
    return (
      <div className="element-preview">
        No items are here... yet.
        <AddButton type={props.type}/>
      </div>
    );
  }

  return (
    <div>
      {
        props.elements.map((element) => <Preview type={props.type} element={element} key={element._id} /> )
      }
      <br/>
      <AddButton type={props.type}/>
    </div>
  );
};

export default List;

function AddButton(props){
  switch(props.type){
    case 'product':
      return <Link to="/addProduct"><button className="btn btn-primary">Създай продукт</button></Link>
    case 'customer':
      return <Link to="/addCustomer"><button className="btn btn-primary">Създай клиент</button></Link>
    case 'order':
        return <Link to="/addOrder"><button className="btn btn-primary">Създай поръчка</button></Link>
    default:
      return null;
  }
}

function Preview(props){
  switch(props.type){
    case 'product':
      return <ProductPreview product={props.element} key={props.element._id} />;
    case 'customer':
      return <CustomerPreview customer={props.element} key={props.element._id} />
    case 'order':
        return <OrderPreview order={props.element} key={props.element._id} />
    default:
  }
}
