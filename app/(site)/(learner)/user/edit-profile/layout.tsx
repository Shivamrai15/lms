import { EditItems } from "@/components/account/edit-items";


interface EditLayoutPageProps {
    children: React.ReactNode;
}

const EditLayoutPage = ({
    children
} : EditLayoutPageProps ) => {

    return (
        <main className='py-10 md:py-20 px-6 w-full'>
            <div className='max-w-5xl w-full h-full mx-auto'>
                <div className='w-full h-full bg-neutral-800 flex flex-col md:flex-row'>
                    <aside className="w-full md:w-72 bg-neutral-800 h-full shrink-0">
                        <EditItems/>
                    </aside>
                    <section className="w-full bg-white flex-1 border-2 border-zinc-400 border-l-0">
                        {
                            children
                        }
                    </section>
                </div>
            </div>
        </main>
    )
}

export default EditLayoutPage