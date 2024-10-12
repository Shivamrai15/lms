"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { LuSearch } from "react-icons/lu";
import { useDebounce } from "@/hooks/use-search-debounce";

const SearchPageForm = () => {


    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const searchQuery = searchParams.get("query");

    const [ query, setQuery ] = useState(searchQuery ? searchQuery :"");
    const debounceValue = useDebounce(query, 500);

    useEffect(()=>{
        router.push(`/search?query=${debounceValue}`);

    }, [debounceValue, router, pathname])
    
    return (
        <div className="max-w-lg w-full h-16 rounded-full bg-neutral-100 flex items-center px-6 shadow-sm border">
            <LuSearch className="h-5 w-5 text-zinc-800" />
            <Input 
                className="bg-transparent border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-700 font-medium"
                placeholder='Search courses and keywords'
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
            />
        </div>
    )
}

export default SearchPageForm