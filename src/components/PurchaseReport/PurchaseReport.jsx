import React, { useState, useEffect } from "react";
import ApexCharts from "apexcharts";
import { Table, Form, Button, Row, FormSelect } from "react-bootstrap";
import mockPurchaseData from "../../mockPurchaseData";

const PurchaseReport = () => {
  const [filteredData, setFilteredData] = useState(mockPurchaseData);
  const [filters, setFilters] = useState({
    orderNumber: "",
    productName: "",
    category: "",
    supplier: "",
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    const chartData = filteredData.map((item) => ({
      x: item.productName,
      y: item.quantity
    }));

    const options = {
      chart: {
        type: "bar",
        width: "70%",
      },
      series: [{
        name: "Quantity Purchased",
        data: chartData.map((data) => data.y)
      }],
      xaxis: {
        categories: chartData.map((data) => data.x)
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
    setFilters({ orderNumber: "", productName: "", category: "", supplier: "", startDate: "", endDate: "" });
    setFilteredData(mockPurchaseData);
  };

  const applyFilters = () => {
    const filtered = mockPurchaseData.filter(item => {
      const itemDate = new Date(item.date);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      return (
        (!filters.orderNumber || item.orderNumber.toString().includes(filters.orderNumber)) &&
        (!filters.productName || item.productName.toLowerCase().includes(filters.productName.toLowerCase())) &&
        (!filters.category || item.category.toLowerCase().includes(filters.category.toLowerCase())) &&
        (!filters.supplier || item.supplier.toLowerCase().includes(filters.supplier.toLowerCase())) &&
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="justify-content-center container-fluid">
      <h1>Reporte de Compras</h1>
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
          <Form.Group className="col-2" controlId="supplier">
            <Form.Label>Proveedor</Form.Label>
            <Form.Control
              type="text"
              name="supplier"
              value={filters.supplier}
              onChange={handleFilterChange}
            />
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
            <th>Proveedor</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.orderNumber}>
              <td>{item.orderNumber}</td>
              <td>{item.quantity}</td>
              <td>{item.productName}</td>
              <td>{item.category}</td>
              <td>{item.supplier}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div id="chart"></div>
    </div>
  );
};

export default PurchaseReport;
