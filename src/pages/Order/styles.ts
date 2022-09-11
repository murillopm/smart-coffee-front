import styled from 'styled-components'

export const OrderPageWrapper = styled.div`
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 30px;
  position: relative;
`

export const BrandWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;

  img {
    height: 70px;
    width: 70px;
  }
`

export const BrandInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;

  p {
    font-size: 2rem;
    color: ${(props) => props.theme['brown-200']};
    letter-spacing: 2px;
  }

  span {
    font-size: 0.85rem;
    color: ${(props) => props.theme['brown-100']};
  }
`

export const Divider = styled.div`
  width: 100%;
  margin: 10px auto 0;
  border: 1px solid ${(props) => props.theme['gray-200']};
`

export const RecipesWrapper = styled.ul`
  margin-top: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
`

export const RecipeItem = styled.li`
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid ${(props) => props.theme['gray-250']};

  img {
    height: 60px;
    width: 60px;
  }
`

export const CoffeeDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  color: ${(props) => props.theme['brown-100']};
`

export const CoffeePreparationTime = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3px;
  font-size: 0.8125rem;
`

interface CheckboxButtonProps {
  isAllowed: boolean
}

export const CheckboxButton = styled.button<CheckboxButtonProps>`
  border: 0;
  cursor: ${(props) => (props.isAllowed ? 'pointer' : 'not-allowed')};
  background-color: transparent;
  margin-left: auto;
  color: ${(props) => props.theme['gray-200']};
`

export const ContinueButton = styled.button`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  border: 0;
  background-color: ${(props) => props.theme.blue};
  color: white;
  text-transform: uppercase;
  letter-spacing: 3px;
  transition: background-color 0.1s;
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme['blue-hover']};
  }
`
