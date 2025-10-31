import { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { message } from 'antd'

const PayPalButton = ({ amount, onSuccess, onError, onCancel }) => {
  const [loading, setLoading] = useState(false)

  // Cấu hình PayPal
  const initialOptions = {
    'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
    currency: 'USD',
    intent: 'capture',
  }

  // Chuyển đổi VND sang USD (tỷ giá tạm: 1 USD = 26,000 VND)
  const convertVNDToUSD = (vndAmount) => {
    const exchangeRate = 26000
    return (vndAmount / exchangeRate).toFixed(2)
  }

  const usdAmount = convertVNDToUSD(amount)

  // Tạo PayPal order
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: usdAmount,
          },
          description: 'E-commerce Order Payment',
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
    })
  }

  // Xử lý khi thanh toán thành công
  const onApprove = async (data, actions) => {
    try {
      setLoading(true)

      // Capture payment từ PayPal
      const details = await actions.order.capture()

      console.log('PayPal transaction completed:', details)

      // Lấy thông tin transaction
      const transactionId = details.id
      const payerInfo = details.payer
      const paymentStatus = details.status

      if (paymentStatus === 'COMPLETED') {
        message.success('Thanh toán PayPal thành công!')

        // Gọi callback để xử lý tiếp (tạo order trong hệ thống)
        if (onSuccess) {
          onSuccess({
            transactionId,
            payerEmail: payerInfo.email_address,
            payerName:
              payerInfo.name?.given_name + ' ' + payerInfo.name?.surname,
            amount: usdAmount,
            details,
          })
        }
      } else {
        throw new Error('Payment not completed')
      }
    } catch (error) {
      console.error('PayPal capture error:', error)
      message.error('Lỗi xác nhận thanh toán PayPal')
      if (onError) onError(error)
    } finally {
      setLoading(false)
    }
  }

  // Xử lý khi hủy thanh toán
  const onCancelHandler = (data) => {
    message.info('Bạn đã hủy thanh toán PayPal')
    if (onCancel) onCancel(data)
  }

  // Xử lý lỗi
  const onErrorHandler = (err) => {
    console.error('PayPal error:', err)
    message.error('Có lỗi xảy ra với PayPal')
    if (onError) onError(err)
  }

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ marginBottom: 8, textAlign: 'center' }}>
        <p>
          Số tiền thanh toán: <strong>{amount?.toLocaleString()} VND</strong>
        </p>
        <p style={{ fontSize: 12, color: '#888' }}>
          ≈ ${usdAmount} USD (Tỷ giá: 1 USD = 26,000 VND)
        </p>
      </div>

      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onCancel={onCancelHandler}
          onError={onErrorHandler}
          disabled={loading}
          forceReRender={[usdAmount]}
        />
      </PayPalScriptProvider>
    </div>
  )
}

export default PayPalButton
