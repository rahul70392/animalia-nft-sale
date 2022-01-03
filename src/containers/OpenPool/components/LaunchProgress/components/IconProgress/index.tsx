import React from 'react'
import classNames from 'classnames'

import * as style from './IconProgress.module.scss'
// @ts-ignore
import iconCheckGradientPrimary from './img/icon-check-gradient-primary.svg'

type IconProgressProps = {
  className?: string
  step: number
  isActive?: boolean
  isFinished?: boolean
  [otherProps: string]: any
}

const IconProgress = (props: IconProgressProps) => {
  const {
    className,
    step,
    isActive = false,
    isFinished = false,
    ...rest
  } = props

  return (
    <div
      {...rest}
      className={classNames(
        style.iconProgress,
        { [style.active]: isActive, [style.finished]: isFinished },
        className
      )}
    >
      {!isFinished ? (
        step
      ) : (
        <img src={iconCheckGradientPrimary} alt="✔️" width={16} height={16} />
      )}
    </div>
  )
}

export default IconProgress
