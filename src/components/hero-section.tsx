import Button from '@/components/button'

// Single Responsibility: Hero section handles only the main landing content
export default function HeroSection (): React.ReactNode {
  return (
    <section id='hero' className='bg-white py-16 lg:py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
            Adoptez votre <span className='text-moccaccino-600'>petit monstre</span>
            <br />
            et vivez une aventure <span className='text-lochinvar-600'>magique</span>
          </h1>
          <p className='text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
            Découvrez l'univers enchanteur de Tamagotcho où des créatures adorables n'attendent que vos soins et votre amour.
            Nourrissez, jouez et regardez grandir votre compagnon virtuel dans cette expérience unique !
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' variant='primary'>
              Commencer l'aventure
            </Button>
            <Button size='lg' variant='outline'>
              Découvrir le jeu
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
