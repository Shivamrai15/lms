import Image from 'next/image'

const ViewCoursePage = () => {
    return (
        <div className='h-full w-full flex items-center justify-center'>
            <div className='max-w-md w-full aspect-square relative'>
                <Image
                    src="/assets/7712733_3714961.svg"
                    fill
                    alt='Image'
                />
            </div>
        </div>
    )
}

export default ViewCoursePage