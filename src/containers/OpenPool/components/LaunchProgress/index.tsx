import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import * as style from './LaunchProgress.module.scss'
import LaunchProgressItem from './components/LaunchProgressItem'
import { LAUNCH_STEPS } from './constants'

type LaunchProgressProps = {
  className?: string
  stepId: number
  [otherProps: string]: any
}

const LaunchProgress = (props: LaunchProgressProps) => {
  const { className, stepId, ...rest } = props
  const [steps, setSteps] = useState(LAUNCH_STEPS)
  useEffect(() => {
    const data = steps.filter((_item: any) => {
      const item = _item
      if (item.step < stepId) {
        item.isFinished = true
        item.isActive = false
      } else if (item.step === stepId) {
        item.isActive = true
      } else {
        item.isFinished = false
        item.isActive = false
      }
      return item
    })
    setSteps(data)
  }, [stepId])

  return (
    <div {...rest} className={classNames(style.launchProgress, className)}>
      {steps.map((launchStep) => (
        <LaunchProgressItem key={launchStep.step} {...launchStep} />
      ))}
    </div>
  )
}

export default LaunchProgress
