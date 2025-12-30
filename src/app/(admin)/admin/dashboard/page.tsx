import { cookies } from 'next/headers'
import { PageResponseType } from '../../../../types/BaseResponse'
import { CookieEnum } from '../../../../utils/constant/cookieConstant'
import { fetcher } from '../../../../utils/services/fetcher'
import DashboardClientPage from './page.client'

async function DashboardPage() {
  const cookiesStore = await cookies()
  const accessToken = cookiesStore.get(CookieEnum.ACCESS_TOKEN)
  const response = await fetcher<Promise<PageResponseType>>(
    'http://localhost:8080/api/v1/pages/home',
    {
      keepalive: true,
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && {
          Authorization: `Bearer ${accessToken.value}`,
        }),
      },
    },
  )
  const data = await response.data
  return <DashboardClientPage />
}

export default DashboardPage
