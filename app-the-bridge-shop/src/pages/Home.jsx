import React, { useState, useEffect, useCallback } from 'react';
import { getProducts, findProductById } from '../services/products';
import { getManufacters } from '../services/manufacters';
import Header from '../components/Header/Header';
import Paginator from '../components/Paginator/Paginator';
import Table from '../components/Table/Table';
import Input from '../components/Input/Input';
import Select from '../components/Select/Select';
import Details from '../components/Details/Details';
import Footer from '../components/Footer/Footer';
import './Home.css';

const Home = () => {

  const [products, setProducts] = useState([{}]);
  const [manufacters, setManufacters] = useState([{}]);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(1);
  const [orderField, setOrderField] = useState("relevance");
  const [order, setOrder] = useState(-1);
  const [productName, setProductName] = useState();
  const [manufacterId, setManufacterId] = useState();
  const [loading, setLoading] = useState(false);
  const [idProduct, setIdProduct] = useState();
  const [currentProduct, setCurrentProduct] = useState(false);
  
  console.log("VALOR products", products)
  useEffect(
    () => {
      renderProducts();
      renderManufacters();
    }, []
  );

  useEffect(
    () => {
      renderProducts()
    },
    [currentPage, productName, orderField, order, manufacterId]
  );

  useEffect(
    () => {
      renderOneProduct()
    },
    [idProduct]
  );

  const renderProducts = useCallback(
    async () => {
      setLoading(true);
      const { docs, page, totalPages } = await getProducts(currentPage, orderField, order, productName, manufacterId);
      setLoading(false);
      setProducts(docs);
      setCurrentPage(page);
      setFinalPage(totalPages);
    }, [currentPage, orderField, order, productName, manufacterId]
  )

  const renderOneProduct = useCallback(
    async () => {
      if(!idProduct) return;
      const result = await findProductById(idProduct);
      if (result.error) {
        setCurrentProduct(false);
        return;
      }
      setCurrentProduct(result);
    }, [idProduct]
  )

  const renderManufacters = useCallback(
    async () => {
      const result = await getManufacters();
      console.log(result);
      setManufacters(result);
    },
    []
  )

  return (<>
  <div className="Home">
      <Header description="¡Echa un vistazo a nuestra selección de coches!">THE BRIDGE SHOP</Header>
    
    {!currentProduct ?
      <div className="wrapperInputSelect">
        <Input id="nombre" type="text" onChange={
          (e) => {
            const currentValue = e.currentTarget.value;
            setProductName(currentValue);
            setCurrentPage(1);
          }
        }>NOMBRE</Input>
        <Select 
          id="fabricantes" 
          options={[{ cif: null, name: "TODOS" }, ...manufacters]} 
          onChange={(e) => {
            console.log(e.currentTarget.value);
            const selectValue = e.currentTarget.value === 'TODOS' ? "" : e.currentTarget.value;
            console.log(selectValue);
            setManufacterId(selectValue); 
            setCurrentPage(1);
          }}>FABRICANTES
        </Select>
    </div> :null}

    {loading ?
      <p>LOADING...</p>
      : currentProduct ?
        <Details
          {...currentProduct}
          onClick={(e) => {
            setCurrentProduct(null);
            setIdProduct(null);
          }}
        />
      : products.length !== 0 ? 
      <Table
          data={products}
          orderField={orderField}
          order={order}
          setOrderField={(keyName) => { 
            setOrderField(keyName); 
            setOrder(prev => prev * -1) }} 
          rowClick={(id) => {
            setIdProduct(id);
          }}
      /> 
      : <div className="divNotFound">
            <p>NO SE ENCUENTRAN RESULTADOS</p>
        </div>  
    }

    {!currentProduct ?
      <Paginator
        currentPage={currentPage}
        finalPage={finalPage}
        next={() => { setCurrentPage(prev => prev === finalPage ? prev : ++prev) }}
        prev={() => { setCurrentPage(prev => prev === 1 ? prev : --prev) }}
      />
      : null}
      <Footer license="© 2021, THE BRIDGE copyrigth"
              addressInfo="Madrid Paseo de Recoletos 15, 28004 Madrid.dress"></Footer>
  </div>
  </>);
};

export default Home;
