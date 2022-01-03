import React, { useState } from 'react'
import classNames from 'classnames'
import { Button, Spinner } from 'react-bootstrap'

import * as style from './CardPoolInteraction.module.scss'
import LaunchProgress from '../LaunchProgress'
// import BlockPeople from '../BlockPeople'
import BlockVerification from './components/BlockVerification'
import BlockPurchase from './components/BlockPurchase'
import useAuth from '~hooks/useAuth'

type CardPoolInteractionProps = {
  className?: string
  updateStep: any
  isSaleEnded: any
  isLoading: boolean
  handleLoading: any
  tempPoolId: number
  [otherProps: string]: any
}

const CardPoolInteraction = (props: CardPoolInteractionProps) => {
  const {
    className,
    updateStep,
    isSaleEnded = false,
    isLoading = false,
    handleLoading,
    extraText = `Please, keep this tab open.`,
    tempPoolId: poolIdStr,
    ...rest
  } = props

  const { isLoggedIn, connect } = useAuth()
  const [loadingText, setLoadingText] = useState('Loading')
  const tempPoolId = parseInt(poolIdStr.toString(), 10)

  return (
    <div {...rest} className={classNames(style.cardPoolInteraction, className)}>
      <div className={style.gridTop}>
        <div className={style.blockInfo}>
          <h1>Animalia NFT</h1>
          <p>80 Titans NFTS</p>
          <p className={style.textDescription}>
            Animalia is an independent free-to-play online NFT trading card game
            featuring crypto-inspired meme creatures and gemstones. Powered by
            the Binance Smart Chain, Animalia gives you complete ownership over
            your in-game collectibles. Collect rare cards, create your own NFTs,
            build your deck, battle with other players and sell cards to other
            traders.
          </p>
          <div className={style.badgeType}>NFT</div>
          <div className={style.gridFigures}>
            <div className={style.colFigures}>
              <p className={style.textFigureLabel}>Total Supply</p>
              <h3>80</h3>
            </div>
            <div className={style.colFigures}>
              <p className={style.textFigureLabel}>Token price</p>
              <h3>
                870 <span className={style.textTokenName}>USDT</span>
              </h3>
            </div>
          </div>
        </div>
        <LaunchProgress stepId={tempPoolId} />
      </div>
      <div style={{ position: 'relative' }}>
        {isSaleEnded?
          <div className={style.buttonsFlex}>
            <h3> Animalia NFT Sale Ended!</h3>
          </div>
        :
        <>
        {isLoading && (
          <div className={style.loadingOverlay}>
            <div className={style.spinnerWrapper}>
              <Spinner
                animation="border"
                role="status"
                className={style.spinner}
              />
              <div className={style.textContainer}>
                <p className={style.extraText}>{extraText}</p>
                <p className={style.textLoading}>{loadingText}</p>
              </div>
            </div>
          </div>
        )}
        {tempPoolId === 1 && (
          <div className={style.buttonsFlex}>
            {!isLoggedIn && (
              <Button
                variant="outline-warning"
                className={style.btnConnect}
                onClick={() => connect()}
              >
                Connect wallet
              </Button>
            )}
            <Button
              variant="outline-warning"
              onClick={() => (isLoggedIn ? updateStep(2) : connect())}
              className={style.btnConnect}
            >
              Purchase NFT
            </Button>
          </div>
        )}
        {tempPoolId === 2 && (
          <BlockVerification
            handleLoading={handleLoading}
            updateStep={updateStep}
            updateLoadingText={(text: string) => setLoadingText(text)}
          />
        )}
        {[3, 4, 5, 6, 7, 8, 9].includes(tempPoolId) && (
          <BlockPurchase
            tempPoolId={tempPoolId}
            handleLoading={handleLoading}
            updateStep={updateStep}
            updateLoadingText={(text: string) => setLoadingText(text)}
          />
        )}
        </>}
      </div>
      {/* <BlockPeople /> */}
    </div>
  )
}

export default CardPoolInteraction
