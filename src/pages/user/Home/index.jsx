import { Link } from 'react-router-dom'
import { Button } from 'antd'
import axios from 'axios'

import { ROUTES } from '../../../constants/routes'

function HomePage() {
  const handleGetProducts = async () => {
    const response = await axios.get('http://localhost:3001/products')
    console.log('🚀 ~ handleGetProducts ~ result:', response.data)
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
    </div>
  )
}

export default HomePage
