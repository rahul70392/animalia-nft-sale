import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import * as style from './CountdownTimer.module.scss'
import TimerSection from '../TimerSection'

dayjs.extend(duration)

type CountdownTimerProps = {
  className?: string
  heading?: string
  endsAtTimestamp: number
  [otherProps: string]: any
}

const CountdownTimer = (props: CountdownTimerProps) => {
  const { className, endsAtTimestamp, heading, ...rest } = props

  const [countdownDiff, setCountdownDiff] = useState<any>()

  const calcCountdownDiff = (endsDay: any, interval?: any) => {
    const nowDay = dayjs()

    const diff = endsDay.diff(nowDay)
    const diffDuration = dayjs.duration(diff)
    setCountdownDiff(diffDuration)

    if (interval && diffDuration.asSeconds() < 1) clearInterval(interval)
  }

  useEffect(() => {
    if (!endsAtTimestamp) return

    const endsDay = dayjs.unix(endsAtTimestamp)
    calcCountdownDiff(endsDay)

    const interval = setInterval(() => {
      calcCountdownDiff(endsDay, interval)
    }, 1000)

    // eslint-disable-next-line consistent-return
    return () => clearInterval(interval)
  }, [endsAtTimestamp])

  return (
    <div {...rest} className={classNames(style.countdownTimer, className)}>
      <p className={style.timerHeading}>{heading}</p>
      <div className={style.gridDigits}>
        <TimerSection value={countdownDiff?.format('D')} label="day" />
        <h3 className={style.textColon}>:</h3>
        <TimerSection value={countdownDiff?.format('HH')} label="hour" />
        <h3 className={style.textColon}>:</h3>
        <TimerSection value={countdownDiff?.format('mm')} label="minute" />
        <h3 className={style.textColon}>:</h3>
        <TimerSection value={countdownDiff?.format('ss')} label="second" />
      </div>
    </div>
  )
}

export default CountdownTimer
