import React from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'

import * as style from './LaunchProgressItem.module.scss'
import IconProgress from '../IconProgress'

type LaunchProgressItemProps = {
  className?: string
  step: number
  title: string
  description: string
  isActive?: boolean
  isFinished?: boolean
  isRegistered?: boolean
  timestamp?: number
  [otherProps: string]: any
}

const LaunchProgressItem = (props: LaunchProgressItemProps) => {
  const {
    className,
    step,
    title,
    description,
    isActive = false,
    isFinished = false,
    isRegistered,
    timestamp,
    ...rest
  } = props

  return (
    <div
      {...rest}
      className={classNames(
        style.launchProgressItem,
        { [style.active]: isActive },
        { [style.finished]: isFinished },
        className
      )}
    >
      <IconProgress step={step} isActive={isActive} isFinished={isFinished} />
      <p className={style.textHeading}>{title}</p>
      {/* eslint-disable-next-line no-nested-ternary */}
      {timestamp ? (
        <div className={style.badgeDate}>
          Jan 04, 11:00 GMT
        </div>
      ) : isRegistered ? (
        <div className={style.badgeRegistered}>Registered</div>
      ) : (
        <div />
      )}
      <div className={style.verticalLine} />
      <p className={style.textDescription}>{description}</p>
    </div>
  )
}

export default LaunchProgressItem
