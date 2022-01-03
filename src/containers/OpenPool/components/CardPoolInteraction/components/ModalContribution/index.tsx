import React, { useEffect, useState } from 'react'
import { Button, ModalBody } from 'react-bootstrap'

// @ts-ignore
import * as style from './ModalContribution.module.scss'
import ModalWrapper from '~components/ui/ModalWrapper'
import VerticalStepperItem from '../VerticalStepperItem'
import { CONTRIBUTION_STEPS } from './constants'

type ModalContributionProps = {
  className?: string
  tempPoolId: number
  usdtTxHash: string
  amount: number
  isVisible: boolean
  onHide: () => void
  [otherProps: string]: any
}

const ModalContribution = (props: ModalContributionProps) => {
  const {
    className,
    isVisible,
    onHide,
    tempPoolId,
    usdtTxHash,
    amount,
    ...rest
  } = props

  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => setActiveStep(tempPoolId - 4), [tempPoolId])

  const handleExplorer = () => {
    window.open(`${process.env.GATSBY_ETHERSCAN}/${usdtTxHash}`, '_blank')
  }

  const handleCode = () => {
    window.location.reload()
  }

  return (
    <ModalWrapper
      title={`Contribute ${amount} USDT`}
      {...rest}
      className={className}
      show={isVisible}
      onHide={onHide}
      hasCloseButton={false}
      backdrop="static"
    >
      <ModalBody className={style.modalBody}>
        <div className={style.stepsContainer}>
          {CONTRIBUTION_STEPS.map((contributionStep) => (
            <VerticalStepperItem
              key={contributionStep.step}
              activeStep={activeStep}
              {...contributionStep}
            />
          ))}
        </div>
        {tempPoolId === 8 && (
          <>
            {/* <p className={style.textInfo}>
              Your transaction is awaiting finalization. It can take a few
              seconds before changes reflect in the UI.
            </p> */}
            <table className={style.tableFigures}>
              <tbody>
                <tr>
                  <td>Your contribution</td>
                  <td>
                    {amount} <span className={style.textSecondary}>USDT</span>
                  </td>
                </tr>
                <tr>
                  <td>Purchased NFTs</td>
                  <td>
                  {amount/870} <span className={style.textSecondary}>ANIMALIA</span>
                  </td>
                </tr>
                <tr>
                  <td className={style.tdAlignTop}>NFT distibution</td>
                  <td>
                    Thu, 06 Jan 2022, <br className={style.tableLinebreak} />
                    <span className={style.textSecondary}>11:59:00 GMT</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={style.gridButtons}>
              <Button variant="outline-success" onClick={handleExplorer}>
                View in explorer
              </Button>
              <Button variant="outline-danger" onClick={handleCode}>
                Close
              </Button>
            </div>
          </>
        )}
      </ModalBody>
    </ModalWrapper>
  )
}

export default ModalContribution
