import ColdOpen    from '@/components/scenes/ColdOpen'
import Stakes      from '@/components/scenes/Stakes'
import Engineer    from '@/components/scenes/Engineer'
import ProjectLog  from '@/components/scenes/ProjectLog'
import ProjectMeal from '@/components/scenes/ProjectMeal'
import ProjectNFT  from '@/components/scenes/ProjectNFT'
import Navbar      from '@/components/ui/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <ColdOpen />
      <Stakes />
      <Engineer />
      <ProjectLog />
      <ProjectMeal />
      <ProjectNFT />
    </main>
  )
}
