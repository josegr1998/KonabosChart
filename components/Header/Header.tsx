import Link from "next/link";
import { Container } from "../Container/Container"

export const Header = () => (
  <Container>
    <div>
      <div className='flex justify-between max-w-7xl mx-auto items-center py-2 border-b-2 w-full'>
        <Link className='w-20 h-20' href={'/'}>
          <img src='https://assets-us-01.kc-usercontent.com:443/1bfb8498-0a69-0062-41f9-7be1ab72379a/050f2be3-aa82-4198-b001-6073a0a64489/konabos-Vertical-Logo-high-res.png?w=112&h=112&fm=webp&' />
        </Link>
        <h2>KONABOS CHARTS</h2>
      </div>
    </div>
  </Container>
);
