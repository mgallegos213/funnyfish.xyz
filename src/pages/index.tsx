import FishAndSharkScene from '@/components/three'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${inter.className} overflow-y-hidden`}>
      <Head>
        <title>FunnyFish.xyz -- Digital Aquarium</title>
      </Head>
      <div className="flex flex-row justify-between w-full">
        <section id="about" className="shrink-0">
          <h2>About FunnyFish.xyz</h2>
          <p className="max-w-sm">Welcome to FunnyFish.xyz, a delightful blend of humor, aquatic life, and blockchain technology. Dive deep into a world where you can collect, trade, and admire unique digital fish swimming gracefully in your personalized virtual aquarium. Harnessing the power of NFTs, FunnyFish.xyz is not just a visual treat; it's an investment, a hobby, and a testament to the future of digital collectibles!</p>
        </section>    
        <FishAndSharkScene />
      </div>
    </main>
  )
}
