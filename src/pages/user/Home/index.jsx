import { Link } from 'react-router-dom'
import { Button } from 'antd'

import { ROUTES } from '@constants/routes'

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main area of the application.</p>
      <p>
        You can navigate to the
        <Link to={ROUTES.ADMIN.PRODUCTS}>Product Management</Link>
        page to manage products.
      </p>
    </div>
  )
}

export default HomePage
