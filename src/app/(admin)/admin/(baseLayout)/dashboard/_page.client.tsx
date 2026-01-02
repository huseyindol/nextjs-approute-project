'use client'

import { Button } from '../../../../components/ui/button'
import { useCookie } from '../../../../context/CookieContext'
import { PageResponseType } from '../../../../types/BaseResponse'
import { fetcher } from '../../../../utils/services/fetcher'

const DashboardClientPage = () => {
  const { cookies } = useCookie()

  const getPages = async () => {
    const response = await fetcher<Promise<PageResponseType>>(
      'http://localhost:8080/api/v1/pages/home',
      {
        keepalive: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    console.log('response', response)
    const data = await response.data
    console.log('data', data)
  }

  return (
    <div>
      DashboardPage
      <hr />
      <Button onClick={() => console.log(cookies)}>Get Cookies</Button>
      <Button onClick={() => getPages()}>Get Pages</Button>
    </div>
  )
}

export default DashboardClientPage
