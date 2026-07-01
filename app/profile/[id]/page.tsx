
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className='flex flex-col items-center justify-center h-screen relative '>
      <h1 className='text-2xl font-bold'>profile page {id}</h1>
    </div>
  )
}

