import React, { useState, useEffect } from "react";
import ApexCharts from "apexcharts";
import { Table, Form, Button, Row, FormSelect } from "react-bootstrap";
import axios from "axios";

const SalesReport = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filters, setFilters] = useState({
    orderNumber: "",
    productName: "",
    category: "",
    startDate: "",
    endDate: "",
    mail: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/sales');
        setOriginalData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!filteredData.length) return;
  
    const chartData = filteredData.flatMap((item) => 
      item.items.map((product) => ({
        x: product.title || product.id || "Producto desconocido",
        y: product.quantity || 0
      }))
    );
  
    const options = {
      chart: {
        type: "donut",
        height: 350
      },
      series: chartData.map((data) => data.y),
      labels: chartData.map((data) => data.x),
      xaxis: {
        type: "category"
      }
    };
  
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  
    return () => chart.destroy();
  }, [filteredData]);
  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleClearFilters = () => {
    setFilters({ orderNumber: "", productName: "", category: "", startDate: "", endDate: "", mail: "" });
    setFilteredData(originalData);
  };

  const applyFilters = () => {
    const filtered = originalData.filter(order => {
      const itemDate = new Date(order.date);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      return (
        (!filters.orderNumber || order.orderNumber.toString().includes(filters.orderNumber)) &&
        (!filters.productName || order.items.some(item => item.title && item.title.toLowerCase().includes(filters.productName.toLowerCase()))) &&
        (!filters.category || order.items.some(item => item.category && item.category.toLowerCase().includes(filters.category.toLowerCase()))) &&
        (!filters.mail || order.mail.toLowerCase().includes(filters.mail.toLowerCase())) &&
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="justify-content-center container-fluid">
      <h1>Reporte de Ventas</h1>
      <Form className="container-fluid justify-content-center my-4">
        <Row className="justify-content-center">
          <Form.Group className="col-1" controlId="orderNumber">
            <Form.Label>Orden</Form.Label>
            <Form.Control
              type="text"
              name="orderNumber"
              value={filters.orderNumber}
              onChange={handleFilterChange}
            />
          </Form.Group>
          <Form.Group className="col-2" controlId="productName">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={filters.productName}
              onChange={handleFilterChange}
            />
          </Form.Group>
          <Form.Group className="col-3" controlId="category">
            <Form.Label>Categoría</Form.Label>
            <FormSelect name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">Seleccionar categoría</option>
              <option value="notebook">Notebook</option>
              <option value="celular">Celular</option>
              <option value="tablet">Tablet</option>
            </FormSelect>
          </Form.Group>
          <Form.Group className="col-2" controlId="startDate">
            <Form.Label>Fecha Inicio</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </Form.Group>
          <Form.Group className="col-2" controlId="endDate">
            <Form.Label>Fecha Fin</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </Form.Group>
          <Form.Group className="col-2" controlId="mail">
            <Form.Label>Mail del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="mail"
              value={filters.mail}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Row>
        <Button className="mt-4" onClick={applyFilters}>Filtrar</Button>
        <Button className="mt-4 mx-3 btn btn-secondary" onClick={handleClearFilters}>Borrar Filtros</Button>
      </Form>
      <Table className="table-responsive table w-75 p-5 m-5" striped bordered hover>
        <thead>
          <tr>
            <th>Orden</th>
            <th>Cantidad</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Fecha</th>
            <th>Cliente</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((order) => (
            order.items.map((product, index) => (
              <tr key={`${order.orderNumber}-${index}`}>
                <td>{index === 0 ? order.orderNumber : ""}</td>
                <td>{product.quantity}</td>
                <td>{product.title || product.id}</td>
                <td>{product.category || "Sin categoría"}</td>
                <td>{index === 0 ? order.date : ""}</td>
                <td>{index === 0 ? order.mail : ""}</td>
              </tr>
            ))
          ))}
        </tbody>
      </Table>
      <div id="chart"></div>
    </div>
  );
};

export default SalesReport;
