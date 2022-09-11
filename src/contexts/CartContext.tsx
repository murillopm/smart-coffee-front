import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'

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

type RecipesResponseData = {
  results: Recipe[]
}

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
  const [recipesList, setRecipesList] = useState<Recipe[]>([])
  async function fetchRecipes() {
    try {
      const { data } = await api.get<RecipesResponseData>('/recipes')
      setRecipesList(data.results)
    } catch (error: any) {
      console.log(error.response.data.error)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <CoffeeCartContext.Provider value={{ recipesList }}>
      {children}
    </CoffeeCartContext.Provider>
  )
}
