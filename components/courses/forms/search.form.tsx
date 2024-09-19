import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Search } from 'lucide-react';


export const SearchForm = () => {
    return (
        <div className="max-w-6xl w-full mx-auto py-10 px-6">
            <div className="flex bg-white/60 focus-within:bg-white items-center h-14 md:h-20 rounded-full px-4 md:px-6 transition-all">
                <Search className='h-6 w-6 md:h-8 md:w-8 text-zinc-800' />
                <Input 
                    className="h-full bg-transparent outline-none placeholder:text-zinc-500 focus:placeholder:text-zinc-800 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 border-none md:text-lg font-medium text-zinc-800 transition-all"
                    placeholder='Search courses and keywords'
                />
                <Button
                    variant="secondary"
                    className='rounded-full h-8 w-8 md:h-16 md:w-16'
                >
                    <ChevronRight className='md:h-8 md:w-8 text-zinc-800' />
                </Button>
            </div>
        </div>
    )
}
