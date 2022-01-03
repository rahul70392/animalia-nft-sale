import React, { FC, ChangeEvent, useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useMutation } from 'react-query'

import ModalWrapper from '~components/ui/ModalWrapper'
import InputWithLabel from '~components/ui/InputWithLabel'
import * as style from './BidModal.module.scss'
import { maskNumberValue } from '~utils'
import {
  ApiKey,
  approvePurchase,
  purchaseAuction,
  sendMultipleTransaction,
  sendPost,
  sendTransaction,
  waitForTransactionReceipt,
} from '~utils/api'
import OverlayContext from '~contexts/OverlayContext'

type BidModalProps = {
  id: number
  startPrice?: number
  isVisible: boolean
  onHide: () => void
  price: number
  currencyName: string
  isApproved: boolean
  setIsApproved: Function
  variant: 'purchase' | 'bid'
}

const BidModal: FC<BidModalProps> = ({
  id,
  startPrice = 13.4627,
  price,
  currencyName,
  variant,
  isVisible,
  onHide,
  isApproved,
  setIsApproved,
}) => {
  const minBid = startPrice

  const { addToastToStack } = useContext(OverlayContext)

  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm({
    defaultValues: { bidAmount: '' },
  })

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = methods

  const bidAmount = watch(['bidAmount'])

  const handleMinBidClick = () => {
    setValue('bidAmount', minBid.toString())
  }

  const onSubmitBid = async () => {
    try {
      const { data } = await sendPost('auction/bid', {
        auctionId: id,
        price: bidAmount,
      })
      const txHash = await sendMultipleTransaction(
        data.approveData,
        data.bidData
      )
      console.log('Approved txHash:', txHash)
      onHide()
    } catch (e) {
      console.log(e)
    }
  }

  const purchaseAndConfirm = (data: any) => {
    sendTransaction(data)
      .then(() => {
        addToastToStack({ type: 'purchaseSuccess' })
        onHide()
      })
      .catch((e) => {
        addToastToStack({ type: 'purchaseError', text: e?.message })
        console.log(e)
      })
      .finally(() => setIsLoading(false))
  }

  const purchaseMutation = useMutation(
    [ApiKey.AUCTION_PURCHASE, id],
    () => purchaseAuction(id),
    {
      onSuccess: purchaseAndConfirm,
      onError: () => setIsLoading(false),
    }
  )

  const approveMutation = useMutation(
    [ApiKey.PURCHASE_APPROVE, id],
    () => approvePurchase(id),
    {
      onSuccess: (data) => {
        sendTransaction(data)
          .then((txHash) => {
            waitForTransactionReceipt(txHash).then((result: any) => {
              if (result?.status === '0x1') {
                addToastToStack({ type: 'approveSuccess' })
                setIsApproved(true)
                purchaseMutation.mutate()
              } else {
                addToastToStack({ type: 'approveError' })
              }
            })
          })
          .catch((e) => {
            addToastToStack({ type: 'approveError', text: e?.message })
            setIsLoading(false)
            console.log(e)
          })
      },
      onError: () => setIsLoading(false),
    }
  )

  const onSubmitPurchase = () => {
    setIsLoading(true)
    approveMutation.mutate()
  }

  const isPurchase = variant === 'purchase'
  const isBid = variant === 'bid'

  return (
    <ModalWrapper
      title={isPurchase ? 'Buy Now' : 'Place a bid'}
      show={isVisible}
      onHide={onHide}
      contentClassName={style.modalContent}
      isShort
      backdrop="static"
      isLoading={isLoading}
      loadingText={!isApproved ? 'Approving' : 'Purchasing'}
    >
      <Modal.Body
        as="form"
        id="form-personal-info"
        onSubmit={handleSubmit(isPurchase ? onSubmitPurchase : onSubmitBid)}
        className={style.body}
      >
        <table className={style.details}>
          <tbody>
            <tr className={style.detailsRow}>
              <td>{isPurchase ? 'Price' : 'You must bid at least'}</td>
              <td>
                {price} {currencyName}
              </td>
            </tr>
          </tbody>
        </table>
        {isBid && (
          <div className={style.inputRow}>
            <Controller
              name="bidAmount"
              control={control}
              rules={{
                required: 'Please, specify the bid amount',
                min: {
                  value: minBid,
                  message: 'Your bid must be higher than the minimum bid',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <InputWithLabel
                  id="inp-bid"
                  name="bidAmount"
                  value={value}
                  placeholder="Enter your bid"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChange(maskNumberValue(e.target.value))
                  }
                  errors={errors}
                  autoComplete="off"
                />
              )}
            />
            <Button
              variant="outline-danger"
              className={style.btnMinBid}
              onClick={handleMinBidClick}
              disabled={minBid.toString() === bidAmount.toString()}
            >
              Min Bid
            </Button>
          </div>
        )}
        {/* TODO: post-MVP */}
        {/* <hr className={style.divider} /> */}
        {/* <table className={style.details}> */}
        {/*  <tbody> */}
        {/*    <tr className={style.detailsRow}> */}
        {/*      <td>Your Balance</td> */}
        {/*      <td>200.3743423 TRAIL</td> */}
        {/*    </tr> */}
        {/*    <tr className={style.detailsRow}> */}
        {/*      <td>{isPurchase ? 'Conversion' : 'Bid Conversion'}</td> */}
        {/*      <td> */}
        {/*        {price} {currencyName} */}
        {/*      </td> */}
        {/*    </tr> */}
        {/*    <tr className={style.detailsRow}> */}
        {/*      <td>After Payment</td> */}
        {/*      <td>198.8911423 TRAIL</td> */}
        {/*    </tr> */}
        {/*  </tbody> */}
        {/* </table> */}
      </Modal.Body>
      <Modal.Footer className={style.footer}>
        <Button
          form="form-personal-info"
          type="submit"
          variant="outline-success"
          className={style.btnRegister}
          size="lg"
        >
          {isPurchase ? 'Approve & Buy Now' : 'Place a Bid'}
        </Button>
        <p className={style.notice}>
          Please, keep this tab open until your purchase transaction is send for
          processing
        </p>
      </Modal.Footer>
      <DevTool control={control} />
    </ModalWrapper>
  )
}

export default BidModal
