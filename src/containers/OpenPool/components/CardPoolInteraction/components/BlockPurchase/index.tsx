import React, { useState, useContext, useEffect } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { Button } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useWeb3React } from '@web3-react/core'

import * as style from './BlockPurchase.module.scss'
import CountdownTimer from '~containers/OpenPool/components/CardPoolInteraction/components/CountdownTimer'
import InputWithLabel from '~components/ui/InputWithLabel'
import Icon from '~components/ui/Icon'
import ModalContribution from '~containers/OpenPool/components/CardPoolInteraction/components/ModalContribution'
import { convertCurrencies, maskNumberValue } from '~utils'

import OverlayContext from '~contexts/OverlayContext'
import {
  balanceOfUSDT,
  TransferUSDT,
  toWei,
  toEther,
} from '~utils/web3Instance'

type BlockPurchaseProps = {
  className?: string
  tempPoolId: number
  updateStep: any
  handleLoading: any
  updateLoadingText: any
  [otherProps: string]: any
}

const BlockPurchase = (props: BlockPurchaseProps) => {
  const { className, tempPoolId, updateStep, handleLoading, updateLoadingText, ...rest } = props

  const { addToastToStack } = useContext(OverlayContext)
  const { account } = useWeb3React()
  const [usdtTxHash, setusdtTxHash] = useState('')
  const [usdtBalance, setusdtBalance] = useState('0.00')
  const [isContributionModalVisible, setIsContributionModalVisible] =
    useState(true)

  const hideContributionModal = () => setIsContributionModalVisible(false)

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm()

  useEffect(() => {
    if (account && usdtBalance === '0.00') {
      balanceOfUSDT(account)
        .call()
        .then((erc: any) => {
          setusdtBalance(toEther(erc))
        })
        .catch((e: any) => console.log(e, 'erc balance not fetched'))
    }
  }, [account])

  const onSubmit = (data: any) => {
    if (process.env.GATSBY_USDT_RECEIVE_ADDRESS) {
      updateLoadingText('Loading')
      handleLoading(true)
      TransferUSDT(
        process.env.GATSBY_USDT_RECEIVE_ADDRESS,
        toWei(data.buyWithAmount.toString())
      )
        .send({
          from: account,
          gas: 3000000,
        })
        .on('transactionHash', (hash: any) => {
          setusdtTxHash(hash)
          addToastToStack({ type: 'pixelSuccess' })
          handleLoading(false)
          updateStep(5)
        })
        .on("confirmation", function (confirmationNumber: any, receipt: any) {
          // console.log(confirmationNumber, receipt);
          //right after metamask is opened
          if(confirmationNumber === 1) {
            addToastToStack({ type: 'pixelConfirmation' })
            handleLoading(false)
            updateStep(7)

            setTimeout(() => {
              updateStep(8)
            }, 2000)
          }
        })
        .on('error', (error: any) => {
          addToastToStack({ type: 'pixelError', text: error?.message })
          handleLoading(false)
        })
    } else {
      addToastToStack({ type: 'envError' })
    }
  }

  const maxValueUSDT = process.env.GATSBY_NFT_LIMIT ? parseInt(process.env.GATSBY_NFT_LIMIT) : 80
  // const maxValuePIXEL = convertCurrencies(maxValueUSDT, 'USDT', 'ANIMALIA')

  const [buyWithAmount] = watch(['buyWithAmount'])

  // const setMaxContributionValue = () => {
  //   clearErrors()
  //   setValue('buyWithAmount', maxValueUSDT)
  //   setValue('receiveAmount', maxValuePIXEL)
  // }

  /* Mask input "Amount From" and set input "Amount To" */
  const transformAmountFrom = (e: any) => {
    const valueNumeric = maskNumberValue(e.target.value)

    const valueTo = convertCurrencies(valueNumeric, 'USDT', 'ANIMALIA')

    setValue('receiveAmount', valueTo)

    return valueNumeric
  }

  /* Mask input "Amount To" and set input "Amount From" */
  const transformAmountTo = (e: any) => {
    const toValue = e.target.value
    if (parseInt(toValue) > maxValueUSDT) {
      setError("receiveAmount", {
        type: "manual",
        message: `Maximum limit for buying is ${maxValueUSDT} NFTS`
      })
    } else {
      clearErrors()
    }

    if (toValue.indexOf('.') !== -1) {
      return toValue.slice(0, -1)
    }

    const valueNumeric = maskNumberValue(toValue)

    const valueFrom = convertCurrencies(valueNumeric, 'ANIMALIA', 'USDT')

    setValue('buyWithAmount', valueFrom)

    return valueNumeric
  }

  return (
    <div {...rest} className={classNames(style.blockPurchase, className)}>
      <ModalContribution
        tempPoolId={tempPoolId}
        amount={buyWithAmount}
        usdtTxHash={usdtTxHash}
        isVisible={
          isContributionModalVisible && [4, 5, 6, 7, 8].includes(tempPoolId)
        }
        onHide={hideContributionModal}
      />
      <CountdownTimer
        heading="Sale will end in"
        endsAtTimestamp={dayjs("2022-01-05 11:00:00").add(5.50, 'hour').unix()}
      />
      <p className={style.textVerified}>
        Your Pixel Purchase has been verified.
        <br />
        Please, do not refresh this page before buying the NFT, else you will need to spend the pixel tokens again.
      </p>
      <h3 className={style.textTitle}>Animalia NFT</h3>
      <p className={style.textDescription}>
        Buy your Animalia NFT on the Binance smart chain blockchain with USDT 
        <br />
        {/* Your total allocation 472.93 USDT */}
      </p>
      <form className={style.cardPurchase} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.gridInputs}>
          <p className={style.textBalance}>
            Balance: <span className={style.textPrimary}>{usdtBalance}</span>
          </p>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor="inp-pixel-lp"
            className={classNames(style.gridLabel, style.labelBuyWith)}
          >
            <img src="/usdt.png" alt="Token" className={style.imgToken} />
            <p className={style.textBuyWith}>Buy with</p>
            <p className={style.textTokenName}>USDT</p>
          </label>
          <Controller
            name="buyWithAmount"
            control={control}
            // rules={{
            //   required: 'Please, specify the contribution amount',
            //   min: {
            //     value: 2,
            //     message: 'The contribution amount is too small',
            //   },
            //   max: {
            //     value: maxValueUSDT,
            //     message: 'Maximum contribution amount is 75,000.00',
            //   },
            // }}
            render={({ field: { onChange, ...fieldProps } }) => (
              <div className={style.inputWrapper}>
                <InputWithLabel
                  {...fieldProps}
                  id="inp-usdt"
                  variant="calculator"
                  inputMode="decimal"
                  placeholder="0.00"
                  // max={75000}
                  onChange={(e: any) => onChange(transformAmountFrom(e))}
                  autoComplete="off"
                  errors={errors}
                  disabled
                />
                {/* <button
                  type="button"
                  className={classNames(style.btnMax, {
                    // eslint-disable-next-line eqeqeq
                    [style.isMax]: maxValueUSDT == buyWithAmount,
                  })}
                  title="Set contribution amount to the max"
                  onClick={setMaxContributionValue}
                >
                  MAX
                </button> */}
              </div>
            )}
          />
          <Icon
            name="icon-calculator-arrow-down"
            size={16}
            className={style.iconArrowDown}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor="inp-pixel-lp"
            className={classNames(style.gridLabel, style.labelReceive)}
          >
            <img
              src="/Animalia_Stamp 1.png"
              alt="Token"
              className={style.imgTokenAni}
            />
            <p className={style.textBuyWith}>Receive</p>
            <p className={style.textTokenName}>ANIMALIA</p>
          </label>
          <Controller
            name="receiveAmount"
            control={control}
            rules={{
              required: 'Please, specify the contribution amount',
              min: {
                value: 1,
                message: 'The contribution amount is too small',
              },
              max: {
                value: maxValueUSDT,
                message: `Maximum limit for buying is ${maxValueUSDT} NFTS`,
              },
            }}
            render={({ field: { onChange, ...fieldProps } }) => (
              <div className={style.inputWrapper}>
                <InputWithLabel
                  {...fieldProps}
                  id="inp-pixel"
                  variant="calculator"
                  placeholder="0.00"
                  min={2}
                  max={80}
                  inputMode="number"
                  className={style.inp}
                  onChange={(e: any) => onChange(transformAmountTo(e))}
                  step={1}
                  autoComplete="off"
                  errors={errors}
                />
              </div>
            )}
          />
        </div>
        {[8, 9].includes(tempPoolId) ? (
          <div className={style.blockAllocationFilled}>
            You 100% filled your allocation
          </div>
        ) : (
          <Button
            variant="outline-success"
            size="lg"
            className={style.btnPurchase}
            type="submit"
          >
            Buy ANIMALIA
          </Button>
        )}
        <table className={style.tableFigures}>
          <tbody>
            <tr>
              <td>Rate</td>
              <td>
                1 <span className={style.textSecondary}>ANIMALIA</span> = 870{' '}
                <span className={style.textSecondary}>USDT</span>
              </td>
            </tr>
            {/* <tr>
              <td>Your contribution</td>
              <td>
                1,740 <span className={style.textSecondary}>USDT</span>
              </td>
            </tr>
            <tr>
              <td>Purchased NFTs</td>
              <td>
                2 <span className={style.textSecondary}>ANIMALIA</span>
              </td>
            </tr>
            <tr>
              <td className={style.tdAlignTop}>NFT distibution</td>
              <td>
                Mon, 08 Sep 2021, <br className={style.tableLinebreak} />
                <span className={style.textSecondary}>14:00:00 GMT</span>
              </td>
            </tr> */}
          </tbody>
        </table>
        <DevTool control={control} />
      </form>
    </div>
  )
}

export default BlockPurchase
