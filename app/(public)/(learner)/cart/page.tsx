"use client";

import { Card } from "@/components/courses/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useSWRQuery } from "@/hooks/useSWRQuery";
import Image from "next/image";


const CartPage = () => {
    
    const { items, toggleItem } = useCart();
    
    return (
        <main className="w-full my-10 px-6">
            <div className="max-w-5xl w-full mx-auto">
                <h1 className="text-3xl font-bold text-zinc-700" >Shopping Cart</h1>
                { items.length === 0 && (
                    <div className="mt-20 space-y-6">
                        <div className="w-40 aspect-square mx-auto relative">
                            <Image
                                src="/assets/bag.png"
                                fill
                                alt=""
                                className="object-contain"
                            />
                        </div>
                        <p className="text-sm text-zinc-600 font-medium text-center">
                            Your cart is empty. Keep shopping to find a course!
                        </p>
                    </div>
                ) }
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {
                        items.map((item)=>(
                            <Card
                                course={item}
                                key={item.id}
                                remove
                                className="w-full md:w-full md:hover:scale-105 transition-all duration-300"
                            />
                        ))
                    }
                </section>
            </div>
        </main>
    )
}

export default CartPage;
