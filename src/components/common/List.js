import React from 'react';
import OrderPreview from '../order/OrderPreview';
import CustomerPreview from '../customer/CustomerPreview';
import ProductPreview from '../product/ProductPreview';
import StockPreview from '../stockroom/StockPreview';
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
      <br/>
      <AddButton type={props.type}/>
      <table className="table">
        <thead>
         
            <Head type={props.type}/>
         
        </thead>
        <tbody>
        {
          props.elements.map((element) => <Item type={props.type} element={element} key={element._id} /> )
        }
        </tbody>
      </table>
    </div>
  );
};

export default List;

function Head(props){
  switch(props.type){
    case 'product':
      return (
        <tr>
          <th>Име</th>
          <th>Размер</th>
          <th>Цена без ДДС</th>
          <th></th>
          <th></th>
        </tr>
      );
    case 'customer':
      return (
        <tr>
          <th>Име</th>
          <th>Фамилия</th>
          <th>Фирма</th>
          <th>Телефон</th>
          <th></th>
          <th></th>
        </tr>
      );
    case 'order':
        return (
          <tr>
            <th>Клиент</th>
            <th>Дата на създаване</th>
            <th>Брой</th>
            <th>Сума</th>
            <th>Сума с ДДС</th>
            <th>Неизплатено</th>
            <th></th>
            <th></th>
          </tr>
        );
    case 'stockroom':
      return (
        <tr>
          <th>Продукт</th>
          <th>Добавено количество</th>
          <th>Дата на зареждане</th>
          <th></th>
          <th></th>
        </tr>
      );
    default:
      return null;
  }
}

function AddButton(props){
  switch(props.type){
    case 'product':
      return <Link to="/addProduct"><button className="btn btn-primary">Създай продукт</button></Link>
    case 'customer':
      return <Link to="/addCustomer"><button className="btn btn-primary">Създай клиент</button></Link>
    case 'order':
        return <Link to="/addOrder"><button className="btn btn-primary">Създай поръчка</button></Link>
    case 'stockroom':
        return <Link to="/addStock"><button className="btn btn-primary">Добави елемент</button></Link>
    default:
      return null;
  }
}

function Item(props){
  switch(props.type){
    case 'product':
      return <ProductPreview product={props.element} key={props.element._id} />;
    case 'customer':
      return <CustomerPreview customer={props.element} key={props.element._id} />
    case 'order':
        return <OrderPreview order={props.element} key={props.element._id} />
    case 'stockroom':
        return <StockPreview stock={props.element} key={props.element._id} />
    default:
  }
}
