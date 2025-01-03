import { useState } from 'react'
import { Wand2 } from 'lucide-react'
import { Modal } from '../components/Modal'
import { Button } from '../components/Button'
import ImageGenerator from '../components/ImageGenerator'

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
        <Button onClick={() => setIsModalOpen(true)}>
          <Wand2 className="h-5 w-5 mr-2" />
          Generate Image
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ImageGenerator />
      </Modal>
    </div>
  )
}