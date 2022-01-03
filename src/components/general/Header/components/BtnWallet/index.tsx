import React, { useContext } from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'

// @ts-ignore
import * as style from './BtnWallet.module.scss'
import useAuth from '~hooks/useAuth'
import OverlayContext from '~contexts/OverlayContext'

type BtnWalletProps = {
  className?: string
  [otherProps: string]: any
}

const BtnWallet = (props: BtnWalletProps) => {
  const { className, ...rest } = props

  const { isLoggedIn, connect } = useAuth()

  if (isLoggedIn) return null

  const { addToastToStack } = useContext(OverlayContext)

  return (
    <Button
      {...rest}
      className={classNames(style.btnWallet, 'btn-adaptive-sm', className)}
      variant="outline-warning"
      onClick={() =>
        connect().catch(() => addToastToStack({ type: 'missingMetaMask' }))
      }
    >
      {isLoggedIn ? (
        <>
          <span>479.456</span>
          <span className={style.textCurrency}>PIXEL</span>
        </>
      ) : (
        <>Connect Wallet</>
      )}
    </Button>
  )
}

export default BtnWallet
