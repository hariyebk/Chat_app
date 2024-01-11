"use client"

import EmptyState from "@/components/EmptyState"

export default function page({params}: {params: {id: string}}) {
    return (
        <section className={`lg:pl-80 h-full lg:block ${params.id ? "block" : "hidden"}`}>
            <EmptyState />
        </section>
    )
}
