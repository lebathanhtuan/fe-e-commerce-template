import { Link } from 'react-router-dom'
import { Button } from 'antd'
import axios from 'axios'

import { ROUTES } from '../../../constants/routes'

function HomePage() {
  const handleGetProducts = async () => {
    const response = await axios.get('http://localhost:3001/products/abc')
    console.log('🚀 ~ handleGetProducts ~ result:', response.data)
    alert(response.data.name)
  }
  const handleCreateProduct = async () => {
    const response = await axios.post('http://localhost:3001/products', {
      name: 'iPhong 16 Pro',
      price: 30000000,
    })
    console.log('🚀 ~ handleCreateProduct ~ response:', response.data)
  }
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main area of the application.</p>
      <p>
        You can navigate to the
        <Link to={ROUTES.ADMIN.PRODUCTS}>Product Management</Link>
        page to manage products.
      </p>
      <Button onClick={() => handleGetProducts()}>Get Products</Button>
      <Button onClick={() => handleCreateProduct()}>Create Product</Button>
    </div>
  )
}

export default HomePage
