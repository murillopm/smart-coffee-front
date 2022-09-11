import {
  BrandInfoWrapper,
  BrandWrapper,
  CheckboxButton,
  CoffeeDetails,
  CoffeePreparationTime,
  ContinueButton,
  Divider,
  OrderPageWrapper,
  RecipeItem,
  RecipesWrapper,
} from './styles'
import expressoImg from '../../assets/images/coffee.svg'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { CheckCircle, Circle, ClockClockwise } from 'phosphor-react'

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

export function Order() {
  const [recipesList, setRecipesList] = useState<Recipe[]>([])
  const [selectedRecipesIds, setSelectedRecipesIds] = useState<number[]>([1])

  const maxRecipesToBeSelected = 2
  const isRecipeAdditionAllowed =
    selectedRecipesIds.length < maxRecipesToBeSelected

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

  function calculateCoffeePreparationTime(ingredients: Ingredient[]) {
    const totalSeconds = ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.ingredient_preparation_time
    }, 0)

    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (totalSeconds % 60).toString().padStart(2, '0')

    return minutes + ':' + seconds + ' min'
  }

  function isRecipeSelected(recipeId: number) {
    return selectedRecipesIds.findIndex((recipe) => recipe === recipeId) !== -1
  }

  function handleCheckboxClick(recipeId: number) {
    const isRecipeAlreadySelected = selectedRecipesIds.find(
      (recipe) => recipe === recipeId,
    )
    if (isRecipeAlreadySelected) {
      const newSelectedRecipesArray = selectedRecipesIds.filter(
        (item) => item !== recipeId,
      )
      setSelectedRecipesIds(newSelectedRecipesArray)
    } else {
      if (isRecipeAdditionAllowed) {
        setSelectedRecipesIds((state) => [...state, recipeId])
      }
    }
  }

  return (
    <OrderPageWrapper>
      <BrandWrapper>
        <img src={expressoImg} alt="" />
        <BrandInfoWrapper>
          <p>Smart Coffee</p>
          <span>by Alboom</span>
        </BrandInfoWrapper>
      </BrandWrapper>
      <Divider />
      <RecipesWrapper>
        {recipesList.map((recipe) => (
          <RecipeItem key={recipe.recipe_id}>
            <img src={`./src/assets/${recipe.recipe_photo}`} alt="" />
            <CoffeeDetails>
              <p>{decodeURIComponent(escape(recipe.recipe_name))}</p>
              <CoffeePreparationTime>
                <ClockClockwise size={15} />
                {calculateCoffeePreparationTime(recipe.ingredients)}
              </CoffeePreparationTime>
            </CoffeeDetails>
            <CheckboxButton
              onClick={() => handleCheckboxClick(recipe.recipe_id)}
              isAllowed={
                isRecipeSelected(recipe.recipe_id) || isRecipeAdditionAllowed
              }
            >
              {isRecipeSelected(recipe.recipe_id) ? (
                <CheckCircle size={40} weight="fill" color="#4ED9A6" />
              ) : (
                <Circle size={40} />
              )}
            </CheckboxButton>
          </RecipeItem>
        ))}
      </RecipesWrapper>
      <ContinueButton>Continuar</ContinueButton>
    </OrderPageWrapper>
  )
}
