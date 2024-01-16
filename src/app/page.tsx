import InputComponent from '@/components/InputComponent'

export default function Home() {
  return (
    <div className='flex flex-col bg-gray-900 items-center p-10 h-full gap-10 text-black'>
      <h1 className='text-white text-3xl'>Pick Users</h1>
      <InputComponent />
    </div>
  )
}
