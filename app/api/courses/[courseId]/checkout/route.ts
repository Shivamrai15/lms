import Stripe from "stripe";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

import { v4 as uuidv4 } from "uuid";

export async function POST (
    req: Request,
    { params } : { params : { courseId : string } }
) {
    try {


        const session = await auth();
        if ( !session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized attempt", {status: 401});
        }

        const { coupon }  = await req.json();

        let discount = 0;


        const course =  await db.course.findUnique({
            where : {
                id : params.courseId,
                isPublished : true
            }
        });

        const purchase = await db.purchase.findUnique({
            where : {
                userId_courseId : {
                    userId : session.user.id,
                    courseId : params.courseId
                },
            }
        });

        if (purchase) {
            return new NextResponse("Already purchased", {status: 400});
        }

        if (!course) {
            return new NextResponse("Course not found", {status: 400});
        }

        if (coupon){
            const verifyCoupon = await db.coupon.findUnique({
                where : {
                    courseId_coupon : {
                        courseId : params.courseId,
                        coupon
                    }
                },
            });

            if (verifyCoupon && verifyCoupon.expires > new Date() ) {
                discount = verifyCoupon.discount
            }
        }

        const line_items : Stripe.Checkout.SessionCreateParams.LineItem[] = [{
            quantity : 1,
            price_data : {
                currency : "INR",
                product_data : {
                    name : course.title,
                    description: course.shortDescription!,
                    images : [course.image!]
                },
                unit_amount : (Math.floor(course.price!-((course.price!*discount)/100)))*100,
            },
        }];

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where : {
                userId : session.user.id
            },
            select : {
                stripeCustomerId: true
            }
        });

        
        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email : session.user.email||""
            });
            
            stripeCustomer = await db.stripeCustomer.create({
                data : {
                    userId : session.user.id,
                    stripeCustomerId : customer.id
                }
            });
        }
        

        const paymentSession = await stripe.checkout.sessions.create({
            customer : stripeCustomer.stripeCustomerId,
            line_items,
            mode : "payment",
            success_url : `${process.env.NEXT_PUBLIC_APP_URL}/course/${course.id}/view?paymentId=${uuidv4()}`,
            cancel_url : `${process.env.NEXT_PUBLIC_APP_URL}/course/${course.id}?cancel=1`,
            billing_address_collection : "required",
            metadata : {
                courseId : course.id,
                userId: session.user.id
            },
            currency : 'INR',
        });
    
        return NextResponse.json({ url: paymentSession.url });

        
    } catch (error) {
        console.error("COURSE CHECKOUT API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}