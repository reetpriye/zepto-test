'use client'
import React, { useState, ChangeEvent } from 'react'

const InputComponent: React.FC = () => {
  type personType = {
    name: string
    email: string
    image?: string
  }

  const persons: personType[] = [
    {
      name: 'Naruto',
      email: 'naruto@zepto.com',
      image: '/images/1.png'
    },
    {
      name: 'Tanjiro',
      email: 'tanjiro@zepto.com',
      image: '/images/2.png'
    },
    {
      name: 'Zenitsu',
      email: 'zenitsu@zepto.com',
      image: '/images/3.png'
    },
    {
      name: 'Yamada',
      email: 'yamada@zepto.com',
      image: '/images/4.png'
    },
    {
      name: 'Itadori',
      email: 'itadori@zepto.com',
      image: '/images/5.png'
    },
    {
      name: 'Nezuko',
      email: 'nezuko@zepto.com',
      image: '/images/6.png'
    },
    {
      name: 'Yuki',
      email: 'yuki@zepto.com',
      image: '/images/7.png'
    },
    {
      name: 'Inosuke',
      email: 'inosuke@zepto.com',
      image: '/images/8.png'
    },
    {
      name: 'Rengoku',
      email: 'rengoku@zepto.com',
      image: '/images/9.png'
    },
    {
      name: 'Nanami',
      email: 'nanami@zepto.com',
      image: '/images/10.png'
    }
  ]

  const [items, setItems] = useState<personType[]>(persons)
  const [selectedItems, setSelectedItems] = useState<personType[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [lastIndex, setLastIndex] = useState<number>(-1)
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const handleSelect = (person: personType) => {
    if (!selectedItems.includes(person)) {
      setSelectedItems([...selectedItems, person])
      setItems(items.filter(item => item !== person))
      setInputValue('')
      //   input focus
      const input = document.querySelector('input')
      input?.focus()
    }
  }

  const handleRemove = (person: personType) => {
    setSelectedItems(selectedItems.filter(item => item !== person))
    setItems([...items, person])
    const input = document.querySelector('input')
    input?.focus()
  }

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (lastIndex === -1) {
        setLastIndex(selectedItems.length - 1)
      } else {
        handleRemove(selectedItems[lastIndex])
        setLastIndex(-1)
      }
    }
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <div className='relative flex flex-wrap border-b-4 border-red-700 bg-slate-100 min-h-14 lg:max-w-[1100px] w-full'>
      {selectedItems.map((person, index) => (
        <div
          key={index}
          className={`flex gap-2 items-center justify-between p-2 m-2 bg-gray-200 rounded-md text-gray-500 border-2  ${
            lastIndex === index ? 'border-red-500' : ''
          }`}
        >
          <div className='flex items-center'>
            <img
              className='w-8 h-8 rounded-full'
              src={person.image}
              alt='avatar'
            />
            <span className='ml-2 font-semibold '>{person.name}</span>
          </div>
          <button onClick={() => handleRemove(person)} className='px-0.5'>
            X
          </button>
        </div>
      ))}

      <div className='relative'>
        <div className='absolute'>
          <input
            className='p-2 m-2 bg-gray-200 bg-transparent focus:outline-none'
            type='text'
            placeholder='Add new user'
            value={inputValue}
            onKeyDown={handleBackspace}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value)
            }}
            onFocus={() => setIsClicked(true)}
          />

          {isClicked && (
            <div className='flex flex-col overflow-y-auto h-48'>
              {filteredItems.map((person, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-2 bg-gray-200 cursor-pointer hover:bg-gray-300'
                  onClick={() => handleSelect(person)}
                >
                  <div
                    className='flex items-center text-gray-500 justify-around rounded-full hover:bg-gray-300'
                    style={{ minWidth: '320px' }}
                  >
                    <img
                      className='w-8 h-8 rounded-full'
                      src={person.image}
                      alt='avatar'
                    />
                    <span className='font-semibold'>{person.name}</span>
                    <span className='text-xs text-gray-400'>
                      {person.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InputComponent
