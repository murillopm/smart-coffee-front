import { ArrowCounterClockwise } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrandHeader } from '../../components/BrandHeader'
import { CoffeeCartContext } from '../../contexts/CartContext'
import { convertCoffeePreparationTimeToString } from '../../utils/CoffeePreparationToString'
import {
  ButtonsWrapper,
  CompletedPreparationInformation,
  CouponCodeBox,
  OrderInformationWrapper,
  OrderTimeLeftInformation,
  PrintCouponButton,
  RepeatButton,
  SuccessPageWrapper,
  SuccessTitle,
} from './styles'

import { differenceInSeconds } from 'date-fns'

export function Success() {
  const { activeUser, coffeeCart, clearUserData } =
    useContext(CoffeeCartContext)
  const [secondsPassed, setSecondsPassed] = useState(0)
  const navigate = useNavigate()

  const totalPreparationTime = coffeeCart.reduce((acc, coffee) => {
    const regularCoffeeTime = coffee.ingredients.reduce(
      (ingredientAcc, ingredient) => {
        return ingredientAcc + ingredient.ingredient_preparation_time
      },
      0,
    )
    const complementsAdditionalTime = coffee.complements.reduce(
      (ingredientAcc, ingredient) => {
        return ingredientAcc + ingredient.ingredient_preparation_time
      },
      0,
    )
    return acc + (regularCoffeeTime + complementsAdditionalTime)
  }, 0)

  useEffect(() => {
    let interval: number
    const initialTime = new Date()
    if (!activeUser) {
      navigate('/', { replace: true })
    } else {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), initialTime)
        if (secondsDifference >= totalPreparationTime) {
          setSecondsPassed(totalPreparationTime)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [navigate, activeUser, totalPreparationTime])

  const timeLeft = totalPreparationTime - secondsPassed

  function handleRepeatAction() {
    clearUserData()
    navigate('/', { replace: true })
  }

  const successMessage =
    coffeeCart.length === 0
      ? 'Uma pena que você não tomou um de nossos cafés. Fica para uma próxima!'
      : 'Seu pedido já se encontra pronto para ser retirado. Obrigado pela confiança!'

  return (
    <SuccessPageWrapper>
      <BrandHeader />
      <OrderInformationWrapper>
        {timeLeft !== 0 ? (
          <>
            <SuccessTitle>Pedido realizado com sucesso!</SuccessTitle>
            <OrderTimeLeftInformation>
              <p>{convertCoffeePreparationTimeToString(timeLeft)}</p>
              <span>tempo restante para ficar pronto</span>
            </OrderTimeLeftInformation>
          </>
        ) : (
          <CompletedPreparationInformation>
            {successMessage}
          </CompletedPreparationInformation>
        )}
        <CouponCodeBox>{activeUser?.couponCode}</CouponCodeBox>
      </OrderInformationWrapper>
      <ButtonsWrapper>
        <RepeatButton onClick={handleRepeatAction}>
          <ArrowCounterClockwise size={32} weight="bold" color="white" />
        </RepeatButton>
        <PrintCouponButton onClick={() => console.log('impresso')}>
          Imprimir cupom
        </PrintCouponButton>
      </ButtonsWrapper>
    </SuccessPageWrapper>
  )
}
