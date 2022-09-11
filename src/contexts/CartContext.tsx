import { createContext, ReactNode } from 'react'

type Ingredient = {
  ingredient_id: number
  ingredient_name: string
  ingredient_preparation_time: number
  ingredient_photo: string
}

type Recipe = {
  recipe_id: number
  recipe_name: string
  recipe_photo: string
  ingredients: Ingredient[]
}

// type RecipesResponseData = {
//   results: Recipe[]
// }

interface CoffeeCartContextType {
  recipesList: Recipe[]
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CoffeeCartContext = createContext({} as CoffeeCartContextType)

export function CoffeeCartContextProvider({
  children,
}: CartContextProviderProps) {
  return (
    <CoffeeCartContext.Provider value={{ recipesList: [] }}>
      {children}
    </CoffeeCartContext.Provider>
  )
}
