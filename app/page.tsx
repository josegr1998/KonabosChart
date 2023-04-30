import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { Homepage } from '@/components/Homepage/Homepage'
import { useHomepageData } from 'hooks/useHomepageData'
import {  useSearchParams } from 'next/navigation'
import { Layout } from '@/components/Layout/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

 return (
  <Layout>
   <Homepage/>   
  </Layout>
 )
}
