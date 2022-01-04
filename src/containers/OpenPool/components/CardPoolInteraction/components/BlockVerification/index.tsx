import React, { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
// import dayjs from 'dayjs'
import { Button } from 'react-bootstrap'
import { useWeb3React } from '@web3-react/core'

import * as style from './BlockVerification.module.scss'
// import CountdownTimer from '../CountdownTimer'

import OverlayContext from '~contexts/OverlayContext'
import { balanceOfPixels, TransferPixels, toWei, toEther } from '~utils/web3Instance'

type BlockVerificationProps = {
  className?: string
  updateStep: any
  handleLoading: any
  updateLoadingText: any
  [otherProps: string]: any
}

const BlockVerification = (props: BlockVerificationProps) => {
  const { className, updateStep, handleLoading, updateLoadingText, ...rest } = props
  const [usdtBalance, setusdtBalance] = useState('0.00')
  const { addToastToStack } = useContext(OverlayContext)
  const { account } = useWeb3React()

  useEffect(() => {
    if (account && usdtBalance === '0.00') {
      balanceOfPixels(account)
        .call()
        .then((erc: any) => {
          setusdtBalance(toEther(erc))
        })
        .catch((e: any) => console.log(e, 'erc balance not fetched'))
    }
  }, [account])

  const handleSendPixels = () => {
    if (process.env.GATSBY_PIXEL_RECEIVE_ADDRESS) {
      handleLoading(true)
      TransferPixels(process.env.GATSBY_PIXEL_RECEIVE_ADDRESS, toWei('500'))
        .send({
          from: account,
          gas: 3000000,
        })
        .on('transactionHash', (hash: any) => {
          console.log('transactionHash', hash)
          updateLoadingText(`Your transaction is pending on blockchain. \n It may take few seconds! \n Confirming`)
          addToastToStack({ type: 'pixelSuccess' })
        })
        .on("confirmation", function (confirmationNumber: any, receipt: any) {
          // console.log(confirmationNumber, receipt);
          //right after metamask is opened
          if(confirmationNumber === 1) {
            addToastToStack({ type: 'pixelConfirmation' })
            handleLoading(false)
            updateStep(3)
          }
        })
        .on('error', (error: any) => {
          console.log('error', error)
          addToastToStack({ type: 'pixelError', text: error?.message })
          handleLoading(false)
        })
    } else {
      addToastToStack({ type: 'envError' })
    }
  }
  return (
    <div {...rest} className={classNames(style.blockVerification, className)}>
      {/* <CountdownTimer
        heading="Sale will end in"
        endsAtTimestamp={dayjs().add(168523, 's').unix()}
      /> */}
      <h3 className={style.textCongrats}>
        <span>Participate in the sale!</span>
      </h3>
      {/* <p>
        You have won an allocation in the{' '}
        <span className={style.textPrimary}>PIXEL</span> public sale!
      </p>
      <p>
        If you want to participate in the{' '}
        <span className={style.textPrimary}>PIXEL</span> public sale you will
        need to <span className={style.textPrimary}>verify your identity</span>{' '}
        through <span className={style.textPrimary}>Synaps</span>!
      </p> */}
      <div className={style.cardFiguresTable}>
        <p className={style.textTableLabel}>
          Please Spend 500 Pixels to proceed with the transaction
        </p>
        {/* <table className={style.tablePrices}>
          <tbody>
            <tr>
              <td>Staking Pool Allocation</td>
              <td>
                500.00 <span className={style.textSecondary}>USDC</span>
              </td>
            </tr>
            <tr>
              <td>Social Pool Allocation</td>
              <td>
                0.00 <span className={style.textSecondary}>USDC</span>
              </td>
            </tr>
            <tr>
              <td>Token Price</td>
              <td>
                1 <span className={style.textSecondary}>PIXEL</span> = 4.00{' '}
                <span className={style.textSecondary}>SOL</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Your Total Allocation</td>
              <td>
                500.00 <span className={style.textCurrency}>USDC</span>
              </td>
            </tr>
          </tfoot>
        </table>
        <table className={style.tableTime}>
          <tr>
            <td>Open Time</td>
            <td>
              Mon, 06 Sep 2021,{' '}
              <span className={style.textSecondary}>15:00:00 GMT</span>
            </td>
          </tr>
          <tr>
            <td>Close Time</td>
            <td>
              Mon, 08 Sep 2021,{' '}
              <span className={style.textSecondary}>14:00:00 GMT</span>
            </td>
          </tr>
        </table> */}
        {parseInt(usdtBalance) < 500 &&
        <p className={style.textNotVerified}>Low pixel balance</p> }
        <Button
          variant="outline-warning"
          onClick={handleSendPixels}
          className={style.btnVerify}
          disabled={parseInt(usdtBalance) > 500 ? false : true}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default BlockVerification
