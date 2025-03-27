import React from 'react'

export default function Category({ categories, handleSelectedCategory, selectedCategory }) {
    return (
        <div className="md:size-max w-full flex gap-4 flex-wrap md:flex-2">
            {categories.map(category => (
                <h3
                    key={category.id}
                    onClick={() => handleSelectedCategory(category.id)}
                    className={`cursor-pointer mb-0 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md
                        ${selectedCategory === category.id ? 'bg-green-600' : 'bg-gray-800'}
                        hover:bg-green-600 text-white`}
                    >{category.name}</h3>
            ))}
        </div>
    )
}