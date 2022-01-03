import React from 'react'
import classNames from 'classnames'

import * as style from './TimerSection.module.scss'

type TimerSectionProps = {
  className?: string
  value: string
  label: string
  [otherProps: string]: any
}

const TimerSection = (props: TimerSectionProps) => {
  const { className, value = '00', label, ...rest } = props

  return (
    <div {...rest} className={classNames(style.timerSection, className)}>
      <h2 className={style.blockValue}>{value}</h2>
      <div className={style.textLabel}>
        {parseInt(value, 10) === 1 ? label : `${label}s`}
      </div>
    </div>
  )
}

export default TimerSection
