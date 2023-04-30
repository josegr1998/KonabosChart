import { Inter } from 'next/font/google'
import { Homepage } from '@/components/Homepage/Homepage'
import { Layout } from '@/components/Layout/Layout'

export const revalidate = 60
export const cache = 'no-store'

export default async function Home({ params,searchParams }) {

 return (
  <Layout>
   {/* @ts-expect-error Server Component */}
   <Homepage params={searchParams}/>   
  </Layout>
 )
}
