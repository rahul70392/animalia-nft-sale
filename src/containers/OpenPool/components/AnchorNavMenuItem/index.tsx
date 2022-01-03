import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'

import * as style from './AnchorNavMenuItem.module.scss'

type AnchorNavMenuItemProps = {
  className?: string
  sectionId: string
  activeSectionId: string
  children: any
  [otherProps: string]: any
}

const AnchorNavMenuItem = (props: AnchorNavMenuItemProps) => {
  const { className, sectionId, activeSectionId, children, ...rest } = props

  return (
    <Link
      {...rest}
      className={classNames(
        style.anchorNavMenuItem,
        { [style.active]: activeSectionId === sectionId },
        className
      )}
      to={`#${sectionId}`}
    >
      {children}
    </Link>
  )
}

export default AnchorNavMenuItem
