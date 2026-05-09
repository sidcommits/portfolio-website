import ColdOpen  from '@/components/scenes/ColdOpen'
import Stakes    from '@/components/scenes/Stakes'
import Engineer  from '@/components/scenes/Engineer'
import Navbar    from '@/components/ui/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <ColdOpen />
      <Stakes />
      <Engineer />
    </main>
  )
}
