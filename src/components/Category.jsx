import React from 'react'

export default function Category({ categories, handleSelectedCategory }) {
    return (
        <aside className="p-6 md:size-max w-full md:order-last flex flex-col">
            <h2 className="text-2xl font-bold mb-6">Categories</h2>
            <nav className="space-y-4 w-full">
                {categories.map(category => (
                    <h3
                        key={category.id}
                        onClick={() => handleSelectedCategory(category.id)}
                        className="block cursor-pointer py-2 px-4 hover:bg-gray-700 rounded">{category.name}</h3>
                ))}
            </nav>
        </aside>
    )
}
