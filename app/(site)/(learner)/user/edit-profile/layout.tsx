import Link from "next/link";


const EditLayoutPage = () => {
    return (
        <main className='py-6 px-6 w-full'>
            <div className='max-w-5xl w-full border h-20 mx-auto'>
                <div className='w-full h-full flex flex-col md:flex-row'>
                    <aside className="w-full md:w-72 bg-neutral-800 h-full shrink-0">
                        <Link
                            href="/user/edit-profile/basic"
                        >
                            Edit Profile
                        </Link>
                    </aside>
                </div>
            </div>
        </main>
    )
}

export default EditLayoutPage