/* eslint-disable no-nested-ternary */
import React from 'react'
import classNames from 'classnames'

import * as style from './VerticalStepperItem.module.scss'
import Icon from '~components/ui/Icon'

type TitleDesc = {
  title: string
  description: string
}

type VerticalStepperItemProps = {
  className?: string
  step: number
  activeStep: number
  upcomingText: TitleDesc
  activeText: TitleDesc
  finishedText: TitleDesc
  [otherProps: string]: any
}

const VerticalStepperItem = (props: VerticalStepperItemProps) => {
  const {
    className,
    step,
    activeStep,
    upcomingText,
    activeText,
    finishedText,
    ...rest
  } = props

  const isUpcomingStep = activeStep < step
  const isActiveStep = activeStep === step
  const isFinishedStep = activeStep > step

  const currentText = isUpcomingStep
    ? upcomingText
    : isActiveStep
    ? activeText
    : finishedText

  return (
    <div {...rest} className={classNames(style.verticalStepperItem, className)}>
      <div
        className={classNames(style.circleStatus, {
          [style.active]: isActiveStep || isFinishedStep,
        })}
      />
      <p className={style.textTitle}>{currentText.title}</p>
      <Icon
        name="icon-spinner-rounded"
        size={12}
        className={classNames(style.iconSpinner, {
          [style.active]: isActiveStep,
        })}
      />
      <div
        className={classNames(style.verticalLine, {
          [style.finished]: isFinishedStep,
        })}
      />
      <p className={style.textDescription}>{currentText.description}</p>
    </div>
  )
}

export default VerticalStepperItem
