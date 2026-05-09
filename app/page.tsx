import ColdOpen    from '@/components/scenes/ColdOpen'
import Experience  from '@/components/scenes/Experience'
import Stakes      from '@/components/scenes/Stakes'
import Engineer    from '@/components/scenes/Engineer'
import ProjectLog  from '@/components/scenes/ProjectLog'
import ProjectMeal from '@/components/scenes/ProjectMeal'
import ProjectNFT  from '@/components/scenes/ProjectNFT'
import Timeline    from '@/components/scenes/Timeline'
import Invitation  from '@/components/scenes/Invitation'
import Navbar      from '@/components/ui/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <ColdOpen />
      <Experience />
      <Stakes />
      <Engineer />
      <ProjectLog />
      <ProjectMeal />
      <ProjectNFT />
      <Timeline />
      <Invitation />
    </main>
  )
}
